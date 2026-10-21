"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export function MobileNav() {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return <Collapsible open={open} onOpenChange={setOpen} className="mobile-nav" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } }}>
    <CollapsibleTrigger ref={trigger} className="mobile-nav-trigger">Menu <Plus size={18} aria-hidden="true" /></CollapsibleTrigger>
    <CollapsibleContent className="mobile-nav-panel"><nav aria-label="Navigasi ponsel" onClick={event => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
      <a href="#menu">Pilihan menu</a><a href="#suasana">Suasana</a><a href="#acara">Acara & pertemuan</a><a href="#kunjungi">Lokasi & jam buka</a><a href="https://wa.me/6282130468241" target="_blank" rel="noopener noreferrer">WhatsApp Historia ↗</a>
    </nav></CollapsibleContent>
  </Collapsible>;
}
