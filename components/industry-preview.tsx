import Image from "next/image";
import type { ReactNode } from "react";
import "../app/industry-preview.css";

type IndustryKind = "food" | "fashion" | "portfolio" | "small-business" | "technology" | "enterprise";

const images: Record<IndustryKind, string> = {
  food: "industry-food",
  fashion: "industry-fashion",
  portfolio: "industry-portfolio-architecture",
  "small-business": "industry-small-business",
  technology: "industry-technology",
  enterprise: "industry-enterprise",
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
      <Header brand="SORE & SENJA" links={["Cerita", "Menu", "Lokasi"]} />
      <div className="industry-preview__food-hero">
        <div className="industry-preview__copy">
          <span className="industry-preview__eyebrow">KOPI & MAKANAN</span>
          <span className="industry-preview__title">Kopi.<br />Sarapan.</span>
          <span className="industry-preview__description">Disajikan segar setiap pagi.</span>
          <ButtonLabel>Lihat menu</ButtonLabel>
        </div>
        <Photo kind="food" />
      </div>
      <div className="industry-preview__food-menu">
        <span>MENU FAVORIT</span><strong>Kopi gula aren</strong><i>·</i><strong>Roti kayu manis</strong><i>·</i><strong>Nasi hangat</strong>
      </div>
    </div>
  );
}

function FashionPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--fashion">
      <Header brand="RONA STUDIO" links={["Koleksi", "Jurnal", "Tentang"]} />
      <div className="industry-preview__fashion-main">
        <div className="industry-preview__fashion-copy">
          <span className="industry-preview__eyebrow">KOLEKSI 04</span>
          <span className="industry-preview__title">Koleksi<br /><em>linen.</em></span>
          <span className="industry-preview__description">Ringan. Nyaman. Untuk sehari-hari.</span>
          <ButtonLabel>Lihat koleksi</ButtonLabel>
        </div>
        <Photo kind="fashion" />
        <span className="industry-preview__fashion-index">04 — 12</span>
      </div>
      <div className="industry-preview__fashion-bottom"><span>LINEN SERIES</span><span>01 / 03</span></div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--portfolio">
      <Header brand="RUANG / ARSITEK" links={["Karya", "Pendekatan", "Kontak"]} />
      <div className="industry-preview__portfolio-heading">
        <span className="industry-preview__eyebrow">ARSITEKTUR & INTERIOR</span>
        <span className="industry-preview__title">Karya<br />pilihan.</span>
      </div>
      <Photo kind="portfolio" className="industry-preview__portfolio-photo" />
      <div className="industry-preview__project-line"><span>01</span><strong>Rumah di lereng</strong><span>Jawa Barat</span><span>2025 ↗</span></div>
    </div>
  );
}

function SmallBusinessPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--small-business">
      <Header brand="TANAH LIAT" links={["Koleksi", "Cerita", "Bantuan"]} />
      <div className="industry-preview__small-hero">
        <div className="industry-preview__small-copy">
          <span className="industry-preview__eyebrow">KERAMIK BUATAN TANGAN</span>
          <span className="industry-preview__title">Cangkir.<br />Mangkuk. Vas.</span>
          <span className="industry-preview__description">Keramik untuk rumah Anda.</span>
          <ButtonLabel>Belanja keramik</ButtonLabel>
        </div>
        <Photo kind="small-business" />
      </div>
      <div className="industry-preview__shop-row"><span>PALING DISUKAI</span><span>◇ Cangkir Pagi&nbsp; · &nbsp;◇ Mangkuk Rona&nbsp; · &nbsp;◇ Vas Akar</span></div>
    </div>
  );
}

function TechnologyPreview() {
  return (
    <div className="industry-preview__site industry-preview__site--technology">
      <Header brand="SONA / AUDIO" links={["Produk", "Teknologi", "Dukungan"]} dark />
      <div className="industry-preview__tech-main">
        <div className="industry-preview__tech-copy">
          <span className="industry-preview__eyebrow">SONA STUDIO</span>
          <span className="industry-preview__title">Audio.<br />Tanpa kabel.</span>
          <span className="industry-preview__description">Suara jernih. Baterai 24 jam.</span>
          <div className="industry-preview__tech-buy"><ButtonLabel>Lihat produk</ButtonLabel><strong>Mulai Rp 1,8 jt</strong></div>
        </div>
        <Photo kind="technology" />
        <span className="industry-preview__tech-badge">SONA<br /><strong>01</strong></span>
      </div>
      <div className="industry-preview__tech-specs"><span>ACTIVE NOISE CONTROL</span><span>24 JAM PEMAKAIAN</span><span>GARANSI 2 TAHUN</span></div>
    </div>
  );
}

function EnterprisePreview() {
  return (
    <div className="industry-preview__site industry-preview__site--enterprise">
      <Header brand="ARUNA / SISTEM" links={["Solusi", "Industri", "Insight"]} />
      <div className="industry-preview__enterprise-heading">
        <span className="industry-preview__eyebrow">MANAJEMEN PROYEK</span>
        <span className="industry-preview__title">Kelola tim.<br />Pantau proyek.</span>
        <span className="industry-preview__description">Tugas dan progres dalam satu tempat.</span>
        <ButtonLabel>Lihat demo</ButtonLabel>
      </div>
      <div className="industry-preview__enterprise-workspace">
        <Photo kind="enterprise" />
        <div className="industry-preview__dashboard">
          <div><span>ARUNA WORKSPACE</span><span>● AKTIF</span></div>
          <strong>Alur proyek</strong>
          <span className="industry-preview__dashboard-row"><i>01</i> Perencanaan <b>Berjalan</b></span>
          <span className="industry-preview__dashboard-row"><i>02</i> Tinjauan tim <b>Sesuai jadwal</b></span>
          <span className="industry-preview__dashboard-row"><i>03</i> Persetujuan <b>Berikutnya</b></span>
        </div>
      </div>
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
};

export function IndustryPreview({ kind }: { kind: IndustryKind }) {
  const Preview = previews[kind];
  return (
    <figure className={`industry-preview industry-preview--${kind}`} aria-hidden="true">
      <div className="industry-preview__window"><Preview /></div>
    </figure>
  );
}
