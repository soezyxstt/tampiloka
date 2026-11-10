import Image from "next/image";
import { Hero } from "../components/hero";
import { FeaturedDishes, SpaceGallery } from "../components/experiences";
import { Location } from "../components/location";
import { Menu } from "../components/menu";
import { MobileNav } from "../components/mobile-nav";
import { Reveal, ScrollReveals } from "../components/motion";
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
      <a className="header-cta" href={contact} target="_blank" rel="noopener noreferrer"><Image src="/icons/whatsapp.svg" alt="" width={18} height={18} /> Hubungi kami</a><MobileNav />
    </div></header>
    <main id="main"><ScrollReveals /><div id="beranda"><Hero /></div>
      <FeaturedDishes items={featuredItems} />
      <section id="acara" className="events-section" aria-labelledby="events-title"><div className="events-copy"><Reveal><h2 id="events-title" className="type-heading-2">Ruang untuk<br />acara.</h2></Reveal><Reveal><EventOptions /></Reveal><Button variant="cream" nativeButton={false} render={<a href={contact} target="_blank" rel="noopener noreferrer" />}><Image src="/icons/whatsapp.svg" alt="" width={20} height={20} />Tanyakan tempat</Button></div><div className="events-gallery" data-scroll-reveal=""><SpaceGallery /></div></section>
      <section id="menu" className="catalogue-section section-space"><div className="wrap"><Reveal className="section-heading"><h2 className="type-heading-2">Menu Historia.</h2><p>Makanan, kopi,<br />camilan & minuman.</p></Reveal><Menu catalogue={catalogue} /></div></section>
      <Location />
    </main>
    <footer className="site-footer"><div className="footer-bottom wrap"><a className="brand" href="#beranda" aria-label="Historia, kembali ke awal"><Image src="/images/menu/historia-logo.png" alt="Historia Coffee & Eatery" width={239} height={166} sizes="100px" /></a><div><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href="#menu">Menu</a></div><p>Website oleh <a href="https://tampiloka.site" target="_blank" rel="noopener noreferrer">Tampiloka</a>.</p></div></footer>
  </>;
}
