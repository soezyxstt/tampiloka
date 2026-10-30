import Image from "next/image";
import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { showcaseCopy } from "@/lib/showcase-copy";
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
  return <span className="industry-preview__button">{children}</span>;
}

function FoodPreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--food">
      <Header brand="KALA SORE" links={[copy.menu, copy.brew, copy.cafe]} />
      <div className="industry-preview__food-hero">
        <div className="industry-preview__copy">
          <PreviewTitle>{copy.coffeeBreakfast}</PreviewTitle>
          <span className="industry-preview__description">{copy.localBread}</span>
          <ButtonLabel>{copy.viewMenu}</ButtonLabel>
        </div>
        <Photo kind="food" />
      </div>
      <div className="industry-preview__food-menu">
        <span>{copy.menuLabel}</span><strong>Cardamom Bun</strong><i>·</i><strong>Cold Drip</strong><i>·</i><strong>Croissant</strong>
      </div>
    </div>
  );
}

function FashionPreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--fashion">
      <Header brand="RONA" links={[copy.collection, copy.lookbook, copy.store]} />
      <div className="industry-preview__fashion-main">
        <div className="industry-preview__fashion-copy">
          <PreviewTitle>{copy.linenCollection}</PreviewTitle>
          <span className="industry-preview__description">{copy.linenDescription}</span>
          <ButtonLabel>{copy.viewCollection}</ButtonLabel>
        </div>
        <Photo kind="fashion" />
        <span className="industry-preview__fashion-index">04 — 12</span>
      </div>
      <div className="industry-preview__fashion-bottom"><span>{copy.linenSeries}</span><span>{copy.models}</span></div>
    </div>
  );
}

function PortfolioPreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--portfolio">
      <Header brand="STUDIO RUANG" links={[copy.work, copy.approach, copy.contact]} />
      <div className="industry-preview__portfolio-heading">
        <PreviewTitle>{copy.architectureWork}</PreviewTitle>
      </div>
      <Photo kind="portfolio" className="industry-preview__portfolio-photo" />
      <div className="industry-preview__project-line"><span>01</span><strong>{copy.homeDago}</strong><span>{copy.dago}</span><span>2025</span></div>
    </div>
  );
}

function SmallBusinessPreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--small-business">
      <Header brand="LEMPUNG & API" links={[copy.catalog, copy.process, copy.contact]} />
      <div className="industry-preview__small-hero">
        <div className="industry-preview__small-copy">
          <PreviewTitle>{copy.tableCeramics}</PreviewTitle>
          <span className="industry-preview__description">{copy.handmadeCeramics}</span>
          <ButtonLabel>{copy.viewCatalog}</ButtonLabel>
        </div>
        <Photo kind="small-business" />
      </div>
      <div className="industry-preview__shop-row"><span>{copy.products}</span><span>{copy.productNames}</span></div>
    </div>
  );
}

function TechnologyPreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--technology">
      <Header brand="SONA" links={[copy.products, copy.specs]} dark />
      <div className="industry-preview__tech-main">
        <div className="industry-preview__tech-copy">
          <PreviewTitle>{copy.wirelessAudio}</PreviewTitle>
          <span className="industry-preview__description">{copy.audioSpecs}</span>
          <div className="industry-preview__tech-buy"><ButtonLabel>{copy.viewProduct}</ButtonLabel><strong>{copy.startingPrice}</strong></div>
        </div>
        <Photo kind="technology" />
      </div>
      <div className="industry-preview__tech-specs"><span>{copy.drivers}</span><span>{copy.noiseReduction}</span><span>{copy.battery}</span></div>
    </div>
  );
}

function EnterprisePreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--enterprise">
      <Header brand="ARUNA SISTEM" links={[copy.solutions, copy.compliance, copy.demo]} />
      <div className="industry-preview__enterprise-heading">
        <PreviewTitle>{copy.manageTeam}</PreviewTitle>
        <span className="industry-preview__description">{copy.procurement}</span>
        <ButtonLabel>{copy.demo}</ButtonLabel>
      </div>
      <div className="industry-preview__enterprise-workspace">
        <Photo kind="enterprise" />
        <div className="industry-preview__dashboard">
          <div><span>{copy.operations}</span><span>{copy.active}</span></div>
          <strong>{copy.procurementFlow}</strong>
          <span className="industry-preview__dashboard-row"><i>01</i> {copy.budget} <b>{copy.approved}</b></span>
          <span className="industry-preview__dashboard-row"><i>02</i> {copy.inventory} <b>{copy.done}</b></span>
          <span className="industry-preview__dashboard-row"><i>03</i> {copy.invoice} <b>{copy.processing}</b></span>
        </div>
      </div>
    </div>
  );
}

function WeddingPreview({ copy }: { copy: (typeof showcaseCopy)[Locale]["preview"] }) {
  return (
    <div className="industry-preview__site industry-preview__site--wedding">
      <Header brand="TEMURA" links={[copy.event, copy.location, copy.rsvp]} />
      <div className="industry-preview__wedding-main">
        <div className="industry-preview__wedding-copy">
          <span className="industry-preview__title">Nara<br /><em>&amp;</em> Aruna</span>
          <span className="industry-preview__description">{copy.weddingDate}</span>
          <ButtonLabel>{copy.confirmAttendance}</ButtonLabel>
        </div>
        <Photo kind="wedding" className="industry-preview__wedding-photo" />
      </div>
      <div className="industry-preview__wedding-bottom"><span>{copy.ceremony}</span><span>{copy.confirmation}</span></div>
    </div>
  );
}

const previews: Record<IndustryKind, (props: { copy: (typeof showcaseCopy)[Locale]["preview"] }) => ReactNode> = {
  food: FoodPreview,
  fashion: FashionPreview,
  portfolio: PortfolioPreview,
  "small-business": SmallBusinessPreview,
  technology: TechnologyPreview,
  enterprise: EnterprisePreview,
  wedding: WeddingPreview,
};

export function IndustryPreview({ kind }: { kind: IndustryKind }) {
  const locale = useLocale() as Locale;
  const copy = showcaseCopy[locale].preview;
  const Preview = previews[kind];
  return (
    <figure className={`industry-preview industry-preview--${kind}`} aria-hidden="true">
      <div className="industry-preview__window"><Preview copy={copy} /></div>
    </figure>
  );
}

function PreviewTitle({ children }: { children: string }) {
  return (
    <span className="industry-preview__title">
      {children.split("\n").map((line, index) => (
        <span key={`${line}-${index}`}>{index > 0 ? <br /> : null}{line}</span>
      ))}
    </span>
  );
}
