'use client';
import Image from 'next/image';
import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {AnimatePresence,motion,MotionConfig,useReducedMotion} from 'motion/react';
import {ArrowDown,ArrowUpRight,ArrowLeft,ArrowRight,MapPin,Clock,Search,X,Camera} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import menu from '@/data/menu.json';
const WA='https://wa.me/62895412055152';
const MAP_QUERY='Bumi Upi Jl Cimanuk 312 Garut';
const MAP=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const MAP_EMBED=`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
const rupiah=(n:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const categories=['Semua menu',...new Set(menu.map(i=>i.category))];
const memories=[
 {src:'/images/place-07.webp',alt:'Bilik photobooth Bumi Upi dengan tirai merah dan panel kayu',caption:'Bilik photobooth.'},
 {src:'/images/place-11.webp',alt:'Rak perabot lawas dan sudut makan di Bumi Upi',caption:'Sudut perabot lawas.'},
 {src:'/images/place-02.webp',alt:'Halaman hijau dan tempat duduk luar Bumi Upi',caption:'Halaman Bumi Upi.'},
];
const PAGE_SIZE=8;
const subscribeToMount=()=>()=>{};
function useAnimations(){const mounted=useSyncExternalStore(subscribeToMount,()=>true,()=>false);const reduced=useReducedMotion();return mounted&&reduced===false;}
function WhatsApp(){return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.15 1.59 5.96L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01C18.6 23.8 24 18.47 24 11.91c0-3.18-1.24-6.17-3.48-8.43ZM12.05 21.8a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.73.98 1-3.64-.24-.38a9.86 9.86 0 0 1-1.52-5.29c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.98 2.9a9.81 9.81 0 0 1 2.89 7c0 5.45-4.44 9.89-9.9 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.67.15-.2.3-.77.97-.94 1.16-.18.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.09 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.57-.35Z"/></svg>}
function Chat({children='Tanya & reservasi',className=''}:{children?:React.ReactNode,className?:string}) {return <Button nativeButton={false} render={<a href={WA} target="_blank" rel="noreferrer"/>} className={`chat ${className}`}><WhatsApp/>{children}</Button>}
export default function Home(){
 const [category,setCategory]=useState('Semua menu');
 const [query,setQuery]=useState('');
 const [expanded,setExpanded]=useState(false);
 const [page,setPage]=useState(0);
 const [memory,setMemory]=useState(0);
 const input=useRef<HTMLInputElement>(null);
 const toggle=useRef<HTMLButtonElement>(null);
 const book=useRef<HTMLDivElement>(null);
 const restoreFocus=useRef(false);
 const animations=useAnimations();
 useEffect(()=>{if(expanded)input.current?.focus();},[expanded]);
 const filtered=menu.filter(i=>(category==='Semua menu'||i.category===category)&&`${i.name} ${i.description}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id')));
 const pageCount=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
 const pageItems=filtered.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
 function search(value:string){setQuery(value);setCategory('Semua menu');setPage(0);}
 function choose(value:string){setCategory(value);setQuery('');setPage(0);}
 function closeSearch(){restoreFocus.current=true;setExpanded(false);setQuery('');setPage(0);}
 function turnPage(next:number){setPage(next);book.current?.scrollIntoView({block:'start',behavior:animations?'smooth':'auto'});}
 function recipe(item:typeof menu[number]){return <article className="recipe-entry" key={item.id}>
  <div className="recipe-photo"><Image src={item.image} alt={item.name} width={105} height={60} sizes="70px"/></div>
  <div className="recipe-copy"><h3>{item.name}</h3>{item.description&&<p>{item.description}</p>}
  <strong>{item.variants.length?'Mulai ':''}{rupiah(item.price)}</strong>
  {item.variants.length>0&&<small>{item.variants.map(v=>`${v.name} ${rupiah(v.price)}`).join(' · ')}</small>}</div>
 </article>}
 return <MotionConfig reducedMotion="user">
 <div id="top" className="concept">Konsep website independen untuk Bumi Upi</div>
 <a className="skip" href="#menu">Langsung ke menu</a>
 <header className="site-header wrap"><a href="#top" className="logo" aria-label="Bumi Upi, beranda"><Image src="/images/logo.webp" alt="Bumi Upi Rumah Tamah" width={210} height={56} priority/></a><nav aria-label="Navigasi utama"><a href="#suasana">Rumah tamah</a><a href="#menu">Buku menu</a><a href="#kenangan">Sudut foto</a></nav><Chat/></header>
 <main>
 <section className="hero">
 <div className="wrap hero-title"><h1>Rumah tamah.</h1><p>Jalan Cimanuk 312, Garut.</p></div>
 <div className="house-album wrap">
 <motion.figure className="album-side room-side" initial={false} animate={animations?{rotate:[-5,-3],y:[20,0]}:{rotate:-3}} transition={{duration:animations?.8:0}}><Image src="/images/place-16.webp" alt="Ruang makan Bumi Upi dengan perabot kayu dan lantai bermotif" width={1200} height={675} sizes="(max-width:767px) 43vw, 27vw"/><figcaption>Di dalam rumah.</figcaption></motion.figure>
 <motion.figure className="house-print" initial={false} animate={animations?{rotate:[3,0],y:[25,0]}:{rotate:0}} transition={{duration:animations?.9:0}}><Image src="/images/place-17.webp" alt="Fasad Bumi Upi dengan pintu hijau di Jalan Cimanuk Garut" width={676} height={1200} priority sizes="(max-width:767px) 64vw, 31vw"/><figcaption>Bumi Upi, Garut.</figcaption></motion.figure>
 <motion.figure className="album-side booth-side" initial={false} animate={animations?{rotate:[6,4],y:[35,0]}:{rotate:4}} transition={{duration:animations?1:0}}><Image src="/images/place-07.webp" alt="Bilik photobooth Bumi Upi dengan panel kayu dan tirai merah" width={600} height={800} sizes="(max-width:767px) 32vw, 20vw"/><figcaption>Sebelum pulang.</figcaption></motion.figure>
 </div>
 <div className="hero-bottom wrap"><span><Clock size={17}/> Setiap hari · 07.00–23.00 WIB</span><Button nativeButton={false} render={<a href="#menu"/>} className="main-button">Buka buku menu <ArrowDown size={18}/></Button><a href="#kenangan">Lihat sudut rumah <ArrowDown size={17}/></a></div>
 </section>
 <section id="menu" className="catalogue"><div className="wrap">
  <div className="book-heading"><div><h2>Buku menu.</h2><p>Sarapan, makan, dan minum.</p></div><Image className="book-motif" src="/images/motif.webp" alt="" width={54} height={54}/></div>
  <div ref={book} className="menu-book">
   <div className={`toolbar ${expanded?'search-open':''}`}>
    <div className="category"><Select value={category} onValueChange={v=>choose(v??'Semua menu')}><SelectTrigger aria-label="Kategori buku menu"><SelectValue>{category}</SelectValue></SelectTrigger><SelectContent align="start">{categories.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
    <div className="search-desktop"><Search size={18}/><Input aria-label="Cari menu" placeholder="Cari di buku menu…" value={query} onChange={e=>search(e.target.value)}/></div>
    <Button ref={toggle} className="search-toggle" variant="ghost" size="icon" aria-label="Buka pencarian menu" aria-expanded={expanded} aria-controls="mobile-search" onClick={()=>setExpanded(true)}><Search/></Button>
    <AnimatePresence initial={false} onExitComplete={()=>{if(restoreFocus.current&&!expanded){restoreFocus.current=false;toggle.current?.focus();}}}>{expanded&&<motion.div id="mobile-search" className="search-mobile" initial={animations?{width:0,opacity:0}:false} animate={{width:'100%',opacity:1}} exit={{width:0,opacity:0}} transition={{duration:animations ? 0.2 : 0}}><Input ref={input} aria-label="Cari menu mobile" placeholder="Cari di buku menu…" value={query} onKeyDown={e=>{if(e.key==='Escape')closeSearch()}} onChange={e=>search(e.target.value)}/><Button variant="ghost" size="icon" aria-label="Tutup pencarian" onClick={closeSearch}><X/></Button></motion.div>}</AnimatePresence>
   </div>
   <div className="results"><span role="status">{filtered.length} pilihan{query?` untuk “${query}”`:category!=='Semua menu'?` · ${category}`:''}</span>{(query||category!=='Semua menu')&&<Button variant="link" onClick={()=>choose('Semua menu')}>Lihat semua</Button>}</div>
   <AnimatePresence mode="wait" initial={false}><motion.div key={`${category}-${query}-${page}`} className="book-spread" initial={animations?{opacity:0,x:8}:false} animate={{opacity:1,x:0}} exit={animations?{opacity:0,x:-8}:{opacity:1,x:0}} transition={{duration:animations ? 0.18 : 0}}>
    {filtered.length>0?<><div className="book-leaf">{pageItems.slice(0,4).map(recipe)}</div><div className="book-leaf">{pageItems.slice(4).map(recipe)}</div></>:<div className="empty"><h3>Belum ketemu yang dicari?</h3><p>Coba nama hidangan lain atau buka kembali semua menu.</p><Button variant="outline" onClick={()=>choose('Semua menu')}>Buka semua menu</Button></div>}
   </motion.div></AnimatePresence>
   <div className="book-pagination"><Button variant="ghost" onClick={()=>turnPage(page-1)} disabled={page===0} aria-label="Halaman menu sebelumnya"><ArrowLeft size={18}/><span>Sebelumnya</span></Button><span aria-live="polite">Halaman {page+1} dari {pageCount}</span><Button variant="ghost" onClick={()=>turnPage(page+1)} disabled={page+1>=pageCount} aria-label="Halaman menu berikutnya"><span>Berikutnya</span><ArrowRight size={18}/></Button></div>
   <p className="price-note">Harga dan ketersediaan dapat berubah. Konfirmasi saat memesan.</p>
  </div>
  <p className="kitchen-note">Ada juga menu prasmanan dan menu spesial harian di rumah. Tanyakan pilihan hari ini kepada pramusaji.</p>
 </div></section>
 <section id="kenangan" className="memories wrap"><div id="suasana" className="room-wide"><Image src="/images/place-16.webp" alt="Ruang makan Bumi Upi dengan perabot lawas dan lantai motif" width={1200} height={675} sizes="(max-width:767px) 100vw, 85vw"/><div><h2>Di dalam,<br/>atau di halaman.</h2><p>Ruang makan dan halaman Bumi Upi.</p></div></div>
  <div className="memory-intro"><Camera size={25}/><h2>Satu foto<br/>sebelum pulang.</h2><p>Photobooth di Bumi Upi.</p><Chat>Tanya info photobooth</Chat></div>
  <div className="memory-album" aria-label="Galeri sudut Bumi Upi">
   <div className="memory-main"><AnimatePresence mode="wait" initial={false}><motion.figure key={memory} initial={animations?{opacity:0,rotate:0}:false} animate={{opacity:1,rotate:memory%2?2:-2}} exit={animations?{opacity:0}:{opacity:1}} transition={{duration:animations ? 0.25 : 0}}><Image src={memories[memory].src} alt={memories[memory].alt} width={800} height={900} sizes="(max-width:767px) 80vw, 36vw"/><figcaption>{memories[memory].caption}</figcaption></motion.figure></AnimatePresence></div>
   <div className="memory-index">{memories.map((photo,index)=><Button key={photo.src} variant="ghost" className="memory-thumbnail" aria-pressed={memory===index} aria-label={`Lihat foto: ${photo.caption}`} onClick={()=>setMemory(index)}><Image src={photo.src} alt="" width={140} height={120} loading="eager"/></Button>)}</div>
   <p className="album-note">Sudut-sudut di rumah kami.</p>
  </div>
 </section>
 <section id="kunjungi" className="visit"><div className="wrap"><div className="visit-grid"><div><h2>Mampir<br/>ke rumah.</h2><Chat/></div><div className="visit-details"><div><MapPin/><div><h3>Jalan Cimanuk No. 312</h3><p>Pataruman, Tarogong Kidul, Kabupaten Garut,<br/>Jawa Barat 44150. Depan favehotel Garut.</p><a className="text-link" href={MAP} target="_blank" rel="noreferrer">Buka Google Maps <ArrowUpRight size={17}/></a></div></div><div><Clock/><div><h3>Setiap hari</h3><p>07.00–23.00 WIB</p></div></div></div></div>
  <div className="visit-wayfinding"><div className="map-print"><iframe title="Lokasi Bumi Upi di Jalan Cimanuk 312, Garut" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a href={MAP} target="_blank" rel="noreferrer">Temukan jalan ke rumah kami <ArrowUpRight size={16}/></a></div><figure className="arrival-print"><Image src="/images/place-17.webp" alt="Tampak depan rumah Bumi Upi dengan pintu hijau dan papan nama Bumi Upi" width={900} height={1100} sizes="(max-width:767px) 80vw, 25vw"/><figcaption>Rumah tamah di Jalan Cimanuk.</figcaption></figure></div>
 </div></section>
 </main><footer className="wrap"><Image src="/images/logo.webp" alt="Bumi Upi Rumah Tamah" width={180} height={48}/><p>Rumah Tamah · Garut</p><a href="https://www.instagram.com/bumiupi/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16}/></a><a href="#top">Kembali ke atas ↑</a></footer>
 </MotionConfig>
}
