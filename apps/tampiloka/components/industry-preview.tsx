import Image from "next/image";
import type { ReactNode } from "react";
import "../app/industry-preview.css";

type IndustryKind = "food" | "fashion" | "portfolio" | "small-business" | "technology" | "enterprise" | "wedding";

const images: Record<IndustryKind, string> = {
  food: "industry-food",
  fashion: "industry-fashion",
  portfolio: "industry-portfolio-architecture",
  "small-business": "industry-small-business",
  technology: "industry-technology",
  enterprise: "industry-enterprise",
  wedding: "industry-wedding",
};

function Photo({ kind, className = "" }: { kind: IndustryKind; className?: string }) {
  return (
    <div className={`industry-preview__photo ${className}`}>
      <Image src={`/images/${images[kind]}.webp`} alt="" fill sizes="(max-width: 680px) 88vw, 42vw" />
    </div>
  );
}

function Header({ brand, links, dark = false }: { brand: string; links: string[]; dark?: boolean }) {
  return (
    <div className={`industry-preview__header${dark ? " industry-preview__header--dark" : ""}`}>
      <span className="industry-preview__brand">{brand}</span>
      <nav aria-hidden="true">{links.map((link) => <span key={link}>{link}</span>)}</nav>
      <span className="industry-preview__menu" aria-hidden="true">☰</span>
    </div>
  );
}

function ButtonLabel({ children }: { children: ReactNode }) {
  return <span className="industry-preview__button">{children}<span aria-hidden="true">↗</span></span>;
}

function FoodPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--food">
      <Header brand="KALA SORE" links={["Menu", "Seduh", "Kedai"]} />
      <div className="industry-preview__food-hero">
        <div className="industry-preview__copy">
          <span className="industry-preview__title">Kopi &amp;<br />sarapan.</span>
          <span className="industry-preview__description">Roti sourdough dan kopi seduh lokal.</span>
          <ButtonLabel>Lihat menu</ButtonLabel>
        </div>
        <Photo kind="food" />
      </div>
      <div className="industry-preview__food-menu">
        <span>MENU</span><strong>Cardamom Bun</strong><i>·</i><strong>Cold Drip</strong><i>·</i><strong>Croissant</strong>
      </div>
    </div>
  );
}

function FashionPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--fashion">
      <Header brand="RONA" links={["Koleksi", "Lookbook", "Toko"]} />
      <div className="industry-preview__fashion-main">
        <div className="industry-preview__fashion-copy">
          <span className="industry-preview__title">Koleksi<br /><em>linen.</em></span>
          <span className="industry-preview__description">Serat linen alami untuk sehari-hari.</span>
          <ButtonLabel>Lihat koleksi</ButtonLabel>
        </div>
        <Photo kind="fashion" />
        <span className="industry-preview__fashion-index">04 — 12</span>
      </div>
      <div className="industry-preview__fashion-bottom"><span>LINEN SERIES</span><span>12 MODEL</span></div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--portfolio">
      <Header brand="STUDIO RUANG" links={["Karya", "Pendekatan", "Kontak"]} />
      <div className="industry-preview__portfolio-heading">
        <span className="industry-preview__title">Karya<br />arsitektur.</span>
      </div>
      <Photo kind="portfolio" className="industry-preview__portfolio-photo" />
      <div className="industry-preview__project-line"><span>01</span><strong>Rumah Lereng Dago</strong><span>Dago, 540 m²</span><span>2025 ↗</span></div>
    </div>
  );
}

function SmallBusinessPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--small-business">
      <Header brand="LEMPUNG & API" links={["Katalog", "Proses", "Kontak"]} />
      <div className="industry-preview__small-hero">
        <div className="industry-preview__small-copy">
          <span className="industry-preview__title">Keramik<br />meja.</span>
          <span className="industry-preview__description">Keramik buatan tangan untuk rumah.</span>
          <ButtonLabel>Lihat katalog</ButtonLabel>
        </div>
        <Photo kind="small-business" />
      </div>
      <div className="industry-preview__shop-row"><span>PRODUK</span><span>Cangkir Seduh &nbsp;·&nbsp; Mangkuk Saji &nbsp;·&nbsp; Teko Saring</span></div>
    </div>
  );
}

function TechnologyPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--technology">
      <Header brand="SONA" links={["Produk", "Spesifikasi"]} dark />
      <div className="industry-preview__tech-main">
        <div className="industry-preview__tech-copy">
          <span className="industry-preview__title">Audio.<br />Tanpa kabel.</span>
          <span className="industry-preview__description">Driver khusus 40 mm dan peredam bising aktif.</span>
          <div className="industry-preview__tech-buy"><ButtonLabel>Lihat produk</ButtonLabel><strong>Mulai Rp1,8 juta</strong></div>
        </div>
        <Photo kind="technology" />
      </div>
      <div className="industry-preview__tech-specs"><span>DRIVER 40MM</span><span>PEREDAM BISING</span><span>36 JAM BATERAI</span></div>
    </div>
  );
}

function EnterprisePreview() {
  return (
    <div className="industry-preview__site industry-preview__site--enterprise">
      <Header brand="ARUNA SISTEM" links={["Solusi", "Kepatuhan", "Demo"]} />
      <div className="industry-preview__enterprise-heading">
        <span className="industry-preview__title">Kelola tim.<br />Pantau proyek.</span>
        <span className="industry-preview__description">Pengadaan dan persetujuan anggaran terpadu.</span>
        <ButtonLabel>Lihat demo</ButtonLabel>
      </div>
      <div className="industry-preview__enterprise-workspace">
        <Photo kind="enterprise" />
        <div className="industry-preview__dashboard">
          <div><span>PIPELINE OPERASIONAL</span><span>● AKTIF</span></div>
          <strong>Alur pengadaan</strong>
          <span className="industry-preview__dashboard-row"><i>01</i> Anggaran <b>Disetujui</b></span>
          <span className="industry-preview__dashboard-row"><i>02</i> Inventaris <b>Selesai</b></span>
          <span className="industry-preview__dashboard-row"><i>03</i> Faktur <b>Diproses</b></span>
        </div>
      </div>
    </div>
  );
}

function WeddingPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--wedding">
      <Header brand="TEMURA" links={["Acara", "Lokasi", "RSVP"]} />
      <div className="industry-preview__wedding-main">
        <div className="industry-preview__wedding-copy">
          <span className="industry-preview__title">Nara<br /><em>&amp;</em> Aruna</span>
          <span className="industry-preview__description">Sabtu, 14 November 2026 · Jakarta.</span>
          <ButtonLabel>Konfirmasi kehadiran</ButtonLabel>
        </div>
        <Photo kind="wedding" className="industry-preview__wedding-photo" />
      </div>
      <div className="industry-preview__wedding-bottom"><span>AKAD 08.30 · RESEPSI 19.00</span><span>KONFIRMASI ↗</span></div>
    </div>
  );
}

const previews: Record<IndustryKind, () => ReactNode> = {
  food: FoodPreview,
  fashion: FashionPreview,
  portfolio: PortfolioPreview,
  "small-business": SmallBusinessPreview,
  technology: TechnologyPreview,
  enterprise: EnterprisePreview,
  wedding: WeddingPreview,
};

export function IndustryPreview({ kind }: { kind: IndustryKind }) {
  const Preview = previews[kind];
  return (
    <figure className={`industry-preview industry-preview--${kind}`} aria-hidden="true">
      <div className="industry-preview__window"><Preview /></div>
    </figure>
  );
}
