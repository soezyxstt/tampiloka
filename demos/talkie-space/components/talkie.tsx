"use client";
import { useEffect, useRef, useState, type RefObject } from 'react';
import Image from 'next/image';
import { AnimatePresence, animate, inView, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Search, X, MapPin, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
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
function Photo({name,alt,className='',priority=false,reveal=false}:{name:string;alt:string;className?:string;priority?:boolean;reveal?:boolean}){return <div data-scroll-reveal={reveal?'':undefined} className={`photo ${className}`}><Image src={`/images/${name}.webp`} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" preload={priority}/></div>}

function useScrollReveal(root: RefObject<HTMLElement | null>) {
 useEffect(()=>{
   const container=root.current;
   if(!container)return;
   const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
   const targets=new Set<HTMLElement>();
   const stops=new Map<HTMLElement,()=>void>();
   const animations=new Map<HTMLElement,ReturnType<typeof animate>>();
   const show=(target:HTMLElement)=>{
     stops.get(target)?.();
     animations.get(target)?.stop();
     target.style.opacity='1';target.style.transform='none';
     target.dataset.scrollRevealed='true';
   };
   const register=(target:HTMLElement)=>{
     if(targets.has(target))return;
     targets.add(target);
     const rect=target.getBoundingClientRect();
     // SSR/no-JS and the first visible viewport remain visible.
     if(preference.matches||rect.top<innerHeight&&rect.bottom>0||!('IntersectionObserver' in window)){show(target);return;}
     target.style.opacity='0';target.style.transform='translateY(32px)';
     stops.set(target,inView(target,()=>{
       if(preference.matches){show(target);return;}
       stops.get(target)?.();
       target.dataset.scrollRevealed='true';
       const controls=animate(target,{opacity:[0,1],y:[32,0]},{duration:.75,ease:[.19,1,.22,1],delay:Number(target.dataset.revealOrder||0)*.08});
       animations.set(target,controls);
     },{amount:.12}));
   };
   container.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(register);
   const onPreference=()=>{if(preference.matches)targets.forEach(show)};
   const onFocus=(event:FocusEvent)=>{const target=(event.target as HTMLElement).closest<HTMLElement>('[data-scroll-reveal]');if(target)show(target)};
   preference.addEventListener('change',onPreference);
   container.addEventListener('focusin',onFocus);
   return ()=>{stops.forEach(stop=>stop());animations.forEach(animation=>animation.stop());targets.forEach(show);preference.removeEventListener('change',onPreference);container.removeEventListener('focusin',onFocus)};
 },[root]);
}

export default function Talkie(){
 const reduced=useReducedMotion();
 const main=useRef<HTMLElement>(null);
 useScrollReveal(main);
 const [category,setCategory]=useState('Kopi');
 const [query,setQuery]=useState('');
 const [page,setPage]=useState(0);
 const pageSize=8;
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
 const pagedItems=filtered.slice(page*pageSize,(page+1)*pageSize);
 const pageCount=Math.ceil(filtered.length/pageSize);
 const visibleCategories=searching?categories.filter(c=>pagedItems.some(p=>p.category===c)):[category];
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
   setCategory(value);setQuery('');setPage(0);
   requestAnimationFrame(()=>{if(panelStart.current&&panelStart.current.getBoundingClientRect().top<0)panelStart.current.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'})});
 }
 function closeSearch(){setSearchOpen(false);setQuery('');setPage(0);requestAnimationFrame(()=>toggle.current?.focus())}
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
 <main id="main" ref={main}>
 <section className="hero-shell" aria-labelledby="hero-title"><div className="wrap coffee-workbench">
 <div className="masthead"><h1 data-scroll-reveal id="hero-title">Coffee &<br/>Roastery.</h1><div data-scroll-reveal data-reveal-order="1" className="masthead-info"><p>Jl. Suherman 52, Garut<br/>Setiap hari, 08.00–22.00</p><a href="#menu" className="menu-link">Lihat menu <ArrowDown size={20}/></a></div></div>
 <div className="coffee-stage"><div data-scroll-reveal className="stage-main"><Photo name="hero-coffee" alt="Latte dan kemasan kopi Talkie Space" priority/></div><div className="stage-rail"><a href="#space" data-scroll-reveal data-reveal-order="1" className="stage-window"><Photo name="brewing" alt="Barista Talkie Space menyeduh filter coffee"/><span>Di balik bar <ArrowDown size={18}/></span></a><a href="#breakfast" data-scroll-reveal data-reveal-order="2" className="stage-window"><Photo name="breakfast" alt="Pilihan sarapan pagi Talkie Space"/><span>Sarapan pagi <ArrowDown size={18}/></span></a></div></div>
 <section className="breakfast" id="breakfast" aria-labelledby="breakfast-title"><h2 data-scroll-reveal id="breakfast-title">SAPA<br/><span>Sarapan Pagi</span></h2><p data-scroll-reveal data-reveal-order="1">Setiap hari<br/>08.00–11.00 WIB</p><div data-scroll-reveal data-reveal-order="2"><strong>Mulai Rp15.000</strong><a href="#menu" onClick={()=>chooseCategory('Sarapan')} className="text-link">Pilih sarapan <ArrowDown size={18}/></a></div></section>
 </div></section>
 <section id="menu" className="catalogue section" aria-labelledby="menu-title"><div className="wrap">
   <div className="section-top"><h2 data-scroll-reveal id="menu-title">Menu</h2><p data-scroll-reveal data-reveal-order="1">Harga termasuk PPN.<br/>Ketersediaan dapat berubah.</p></div>
   <Tabs value={active} orientation={desktop?'vertical':'horizontal'} onValueChange={value=>{if(typeof value==='string'&&value!=='__search__')chooseCategory(value)}} className="menu-explorer">
     <div className="category-navigation">
       <div className={`catalogue-search ${searchOpen?'search-open':''}`}>
         <AnimatePresence initial={false}>{(desktop||searchOpen)&&<motion.div className="search-field" id="menu-search" initial={{opacity:0,width:0}} animate={{opacity:1,width:'100%'}} exit={{opacity:0,width:0}} transition={{duration:reduced?0:.2}}>
           <Search size={18}/><Input ref={input} aria-label="Cari di semua menu" placeholder="Cari semua menu…" value={query} onChange={e=>{setQuery(e.target.value);setPage(0)}} onKeyDown={e=>{if(e.key==='Escape')closeSearch()}}/>
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
       <div className="result-meta" role="status"><span>{searching?`${filtered.length} hasil dari seluruh menu`:`${category} · ${filtered.length} pilihan`}</span>{searching&&<Button variant="link" onClick={()=>{setQuery('');setPage(0)}}>Kembali ke {category}</Button>}</div>
       {categories.map(c=><TabsContent value={c} key={c}><motion.div key={c} className="category-panel" initial={false} animate={{opacity:1,y:reduced?0:[10,0]}} transition={{duration:reduced?0:.3}}>
         <div className="group-title"><h3>{c}</h3>{c==='Sarapan'&&<span>08.00–11.00</span>}</div>
         {categoryPhotos[c]&&<Photo name={categoryPhotos[c].name} alt={categoryPhotos[c].alt} className="category-photo"/>}
         {menuRows(c===category?pagedItems:menu.filter(p=>p.category===c).slice(0,pageSize))}
       </motion.div></TabsContent>)}
       {searching&&<TabsContent value="__search__"><div className="search-results">
         {!filtered.length?<div className="empty"><h3>Belum menemukan menunya?</h3><p>Coba kata lain. Pencarian mencakup seluruh kategori.</p><Button variant="outline" onClick={()=>{setQuery('');setPage(0)}}>Reset pencarian</Button></div>:
           visibleCategories.map(c=><div className="search-result-group" key={c}><h3>{c}</h3>{menuRows(pagedItems.filter(p=>p.category===c))}</div>)}
       </div></TabsContent>}
     {pageCount>1&&<nav className="pagination" aria-label="Halaman menu"><Button variant="ghost" aria-label="Halaman menu sebelumnya" disabled={page===0} onClick={()=>{setPage(p=>p-1);panelStart.current?.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'})}}><ArrowLeft size={18}/></Button><span>{page+1} / {pageCount}</span><Button variant="ghost" aria-label="Halaman menu berikutnya" disabled={page>=pageCount-1} onClick={()=>{setPage(p=>p+1);panelStart.current?.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'})}}><ArrowRight size={18}/></Button></nav>}
     </div>
   </Tabs>
 </div></section>
 <section id="space" className="space-section wrap"><div className="space-title"><h2 data-scroll-reveal>Di balik bar.</h2><p data-scroll-reveal data-reveal-order="1">Kopi dari Talkie,<br/>diseduh di ruang kami.</p></div><div data-scroll-reveal data-reveal-order="1" className="process-view"><Photo name="brewing" alt="Proses penyeduhan filter coffee di bar Talkie Space"/></div><div data-scroll-reveal data-reveal-order="2" className="space-address"><h3>Talkie Space<br/>Garut</h3><div className="visit-row"><MapPin size={20}/><p>Jl. Suherman No. 52<br/>Tarogong Kidul, Garut<br/>Jawa Barat 44151</p></div><div className="visit-row"><Clock size={20}/><p>Setiap hari<br/>08.00–22.00 WIB</p></div><a href={WA} className="text-link"><WhatsApp/>Tanya & reservasi <ArrowUpRight size={18}/></a></div></section>
 <section className="visit wrap" id="visit" aria-labelledby="visit-title"><div className="visit-top"><h2 data-scroll-reveal id="visit-title">Kunjungi kami.</h2><a data-scroll-reveal data-reveal-order="1" href={MAP} className="text-link">Petunjuk arah <ArrowUpRight size={19}/></a></div><div className="place-preview"><Photo name="facade" reveal alt="Fasad Talkie Space di Jalan Suherman Garut"/><iframe className="venue-map" title="Lokasi Talkie Space di Jalan Suherman 52, Garut" src={MAP_EMBED} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></div></section>
 </main><footer className="wrap"><a href="#main" className="brand" aria-label="Kembali ke atas"><Image src="/images/logo.webp" alt="Talkie Space" width={180} height={28}/></a><span>Jl. Suherman 52, Garut</span><a href="https://www.instagram.com/talkie.space/">Instagram <ArrowUpRight size={16}/></a></footer></>
}



