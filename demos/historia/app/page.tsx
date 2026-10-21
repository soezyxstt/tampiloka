import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Hero, MovingWords } from "../components/hero";
import { FeaturedDishes, SpaceGallery } from "../components/experiences";
import { Location } from "../components/location";
import { Menu } from "../components/menu";
import { MobileNav } from "../components/mobile-nav";
import { Reveal } from "../components/motion";
import { EventOptions } from "../components/event-options";
import { Button } from "../components/ui/button";
import catalogue from "../data/menu.json";

const instagram = "https://www.instagram.com/historiacoffee.co/";
const contact = "https://wa.me/6282130468241";
const featureNames = ["Wagyu Meltique", "Chicken Nanban Rice", "Nasi Goreng Sapi", "Prawn Sushi Roll", "Es Kopi Susu Historia"];

export default function Home() {
  const featured = featureNames.flatMap(name => catalogue.items.filter(item => item.name.toLowerCase() === name.toLowerCase() && item.image));
  const featuredItems = featured.length ? featured : catalogue.items.filter(item => item.image).slice(0, 5);
  return <>
    <a className="skip-link" href="#main">Lewati ke konten</a>
    <div className="demo-notice">Konsep website oleh Tampiloka · Bukan situs resmi Historia.</div>
    <header className="site-header"><div className="header-inner wrap">
      <a className="brand" href="#beranda" aria-label="Historia, kembali ke awal"><Image src="/images/menu/historia-logo.png" alt="Historia Coffee & Eatery" width={239} height={166} sizes="110px" preload /></a>
      <nav className="desktop-nav" aria-label="Navigasi utama"><a href="#menu">Menu</a><a href="#suasana">Suasana</a><a href="#acara">Acara</a><a href="#kunjungi">Lokasi</a></nav>
      <a className="header-cta" href={contact} target="_blank" rel="noopener noreferrer">Mari bertemu <ArrowUpRight size={17} /></a><MobileNav />
    </div></header>
    <main id="main"><div id="beranda"><Hero /></div><MovingWords />
      <FeaturedDishes items={featuredItems} />
      <section id="menu" className="catalogue-section section-space"><div className="wrap"><Reveal className="section-heading"><h2 className="type-heading-2">Lagi ingin<br /><em>yang mana?</em></h2><div><p>Kopi, hidangan utama, sampai teman ngemil.<br />Pilih sesukamu, nikmati semaumu.</p></div></Reveal><Menu catalogue={catalogue} /></div></section>
      <SpaceGallery />
      <section id="acara" className="events-section" aria-labelledby="events-title"><div className="events-photo"><Image src="/images/menu/shared-table.webp" alt="Meja makan Historia dengan hidangan untuk dinikmati bersama di ruangan berkursi rotan" fill sizes="(max-width: 767px) 100vw, 45vw" /></div><div className="events-copy"><Reveal><h2 id="events-title" className="type-heading-2">Momenmu,<br /><em>cerita kita.</em></h2><p className="events-intro">Makan malam berdua, merayakan sesuatu, atau mempertemukan banyak ide. Mari buat waktu bersama terasa istimewa.</p></Reveal><EventOptions /><Button variant="cream" nativeButton={false} render={<a href={contact} target="_blank" rel="noopener noreferrer" />}>Ceritakan rencanamu <ArrowUpRight size={19} /></Button></div></section>
      <Location />
    </main>
    <footer className="site-footer"><div className="footer-invite wrap"><p>Sampai <em>bertemu.</em></p><a href={contact} target="_blank" rel="noopener noreferrer" aria-label="Hubungi Historia melalui WhatsApp"><ArrowUpRight size={42} strokeWidth={1} /></a></div><div className="footer-bottom wrap"><a className="brand" href="#beranda" aria-label="Historia, kembali ke awal"><Image src="/images/menu/historia-logo.png" alt="Historia Coffee & Eatery" width={239} height={166} sizes="100px" /></a><div><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={15} /></a><a href="#menu">Menu <ArrowUpRight size={15} /></a></div><p>Website oleh <a href="https://tampiloka.adihnursyam.com/" target="_blank" rel="noopener noreferrer">Tampiloka</a>.</p></div></footer>
  </>;
}
