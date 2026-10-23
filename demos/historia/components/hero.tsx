"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "./ui/button";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  return <>
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-background" style={{ y }}><Image src="/images/menu/historia-space.webp" alt="Hidangan di meja kayu dan kursi rotan dalam ruang makan Historia, Garut" fill sizes="100vw" preload /></motion.div>
      <div className="hero-shade" />
      <div className="hero-inner wrap">
        <h1 id="hero-title" className="type-display-xl">Dari rasa,<br />jadi cerita.</h1>
        <div className="hero-actions"><Button className="hero-primary" nativeButton={false} render={<a href="#menu" />}>Lihat menu <ArrowDown size={19} /></Button></div>
        <a className="hero-venue-link" href="#acara">Coffee, dining & events <ArrowUpRight size={18} /></a>
      </div>
    </section>
    <div className="visit-rail wrap"><a href="#kunjungi"><MapPin size={18} /> Cimanuk 305, Garut <ArrowUpRight size={16} /></a><p><Clock3 size={18} /> Setiap hari · 09.00–23.00 WIB</p></div>
  </>;
}
