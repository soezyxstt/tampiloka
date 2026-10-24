import { ArrowDown, ArrowUpRight, Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PricingCard, CustomPricingCard } from "@/components/pricing/pricing-card";
import { PricingSectionHeading } from "@/components/pricing/section-heading";
import { EstimateCalculator } from "@/components/pricing/estimate-calculator";
import { PricingLink } from "@/components/pricing/pricing-link";
import { JsonLd } from "@/components/json-ld";
import { CARE_PLANS, CARE_REQUEST_MENU_LIMIT, DOMAIN_OPTIONS, HOSTING_ANNUAL, LAUNCH_DISCOUNT, ON_DEMAND_REQUEST_PRICE, pricingFaqs, WEBSITE_PLANS, formatBusinessDays, formatCurrency, formatPromoPrice } from "@/lib/pricing";
import { careLabel, planLabel, pricingCopy, pricingHeroDescription, pricingMetadataDescription, pricingSchemaDescription } from "@/i18n/pricing-copy";
import { locales, type Locale } from "@/i18n/routing";
import { createPageMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import "./pricing.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const copy = pricingCopy(locale);
  const discountPercent = Math.round(LAUNCH_DISCOUNT * 100);
  return createPageMetadata({ path: "/paket", locale, title: copy.metadataTitle, description: pricingMetadataDescription(locale, formatCurrency(WEBSITE_PLANS[0].price, locale), discountPercent), imageAlt: copy.metaImageAlt });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = await getLocale() as Locale;
  const copy = pricingCopy(locale);
  const faqs = pricingFaqs(locale);
  const discountPercent = Math.round(LAUNCH_DISCOUNT * 100);
  const included = copy.includedLabel;
  const excluded = copy.notIncluded;
  const comparisonValues = [
    WEBSITE_PLANS.map((plan) => `${plan.pages} ${locale === "id" ? "halaman" : plan.pages === 1 ? "page" : "pages"} · ${locale === "id" ? `hingga ${plan.sections} bagian` : `up to ${plan.sections} sections`}`),
    WEBSITE_PLANS.map((plan) => `${plan.featuredItems} ${locale === "id" ? "item" : "items"}`),
    WEBSITE_PLANS.map((plan) => plan.catalogItems ? `${plan.catalogItems} ${locale === "id" ? "item" : "items"}` : excluded),
    WEBSITE_PLANS.map((plan) => plan.menuSearch ? included : excluded),
    WEBSITE_PLANS.map((plan) => plan.digitalQr ? included : excluded),
    WEBSITE_PLANS.map((plan) => plan.additionalPages ? `${plan.additionalPages} ${locale === "id" ? "halaman" : "page"}` : excluded),
    WEBSITE_PLANS.map((plan) => plan.reservation ? included : excluded),
    WEBSITE_PLANS.map((plan) => copy.layouts[plan.layout]),
    WEBSITE_PLANS.map((plan) => `${plan.revisions} ${locale === "id" ? (plan.revisions === 1 ? "kali" : "kali") : (plan.revisions === 1 ? "round" : "rounds")}`),
    WEBSITE_PLANS.map((plan) => formatBusinessDays(plan.durationDays, locale)),
  ];
  const comparison = copy.comparison.map((name, index) => ({ name, values: comparisonValues[index] }));
  return <div className="pricing-page">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [webPageSchema({ path: "/paket", locale, title: copy.schemaTitle, description: pricingSchemaDescription(locale, discountPercent) }), faqSchema(faqs, locale)] }} />
    <section className="pricing-hero" aria-labelledby="pricing-title">
      <div><h1 id="pricing-title" className="type-display">{copy.heroTitle}</h1><p className="type-body-lg">{pricingHeroDescription(locale, discountPercent)}</p></div>
      <a href="#estimasi" className="pricing-text-link type-label">{copy.estimateJump} <ArrowDown size={16} aria-hidden="true" /></a>
    </section>

    <section className="pricing-plans" aria-label={copy.plansLabel}>
      <div className="pricing-grid">{WEBSITE_PLANS.map((plan) => <PricingCard key={plan.id} plan={plan} locale={locale} />)}<CustomPricingCard locale={locale} /></div>
      <p className="pricing-included type-body">{copy.included}</p>
    </section>

    <section className="pricing-section pricing-estimate-section" id="estimasi" aria-labelledby="estimate-title">
      {WEBSITE_PLANS.map((plan) => <span key={plan.id} id={`estimasi-${plan.id}`} className="pricing-anchor" aria-hidden="true" />)}
      <PricingSectionHeading title={copy.estimateTitle} id="estimate-title" />
      <EstimateCalculator />
    </section>

    <section className="pricing-section" id="bandingkan" aria-labelledby="comparison-title">
      <PricingSectionHeading title={copy.comparisonTitle} id="comparison-title" />
      <div className="pricing-comparison-wrap" role="region" aria-label={copy.compareRegion} tabIndex={0}><table className="pricing-comparison type-body"><caption className="sr-only">{copy.compareCaption}</caption><thead><tr><th scope="col">{copy.feature}</th>{WEBSITE_PLANS.map((plan) => <th scope="col" key={plan.id}>{planLabel(locale, plan.id)}</th>)}</tr></thead><tbody>{comparison.map((row) => <tr key={row.name}><th scope="row">{row.name}</th>{row.values.map((value, index) => <td key={index}>{value === copy.notIncluded ? <><Minus size={16} aria-hidden="true" /><span className="sr-only">{copy.notIncluded}</span></> : value === copy.includedLabel ? <><Check size={18} aria-hidden="true" /><span className="sr-only">{copy.includedLabel}</span></> : value}</td>)}</tr>)}</tbody></table></div>
      <p className="pricing-note type-body">{copy.standardTerms}</p>
    </section>

    <section className="pricing-section" id="domain-hosting" aria-labelledby="domain-title">
      <PricingSectionHeading title={copy.domainTitle} id="domain-title" />
      <div className="pricing-infrastructure">
        <div className="pricing-domains"><h3 className="type-heading-5">{copy.domainHeading}</h3><dl>{DOMAIN_OPTIONS.map((domain) => <div key={domain.id}><dt className="type-body">{domain.id === "own" ? copy.domainOwned : domain.example}</dt><dd className="type-body">{domain.price ? `${formatCurrency(domain.price, locale)}/${locale === "id" ? "tahun" : "year"}` : copy.free}</dd></div>)}</dl><p className="type-body">{copy.domainNote}</p></div>
        <div className="pricing-hosting"><h3 className="type-heading-5">{copy.hostingHeading}</h3><dl className="type-body"><div><dt>{copy.firstYear}</dt><dd>{copy.includedShort}</dd></div><div><dt>{copy.nextYear}</dt><dd>{formatCurrency(HOSTING_ANNUAL, locale)}/{locale === "id" ? "tahun" : "year"}</dd></div></dl><ul className="pricing-check-list type-body">{copy.hostingItems.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><p className="type-body">{copy.hostingTerms}</p></div>
      </div>
    </section>

    <section className="pricing-section pricing-care-section" id="perawatan" aria-labelledby="care-title">
      <PricingSectionHeading title={copy.careTitle} id="care-title" />
      <div className="pricing-care-grid">{CARE_PLANS.map((care) => <article className="pricing-care-card" key={care.id}>
        <h3 className="type-heading-5">{careLabel(locale, care.id)}</h3>
        <p className="pricing-care-card__price type-heading-2">{care.id === "none" ? formatCurrency(ON_DEMAND_REQUEST_PRICE, locale) : formatPromoPrice(care.price, locale)}<span className="type-body">/{care.id === "none" ? copy.careNoneShort : locale === "id" ? "bulan" : "month"}</span></p>
        {care.price ? <><p className="type-body">{care.requestsPerMonth} {locale === "id" ? "permintaan per bulan" : `requests per ${copy.estimate.month}`}</p><p className="type-body">{formatCurrency(care.price * 3, locale)} {locale === "id" ? "setiap 3 bulan." : "every 3 months."}<br />{locale === "id" ? `Maksimal ${care.durationDays} hari kerja setelah bahan lengkap.` : `Within ${care.durationDays} business days after all materials are ready.`}</p></> : <p className="type-body">{copy.noSubscription}</p>}
      </article>)}</div>
      <p className="pricing-note type-body">{copy.careTerms(CARE_REQUEST_MENU_LIMIT)}</p>
      <PricingLink className="pricing-back-link" href="#estimasi">{copy.estimateJump} <ArrowUpRight size={16} aria-hidden="true" /></PricingLink>
    </section>
  </div>;
}
