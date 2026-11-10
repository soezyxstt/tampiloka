"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import type { Catalogue } from "./menu";

export function FeaturedDishes({ items }: { items: Catalogue["items"] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  if (!items.length) return null;
  const item = items[active];
  return <section id="rasa" className="taste-section" aria-labelledby="taste-title">
    <div className="taste-scene" data-scroll-reveal=""><Image src="/images/menu/table-spread.webp" alt="Hidangan Historia tersaji di meja kayu, termasuk salad dan makanan pendamping" fill sizes="(max-width: 767px) 100vw, 48vw" /><span>Di meja Historia.</span></div>
    <div className="taste-editorial"><h2 data-scroll-reveal="" id="taste-title" className="type-heading-2">Dari dapur<br />& bar kami.</h2>
      <div className="taste-stage" data-scroll-reveal=""><AnimatePresence mode="wait" initial={false}><motion.div key={item.id} className="taste-slide" initial={reduced ? false : { opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
        {item.image && <Image src={item.image} alt={item.name} fill sizes="(max-width: 767px) 95vw, 48vw" />}
      </motion.div></AnimatePresence></div>
      <div data-scroll-reveal="" className="taste-caption" aria-live="polite"><h3>{item.name}</h3><p>{item.description}</p>{item.price !== null && <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.price)}</span>}</div>
      <div className="taste-navigation"><a className="text-link taste-menu-link" href="#menu">Seluruh menu</a><div className="taste-controls"><Button variant="icon" aria-label="Hidangan sebelumnya" onClick={() => setActive((active + items.length - 1) % items.length)}><ArrowLeft size={20} /></Button><span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><Button variant="icon" aria-label="Hidangan berikutnya" onClick={() => setActive((active + 1) % items.length)}><ArrowRight size={20} /></Button></div></div>
    </div></section>;

}

const spaces = [
  { src: "/images/menu/historia-space.webp", alt: "Ruang makan Historia dengan kursi rotan, meja kayu, dan hidangan", caption: "Ruang makan" },
  { src: "/images/space-corner.webp", alt: "Sudut duduk Historia dengan kursi rotan dan karya seni di dinding", caption: "Sudut duduk" },
  { src: "/images/room.webp", alt: "Dinding galeri Historia dengan bingkai karya seni dan panel hijau", caption: "Dinding galeri" },
  { src: "/images/space-bar.webp", alt: "Bar kopi Historia dengan mesin kopi dan pencahayaan hangat", caption: "Bar kopi" },
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
  return <section id="suasana" className="spaces-section" aria-label="Suasana Historia"><div className="space-track" ref={track} tabIndex={0} aria-label="Galeri suasana Historia, geser untuk melihat foto" onScroll={() => { if (!track.current || track.current.children.length < 2) return; const first = track.current.children[0] as HTMLElement; const second = track.current.children[1] as HTMLElement; setActive(Math.min(spaces.length - 1, Math.round(track.current.scrollLeft / (second.offsetLeft - first.offsetLeft)))); }}>
    {spaces.map((space, index) => <figure className="space-frame" key={space.src}><div><Image src={space.src} alt={space.alt} fill sizes="(max-width: 767px) 82vw, 48vw" /></div><figcaption><span>{space.caption}</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption></figure>)}
    </div><div className="gallery-bottom"><a className="text-link" href="https://www.instagram.com/historiacoffee.co/" target="_blank" rel="noopener noreferrer">Lihat Instagram</a><div className="gallery-controls"><Button variant="icon" disabled={active === 0} aria-label="Foto suasana sebelumnya" onClick={() => go(active - 1)}><ArrowLeft size={20} /></Button><span aria-live="polite">{String(active + 1).padStart(2, "0")} / 04</span><Button variant="icon" disabled={active === spaces.length - 1} aria-label="Foto suasana berikutnya" onClick={() => go(active + 1)}><ArrowRight size={20} /></Button></div></div></section>;
}
