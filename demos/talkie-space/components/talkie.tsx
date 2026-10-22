"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Search, X, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import menu from '@/data/menu.json';
const WA='https://wa.me/6282130445909';
const MAP='https://maps.app.goo.gl/jcd2Ga3y7v7wGnKm9';
const MAP_EMBED='https://www.google.com/maps?q=Talkie+Space+Jl.+Suherman+52+Garut&z=16&output=embed';
const categories=[...new Set(menu.map(p=>p.category))];
const categoryPhotos:Record<string,{name:string;alt:string}>={'Asian':{name:'asian',alt:'Pilihan hidangan ayam Talkie Space'},'Nasi goreng':{name:'fried-rice',alt:'Rangkaian nasi goreng Talkie Space'},'Rice bowl':{name:'ricebowl',alt:'Pilihan rice bowl Talkie Space'},'Mie':{name:'noodles',alt:'Pilihan mie kuah dan mie goreng Talkie Space'},'Pasta':{name:'pasta',alt:'Pilihan pasta Talkie Space'},'Camilan':{name:'snacks',alt:'Pilihan sharing snack Talkie Space'},'Toast':{name:'toast',alt:'Rangkaian toast Talkie Space'},'Kopi':{name:'coffee',alt:'Pilihan kopi black, white, dan brown Talkie Space'},'Mocktail black':{name:'mocktail-black',alt:'Mocktail kopi Talkie Space'},'Mocktail':{name:'mocktail',alt:'Pilihan mocktail Talkie Space'},'Matcha':{name:'matcha',alt:'Rangkaian minuman matcha Talkie Space'},'Frappe':{name:'frappe',alt:'Rangkaian frappe Talkie Space'},'Healthy':{name:'healthy',alt:'Rangkaian Green Organic, Honey Purple, Pine Berry'},'Teh & refreshment':{name:'tea',alt:'Rangkaian teh Talkie Space'}};
const currency=(n:number)=>new Intl.NumberFormat('id-ID').format(n);
function WhatsApp(){return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.6 6L.1 24l6.3-1.6a12 12 0 0 0 5.7 1.5H12c6.6 0 12-5.4 12-12a11.8 11.8 0 0 0-3.5-8.4ZM12 21.9a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.7-.3-.4A9.9 9.9 0 0 1 2 11.9 10 10 0 0 1 12.1 2a10 10 0 0 1 10 10c0 5.5-4.5 9.9-10 9.9Zm5.5-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.1-.1.2-.3.2-.6.1a8.1 8.1 0 0 1-4-3.5c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5H7.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.3 4.7 2 .9 2.8.9 3.8.8.6-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>}
function Photo({name,alt,className='',priority=false}:{name:string;alt:string;className?:string;priority?:boolean}){return <div className={`photo ${className}`}><Image src={`/images/${name}.webp`} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" preload={priority}/></div>}
export default function Talkie(){
 const reduced=useReducedMotion();
 const [category,setCategory]=useState('Kopi');
 const [query,setQuery]=useState('');
 const [searchOpen,setSearchOpen]=useState(false);
 const [desktop,setDesktop]=useState(false);
 const input=useRef<HTMLInputElement>(null);
 const toggle=useRef<HTMLButtonElement>(null);
 const panelStart=useRef<HTMLDivElement>(null);
 const tabList=useRef<HTMLDivElement>(null);
 const searching=Boolean(query.trim());
 const active=searching?'__search__':category;
 const filtered=menu.filter(p=>searching
   ? `${p.name} ${p.category} ${p.description}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id'))
   : p.category===category);
 const visibleCategories=searching?categories.filter(c=>filtered.some(p=>p.category===c)):[category];
 const reveal={initial:false as const,whileInView:{y:reduced?0:[14,0],opacity:1},viewport:{once:true,amount:.15},transition:{duration:reduced?0:.65}};
 useEffect(()=>{
   const screen=window.matchMedia('(min-width: 900px)');
   const update=()=>setDesktop(screen.matches);
   update();screen.addEventListener('change',update);
   return ()=>screen.removeEventListener('change',update);
 },[]);
 useEffect(()=>{if(searchOpen)input.current?.focus()},[searchOpen]);
 useEffect(()=>{
   if(desktop)return;
   const list=tabList.current;
   const selected=list?.querySelector<HTMLElement>('[data-active]');
   if(!list||!selected)return;
   const bounds=list.getBoundingClientRect();
   const item=selected.getBoundingClientRect();
   if(item.left<bounds.left+8)list.scrollLeft+=item.left-bounds.left-8;
   else if(item.right>bounds.right-8)list.scrollLeft+=item.right-bounds.right+8;
 },[active,desktop]);
 function chooseCategory(value:string){
   setCategory(value);setQuery('');
   requestAnimationFrame(()=>{if(panelStart.current&&panelStart.current.getBoundingClientRect().top<0)panelStart.current.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'})});
 }
 function closeSearch(){setSearchOpen(false);setQuery('');requestAnimationFrame(()=>toggle.current?.focus())}
 function menuRows(items:typeof menu){
   return <div className="menu-rows">{items.map(p=><article className={`menu-item ${p.imageId?'has-photo':''}`} key={p.id}>
     {p.imageId&&<Photo name={p.imageId} alt={p.name}/>}
     <div className="item-copy"><h4>{p.name}</h4>{p.description&&p.category!=='Sarapan'&&<p>{p.description}</p>}
       {p.variants.length>0&&<p className="variant-prices">{p.variants.map(v=>`${v.name} · Rp${currency(v.price.amount)}`).join(' / ')}</p>}
     </div>
     <span className="price">{p.variants.length?'':p.price.amount===null?'Tanya barista':`Rp${currency(p.price.amount)}`}</span>
   </article>)}</div>
 }
 return <>
 <a href="#main" className="skip-link">Langsung ke konten</a>
 <div className="concept">Konsep website independen oleh Tampiloka · Demo lokal</div>
 <header className="header wrap"><a href="#main" aria-label="Talkie Space beranda" className="brand"><Image src="/images/logo.webp" alt="talkie space" width={180} height={28} preload/></a><nav aria-label="Navigasi utama"><a href="#menu">Menu</a><a href="#space">Ruang</a><a href="#visit">Lokasi</a></nav><a href={WA} className="button header-cta" aria-label="Reservasi via WhatsApp"><WhatsApp/><span>Reservasi</span></a></header>
 <main id="main">
 <section className="hero-shell" aria-labelledby="hero-title"><svg className="contour-lines" aria-hidden="true" viewBox="0 0 1200 900" preserveAspectRatio="none"><path d="M-100 280C180-130 350 400 600 120S1150-80 1380 200M-100 340C180-70 350 460 600 180S1150-20 1380 260M-100 400C180-10 350 520 600 240S1150 40 1380 320M-100 460C180 50 350 580 600 300S1150 100 1380 380M-100 520C180 110 350 640 600 360S1150 160 1380 440"/></svg><div className="hero wrap">
 <motion.div className="hero-copy" initial={false} animate={{y:reduced?0:[24,0]}} transition={{duration:reduced?0:.8}}><h1 id="hero-title">Your<br/>alternative<br/><span>space.</span></h1><div className="hero-bottom"><p>Secangkir kopi.<br/>Ruang untuk cerita yang lain.</p><a href="#menu" className="menu-link">Lihat menu <ArrowDown size={20}/></a></div></motion.div>
 <motion.div className="hero-visual" initial={false} whileInView={{scale:reduced?1:[1.035,1]}} transition={{duration:reduced?0:1}}><Photo name="hero-coffee" alt="Latte dan kemasan kopi Talkie Space" priority/><div className="hero-caption"><span>Coffee & Roastery</span><span>Garut, Indonesia <ArrowUpRight size={16}/></span></div></motion.div>
 </div></section>
 <div className="intro-line wrap"><span>Jl. Suherman 52, Garut</span><span>Setiap hari, 08.00–22.00</span><a href={MAP}>Temukan kami <ArrowUpRight size={16}/></a></div>
 <section id="space" className="story wrap section"><motion.div {...reveal} className="story-photo"><Photo name="brewing" alt="Barista Talkie Space menyeduh filter coffee"/></motion.div><motion.div {...reveal} className="story-copy"><h2>Ambil jeda.<br/>Temukan ruangmu.</h2><p>Untuk bekerja, bertemu, atau menikmati waktu sendiri. Talkie Space membawa suasana Japanese–Scandinavian ke tengah Garut.</p><p>Mulai dari kopi racikan barista, lalu biarkan obrolan mengalir.</p><a href={WA} className="text-link">Rencanakan kunjungan <ArrowUpRight size={19}/></a></motion.div></section>
 <section className="breakfast" id="breakfast"><div className="wrap breakfast-inner"><motion.div {...reveal}><h2>Pagi yang<br/>lebih pelan.</h2><p>SAPA — Sarapan Pagi<br/>Setiap hari, 08.00–11.00</p><div className="breakfast-price">Mulai Rp15.000</div><a href="#menu" onClick={()=>chooseCategory('Sarapan')} className="button light">Pilih sarapan <ArrowDown size={18}/></a></motion.div><motion.div {...reveal}><Photo name="breakfast" alt="Pilihan menu SAPA: nasi, roti bakar, dan salad ayam Talkie Space"/></motion.div></div></section>
 <section id="menu" className="catalogue section" aria-labelledby="menu-title"><div className="wrap">
   <div className="section-top"><h2 id="menu-title">Pilih rasa.<br/>Nikmati jedanya.</h2><p>{menu.length} pilihan, satu kategori pada satu waktu.<br/>Harga termasuk PPN. Ketersediaan dapat berubah.</p></div>
   <Tabs value={active} orientation={desktop?'vertical':'horizontal'} onValueChange={value=>{if(typeof value==='string'&&value!=='__search__')chooseCategory(value)}} className="menu-explorer">
     <div className="category-navigation">
       <div className={`catalogue-search ${searchOpen?'search-open':''}`}>
         <AnimatePresence initial={false}>{(desktop||searchOpen)&&<motion.div className="search-field" id="menu-search" initial={{opacity:0,width:0}} animate={{opacity:1,width:'100%'}} exit={{opacity:0,width:0}} transition={{duration:reduced?0:.2}}>
           <Search size={18}/><Input ref={input} aria-label="Cari di semua menu" placeholder="Cari semua menu…" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Escape')closeSearch()}}/>
           {(searchOpen||searching)&&<Button variant="ghost" className="search-close" aria-label="Tutup pencarian" onClick={closeSearch}><X size={18}/></Button>}
         </motion.div>}</AnimatePresence>
         {!desktop&&!searchOpen&&<Button ref={toggle} variant="ghost" className="search-toggle" aria-label="Buka pencarian" aria-expanded={searchOpen} aria-controls="menu-search" onClick={()=>setSearchOpen(true)}><Search size={19}/><span>Cari menu</span></Button>}
       </div>
       <TabsList ref={tabList} variant="line" className="category-tabs" aria-label="Kategori menu" activateOnFocus>
         {searching&&<TabsTrigger value="__search__">Hasil pencarian <span>{filtered.length}</span></TabsTrigger>}
         {categories.map(c=><TabsTrigger key={c} value={c} onFocus={e=>{if(!desktop)e.currentTarget.scrollIntoView({block:'nearest',inline:'nearest'})}}>{c}<span>{menu.filter(p=>p.category===c).length}</span></TabsTrigger>)}
       </TabsList>
     </div>
     <div className="category-content" ref={panelStart}>
       <div className="result-meta" role="status"><span>{searching?`${filtered.length} hasil dari seluruh menu`:`${category} · ${filtered.length} pilihan`}</span>{searching&&<Button variant="link" onClick={()=>setQuery('')}>Kembali ke {category}</Button>}</div>
       {categories.map(c=><TabsContent value={c} key={c}><motion.div key={c} className="category-panel" initial={{opacity:1,y:reduced?0:10}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.3}}>
         <div className="group-title"><h3>{c}</h3>{c==='Sarapan'&&<span>08.00–11.00</span>}</div>
         {categoryPhotos[c]&&<Photo name={categoryPhotos[c].name} alt={categoryPhotos[c].alt} className="category-photo"/>}
         {menuRows(menu.filter(p=>p.category===c))}
       </motion.div></TabsContent>)}
       {searching&&<TabsContent value="__search__"><div className="search-results">
         {!filtered.length?<div className="empty"><h3>Belum menemukan menunya?</h3><p>Coba kata lain. Pencarian mencakup seluruh kategori.</p><Button variant="outline" onClick={()=>setQuery('')}>Reset pencarian</Button></div>:
           visibleCategories.map(c=><div className="search-result-group" key={c}><h3>{c}</h3>{menuRows(filtered.filter(p=>p.category===c))}</div>)}
       </div></TabsContent>}
     </div>
   </Tabs>
 </div></section>
 <section className="visit" id="visit"><div className="wrap visit-inner"><div className="place-preview"><Photo name="facade" alt="Fasad Talkie Space di Jalan Suherman Garut"/><iframe className="venue-map" title="Lokasi Talkie Space di Jalan Suherman 52, Garut" src={MAP_EMBED} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></div><div><h2>Sampai bertemu<br/>di Talkie.</h2><div className="visit-row"><MapPin size={20}/><p>Jl. Suherman No. 52<br/>Tarogong Kidul, Garut<br/>Jawa Barat 44151</p></div><div className="visit-row"><Clock size={20}/><p>Setiap hari<br/>08.00–22.00 WIB</p></div><div className="visit-actions"><a href={MAP} className="button light">Petunjuk arah <ArrowUpRight size={19}/></a><a href={WA} className="text-link"><WhatsApp/>Tanya & reservasi</a></div><p className="visit-help">Untuk pertemuan atau momen spesial, bicarakan kebutuhanmu dengan tim Talkie.</p></div></div></section>
 </main><footer className="wrap"><a href="#main" className="brand" aria-label="Kembali ke atas"><Image src="/images/logo.webp" alt="Talkie Space" width={180} height={28}/></a><span>Coffee, food, and a little space.</span><a href="https://www.instagram.com/talkie.space/">Instagram <ArrowUpRight size={16}/></a></footer></>
}



