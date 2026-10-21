"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { motion, stagger, useAnimate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";
import { Button } from "./ui/button";

export function Hero() {
  const [root, animate] = useAnimate<HTMLElement>();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  useEffect(() => {
    if (reduced) return;
    const lines = animate(".hero-line > *", { y: ["105%", "0%"] }, { duration: 1, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] });
    const bottom = animate(".hero-bottom", { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.3 });
    return () => { lines.stop(); bottom.stop(); };
  }, [animate, reduced]);
  return <section ref={root} className="hero" aria-labelledby="hero-title">
    <motion.div className="hero-background" style={{ y, scale }}><Image src="/images/menu/historia-space.webp" alt="Meja berisi hidangan Historia, kursi rotan, dan dinding lengkung berwarna hangat di ruang makan Historia" fill sizes="100vw" preload /></motion.div>
    <div className="hero-shade" />
    <div className="hero-inner wrap">
      <h1 id="hero-title" className="type-display-xl"><span className="hero-line"><span>Dari rasa,</span></span><span className="hero-line"><em>jadi cerita.</em></span></h1>
      <div className="hero-bottom">
        <div><p className="hero-description">Secangkir kopi. Sepiring favorit.<br />Waktu yang terasa lebih dekat.</p><div className="hero-actions"><Button className="hero-primary" nativeButton={false} render={<a href="#menu" />}>Temukan favoritmu <ArrowDown size={19} /></Button><Button variant="ghost" className="hero-direction" nativeButton={false} render={<a href="#kunjungi" />}>Mampir ke Historia <ArrowUpRight size={18} /></Button></div></div>
        <div className="hero-facts"><p><MapPin size={16} /> Cimanuk 305, Garut</p><p><Clock3 size={16} /> Setiap hari · 09.00–23.00</p><a href="#rasa" aria-label="Jelajahi rasa Historia"><ArrowDown size={21} /></a></div>
      </div>
    </div>
  </section>;
}

export function MovingWords() {
  const reduced = useReducedMotion();
  const [track, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    if (reduced) return;
    const animation = animate(track.current, { x: ["0%", "-50%"] }, { duration: 30, ease: "linear", repeat: Infinity });
    return () => animation.stop();
  }, [animate, reduced, track]);
  return <div className="moving-words" aria-hidden="true"><div ref={track}><span>Kopi. Makan. Bertemu. Bercerita. <i>âœ³</i> </span><span>Kopi. Makan. Bertemu. Bercerita. <i>âœ³</i> </span></div></div>;
}
