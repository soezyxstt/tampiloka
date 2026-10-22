"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowDown, ArrowUpRight, Clock3, MapPin, Search, X, ArrowLeft, ArrowRight } from "lucide-react";
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
function Reveal({children,className=""}:{children:React.ReactNode;className?:string}) {
  return <motion.div className={className} initial={false} whileInView={{y:[15,0],opacity:[.75,1]}} transition={{duration:.55}} viewport={{once:true,amount:.1}}>{children}</motion.div>;
}
export default function Home() {
  const [category,setCategory]=useState("Semua Menu");
  const [query,setQuery]=useState("");
  const [page,setPage]=useState(1);
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
  const results=sortedMenu.filter(i=>(category==="Semua Menu"||i.category===category)&&i.name.toLocaleLowerCase("id").includes(query.trim().toLocaleLowerCase("id")));
  const pagination=paginateMenu(results,page);
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
      <Chat className="header-chat">Hubungi kami</Chat>
    </header>
    <main>
      <section id="beranda" className="hero wrap">
        <div className="hero-copy">
          <motion.h1 initial={false} animate={{y:[12,0],opacity:[.8,1]}} transition={{duration:.6}}>Mampir pagi.<br/><span>Betah sampai<br/>malam.</span></motion.h1>
          <p>Sepiring masakan Nusantara, obrolan hangat, dan yang manis untuk dibawa pulang.</p>
          <div className="hero-actions"><Chat/><a className="text-link" href="#menu" onClick={()=>{interacted.current=true;}}>Lihat menu <ArrowDown size={18}/></a></div>
          <div className="hero-address"><MapPin size={18}/><a href={MAP} target="_blank" rel="noopener noreferrer">Jl. Bank, Garut Kota <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="hero-collage"><motion.figure className="hero-visual" initial={false} animate={{rotate:0}} whileHover={{rotate:-1}} transition={{duration:.35}}>
          <Image src="/images/pepes.webp" alt="Pepes Ayam Goreng Gulapadi dengan nasi timbel, lalaban dan sambal" width={1100} height={614} priority sizes="(max-width: 767px) 92vw, 48vw"/>
          <figcaption><span>Pepes Ayam Goreng</span><strong>Rp39.000</strong></figcaption>
        </motion.figure><div className="hero-pair"><figure><Image src="/images/donat-9.webp" alt="Donat Oreo Gulapadi" width={260} height={257} priority/><figcaption>Donat Oreo <strong>Rp6.500</strong></figcaption></figure><figure><Image src="/images/durian.webp" alt="Es Campur Durian Gulapadi" width={900} height={748} priority/><figcaption>Es Campur Durian <strong>Rp30.000</strong></figcaption></figure></div></div>
      </section>
      <section className="hours" aria-label="Jam kunjungan"><div className="wrap hours-inner"><p><Clock3 size={22}/><span>Setiap hari <strong>06.00–23.00</strong></span></p><div><span>Sarapan</span><strong>06.00–10.30</strong></div><div><span>Menu reguler</span><strong>10.30–23.00</strong></div><a href="#kunjungi">Mampir ke Garut <ArrowDown size={18}/></a></div></section>
      <section className="donat wrap" id="donat">
        <Reveal className="section-heading"><div><h2>Sisakan ruang<br/>untuk yang manis.</h2><p>Donat untuk teman ngopi. Atau buah tangan<br className="desktop-break"/> buat yang menunggu di rumah.</p></div><a className="text-link" href="#menu" onClick={()=>choose("Donat")}>Lihat 20 pilihan donat <ArrowDown size={18}/></a></Reveal>
        <div className="donut-grid">{[0,1,5,9,12,16].map((index)=><motion.article key={index} whileHover={{y:-7}} transition={{duration:.25}}><Image src={`/images/donat-${index}.webp`} alt={`Donat ${donuts[index].name} Gulapadi`} width={260} height={257} sizes="(max-width: 600px) 42vw, 16vw"/><div><h3>{donuts[index].name}</h3><span>{money(donuts[index].amount)}</span></div></motion.article>)}</div>
      </section>
      <section id="menu" className="catalogue"><div className="wrap">
        <div className="section-heading"><h2>Mau makan apa,<br/>Wargi?</h2><p>Sarapan hangat, makan siang, atau donat.<br/>Ada waktunya untuk setiap selera.</p></div>
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
      <section id="buffet" className="buffet wrap">
        <div className="buffet-intro"><div><h2>Meja panjang.<br/>Cerita lebih banyak.</h2><p>Dari lauk ikan sampai ayam dan sapi. Bandingkan isi sajiannya, lalu ceritakan rencana arisan, reuni, atau kumpul komunitasmu kepada tim Gulapadi.</p><Chat>Tanyakan paket buffet</Chat></div><Image src="/images/buffet.webp" alt="Pilihan sajian buffet pada materi resmi Gulapadi" width={1024} height={432} sizes="(max-width: 767px) 90vw, 50vw"/></div>
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
                ["Donat","—","—","1 pilihan","1 pilihan"],
                ["Minuman","Termasuk","Termasuk","Termasuk","Termasuk"],
              ].map(([label,...values])=><TableRow key={label}><TableHead scope="row">{label}</TableHead>{values.map((value,index)=><TableCell key={index}>{value}</TableCell>)}</TableRow>)}
            </TableBody>
          </Table>
        </div>
        <p className="package-note">Tanyakan satuan harga, minimum peserta, pajak, pilihan menu, dan ketersediaan paket di cabang Garut sebelum reservasi.</p>
        <Accordion className="buffet-options" multiple={false}>{buffetChoices.map(([title,detail])=><AccordionItem key={title}><AccordionTrigger>{title}</AccordionTrigger><AccordionContent><p>{detail}</p></AccordionContent></AccordionItem>)}</Accordion>
      </section>
      <section id="kunjungi" className="visit"><div className="wrap visit-grid"><div><h2>Sampai ketemu<br/>di Gulapadi.</h2><p>Untuk sarapan, makan dan minum,<br/>nongkrong, atau sekadar mampir.</p><Chat/></div><div className="visit-details"><div><MapPin/><div><h3>Gulapadi Garut</h3><p>Jl. Bank, Paminggir, Kec. Garut Kota,<br/>Kabupaten Garut, Jawa Barat 44112.</p><a href={MAP} className="text-link" target="_blank" rel="noopener noreferrer">Buka Google Maps <ArrowUpRight size={18}/></a></div></div><div><Clock3/><div><h3>Setiap hari, 06.00–23.00</h3><p>Sarapan 06.00–10.30<br/>Menu reguler 10.30–23.00</p></div></div></div></div><figure className="visit-map wrap"><div className="map-frame"><iframe src={MAP_EMBED} title="Lokasi Gulapadi Garut, Jalan Bank" width="1200" height="380" loading="eager" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div><figcaption><span>Gulapadi Garut · Jalan Bank, Paminggir</span><a href={MAP} target="_blank" rel="noopener noreferrer">Buka petunjuk arah <ArrowUpRight size={16}/></a></figcaption></figure></section>
    </main>
    <footer className="wrap"><span>Gulapadi · Warung Makan Nusantara</span><a href="https://www.instagram.com/gulapadi/" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={16}/></a><a href="#beranda">Kembali ke atas ↑</a></footer>
  </MotionConfig>;
}
