"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, Search, X, Wifi, Plug, LockKeyhole, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import rawMenu from "@/data/menu.json";

const WA="https://wa.me/6282318188371";
const MAP="https://maps.app.goo.gl/xSi1EuSNYsEpgtYW7";
const money=(v:number)=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(v);
const categories=["Semua menu","Coffee","Non Coffee","Fresh Drinks","Light Meals","Salad & Sandwich","Main Dish","Pasta & Pizza","Cake & Pastry","Breakfast"];
const firstIds=["hot-latte","prawn-pasta","supreme-pizza","bistik","butter-croissant","cheesecake"];
const ordered=[...rawMenu].sort((a,b)=>{
 const ai=firstIds.indexOf(a.id),bi=firstIds.indexOf(b.id);
 return (ai<0?99:ai)-(bi<0?99:bi);
});
const sets=rawMenu.filter(i=>i.category==="Breakfast");

function WhatsApp(){return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.7l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8.2 7.7c.3-.4.8-.4 1 0l1 2c.1.3-.2.6-.7 1 .6 1.3 1.6 2.3 3 2.9.4-.5.7-1 1-1l2.1 1c.4.2.3.8 0 1.2-.6.9-1.4 1.1-2.5.7-3.2-1-5.8-3.8-6-6.1 0-.8.5-1.4 1.1-1.7Z" fill="currentColor"/></svg>}
function Photo({name,alt,className="",priority=false}:{name:string;alt:string;className?:string;priority?:boolean}){
 return <Image className={className} src={`/images/${name}.webp`} alt={alt} width={1200} height={850} priority={priority} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 40vw"/>;
}
function ChatLink({children,className=""}:{children:React.ReactNode;className?:string}){
 return <a className={`action ${className}`} href={WA} target="_blank" rel="noreferrer"><WhatsApp/>{children}<ArrowUpRight size={18}/></a>;
}

export default function Classico(){
 const reduced=useReducedMotion();
 const [loaded,setLoaded]=useState(false);
 const [shortcut,setShortcut]=useState<{category:string;version:number}|null>(null);
 useEffect(()=>{const frame=requestAnimationFrame(()=>setLoaded(true));return()=>cancelAnimationFrame(frame);},[]);
 return <MotionConfig reducedMotion="user">
  <a className="skip" href="#main">Langsung ke konten</a>
  <div className="concept">Konsep website independen untuk Classico Coffee & Bake.</div>
  <header className="site-header">
   <a href="#" className="brand" aria-label="Classico, kembali ke atas"><Image src="/images/symbol.png" alt="" width={30} height={40}/><span>classico<span className="brand-sub">coffee & bake</span></span></a>
   <nav aria-label="Navigasi utama"><a href="#menu">Menu</a><a href="#breakfast">Sarapan</a><a href="#space">Suasana</a><a href="#location">Kunjungi</a></nav>
   <ChatLink className="header-action">Reservasi</ChatLink>
  </header>
  <main id="main">
   <section className="cover" aria-labelledby="hero-title">
    <div className="cover-heading"><motion.h1 id="hero-title" initial={false} animate={loaded?{y:0}:{y:reduced?0:12}} transition={{duration:reduced?0:.7,ease:[.22,1,.36,1]}}>Coffee & bake.</motion.h1></div>
    <div className="storefront">
     {[{name:"hot-latte",label:"Coffee",category:"Coffee",alt:"Hot Latte Classico dalam cangkir bersimbol asli"},{name:"supreme-pizza",label:"Kitchen",category:"Pasta & Pizza",alt:"Supreme Pizza Classico"},{name:"butter-croissant",label:"Bake",category:"Cake & Pastry",alt:"Butter Croissant Classico"}].map((item,index)=><motion.a key={item.label} href="#menu" className="store-door" onClick={()=>setShortcut(previous=>({category:item.category,version:(previous?.version??0)+1}))} initial={false} animate={loaded?{y:0}:{y:reduced?0:15+index*7}} transition={{duration:reduced?0:.65,delay:reduced?0:index*.06}}><Photo name={item.name} alt={item.alt} priority/><span>{item.label}<ArrowDown size={24}/></span></motion.a>)}
    </div>
    <div className="cover-visit"><a href={MAP} target="_blank" rel="noreferrer">Sukaresmi 19A, Bandung <ArrowUpRight size={17}/></a><p>Senin 11.00–23.00 <span>/</span> Selasa–Minggu 07.30–23.00 WIB</p><a href="#menu" className="menu-jump">Semua menu <ArrowDown size={18}/></a></div>
   </section>
   <Breakfast/>
   <Catalogue key={shortcut?.version??0} shortcut={shortcut}/>
   <section id="space" className="space-section section-pad" aria-labelledby="space-title">
    <div className="space-spread"><figure className="space-main"><Photo name="interior" alt="Ruang dalam Classico dengan furnitur kayu dan kursi santai"/></figure><div className="space-title"><h2 id="space-title">Work from Classico.</h2><p>Wi-Fi, stopkontak, air minum gratis, dan loker.</p></div><figure className="space-work"><Photo name="wfc-wide" alt="Pengunjung bekerja dengan laptop di meja kayu Classico"/></figure></div>
    <div className="space-details"><div className="amenities"><span><Wifi/>Wi-Fi</span><span><Plug/>Stopkontak</span><span><GlassWater/>Air minum gratis</span><span><LockKeyhole/>Loker</span></div><ChatLink className="outline">Tanya area & ketersediaan</ChatLink></div>
   </section>
   <section className="community section-pad" id="community" aria-labelledby="community-title">
    <div className="community-intro"><h2 id="community-title">Acara & kolaborasi.</h2><Photo name="sharing" alt="Pizza untuk dinikmati bersama dari materi sharing package Classico"/><p>Sharing package, acara komunitas, dan kolaborasi bersama Classico.</p><ChatLink>Tanya sharing package</ChatLink></div>
    <div className="community-links"><a href="https://forms.gle/Sh8GyUW4sfxu612FA" target="_blank" rel="noreferrer"><span><strong>Acara & komunitas</strong><small>Ajukan konsep kolaborasimu.</small></span><ArrowUpRight/></a><a href="https://forms.gle/9dA2QaGrrxVMbtF1A" target="_blank" rel="noreferrer"><span><strong>Live music talent</strong><small>Portofolio tampil aktif & akun sosial publik.</small></span><ArrowUpRight/></a><a href="https://forms.gle/Q9pAbvMzq2on7VEJ8" target="_blank" rel="noreferrer"><span><strong>Creator & KOL</strong><small>Lebih dari 3.000 followers & Instagram publik.</small></span><ArrowUpRight/></a></div>
   </section>
   <section id="location" className="location section-pad" aria-labelledby="location-title"><div className="location-heading"><h2 id="location-title">Sukaresmi 19A.</h2><ChatLink>Reservasi via WhatsApp</ChatLink></div><div className="location-info"><address>Jl. Sukaresmi No. 19A<br/>Ciumbuleuit, Cidadap, Bandung</address><dl><div><dt>Senin</dt><dd>11.00–23.00 WIB</dd></div><div><dt>Selasa–Minggu</dt><dd>07.30–23.00 WIB</dd></div></dl><a className="text-link" href={MAP} target="_blank" rel="noreferrer">Petunjuk arah <ArrowUpRight size={18}/></a></div><div className="map-frame"><iframe title="Lokasi Classico Coffee & Bake, Jl. Sukaresmi No.19A Bandung" src="https://maps.google.com/maps?q=Classico%20Coffee%20%26%20Bake%20Jl.%20Sukaresmi%2019A%20Bandung&z=16&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/><p>Peta tidak tampil? <a href={MAP} target="_blank" rel="noreferrer">Buka Google Maps <ArrowUpRight size={14}/></a></p></div></section>
  </main>
  <footer className="footer"><a href="#" className="brand"><Image src="/images/symbol.png" alt="" width={30} height={40}/><span>classico<span className="brand-sub">coffee & bake</span></span></a><a href="https://www.instagram.com/classicoidn/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16}/></a><a href="#">Kembali ke atas ↑</a></footer>
 </MotionConfig>;
}

function Catalogue({shortcut}:{shortcut:{category:string}|null}){
 const [category,setCategory]=useState(shortcut?.category??"Semua menu"); const [query,setQuery]=useState(""); const [page,setPage]=useState(0); const [searchOpen,setSearchOpen]=useState(false);
 const searchRef=useRef<HTMLInputElement>(null);const toggleRef=useRef<HTMLButtonElement>(null);const anchorRef=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const filtered=useMemo(()=>ordered.filter(i=>(query?`${i.name} ${i.category} ${i.description}`.toLowerCase().includes(query.trim().toLowerCase()):category==="Semua menu"||i.category===category)),[category,query]);
 const pages=Math.ceil(filtered.length/6);const visible=filtered.slice(page*6,page*6+6);
 function closeSearch(){setSearchOpen(false);setQuery("");setPage(0);requestAnimationFrame(()=>toggleRef.current?.focus());}
 function changePage(n:number){setPage(n);anchorRef.current?.scrollIntoView({behavior:reduced?"instant":"smooth",block:"start"});}
 return <section id="menu" className="catalogue section-pad" aria-labelledby="menu-title">
  <div className="section-heading"><h2 id="menu-title">Menu.</h2><a href="#location" className="text-link">Kunjungi Classico <ArrowUpRight size={18}/></a></div>
  <div className={`catalogue-tools ${searchOpen?"search-open":""}`} ref={anchorRef}>
   <div className="category-control"><Select items={categories.map(c=>({label:c,value:c}))} value={category} onValueChange={v=>{setCategory(v??"Semua menu");setQuery("");setPage(0);}}><SelectTrigger aria-label="Kategori menu"><SelectValue/></SelectTrigger><SelectContent alignItemWithTrigger={false}>{categories.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
   <motion.div id="menu-search" className="search-box" initial={false} animate={{flexGrow:searchOpen?1:0}} transition={{duration:reduced?0:.25}}><Search size={19}/><Input ref={searchRef} aria-label="Cari menu di semua kategori" placeholder="Cari kopi, pasta, pastry…" value={query} onChange={e=>{setQuery(e.target.value);setCategory("Semua menu");setPage(0);}} onKeyDown={e=>{if(e.key==="Escape")closeSearch();}}/>{searchOpen?<Button variant="ghost" size="icon" aria-label="Tutup pencarian" onClick={closeSearch}><X size={19}/></Button>:null}</motion.div>
   <Button className="search-toggle" variant="ghost" size="icon" ref={toggleRef} aria-label="Buka pencarian menu" aria-controls="menu-search" aria-expanded={searchOpen} onClick={()=>{setSearchOpen(true);requestAnimationFrame(()=>searchRef.current?.focus());}}><Search size={20}/></Button>
  </div>
  <div className="catalogue-meta"><p aria-live="polite">{filtered.length} pilihan {query?`untuk “${query}”`:category!=="Semua menu"?category.toLowerCase():"menu"}</p><span>{query?"Pencarian di semua kategori":"Harga dalam Rupiah"}</span></div>
  <AnimatePresence mode="wait" initial={false}><motion.div key={`${category}-${query}-${page}`} initial={{opacity:0,y:reduced?0:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-4}} transition={{duration:reduced?0:.12}} className="menu-grid">
   {visible.length?visible.map(i=><article key={i.id} data-product={i.id} className={`menu-item ${i.imageId?"has-photo":"text-only"}`}>
    {i.imageId?<div className="product-photo"><Photo name={i.imageId} alt={i.name}/></div>:null}
    <div className="product-copy"><div className="product-heading"><h3>{i.name}</h3><span>{i.variants.length?"Mulai ":""}{money(i.price.amount)}</span></div>
    {i.description?<p>{i.description}</p>:null}
    {i.variants.length?<ul className="variant-list">{i.variants.map(v=><li key={v.id}><span>{v.name}</span><span>{money(v.price.amount)}</span></li>)}</ul>:null}</div>
   </article>):<div className="empty-results"><h3>Belum ada menu yang cocok.</h3><p>Coba kata lain atau tampilkan semua pilihan.</p><Button variant="outline" onClick={()=>{setQuery("");setCategory("Semua menu");setPage(0);searchRef.current?.focus();}}>Reset pencarian</Button></div>}
  </motion.div></AnimatePresence>
  <div className="menu-bottom"><p>Harga dan ketersediaan dapat berubah.<br/>Konfirmasi saat memesan.</p><nav className="pagination" aria-label="Halaman menu"><Button variant="outline" size="icon" disabled={page===0} aria-label="Halaman menu sebelumnya" onClick={()=>changePage(page-1)}><ArrowLeft size={18}/></Button><span aria-live="polite">{pages?page+1:0} / {pages}</span><Button variant="outline" size="icon" disabled={page>=pages-1} aria-label="Halaman menu berikutnya" onClick={()=>changePage(page+1)}><ArrowRight size={18}/></Button></nav></div>
 </section>;
}

function Breakfast(){
 const [active,setActive]=useState("breakfast-a");const reduced=useReducedMotion();
 return <section className="breakfast section-pad" id="breakfast" aria-labelledby="breakfast-title">
  <Tabs value={active} onValueChange={v=>setActive(String(v))} className="breakfast-tabs">
   <div className="breakfast-art"><Photo name="breakfast-table" alt="Kopi dan toast di meja sarapan Classico"/><div className="breakfast-caption"><h2 id="breakfast-title">Set sarapan.</h2></div></div>
   <div className="breakfast-copy"><TabsList variant="line" aria-label="Pilihan paket sarapan">{sets.map((s,i)=><TabsTrigger value={s.id} key={s.id}>Set {String.fromCharCode(65+i)}</TabsTrigger>)}</TabsList>
    <AnimatePresence mode="wait" initial={false}><motion.div className="set-art" key={active} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.15}}><Photo name={active} alt={`Pilihan ${sets.find(s=>s.id===active)?.name}`}/></motion.div></AnimatePresence>
    {sets.map(s=><TabsContent value={s.id} key={s.id}><div className="breakfast-panel"><h3>{s.name}</h3>{s.variants.length?<ul>{s.variants.map(v=><li key={v.id}><span>{v.name}{s.id==='breakfast-a'?" + telur kampung & srikaya butter toast":""}</span><strong>{money(v.price.amount)}</strong></li>)}</ul>:<><p>{s.description}</p><strong className="set-price">{money(s.price.amount)}</strong></>}</div></TabsContent>)}
    <ChatLink className="light-action">Tanya paket sarapan</ChatLink><small>Konfirmasi jam layanan dan ketersediaan paket.</small>
   </div>
  </Tabs>
 </section>;
}
