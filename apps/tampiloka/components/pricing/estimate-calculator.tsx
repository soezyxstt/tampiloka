"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingLink } from "@/components/pricing/pricing-link";
import { CONTACT } from "@/lib/seo";
import { ADDONS, ADDON_GROUPS, CARE_PLANS, DOMAIN_OPTIONS, WEBSITE_PLANS, addonAvailability, calculateEstimate, estimateText, formatRupiah, normalPrice, type AddonQuantities, type CareId, type DomainId, type PlanId } from "@/lib/pricing";

function SelectField({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return <div className="estimate-field"><label className="type-label" htmlFor={id}>{label}</label><div className="estimate-select"><select className="type-body" id={id} value={value} onChange={(event) => onChange(event.target.value)}>{children}</select><ChevronDown size={16} aria-hidden="true" /></div></div>;
}

function AddonControl({ addon, quantity, disabledReason, onChange }: { addon: (typeof ADDONS)[number]; quantity: number; disabledReason?: string; onChange: (value: number) => void }) {
  const inputId = `addon-${addon.id}`;
  return <div className={`estimate-addon${disabledReason ? " estimate-addon--disabled" : ""}`}>
    <label htmlFor={inputId}><span className="type-body">{addon.name}</span><span className="type-body-sm">{disabledReason || `${formatRupiah(addon.price)} · ${addon.unit}`}</span></label>
    {addon.max === 1 ? <input id={inputId} type="checkbox" checked={quantity === 1} disabled={Boolean(disabledReason)} onChange={(event) => onChange(event.target.checked ? 1 : 0)} /> : <div className="estimate-stepper"><button type="button" aria-label={`Kurangi ${addon.name}`} disabled={Boolean(disabledReason) || quantity === 0} onClick={() => onChange(quantity - 1)}><Minus size={13} aria-hidden="true" /></button><input id={inputId} className="type-label" type="number" min={0} max={addon.max} value={quantity} disabled={Boolean(disabledReason)} onChange={(event) => onChange(Math.min(addon.max, Math.max(0, Math.floor(Number(event.target.value) || 0))))} /><button type="button" aria-label={`Tambah ${addon.name}`} disabled={Boolean(disabledReason) || quantity === addon.max} onClick={() => onChange(quantity + 1)}><Plus size={13} aria-hidden="true" /></button></div>}
  </div>;
}

export function EstimateCalculator() {
  const [planId, setPlanId] = useState<PlanId>("menu");
  const [domainId, setDomainId] = useState<DomainId>("com");
  const [careId, setCareId] = useState<CareId>("none");
  const [quantities, setQuantities] = useState<AddonQuantities>({});
  const [copiedText, setCopiedText] = useState("");
  const [copyFallback, setCopyFallback] = useState(false);
  const estimate = calculateEstimate(planId, domainId, careId, quantities);
  const text = estimateText(estimate);

  const selectPlan = useCallback((id: PlanId) => {
    setPlanId(id);
    setQuantities((current) => Object.fromEntries(Object.entries(current).filter(([key]) => !addonAvailability(key as (typeof ADDONS)[number]["id"], id))));
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#estimasi-${id}`);
  }, []);

  useEffect(() => {
    function syncFromHash() {
      const id = window.location.hash.replace("#estimasi-", "");
      const plan = WEBSITE_PLANS.find((item) => item.id === id);
      if (plan) selectPlan(plan.id);
    }
    const frame = window.requestAnimationFrame(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", syncFromHash); };
  }, [selectPlan]);

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
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#estimasi`);
  }

  return <div className="estimate-calculator">
    <form className="estimate-options" onSubmit={(event) => event.preventDefault()} aria-label="Kalkulator estimasi website">
      <div className="estimate-options__top"><button type="button" className="estimate-reset type-label" onClick={reset}>Reset</button></div>
      <fieldset className="estimate-packages"><legend className="type-label">Paket website</legend><div className="estimate-package-options">{WEBSITE_PLANS.map((plan) => <label key={plan.id} className={`estimate-package${planId === plan.id ? " is-selected" : ""}`}><input type="radio" name="paket" value={plan.id} checked={planId === plan.id} onChange={() => selectPlan(plan.id)} /><span className="type-label">{plan.name}</span></label>)}</div></fieldset>
      <div className="estimate-selects"><SelectField id="estimate-domain" label="Alamat website" value={domainId} onChange={(value) => setDomainId(value as DomainId)}>{DOMAIN_OPTIONS.map((domain) => <option key={domain.id} value={domain.id}>{domain.name} · {domain.price ? `${formatRupiah(domain.price)}/tahun` : "Gratis"}</option>)}</SelectField><SelectField id="estimate-care" label="Perawatan konten" value={careId} onChange={(value) => setCareId(value as CareId)}>{CARE_PLANS.map((care) => <option key={care.id} value={care.id}>{care.id === "none" ? "Tanpa langganan" : `${care.name} · ${formatRupiah(care.price)}/bulan`}</option>)}</SelectField></div>
      {domainId === "own" || careId !== "none" ? <p className="estimate-domain-note type-body">{domainId === "own" ? "Perpanjangan domain dibayar langsung ke penyedia. " : ""}{careId !== "none" ? `${estimate.care.name}: ${formatRupiah(estimate.care.price * 3)} setiap 3 bulan.` : ""}</p> : null}
      <div className="estimate-addons"><h3 className="estimate-addons__heading type-label">Tambahan</h3>{ADDON_GROUPS.map((group) => <details className="estimate-addon-group" key={group}><summary className="type-label"><span>{group}</span><ChevronDown size={16} aria-hidden="true" /></summary><div>{ADDONS.filter((addon) => addon.group === group).map((addon) => <AddonControl key={addon.id} addon={addon} quantity={addonAvailability(addon.id, planId) ? 0 : quantities[addon.id] || 0} disabledReason={addonAvailability(addon.id, planId)} onChange={(value) => setQuantities((current) => ({ ...current, [addon.id]: value }))} />)}</div></details>)}</div>
    </form>
    <aside className="estimate-summary" aria-labelledby="estimate-summary-title">
      <div className="estimate-summary__total" aria-live="polite" aria-atomic="true"><p id="estimate-summary-title" className="type-body">Tahun pertama</p><output key={estimate.firstYear} className="type-heading-1 estimate-total" aria-label="Total tahun pertama">{formatRupiah(estimate.firstYear)}</output></div>
      <dl className="estimate-breakdown type-body"><div><dt>Website {estimate.plan.name}</dt><dd>{formatRupiah(normalPrice(estimate.plan.price))}</dd></div><div className="estimate-breakdown__saving"><dt>Promo peluncuran 40%</dt><dd>−{formatRupiah(estimate.savings)}</dd></div><div><dt>{estimate.domain.name}</dt><dd>{estimate.domain.price ? formatRupiah(estimate.domain.price) : "Gratis"}</dd></div><div><dt>Hosting & SSL · 12 bulan</dt><dd>Termasuk</dd></div>{estimate.annualCare ? <div><dt>{estimate.care.name} · 12 bulan</dt><dd>{formatRupiah(estimate.annualCare)}</dd></div> : null}{estimate.addons.map((addon) => <div key={addon.id}><dt>{addon.name}{addon.quantity > 1 ? ` × ${addon.quantity}` : ""}</dt><dd>{formatRupiah(addon.total)}</dd></div>)}</dl>
      <div className="estimate-renewal" aria-live="polite" aria-atomic="true"><div><span className="type-label">Tahun kedua</span><output className="type-heading-4" aria-label="Total tahun kedua">{formatRupiah(estimate.secondYear)}<span className="type-caption">/tahun</span></output></div></div>
      <PricingLink variant="brand" className="estimate-cta" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Halo Tampiloka, saya ingin membahas pembuatan website dengan estimasi berikut.\n\n${text}`)}`} target="_blank" rel="noopener noreferrer">Bahas lewat WhatsApp <ArrowUpRight aria-hidden="true" /></PricingLink>
      <Button variant="ghost" size="lg" className="pricing-action estimate-copy" onClick={copyEstimate}>{copiedText === text ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copiedText === text ? "Estimasi tersalin" : "Salin estimasi"}</Button>
      <span className="sr-only" role="status">{copiedText === text ? "Estimasi berhasil disalin." : ""}</span>
      {copyFallback ? <div className="estimate-copy-fallback"><label htmlFor="estimate-copy-text" className="type-caption">Penyalinan otomatis tidak tersedia. Pilih teks berikut untuk menyalinnya.</label><textarea id="estimate-copy-text" readOnly value={text} className="type-body-sm" onFocus={(event) => event.target.select()} /></div> : null}
      <details className="estimate-terms"><summary className="type-body">Ketentuan estimasi</summary><p className="type-body">Promo 40% hanya untuk pembuatan. Care dihitung untuk 12 bulan dan dibayar setiap 3 bulan. Perubahan tanpa langganan dan pajak yang mungkin berlaku belum termasuk. Perpanjangan memakai tarif saat ini. Harga akhir mengikuti lingkup yang disepakati.</p></details>
    </aside>
  </div>;
}
