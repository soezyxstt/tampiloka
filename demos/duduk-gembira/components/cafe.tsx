'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, MapPin, Clock3, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import menu from '@/data/menu.json';

const wa = 'https://wa.me/6282286360621';
const ig = 'https://www.instagram.com/warkopdudukgembira/';
const mapQuery = 'Warung Kopi Duduk Gembira Jl. Otista 275B Garut';
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
const categories = ['Semua menu', ...new Set(menu.map(item => item.category))];
const dishes = menu.filter(item => item.imageId);
const price = (amount: number | null) => amount === null ? 'Tanyakan harga' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

function WhatsApp() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.5 3.5a11.8 11.8 0 0 0-18.6 14L.3 23.7l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.5 3.5ZM12.3 21.4a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4A9.8 9.8 0 1 1 12.3 21.4Zm5.4-7.3c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8 8 0 0 1-3.9-3.4c-.3-.4.3-.4.8-1.4.1-.2.1-.4 0-.6L9.2 7c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3a10.8 10.8 0 0 0 4.6 4.1c1.7.8 2.3.8 3.2.7 1-.1 1.8-.8 2-1.5.3-.7.3-1.2.2-1.3l-.7-.2Z"/></svg>;
}

function Instagram({ size = 20 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={false} whileInView={{ y: [20, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}>{children}</motion.div>;
}

export function Cafe() {
  const [category, setCategory] = useState('Kopi');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [protein, setProtein] = useState('cumi');
  const [sambal, setSambal] = useState('matah');
  const input = useRef<HTMLInputElement>(null);
  const searchToggle = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const selectedDish = dishes.find(item => item.id === `${protein}-${sambal}`) ?? dishes[0];
  const visible = menu.filter(item => (category === 'Semua menu' || item.category === category) && `${item.name} ${item.description}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id')));
  const pageSize = 10;
  const pageItems = visible.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.ceil(visible.length / pageSize);
  useEffect(() => { if (searchOpen) input.current?.focus(); }, [searchOpen]);
  function closeSearch() {
    setSearchOpen(false);
    setQuery('');
    setCategory('Kopi');
    setPage(0);
    requestAnimationFrame(() => searchToggle.current?.focus());
  }

  return <MotionConfig reducedMotion="user">
    <a className="skip" href="#main">Langsung ke konten</a>
    <div className="concept">Demo konsep independen · bukan situs resmi</div>
    <header className="header wrap">
      <a href="#top" aria-label="Duduk Gembira, beranda" className="logo"><Image src="/images/logo.webp" alt="Warkop Duduk Gembira" width={150} height={61} priority /></a>
      <nav aria-label="Navigasi utama"><a href="#suasana">Suasana</a><a href="#menu">Menu</a><a href="#mampir">Mampir</a></nav>
      <a className="contact" href={wa} target="_blank" rel="noreferrer"><WhatsApp /><span>Hubungi kami</span><ArrowUpRight size={17} /></a>
    </header>

    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <h1 id="hero-title"><span>Warung kopi</span>Duduk Gembira</h1>
        <div className="hero-counter"><div className="hero-address"><p>Jl. Otista No. 275 B<br />Tarogong Kidul, Garut</p><a className="primary" href="#menu">Lihat menu <ArrowDown size={20} /></a><a className="text-link" href="#mampir">Petunjuk jalan <ArrowUpRight size={18} /></a></div><div className="hero-scene"><Image src="/images/terrace.webp" alt="Teras Duduk Gembira, papan nama hijau dan tempat duduk peti merah" width={1152} height={1439} priority sizes="(max-width: 700px) 100vw, 55vw" /></div><div className="hero-hours"><Clock3 size={24} /><p>Buka setiap hari<br /><strong>06.30 WIB</strong></p><a href="#mampir">Lihat jam buka ↓</a></div></div>
      </section>

      <section className="dishes" aria-labelledby="dishes-title">
        <div className="dish-spotlight wrap"><div className="dish-photo"><AnimatePresence mode="wait" initial={false}><motion.div key={selectedDish.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .18 }}><Image src={`/images/${selectedDish.imageId}.webp`} alt={selectedDish.name} width={1080} height={1350} sizes="(max-width: 700px) 90vw, 46vw" /></motion.div></AnimatePresence></div><div className="dish-choice"><h2 id="dishes-title">Nasi + lauk<br />+ sambal.</h2><fieldset><legend>Lauknya</legend><RadioGroup value={protein} onValueChange={setProtein} aria-label="Pilih lauk" className="dish-options">{[['cumi', 'Cumi'], ['ayam', 'Ayam']].map(([value, label]) => <div className="dish-option" key={value}><RadioGroupItem value={value} id={`protein-${value}`} aria-labelledby={`protein-${value}-label`} /><label id={`protein-${value}-label`} htmlFor={`protein-${value}`}>{label}</label></div>)}</RadioGroup></fieldset><fieldset><legend>Sambalnya</legend><RadioGroup value={sambal} onValueChange={setSambal} aria-label="Pilih sambal" className="dish-options">{[['ijo', 'Ijo'], ['matah', 'Matah']].map(([value, label]) => <div className="dish-option" key={value}><RadioGroupItem value={value} id={`sambal-${value}`} aria-labelledby={`sambal-${value}-label`} /><label id={`sambal-${value}-label`} htmlFor={`sambal-${value}`}>{label}</label></div>)}</RadioGroup></fieldset><div className="dish-summary"><div className="dish-selection" aria-live="polite"><h3>{selectedDish.name}</h3><p>{price(selectedDish.price.amount)}</p></div><a className="text-link" href={wa} target="_blank" rel="noreferrer">Tanya ketersediaan <WhatsApp /></a></div></div></div>
      </section>

      <section id="menu" className="catalogue" aria-labelledby="menu-title">
        <div className="wrap menu-board"><div className="menu-heading"><h2 id="menu-title">Papan menu</h2><p>{menu.length} pilihan makanan & minuman</p></div>
          <div className="menu-layout"><nav className="category-nav" aria-label="Kategori menu">{categories.map(name => <Button key={name} variant="ghost" aria-pressed={category === name} onClick={() => { setCategory(name); setQuery(''); setPage(0); }}>{name}</Button>)}</nav>
          <div className="menu-results"><div className={`menu-toolbar ${searchOpen ? 'search-open' : ''}`}><h3>{query ? 'Hasil pencarian' : category}</h3><div className="menu-search"><Search size={18} /><Input id="menu-query" ref={input} aria-label="Cari seluruh menu" placeholder="Cari seluruh menu…" value={query} onKeyDown={event => { if (event.key === 'Escape') closeSearch(); }} onChange={event => { setQuery(event.target.value); setCategory('Semua menu'); setPage(0); }} />{(query || searchOpen) && <Button variant="ghost" size="icon" aria-label="Tutup pencarian" onClick={closeSearch}><X size={18} /></Button>}</div><Button ref={searchToggle} variant="outline" size="icon" className="menu-search-toggle" aria-label="Buka pencarian" aria-expanded={searchOpen} aria-controls="menu-query" onClick={() => setSearchOpen(true)}><Search size={18} /></Button></div>
          <div className="menu-meta"><span aria-live="polite">{visible.length} pilihan</span><span>Harga dalam rupiah</span></div>
          <motion.ul className="menu-items" key={`${category}-${query}-${page}`} initial={{ y: reducedMotion ? 0 : 6 }} animate={{ y: 0 }} transition={{duration:.18}}>{pageItems.map(item => <li key={item.id}><div><h4>{item.name}</h4>{item.description && <p>{item.description}</p>}</div><span className={item.price.amount === null ? 'ask-price' : ''}>{price(item.price.amount)}</span></li>)}</motion.ul>
          {visible.length === 0 && <p className="empty-menu">Menu “{query}” belum ditemukan. Coba kata lain.</p>}
          {pageCount > 1 && <nav className="pagination" aria-label="Halaman menu"><Button variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>Sebelumnya</Button><span>{page + 1} / {pageCount}</span><Button variant="outline" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Berikutnya</Button></nav>}
          <p className="price-note">Harga dan ketersediaan dapat berubah. Konfirmasi sebelum memesan.</p></div></div>
        </div>
      </section>

      <section id="suasana" className="atmosphere wrap"><Image src="/images/interior.webp" alt="Meja kayu dan kursi rotan di dalam Duduk Gembira" width={1152} height={1439} sizes="(max-width: 700px) 90vw, 60vw" /><div><h2>Di dalam<br />Duduk Gembira.</h2><a className="text-link" href={ig} target="_blank" rel="noreferrer">Lihat Instagram <Instagram size={19} /></a></div></section>

      <section id="mampir" className="visit wrap"><Reveal><h2>Kunjungi Duduk Gembira.</h2></Reveal><div className="visit-grid"><div className="address"><MapPin size={28} /><h3>Alamat</h3><p>Jl. Otista No. 275 B<br />Tarogong Kidul, Garut</p><a className="primary" href={maps} target="_blank" rel="noreferrer">Buka Google Maps <ArrowUpRight size={20} /></a></div><div className="schedule"><Clock3 size={28} /><h3>Buka setiap hari.</h3><dl><div><dt>Minggu–Kamis</dt><dd>06.30–23.00</dd></div><div><dt>Jumat & Sabtu</dt><dd>06.30–00.00</dd></div></dl><p>Jam dalam WIB.</p><a className="text-link" href={wa} target="_blank" rel="noreferrer"><WhatsApp /> Hubungi kami <ArrowUpRight size={18} /></a></div></div><div className="visit-location"><figure className="visit-venue"><Image src="/images/terrace.webp" alt="Teras Warkop Duduk Gembira dan papan namanya di Jalan Otista" width={1152} height={1439} sizes="(max-width: 700px) 90vw, 30vw" /><figcaption>Warkop Duduk Gembira</figcaption></figure><div className="map-frame"><iframe title="Peta lokasi Warkop Duduk Gembira di Jalan Otista, Garut" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><p>Jl. Otista No. 275 B, Tarogong Kidul, Garut</p></div></div></section>
    </main>
    <footer><div className="wrap footer-top"><a href="#top" className="logo"><Image src="/images/logo.webp" alt="Warkop Duduk Gembira" width={150} height={61} /></a><p>Jl. Otista No. 275 B<br />Garut</p><a href={ig} className="text-link" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={18} /></a></div><div className="wrap footer-bottom"><span>Warung Kopi Duduk Gembira · Garut</span><a href="#top">Kembali ke atas ↑</a></div></footer>
  </MotionConfig>;
}



