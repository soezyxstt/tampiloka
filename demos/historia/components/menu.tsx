"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Search, X } from "lucide-react";
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

export function filterMenuItems(items: MenuItem[], group: string, category: string, query: string) {
  const search = query.trim().toLocaleLowerCase("id-ID");
  const allowed = menuGroups.find(option => option.id === group)?.categories;
  const ranks = new Map<string, number>();
  return items.filter(item =>
    (group === "all" || allowed?.includes(item.category)) &&
    (category === "all" || item.category === category) &&
    (!search || `${item.name} ${item.description}`.toLocaleLowerCase("id-ID").includes(search))
  ).map(item => {
    const rank = ranks.get(item.category) ?? 0;
    ranks.set(item.category, rank + 1);
    return { item, rank };
  }).sort((a, b) => a.rank - b.rank).map(entry => entry.item);
}

function Price({ item }: { item: MenuItem }) {
  if (item.price === null) return <span className="menu-price-unavailable">Tanyakan harga</span>;
  return <>{item.variants && item.variants.length > 1 ? "Mulai " : ""}{rupiah.format(item.price)}</>;
}

export function Menu({ catalogue }: { catalogue: Catalogue }) {
  const [group, setGroup] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const reduced = useReducedMotion();
  const groupCategories = menuGroups.find(option => option.id === group)?.categories;
  const categories = catalogue.categories.filter(option => group === "all" || groupCategories?.includes(option.id));
  const filtered = filterMenuItems(catalogue.items, group, category, query);
  const visible = filtered.slice(0, limit);
  const pictured = visible.filter(item => item.image);
  const textOnly = visible.filter(item => !item.image);

  function reset() {
    setGroup("all");
    setCategory("all");
    setQuery("");
    setLimit(12);
  }

  function open(item: MenuItem) {
    setSelected(item);
    setDetailOpen(true);
  }

  return <div className="menu-catalogue">
    <div className="menu-catalogue-toolbar">
      <div className="menu-category-controls" role="group" aria-label="Kategori menu">
        {[{ id: "all", label: "Semua" }, ...menuGroups].map(option =>
          <Button variant="ghost" key={option.id} type="button" aria-pressed={group === option.id} onClick={() => { setGroup(option.id); setCategory("all"); setLimit(12); }}>{option.label}</Button>
        )}
      </div>
      <div className="menu-refinements">
        <div className="menu-subcategory"><span id="menu-kind-label">Jenis menu</span><Select value={category} onValueChange={value => { setCategory(value ?? "all"); setLimit(12); }} items={[{ value: "all", label: "Semua jenis" }, ...categories.map(option => ({ value: option.id, label: option.label }))]}><SelectTrigger aria-labelledby="menu-kind-label"><SelectValue /></SelectTrigger><SelectContent align="start" alignItemWithTrigger={false}><SelectItem value="all">Semua jenis</SelectItem>{categories.map(option => <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>)}</SelectContent></Select></div>
        <label className="menu-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Cari menu Historia</span><Input type="search" placeholder="Cari menu favoritmu" value={query} onChange={event => { setQuery(event.target.value); setLimit(12); }} /></label>
      </div>
    </div>
    <div className="menu-catalogue-status">
      <p role="status" aria-live="polite">{filtered.length ? `${visible.length} dari ${filtered.length} pilihan` : "Tidak ada menu yang cocok"}</p>
      {(group !== "all" || category !== "all" || query) && <Button variant="ghost" type="button" onClick={reset}>Tampilkan semua <X size={14} aria-hidden="true" /></Button>}
    </div>

    <AnimatePresence initial={false} mode="wait">
      <motion.div key={`${group}-${category}`} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
        {pictured.length > 0 && <ul className="menu-product-grid">{pictured.map(item => <li key={item.id}>
          <Button variant="ghost" type="button" className="menu-product" aria-label={`Lihat detail ${item.name}`} onClick={() => open(item)}>
            <span className="menu-product-visual"><Image src={item.image!} alt={item.name} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" /><span className="menu-product-view" aria-hidden="true"><ArrowUpRight size={22} /></span></span>
            <span className="menu-product-copy"><span className="menu-product-name">{item.name}</span>
            <span className="menu-product-description">{item.description}</span>
            <span className="menu-product-price"><Price item={item} /></span></span>
          </Button>
        </li>)}</ul>}

        {textOnly.length > 0 && <ul className="menu-text-list">{textOnly.map(item => <li key={item.id}><Button variant="ghost" type="button" onClick={() => open(item)} aria-label={`Lihat detail ${item.name}`}><span><span className="menu-text-name">{item.name}</span><span className="menu-text-description">{item.description}</span></span><span className="menu-text-price"><Price item={item} /><ArrowUpRight size={17} aria-hidden="true" /></span></Button></li>)}</ul>}

        {!filtered.length && <div className="menu-empty"><p>Belum ketemu yang kamu cari?</p><p>Coba nama menu lain atau jelajahi kembali semua pilihan.</p><Button variant="ghost" type="button" onClick={reset}>Jelajahi semua menu <ArrowUpRight size={17} aria-hidden="true" /></Button></div>}
      </motion.div>
    </AnimatePresence>

    {visible.length < filtered.length && <div className="menu-load-more"><Button variant="ghost" type="button" onClick={() => setLimit(value => value + 12)}>Lihat pilihan lainnya <ArrowDown size={18} aria-hidden="true" /></Button></div>}
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
