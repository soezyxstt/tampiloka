import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactLink } from "@/lib/site";

const plans = [
  { name: "Essential", price: "79.000–150.000", detail: "Islamic & minimalist. Penyesuaian dasar." },
  { name: "Standard", price: "139.000–189.000", detail: "Adat & retro. Penyesuaian desain dan ornamen." },
  { name: "Studio", price: "289.000–449.000", detail: "Game, kartun, dan desain dengan kustomisasi lebih luas." },
];

export function PricingSection() {
  return <section id="paket" className="temura-section temura-container">
    <div className="temura-section-heading"><h2 className="type-display">Harga</h2><p className="type-body temura-muted">Sesuai desain dan tingkat kustomisasi.</p></div>
    <div className="temura-pricing-grid">
      {plans.map((plan) => <article key={plan.name} className="temura-price-card">
        <h3 className="type-heading-4">{plan.name}</h3>
        <p className="type-heading-3 temura-plan-price"><span className="type-label">Rp</span>{plan.price}</p>
        <p className="type-body temura-muted">{plan.detail}</p>
        <a className="temura-inline-link type-label" href={contactLink(plan.name)}>Hubungi kami<ArrowUpRight size={16} /></a>
      </article>)}
    </div>
  </section>;
}

function ProductScreenshot({ kind }: { kind: "studio" | "dashboard" }) {
  const src = `/images/product/${kind}-desktop.png`;
  return <div className={`temura-product-screen temura-product-screen--${kind}`}>
    <Image src={src} width={1440} height={1000} alt={`Demo ${kind === "studio" ? "studio" : "dashboard"} Temura`} sizes="(max-width: 767px) 100vw, 85vw" />
  </div>;
}

export function ProductSections() {
  return <>{(["studio", "dashboard"] as const).map((kind) => <section key={kind} className="temura-section temura-container">
    <div className="temura-section-heading">
      <h2 className="type-display">{kind === "studio" ? "Studio" : "Dashboard"}</h2>
      <div className="temura-product-intro"><p className="type-body temura-muted">{kind === "studio" ? "Susun teks dan elemen dengan drag & drop." : "Kelola detail acara, tamu, RSVP, dan ucapan."}</p><Link href={`/${kind}`} className="temura-inline-link type-label">Buka demo<ArrowUpRight size={18} /></Link></div>
    </div>
    <ProductScreenshot kind={kind} />
    <p className="type-caption temura-muted temura-catalog-note">Demo lokal, belum terhubung ke pesanan.</p>
  </section>)}</>;
}

export const portfolio: { name: string; url: string }[] = [];
export function PortfolioSection() {
  if (portfolio.length === 0) return null;
  return <section className="temura-section temura-container"><h2 className="type-display">Portofolio</h2><div className="temura-design-grid">{portfolio.map((item) => <Link key={item.url} href={item.url}>{item.name}</Link>)}</div></section>;
}
