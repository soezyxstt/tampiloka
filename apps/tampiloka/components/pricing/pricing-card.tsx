import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PricingLink } from "@/components/pricing/pricing-link";
import { formatBusinessDays, formatPromoPrice, formatCurrency, normalPrice, WEBSITE_PLANS } from "@/lib/pricing";
import { CONTACT } from "@/lib/seo";
import { planLabel, pricingCopy } from "@/i18n/pricing-copy";
import type { Locale } from "@/i18n/routing";

export function PricingCard({ plan, locale }: { plan: (typeof WEBSITE_PLANS)[number]; locale: Locale }) {
  const copy = pricingCopy(locale);
  const planName = planLabel(locale, plan.id);
  const content = copy.plan[plan.id];
  const inherited = content.inherited || undefined;
  return <article className={`pricing-card${plan.id === "menu" ? " pricing-card--featured" : ""}`} aria-labelledby={`plan-${plan.id}`}>
    <h2 id={`plan-${plan.id}`} className="type-heading-4">{planName}</h2>
    <div className="pricing-card__price">
      <s className="pricing-card__original type-body">{formatCurrency(normalPrice(plan.price), locale)}</s>
      <p className="type-heading-2" aria-label={formatCurrency(plan.price, locale)}>{formatPromoPrice(plan.price, locale)}</p>
    </div>
    <PricingLink className="pricing-button" variant={plan.id === "menu" ? "brand" : "outline"} href={`#estimasi-${plan.id}`}>{copy.estimate.packageButton(planName)} <ArrowRight aria-hidden="true" /></PricingLink>
    <ul className="pricing-card__features type-body">
      {(inherited ? [inherited, ...content.features(plan)] : content.features(plan)).map((feature) => <li key={feature}><Check aria-hidden="true" size={16} /><span>{feature}</span></li>)}
    </ul>
    <p className="pricing-card__meta type-body-sm">{plan.revisions} {locale === "id" ? "revisi" : "revisions"} · {formatBusinessDays(plan.durationDays, locale)}</p>
  </article>;
}

export function CustomPricingCard({ locale }: { locale: Locale }) {
  const copy = pricingCopy(locale);
  return <article className="pricing-card pricing-card--custom" aria-labelledby="plan-custom">
    <h2 id="plan-custom" className="type-heading-4">Custom</h2>
    <div className="pricing-card__price pricing-card__price--custom"><p className="type-heading-3">{copy.custom.suitable}</p></div>
    <PricingLink className="pricing-button" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(copy.estimate.customGreeting)}`} target="_blank" rel="noopener noreferrer">{copy.custom.contact} <ArrowUpRight aria-hidden="true" /></PricingLink>
    <ul className="pricing-card__features type-body">{copy.custom.features.map((feature) => <li key={feature}><Check aria-hidden="true" size={16} /><span>{feature}</span></li>)}</ul>
    <p className="pricing-card__meta type-body-sm">{copy.custom.meta}</p>
  </article>;
}
