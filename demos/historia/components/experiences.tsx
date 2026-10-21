"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import type { Catalogue } from "./menu";

export function FeaturedDishes({ items }: { items: Catalogue["items"] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  if (!items.length) return null;
  const item = items[active];
  return <section id="rasa" className="taste-section section-space" aria-labelledby="taste-title"><div className="wrap"><div className="section-heading"><h2 id="taste-title" className="type-heading-2">Rasa yang ingin<br /><em>kamu ulang.</em></h2><p>Dari dapur dan bar Historia,<br />temukan awal ceritamu.</p></div>
    <div className="taste-stage"><div className="taste-orbit" aria-hidden="true" /><span className="taste-backdrop" aria-hidden="true">historia</span>
      <AnimatePresence mode="wait" initial={false}><motion.div key={item.id} className="taste-slide" initial={reduced ? false : { opacity: 0, rotate: -7, scale: 0.92 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, rotate: 7, scale: 0.94 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        {item.image && <Image src={item.image} alt={item.name} fill sizes="(max-width: 767px) 90vw, 55vw" />}
      </motion.div></AnimatePresence>
      <div className="taste-caption" aria-live="polite"><h3>{item.name}</h3><p>{item.description}</p>{item.price !== null && <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.price)}</span>}</div>
      <div className="taste-controls"><Button variant="icon" aria-label="Hidangan sebelumnya" onClick={() => setActive((active + items.length - 1) % items.length)}><ArrowLeft size={20} /></Button><span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><Button variant="icon" aria-label="Hidangan berikutnya" onClick={() => setActive((active + 1) % items.length)}><ArrowRight size={20} /></Button></div>
    </div><a className="text-link taste-menu-link" href="#menu">Jelajahi seluruh menu <ArrowUpRight size={18} /></a></div></section>;
}

const spaces = [
  { src: "/images/menu/historia-space.webp", alt: "Ruang makan Historia dengan kursi rotan, meja kayu, dan hidangan", caption: "Duduk bersama, lebih lama." },
  { src: "/images/space-corner.webp", alt: "Sudut duduk Historia dengan kursi rotan dan karya seni di dinding", caption: "Sudut kecil untuk jeda." },
  { src: "/images/room.webp", alt: "Dinding galeri Historia dengan bingkai karya seni dan panel hijau", caption: "Ada cerita di setiap sudut." },
  { src: "/images/space-bar.webp", alt: "Bar kopi Historia dengan mesin kopi dan pencahayaan hangat", caption: "Mulai dari secangkir kopi." },
];

export function SpaceGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  function go(index: number) {
    const element = track.current?.children[index] as HTMLElement | undefined;
    if (!element || !track.current) return;
    track.current.scrollTo({ left: element.offsetLeft - (track.current.children[0] as HTMLElement).offsetLeft, behavior: reduced ? "instant" : "smooth" });
    setActive(index);
  }
  return <section id="suasana" className="spaces-section section-space" aria-labelledby="spaces-title"><div className="wrap"><div className="section-heading"><h2 id="spaces-title" className="type-heading-2">Datang untuk rasa.<br /><em>Tinggal untuk suasana.</em></h2><p>Meja kayu, sudut hangat,<br />dan obrolan yang terus mengalir.</p></div></div><div className="space-track" ref={track} tabIndex={0} aria-label="Galeri suasana Historia, geser untuk melihat foto" onScroll={() => { if (!track.current || track.current.children.length < 2) return; const first = track.current.children[0] as HTMLElement; const second = track.current.children[1] as HTMLElement; setActive(Math.min(spaces.length - 1, Math.round(track.current.scrollLeft / (second.offsetLeft - first.offsetLeft)))); }}>
    {spaces.map((space, index) => <figure className="space-frame" key={space.src}><div><Image src={space.src} alt={space.alt} fill sizes="(max-width: 767px) 82vw, 48vw" /></div><figcaption><span>{space.caption}</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption></figure>)}
    </div><div className="gallery-bottom wrap"><a className="text-link" href="https://www.instagram.com/historiacoffee.co/" target="_blank" rel="noopener noreferrer">Keseharian Historia <ArrowUpRight size={17} /></a><div className="gallery-controls"><Button variant="icon" disabled={active === 0} aria-label="Foto suasana sebelumnya" onClick={() => go(active - 1)}><ArrowLeft size={20} /></Button><span aria-live="polite">{String(active + 1).padStart(2, "0")} / 04</span><Button variant="icon" disabled={active === spaces.length - 1} aria-label="Foto suasana berikutnya" onClick={() => go(active + 1)}><ArrowRight size={20} /></Button></div></div></section>;
}
