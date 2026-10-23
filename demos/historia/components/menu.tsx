"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "./ui/dialog";
import "./menu.css";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number | null;
  image: string | null;
  page: number;
  variants?: { label: string; price: number }[];
};

export type Catalogue = {
  source: { url: string; file: string; checkedAt: string; priceNote: string };
  categories: { id: string; label: string }[];
  items: MenuItem[];
};

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

export const menuGroups = [
  { id: "food", label: "Makanan", categories: ["nasi-goreng", "main-course", "steak", "salad", "sushi", "spring-roll", "pasta", "mie-goreng"] },
  { id: "coffee", label: "Kopi", categories: ["coffee", "black-series"] },
  { id: "non-coffee", label: "Minuman lainnya", categories: ["frappe", "non-coffee", "strawberry-series", "juice", "mocktail"] },
  { id: "snacks", label: "Camilan & dessert", categories: ["appetizer", "dessert"] },
];

export function filterMenuItems(items: MenuItem[], group: string, query: string) {
  const search = query.trim().toLocaleLowerCase("id-ID");
  const allowed = menuGroups.find(option => option.id === group)?.categories;
  const ranks = new Map<string, number>();
  const firstCategories = ["main-course", "coffee", "sushi", "appetizer", "non-coffee", "dessert"];
  const categoryRank = (category: string) => { const index = firstCategories.indexOf(category); return index < 0 ? firstCategories.length : index; };
  return items.filter(item =>
    (group === "all" || allowed?.includes(item.category)) &&
    (!search || `${item.name} ${item.description}`.toLocaleLowerCase("id-ID").includes(search))
  ).map(item => {
    const rank = ranks.get(item.category) ?? 0;
    ranks.set(item.category, rank + 1);
    return { item, rank };
  }).sort((a, b) => a.rank - b.rank || (group === "all" ? categoryRank(a.item.category) - categoryRank(b.item.category) : 0)).map(entry => entry.item);
}

function Price({ item }: { item: MenuItem }) {
  if (item.price === null) return <span className="menu-price-unavailable">Tanyakan harga</span>;
  return <>{item.variants && item.variants.length > 1 ? "Mulai " : ""}{rupiah.format(item.price)}</>;
}

export function Menu({ catalogue }: { catalogue: Catalogue }) {
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const catalogueRoot = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchToggle = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const reduced = useReducedMotion();
  const filtered = filterMenuItems(catalogue.items, group, query);
  const categories = [{ value: "all", label: "Semua menu" }, ...menuGroups.map(option => ({ value: option.id, label: option.label }))];

  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);

  function showResults() {
    requestAnimationFrame(() => catalogueRoot.current?.scrollIntoView({ block: "start", behavior: "instant" }));
  }
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.ceil(filtered.length / pageSize);
  const pictured = visible.filter(item => item.image);
  const textOnly = visible.filter(item => !item.image);

  function reset() {
    setGroup("all");
    setQuery("");
    setSearchOpen(false);
    setPage(0);
  }

  function open(item: MenuItem) {
    setSelected(item);
    setDetailOpen(true);
  }

  return <div className="menu-catalogue" ref={catalogueRoot}>
    <div className="menu-catalogue-toolbar">
      <div className="menu-refinements" data-search-open={searchOpen}>
        <div className="menu-subcategory"><span id="menu-kind-label" className="sr-only">Kategori menu</span><Select value={group} onValueChange={value => { setGroup(value ?? "all"); setQuery(""); setSearchOpen(false); setPage(0); showResults(); }} items={categories}><SelectTrigger aria-labelledby="menu-kind-label"><SelectValue /></SelectTrigger><SelectContent align="start" alignItemWithTrigger={false}>{categories.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>
        <div className="menu-search">
          <Search className="menu-search-decoration" size={18} aria-hidden="true" />
          <Button ref={searchToggle} variant="ghost" size="icon" className="menu-search-toggle" aria-label={searchOpen ? "Kembali ke kategori menu" : "Buka pencarian menu"} aria-expanded={searchOpen} aria-controls="menu-search-field" onClick={() => { if (searchOpen) reset(); else { setGroup("all"); setPage(0); setSearchOpen(true); } }}><Search size={20} aria-hidden="true" /></Button>
          <div className="menu-search-field" id="menu-search-field">
            <label className="sr-only" htmlFor="historia-menu-search">Cari menu Historia</label><Input type="search" id="historia-menu-search" ref={searchInput} placeholder="Cari menu favoritmu" value={query} onChange={event => { setQuery(event.target.value); setSearchOpen(true); setGroup("all"); setPage(0); showResults(); }} onKeyDown={event => { if (event.key === "Escape") { reset(); searchToggle.current?.focus(); } }} />
            <Button variant="ghost" size="icon" className="menu-search-close" aria-label="Tutup pencarian menu" onClick={() => { reset(); searchToggle.current?.focus(); }}><X size={18} aria-hidden="true" /></Button>
          </div>
        </div>
      </div>
      <div className="menu-catalogue-status">
        <p role="status" aria-live="polite">{filtered.length ? `${page * pageSize + 1}–${page * pageSize + visible.length} dari ${filtered.length} pilihan` : "Tidak ada menu yang cocok"}</p>
        {(group !== "all" || query) && <Button variant="ghost" type="button" onClick={() => { reset(); if (searchOpen) searchToggle.current?.focus(); }}>Tampilkan semua <X size={14} aria-hidden="true" /></Button>}
      </div>
    </div>

    <AnimatePresence initial={false} mode="wait">
      <motion.div key={group} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
        {pictured.length > 0 && <ul className="menu-product-grid">{pictured.map(item => <li key={item.id}>
          <Button variant="ghost" type="button" className="menu-product" aria-label={`Lihat detail ${item.name}`} onClick={() => open(item)}>
            <span className="menu-product-visual"><Image src={item.image!} alt={item.name} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" /><span className="menu-product-view" aria-hidden="true"><ArrowUpRight size={22} /></span></span>
            <span className="menu-product-copy"><span className="menu-product-name">{item.name}</span>
            <span className="menu-product-description">{item.description}</span>
            <span className="menu-product-price"><Price item={item} /></span></span>
          </Button>
        </li>)}</ul>}

        {textOnly.length > 0 && <ul className="menu-text-list">{textOnly.map(item => <li key={item.id}><Button variant="ghost" type="button" onClick={() => open(item)} aria-label={`Lihat detail ${item.name}`}><span><span className="menu-text-name">{item.name}</span><span className="menu-text-description">{item.description}</span></span><span className="menu-text-price"><Price item={item} /><ArrowUpRight size={17} aria-hidden="true" /></span></Button></li>)}</ul>}

        {!filtered.length && <div className="menu-empty"><p>Belum ketemu yang kamu cari?</p><p>Coba nama menu lain atau jelajahi kembali semua pilihan.</p><Button variant="ghost" type="button" onClick={reset}>Jelajahi semua menu <ArrowDown size={17} aria-hidden="true" /></Button></div>}
      </motion.div>
    </AnimatePresence>

    {pageCount > 1 && <nav className="menu-pagination" aria-label="Halaman menu"><Button variant="ghost" disabled={page === 0} aria-label="Halaman menu sebelumnya" onClick={() => { setPage(value => value - 1); showResults(); }}><ArrowLeft size={18} /> Sebelumnya</Button><span aria-live="polite">{page + 1} / {pageCount}</span><Button variant="ghost" disabled={page + 1 === pageCount} aria-label="Halaman menu berikutnya" onClick={() => { setPage(value => value + 1); showResults(); }}>Berikutnya <ArrowRight size={18} /></Button></nav>}
    <p className="menu-catalogue-source">Harga dan ketersediaan menu dapat berubah.</p>

    <Dialog open={detailOpen} onOpenChange={setDetailOpen} onOpenChangeComplete={open => { if (!open) setSelected(null); }}>
      <DialogContent className="menu-detail" showCloseButton={false}>
      {selected && <div className="menu-detail-content">
        <DialogClose className="menu-detail-close" aria-label="Tutup detail menu"><X size={23} /></DialogClose>
        {selected.image && <div className="menu-detail-image"><Image src={selected.image} alt={selected.name} fill sizes="(max-width: 700px) 90vw, 45vw" /></div>}
        <div className="menu-detail-copy"><DialogTitle className="menu-detail-title">{selected.name}</DialogTitle><DialogDescription>{selected.description}</DialogDescription><p className="menu-detail-price"><Price item={selected} /></p>
          {selected.variants && selected.variants.length > 1 && <dl className="menu-detail-variants">{selected.variants.map(variant => <div key={variant.label}><dt>{variant.label}</dt><dd>{rupiah.format(variant.price)}</dd></div>)}</dl>}

        </div>
      </div>}
      </DialogContent>
    </Dialog>
  </div>;
}
