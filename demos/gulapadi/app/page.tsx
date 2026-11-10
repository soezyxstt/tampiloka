"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useAnimationControls, useReducedMotion } from "motion/react";
import { Clock3, MapPin, Search, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import menu from "@/data/menu.json";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { defaultMenuCategory, paginateMenu } from "@/lib/menu-context";

const WA = "https://wa.me/6281111113081";
const MAP = "https://www.google.com/maps?cid=12996643708110630290";
const MAP_EMBED = "https://www.google.com/maps?q=Gulapadi+Garut&z=16&output=embed";
const money = (n: number) => "Rp" + new Intl.NumberFormat("id-ID").format(n);
const categories = ["Semua Menu", "Menu Baru", "Menu Spesial", "Ayam & Cumi", "Sapi & Nasi", "Mie & Tambahan", "Gorengan & Roti", "Minuman Segar", "Kopi, Teh & Susu", "Donat", "Sarapan"];
const sortedMenu = [...menu].sort((a,b) => categories.indexOf(a.category)-categories.indexOf(b.category));
const donuts = menu.filter(i=>i.category==="Donat");
const packages = [
  {name:"Package A",title:"Pilihan ikan",price:80000,contents:"Nasi, 1 lauk ikan, 1 mie, 1 gorengan, 1 sup, 1 dessert & minuman."},
  {name:"Package B",title:"Pilihan ayam",price:99000,contents:"Nasi, 1 lauk ayam, 1 mie, 1 gorengan, 1 sup, 1 dessert & minuman."},
  {name:"Package A",title:"Ayam & donat",price:125000,contents:"Nasi, 1 lauk ayam, 1 mie, 1 gorengan, 1 sup, 1 dessert, 1 donat & minuman."},
  {name:"Package B",title:"Ayam, sapi & donat",price:150000,contents:"Nasi, 1 lauk ayam, 1 lauk sapi, 1 mie / sayur, 1 sup, 1 gorengan, 1 donat, 2 dessert & minuman."},
];
const buffetChoices = [
  ["Lauk ayam", "Ayam Balado · Ayam Goreng Cabe Hijau · Ayam Kuluyuk · Ayam Mercon · Ayam Sauce Mentega · Ayam Asam Manis · Chicken Teriyaki · Ayam Popcorn Sambal Pedas · Ayam Rendang · Ayam Suwir · Bistik Ayam · Sate Ayam · Usus Kulit Mercon"],
  ["Lauk sapi & ikan", "Bola Bola Sapi · Sapi Lada Hitam · Beef Teriyaki · Pindang Ikan Mas · Pindang Suwir · Kakap Asam Manis"],
  ["Mie & sayur", "Mie Goreng · Bihun Goreng · Kailan Sauce Tiram · Mix Vegetables Oriental · Sambal Goreng Kentang · Sayur Pecel · Tumis Buncis Jagung · Tumis Pokchoy · Tumis Sayuran"],
  ["Gorengan & sup", "Bakwan Sayur · Lumpia Goreng Sayur · Perkedel Jagung · Perkedel Kentang · Tahu Isi · Tempe Mendoan. Sup: Sayur Asem · Sop Baso Mutiara · Sop Jamur Putih · Sop Macaroni · Sop Sosis · Soto Ayam."],
  ["Dessert & pilihan stall", "Semangka, melon, nanas, pepaya slice · Pudding Plain · Es Kul Kul Pisang / Strawberry. Stall A: Kue Ape, Baso Tahu, Batagor, Ice Cream Vanilla, Kebab Turki, Salad Buah. Stall B: Sate Kambing, Udang Tempura, Zuppa Soup, Mie Kocok. Side: air mineral 150 ml. Tanyakan biaya dan ketersediaan stall secara terpisah."],
];

function WhatsApp() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 1.8 17.8L0 24l6.4-1.7A12 12 0 0 0 24 11.9c0-3.2-1.2-6.2-3.5-8.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4A9.9 9.9 0 1 1 12 21.8Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-3.9-3.4c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.1.2 2.2 3.5 5.4 4.8 2 .9 2.8.9 3.8.7.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z"/></svg>;
}
function Chat({ children = "Reservasi via WhatsApp", className="" }: {children?:React.ReactNode;className?:string}) {
  return <a className={`action ${className}`} href={WA} target="_blank" rel="noopener noreferrer"><WhatsApp/>{children}</a>;
}
// Match Tampiloka's scroll timing without hiding server-rendered or first-viewport content.
function ScrollReveal({children,className="",delay=0,as="div"}:{children:React.ReactNode;className?:string;delay?:number;as?:"div"|"figure"|"h1"}) {
  const element=useRef<HTMLElement|null>(null);
  const revealed=useRef(false);
  const controls=useAnimationControls();
  const reducedMotion=useReducedMotion();
  const Tag=as==="figure"?motion.figure:as==="h1"?motion.h1:motion.div;
  useEffect(()=>{
    const target=element.current;
    if(!target)return;
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer:IntersectionObserver|null=null;
    const show=()=>{revealed.current=true;observer?.disconnect();controls.stop();controls.set({opacity:1,y:0});};
    const onPreferenceChange=(event:MediaQueryListEvent)=>{if(event.matches)show();};
    preference.addEventListener("change",onPreferenceChange);
    const cleanup=()=>{preference.removeEventListener("change",onPreferenceChange);observer?.disconnect();controls.stop();};
    const rect=target.getBoundingClientRect();
    if(reducedMotion || preference.matches || revealed.current || (rect.bottom>0&&rect.top<window.innerHeight) || !("IntersectionObserver" in window)) {
      show();
      return cleanup;
    }
    controls.set({opacity:0,y:32});
    observer=new IntersectionObserver(entries=>{
      if(preference.matches){show();return;}
      if(!revealed.current&&entries.some(entry=>entry.isIntersecting)) {
        revealed.current=true;
        void controls.start({opacity:1,y:0,transition:{duration:.75,ease:[.19,1,.22,1],delay:delay*.08}});
        observer?.disconnect();
      }
    },{threshold:.12});
    observer.observe(target);
    return cleanup;
  },[controls,delay,reducedMotion]);
  return <Tag ref={(node:HTMLElement|null)=>{element.current=node;}} className={`scroll-reveal ${className}`} data-scroll-reveal="" data-reveal-delay={delay*80} initial={false} animate={controls} onFocusCapture={()=>{revealed.current=true;controls.stop();controls.set({opacity:1,y:0});}}>{children}</Tag>;
}
export default function Home() {
  const [category,setCategory]=useState("Semua Menu");
  const [donutIndex,setDonutIndex]=useState(9);
  const [query,setQuery]=useState("");
  const [page,setPage]=useState(1);
  const [pageSize,setPageSize]=useState(12);
  useEffect(()=>{
    const screen=window.matchMedia("(max-width: 767px)");
    const update=()=>{setPageSize(screen.matches?6:12);setPage(1);};
    const frame=requestAnimationFrame(update);
    screen.addEventListener("change",update);
    return()=>{cancelAnimationFrame(frame);screen.removeEventListener("change",update);};
  },[]);
  const [searchOpen,setSearchOpen]=useState(false);
  const interacted=useRef(false);
  const menuToolbar=useRef<HTMLDivElement>(null);
  const input=useRef<HTMLInputElement>(null);
  const searchButton=useRef<HTMLButtonElement>(null);
  const restoreSearchFocus=useRef(false);
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>{if(!interacted.current)setCategory(defaultMenuCategory(new Date()));});
    return ()=>cancelAnimationFrame(frame);
  },[]);
  useEffect(()=>{
    if(searchOpen) input.current?.focus();
    else if(restoreSearchFocus.current){searchButton.current?.focus();restoreSearchFocus.current=false;}
  },[searchOpen]);
  const results=sortedMenu.filter(i=>(category==="Semua Menu"||i.category===category)&&`${i.name} ${i.category} ${i.description??""}`.toLocaleLowerCase("id").includes(query.trim().toLocaleLowerCase("id")));
  const pagination=paginateMenu(results,page,pageSize);
  const scrollToMenu=()=>requestAnimationFrame(()=>menuToolbar.current?.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
  const choose=(value:string)=>{interacted.current=true;setCategory(value);setQuery("");setPage(1);scrollToMenu();};
  const closeSearch=()=>{interacted.current=true;restoreSearchFocus.current=searchOpen;setSearchOpen(false);setQuery("");setPage(1);};
  const changePage=(value:number)=>{interacted.current=true;setPage(value);scrollToMenu();};
  return <MotionConfig reducedMotion="user">
    <div className="concept">Konsep website independen untuk Gulapadi Garut.</div>
    <a className="skip" href="#menu">Langsung ke menu</a>
    <header className="site-header wrap">
      <a href="#beranda" aria-label="Gulapadi Garut, beranda" className="brand"><Image src="/images/logo.webp" alt="Gulapadi Warung Makan" width={136} height={90} priority/></a>
      <nav aria-label="Navigasi utama"><a href="#menu">Menu</a><a href="#buffet">Buffet</a><a href="#kunjungi">Kunjungi</a></nav>
      <Chat className="header-chat">Tanya menu & reservasi</Chat>
    </header>
    <main>
      <section id="beranda" className="market-opening">
        <div className="food-portals wrap"><ScrollReveal as="figure"><div className="portal-photo"><Image src="/images/pepes.webp" alt="Pepes Ayam Goreng dengan nasi timbel, lalaban dan sambal" width={1100} height={614} priority sizes="(max-width: 767px) 100vw, 65vw"/></div><figcaption><a href="#menu" onClick={()=>choose("Menu Baru")}>Pepes Ayam Goreng</a><strong>Rp39.000</strong></figcaption></ScrollReveal><ScrollReveal as="figure" delay={1}><div className="portal-photo"><Image src="/images/ayam-asap.webp" alt="Nasi Goreng Ayam Asap Gulapadi" width={900} height={650} priority sizes="(max-width: 767px) 100vw, 35vw"/></div><figcaption><a href="#menu" onClick={()=>choose("Menu Spesial")}>Nasi Goreng Ayam Asap</a><strong>Rp32.000</strong></figcaption></ScrollReveal></div>
        <div className="wrap market-title"><ScrollReveal as="h1"><span>Warung makan</span><br/><em>Nusantara.</em></ScrollReveal><ScrollReveal className="opening-info" delay={1}><p>Gulapadi Garut<br/>Jl. Bank, Paminggir</p><p>Setiap hari 06.00–23.00<br/>Sarapan 06.00–10.30</p><a className="action opening-cta" href="#menu">Lihat menu</a></ScrollReveal></div>
      </section>
      <section className="donat wrap" id="donat">
        <ScrollReveal className="donut-intro"><h2>20 pilihan<br/><em>donat.</em></h2><a className="text-link" href="#menu" onClick={()=>choose("Donat")}>Semua pilihan donat</a></ScrollReveal>
        <ScrollReveal className="donut-display" delay={1}><AnimatePresence mode="wait" initial={false}><motion.div key={donutIndex} className="donut-main" initial={{opacity:.5}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}><Image src={`/images/donat-${donutIndex}.webp`} alt={`Donat ${donuts[donutIndex].name}`} width={520} height={514} sizes="(max-width: 767px) 80vw, 35vw"/><h3>{donuts[donutIndex].name}</h3><strong>{money(donuts[donutIndex].amount)}</strong></motion.div></AnimatePresence></ScrollReveal>
        <ScrollReveal className="donut-choices" delay={2}>{[0,1,9,5,12,16].map(index=><Button variant="ghost" key={index} aria-pressed={donutIndex===index} onClick={()=>setDonutIndex(index)}><Image src={`/images/donat-${index}.webp`} alt="" width={85} height={84}/><span>{donuts[index].name}</span></Button>)}</ScrollReveal>
      </section>
      <section id="buffet" className="buffet wrap">
        <div className="buffet-intro"><ScrollReveal><h2>Paket <em>buffet.</em></h2><p>Empat pilihan dengan lauk ikan, ayam, sapi, dan donat.</p><Chat>Tanyakan paket buffet</Chat></ScrollReveal><ScrollReveal className="buffet-media" delay={1}><Image src="/images/buffet.webp" alt="Pilihan sajian buffet pada materi resmi Gulapadi" width={1024} height={432} sizes="(max-width: 767px) 90vw, 50vw"/></ScrollReveal></div>
        <p className="table-scroll-hint">Geser untuk membandingkan 4 paket <ArrowRight size={16}/></p>
        <div className="package-comparison" role="region" aria-label="Perbandingan paket buffet" tabIndex={0}>
          <Table><TableCaption>Empat pilihan buffet, dibedakan dari isi sajiannya.</TableCaption>
            <TableHeader><TableRow><TableHead scope="col">Isi paket</TableHead>{packages.map(p=><TableHead key={p.price} scope="col"><span>{p.name}</span><h3>{p.title}</h3><strong>{money(p.price)}</strong></TableHead>)}</TableRow></TableHeader>
            <TableBody>
              {[
                ["Lauk utama","1 lauk ikan","1 lauk ayam","1 lauk ayam","1 lauk ayam + 1 lauk sapi"],
                ["Nasi","Termasuk","Termasuk","Termasuk","Termasuk"],
                ["Mie / sayur","1 mie","1 mie","1 mie","1 mie / sayur"],
                ["Gorengan & sup","Masing-masing 1","Masing-masing 1","Masing-masing 1","Masing-masing 1"],
                ["Dessert","1 pilihan","1 pilihan","1 pilihan","2 pilihan"],
                ["Donat","Tidak termasuk","Tidak termasuk","1 pilihan","1 pilihan"],
                ["Minuman","Termasuk","Termasuk","Termasuk","Termasuk"],
              ].map(([label,...values])=><TableRow key={label}><TableHead scope="row">{label}</TableHead>{values.map((value,index)=><TableCell key={index}>{value}</TableCell>)}</TableRow>)}
            </TableBody>
          </Table>
        </div>
        <p className="package-note">Tanyakan satuan harga, minimum peserta, pajak, pilihan menu, dan ketersediaan paket di cabang Garut sebelum reservasi.</p>
        <Accordion className="buffet-options" multiple={false}>{buffetChoices.map(([title,detail])=><AccordionItem key={title}><AccordionTrigger>{title}</AccordionTrigger><AccordionContent><p>{detail}</p></AccordionContent></AccordionItem>)}</Accordion>
      </section>
      <section id="menu" className="catalogue"><div className="wrap">
        <ScrollReveal className="section-heading"><h2>Menu Gulapadi.</h2><p>Sarapan 06.00–10.30<br/>Menu reguler 10.30–23.00</p></ScrollReveal>
        <div ref={menuToolbar} className={`toolbar ${searchOpen?'search-open':''}`}>
          <div className="category-control"><Select value={category} onValueChange={(v)=>choose(v??"Semua Menu")}><SelectTrigger aria-label="Kategori menu"><SelectValue>{category}</SelectValue></SelectTrigger><SelectContent alignItemWithTrigger={false}>{categories.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
          <div className="search-field"><Search size={19}/><Input id="menu-search" ref={input} aria-label="Cari menu" placeholder="Cari nasi, kopi, donat…" value={query} onChange={e=>{interacted.current=true;if(!query)scrollToMenu();setQuery(e.target.value);setCategory("Semua Menu");setPage(1);}} onKeyDown={e=>{if(e.key==="Escape")closeSearch();}}/>{(query||searchOpen)&&<Button className="clear-search" variant="ghost" size="icon" aria-label="Tutup pencarian" onClick={closeSearch}><X/></Button>}</div>
          <Button ref={searchButton} className="mobile-search" variant="outline" size="icon" aria-label="Buka pencarian menu" aria-expanded={searchOpen} aria-controls="menu-search" onClick={()=>{interacted.current=true;setSearchOpen(true);}}><Search/></Button>
        </div>
        <p className="menu-context-note">{category==="Sarapan"?"Menu sarapan tersedia pukul 06.00–10.30 WIB.":"Sarapan 06.00–10.30 · Menu reguler 10.30–23.00 WIB."}</p>
        <div className="catalogue-meta"><p role="status">{results.length} pilihan menu{category!=="Semua Menu"?` · ${category}`:""}</p><p>Harga belum termasuk pajak. Ketersediaan dapat berubah.</p></div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={category+query+pagination.page} className="menu-grid" initial={{opacity:1,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.16}}>
          {pagination.items.map(item=><article className={`menu-item ${item.image?'with-photo':''}`} key={item.id}>
            {item.image&&<div className="menu-photo"><Image src={`/images/${item.image}.webp`} alt={item.name} fill sizes="100px"/></div>}
            <div><h3>{item.name}</h3>{item.description&&<p>{item.description}</p>}<strong>{money(item.amount)}</strong></div>
          </article>)}
        </motion.div></AnimatePresence>
        {results.length===0&&<div className="empty"><p>Menu “{query}” belum ditemukan.</p><Button variant="outline" onClick={()=>{choose("Semua Menu");setSearchOpen(false);}}>Tampilkan semua menu</Button></div>}
        {results.length>0&&<div className="menu-pager">
          <p role="status">{pagination.first}–{pagination.last} dari {results.length} menu</p>
          {pagination.pages>1&&<Pagination aria-label="Halaman katalog menu" className="menu-pagination"><PaginationContent>
            <PaginationItem><Button variant="outline" aria-label="Halaman menu sebelumnya" disabled={pagination.page===1} onClick={()=>changePage(pagination.page-1)}><ArrowLeft size={18}/><span className="page-label">Sebelumnya</span></Button></PaginationItem>
            <PaginationItem><span className="page-status" aria-current="page" aria-label={`Halaman ${pagination.page} dari ${pagination.pages}`}>{pagination.page} / {pagination.pages}</span></PaginationItem>
            <PaginationItem><Button variant="outline" aria-label="Halaman menu berikutnya" disabled={pagination.page===pagination.pages} onClick={()=>changePage(pagination.page+1)}><span className="page-label">Berikutnya</span><ArrowRight size={18}/></Button></PaginationItem>
          </PaginationContent></Pagination>}
        </div>}

      </div></section>
      <section id="kunjungi" className="visit"><div className="wrap visit-grid"><ScrollReveal><h2>Gulapadi<br/><em>Garut.</em></h2><Chat/></ScrollReveal><div className="visit-details"><ScrollReveal delay={1}><MapPin/><div><h3>Gulapadi Garut</h3><p>Jl. Bank, Paminggir, Kec. Garut Kota,<br/>Kabupaten Garut, Jawa Barat 44112.</p><a href={MAP} className="text-link" target="_blank" rel="noopener noreferrer">Buka Google Maps</a></div></ScrollReveal><ScrollReveal delay={2}><Clock3/><div><h3>Setiap hari, 06.00–23.00</h3><p>Sarapan 06.00–10.30<br/>Menu reguler 10.30–23.00</p></div></ScrollReveal></div></div><figure className="visit-map wrap"><div className="map-frame"><iframe src={MAP_EMBED} title="Lokasi Gulapadi Garut, Jalan Bank" width="1200" height="380" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div><figcaption><span>Gulapadi Garut · Jalan Bank, Paminggir</span><a href={MAP} target="_blank" rel="noopener noreferrer">Buka petunjuk arah</a></figcaption></figure></section>
    </main>
    <footer className="wrap"><span>Gulapadi · Warung Makan Nusantara</span><a href="https://www.instagram.com/gulapadi/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="#beranda">Kembali ke atas ↑</a></footer>
  </MotionConfig>;
}
