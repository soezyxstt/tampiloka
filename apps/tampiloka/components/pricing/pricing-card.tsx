import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PricingLink } from "@/components/pricing/pricing-link";
import { formatPromoPrice, formatRupiah, normalPrice, WEBSITE_PLANS } from "@/lib/pricing";
import { CONTACT } from "@/lib/seo";

export function PricingCard({ plan }: { plan: (typeof WEBSITE_PLANS)[number] }) {
  const inherited = plan.id === "menu" ? "Semua fitur Essential" : plan.id === "signature" ? "Semua fitur Menu" : undefined;
  return <article className={`pricing-card${plan.id === "menu" ? " pricing-card--featured" : ""}`} aria-labelledby={`plan-${plan.id}`}>
    <h2 id={`plan-${plan.id}`} className="type-heading-4">{plan.name}</h2>
    <div className="pricing-card__price">
      <s className="pricing-card__original type-body">{formatRupiah(normalPrice(plan.price))}</s>
      <p className="type-heading-2" aria-label={formatRupiah(plan.price)}>{formatPromoPrice(plan.price)}</p>
    </div>
    <PricingLink className="pricing-button" variant={plan.id === "menu" ? "brand" : "outline"} href={`#estimasi-${plan.id}`}>Pilih {plan.name} <ArrowRight aria-hidden="true" /></PricingLink>
    <ul className="pricing-card__features type-body">
      {(inherited ? [inherited, ...plan.features] : plan.features).map((feature) => <li key={feature}><Check aria-hidden="true" size={16} /><span>{feature}</span></li>)}
    </ul>
    <p className="pricing-card__meta type-body-sm">{plan.revisions} revisi · {plan.timeline}</p>
  </article>;
}

export function CustomPricingCard() {
  return <article className="pricing-card pricing-card--custom" aria-labelledby="plan-custom">
    <h2 id="plan-custom" className="type-heading-4">Custom</h2>
    <div className="pricing-card__price pricing-card__price--custom"><p className="type-heading-3">Sesuai kebutuhan</p></div>
    <PricingLink className="pricing-button" href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Halo Tampiloka, saya ingin berdiskusi tentang paket Custom untuk kafe saya.")}`} target="_blank" rel="noopener noreferrer">Hubungi kami <ArrowUpRight aria-hidden="true" /></PricingLink>
    <ul className="pricing-card__features type-body">{["Pemesanan QR dari meja", "Dashboard pesanan & kasir", "Pembayaran digital", "Stok & laporan usaha"].map((feature) => <li key={feature}><Check aria-hidden="true" size={16} /><span>{feature}</span></li>)}</ul>
    <p className="pricing-card__meta type-body-sm">Biaya operasional terpisah.</p>
  </article>;
}
