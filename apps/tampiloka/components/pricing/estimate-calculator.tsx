"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy, Minus, Plus } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { PricingLink } from "@/components/pricing/pricing-link";
import { CONTACT } from "@/lib/seo";
import { ADDONS, ADDON_GROUPS, CARE_PLANS, DOMAIN_OPTIONS, LAUNCH_DISCOUNT, WEBSITE_PLANS, addonAvailability, calculateEstimate, estimateText, formatCurrency, isAddonAvailable, normalPrice, readEstimateUrl, writeEstimateUrl, type AddonQuantities, type CareId, type DomainId, type PlanId } from "@/lib/pricing";
import { addonCopy, careLabel, domainLabel, estimateTerms, launchDiscountLabel, planLabel, pricingCopy } from "@/i18n/pricing-copy";
import type { Locale } from "@/i18n/routing";

function SelectField({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return <div className="estimate-field"><label className="type-label" htmlFor={id}>{label}</label><div className="estimate-select"><select className="type-body" id={id} value={value} onChange={(event) => onChange(event.target.value)}>{children}</select><ChevronDown size={16} aria-hidden="true" /></div></div>;
}

function AddonControl({ addon, locale, quantity, disabledReason, onChange }: { addon: (typeof ADDONS)[number]; locale: Locale; quantity: number; disabledReason?: string; onChange: (value: number) => void }) {
  const inputId = `addon-${addon.id}`;
  const translated = addonCopy(locale, addon.id, "unitQuantity" in addon ? addon.unitQuantity : 1);
  const price = `${formatCurrency(addon.price, locale)} · ${translated.unit}`;
  return <div className={`estimate-addon${disabledReason ? " estimate-addon--disabled" : ""}`}>
    <label htmlFor={inputId}><span className="type-body">{translated.name}</span><span className="type-body-sm">{disabledReason || price}</span></label>
    {addon.max === 1 ? <input id={inputId} type="checkbox" checked={quantity === 1} disabled={Boolean(disabledReason)} onChange={(event) => onChange(event.target.checked ? 1 : 0)} /> : <div className="estimate-stepper"><button type="button" aria-label={pricingCopy(locale).estimate.reduce(translated.name)} disabled={Boolean(disabledReason) || quantity === 0} onClick={() => onChange(quantity - 1)}><Minus size={13} aria-hidden="true" /></button><input id={inputId} className="type-label" type="number" min={0} max={addon.max} value={quantity} disabled={Boolean(disabledReason)} onChange={(event) => onChange(Math.min(addon.max, Math.max(0, Math.floor(Number(event.target.value) || 0))))} /><button type="button" aria-label={pricingCopy(locale).estimate.increase(translated.name)} disabled={Boolean(disabledReason) || quantity === addon.max} onClick={() => onChange(quantity + 1)}><Plus size={13} aria-hidden="true" /></button></div>}
  </div>;
}

export function EstimateCalculator() {
  const locale = useLocale() as Locale;
  const copy = pricingCopy(locale).estimate;
  const [planId, setPlanId] = useState<PlanId>("menu");
  const [domainId, setDomainId] = useState<DomainId>("com");
  const [careId, setCareId] = useState<CareId>("none");
  const [quantities, setQuantities] = useState<AddonQuantities>({});
  const [hydrated, setHydrated] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [copyFallback, setCopyFallback] = useState(false);
  const estimate = calculateEstimate(planId, domainId, careId, quantities);
  const text = useMemo(() => estimateText(estimate, locale), [estimate, locale]);

  const syncFromUrl = useCallback(() => {
    const current = readEstimateUrl(new URL(window.location.href));
    setPlanId(current.planId);
    setDomainId(current.domainId);
    setCareId(current.careId);
    setQuantities(current.quantities);
    setCopiedText("");
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      syncFromUrl();
      setHydrated(true);
    });
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
    };
  }, [syncFromUrl]);

  useEffect(() => {
    if (!hydrated) return;
    const url = writeEstimateUrl(new URL(window.location.href), { planId, domainId, careId, quantities });
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [hydrated, planId, domainId, careId, quantities]);

  const selectPlan = useCallback((id: PlanId) => {
    setPlanId(id);
    setQuantities((current) => Object.fromEntries(Object.entries(current).filter(([key]) => isAddonAvailable(key as (typeof ADDONS)[number]["id"], id))));
  }, []);

  async function copyEstimate() {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setCopyFallback(false);
    } catch {
      setCopyFallback(true);
    }
  }

  function reset() {
    setPlanId("menu"); setDomainId("com"); setCareId("none"); setQuantities({}); setCopiedText(""); setCopyFallback(false);
  }

  return <div className="estimate-calculator">
    <form className="estimate-options" onSubmit={(event) => event.preventDefault()} aria-label={copy.formLabel}>
      <div className="estimate-options__top"><button type="button" className="estimate-reset type-label" onClick={reset}>{copy.reset}</button></div>
      <fieldset className="estimate-packages"><legend className="type-label">{copy.planLabel}</legend><div className="estimate-package-options">{WEBSITE_PLANS.map((plan) => <label key={plan.id} className={`estimate-package${planId === plan.id ? " is-selected" : ""}`}><input type="radio" name="paket" value={plan.id} checked={planId === plan.id} onChange={() => selectPlan(plan.id)} /><span className="type-label">{planLabel(locale, plan.id)}</span></label>)}</div></fieldset>
      <div className="estimate-selects"><SelectField id="estimate-domain" label={copy.address} value={domainId} onChange={(value) => setDomainId(value as DomainId)}>{DOMAIN_OPTIONS.map((domain) => <option key={domain.id} value={domain.id}>{domainLabel(locale, domain.id)} · {domain.price ? `${formatCurrency(domain.price, locale)}/${locale === "id" ? "tahun" : "year"}` : copy.free}</option>)}</SelectField><SelectField id="estimate-care" label={copy.care} value={careId} onChange={(value) => setCareId(value as CareId)}>{CARE_PLANS.map((care) => <option key={care.id} value={care.id}>{care.id === "none" ? copy.noSubscription : `${careLabel(locale, care.id)} · ${formatCurrency(care.price, locale)}/${locale === "id" ? "bulan" : "month"}`}</option>)}</SelectField></div>
      {domainId === "own" || careId !== "none" ? <p className="estimate-domain-note type-body">{domainId === "own" ? copy.ownDomainRenewal : ""}{careId !== "none" ? `${careLabel(locale, careId)}: ${formatCurrency(estimate.care.price * 3, locale)} ${copy.paidEvery}` : ""}</p> : null}
      <div className="estimate-addons"><h3 className="estimate-addons__heading type-label">{copy.addons}</h3>{ADDON_GROUPS.map((group) => <details className="estimate-addon-group" key={group}><summary className="type-label"><span>{copy.groups[group]}</span><ChevronDown size={16} aria-hidden="true" /></summary><div>{ADDONS.filter((addon) => addon.group === group).map((addon) => <AddonControl key={addon.id} addon={addon} locale={locale} quantity={addonAvailability(addon.id, planId, locale) ? 0 : quantities[addon.id] || 0} disabledReason={addonAvailability(addon.id, planId, locale)} onChange={(value) => setQuantities((current) => ({ ...current, [addon.id]: value }))} />)}</div></details>)}</div>
    </form>
    <aside className="estimate-summary" aria-labelledby="estimate-summary-title">
      <div className="estimate-summary__total" aria-live="polite" aria-atomic="true"><p id="estimate-summary-title" className="type-body">{copy.firstYear}</p><output key={estimate.firstYear} className="type-heading-1 estimate-total" aria-label={`${locale === "id" ? "Total tahun pertama" : "First-year total"}`}>{formatCurrency(estimate.firstYear, locale)}</output></div>
      <dl className="estimate-breakdown type-body"><div><dt>{copy.website(planLabel(locale, estimate.plan.id))}</dt><dd>{formatCurrency(normalPrice(estimate.plan.price), locale)}</dd></div><div className="estimate-breakdown__saving"><dt>{launchDiscountLabel(locale, Math.round(LAUNCH_DISCOUNT * 100))}</dt><dd>−{formatCurrency(estimate.savings, locale)}</dd></div><div><dt>{domainLabel(locale, estimate.domain.id)}</dt><dd>{estimate.domain.price ? formatCurrency(estimate.domain.price, locale) : copy.free}</dd></div><div><dt>{copy.hosting}</dt><dd>{copy.included}</dd></div>{estimate.annualCare ? <div><dt>{careLabel(locale, estimate.care.id)} · 12 {locale === "id" ? "bulan" : "months"}</dt><dd>{formatCurrency(estimate.annualCare, locale)}</dd></div> : null}{estimate.addons.map((addon) => <div key={addon.id}><dt>{addonCopy(locale, addon.id, "unitQuantity" in addon ? addon.unitQuantity : 1).name}{addon.quantity > 1 ? ` × ${addon.quantity}` : ""}</dt><dd>{formatCurrency(addon.total, locale)}</dd></div>)}</dl>
      <div className="estimate-renewal" aria-live="polite" aria-atomic="true"><div><span className="type-label">{copy.secondYear}</span><output className="type-heading-4" aria-label={`${locale === "id" ? "Total tahun kedua" : "Second-year total"}`}>{formatCurrency(estimate.secondYear, locale)}<span className="type-caption">{copy.timeSuffix}</span></output></div></div>
      <PricingLink variant="brand" className="estimate-cta" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`${locale === "id" ? "Halo Tampiloka, saya ingin membahas pembuatan website dengan estimasi berikut." : "Hello Tampiloka, I’d like to discuss a website build with this estimate."}\n\n${text}`)}`} target="_blank" rel="noopener noreferrer">{copy.cta} <ArrowUpRight aria-hidden="true" /></PricingLink>
      <Button variant="ghost" size="lg" className="pricing-action estimate-copy" onClick={copyEstimate}>{copiedText === text ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copiedText === text ? copy.copied : copy.copy}</Button>
      <span className="sr-only" role="status">{copiedText === text ? copy.copiedStatus : ""}</span>
      {copyFallback ? <div className="estimate-copy-fallback"><label htmlFor="estimate-copy-text" className="type-caption">{copy.fallbackLabel}</label><textarea id="estimate-copy-text" readOnly value={text} className="type-body-sm" onFocus={(event) => event.target.select()} /></div> : null}
      <details className="estimate-terms"><summary className="type-body">{copy.termsTitle}</summary><p className="type-body">{estimateTerms(locale, Math.round(LAUNCH_DISCOUNT * 100))}</p></details>
    </aside>
  </div>;
}
