import type { Locale } from "@/i18n/routing";
import { addonCopy, careLabel, domainLabel, launchDiscountLabel, planLabel, pricingCopy } from "@/i18n/pricing-copy";

export const LAUNCH_DISCOUNT = 0.4;
export const HOSTING_ANNUAL = 299_000;
export const ON_DEMAND_REQUEST_PRICE = 119_000;
export const CARE_REQUEST_MENU_LIMIT = 5;
export const TECHNICAL_FIX_WINDOW_DAYS = 30;
export const PROJECT_DEPOSIT_PERCENT = 50;

export const formatCurrency = (value: number, locale: Locale = "id") => new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value).replace(locale === "id" ? /\s/g : /\u00a0/g, locale === "id" ? "" : " ");
export const formatRupiah = (value: number) => formatCurrency(value, "id");
export const formatPromoPrice = (value: number, locale: Locale = "id") => locale === "id"
  ? `Rp${new Intl.NumberFormat("id-ID").format(value / 1_000)}k`
  : `${formatCurrency(value, locale)}`;
// The brief supplies promotional prices. Round their pre-discount equivalents to rupiah.
export const normalPrice = (price: number) => Math.round(price / (1 - LAUNCH_DISCOUNT));

export const WEBSITE_PLANS = [
  { id: "essential", price: 999_000, pages: 1, sections: 5, featuredItems: 6, catalogItems: 0, additionalPages: 0, revisions: 1, durationDays: [3, 5], menuSearch: false, digitalQr: false, reservation: false, layout: "limited" },
  { id: "menu", price: 1_699_000, pages: 1, sections: 5, featuredItems: 6, catalogItems: 30, additionalPages: 0, revisions: 2, durationDays: [5, 8], menuSearch: true, digitalQr: true, reservation: false, layout: "more" },
  { id: "signature", price: 2_499_000, pages: 1, sections: 5, featuredItems: 6, catalogItems: 60, additionalPages: 1, revisions: 2, durationDays: [7, 12], menuSearch: true, digitalQr: true, reservation: true, layout: "flexible" },
] as const;
export type PlanId = (typeof WEBSITE_PLANS)[number]["id"];

export const DOMAIN_OPTIONS = [
  { id: "subdomain", example: "namausaha.tampiloka.site", price: 0 },
  { id: "com", example: "namausaha.com", price: 299_000 },
  { id: "id", example: "namausaha.id", price: 299_000 },
  { id: "co-id", example: "namausaha.co.id", price: 399_000 },
  { id: "own", example: "Koneksi awal standar gratis", price: 0 },
] as const;
export type DomainId = (typeof DOMAIN_OPTIONS)[number]["id"];

export const CARE_PLANS = [
  { id: "none", price: 0, requestsPerMonth: 0, durationDays: null },
  { id: "care", price: 79_000, requestsPerMonth: 1, durationDays: 3 },
  { id: "plus", price: 179_000, requestsPerMonth: 3, durationDays: 2 },
] as const;
export type CareId = (typeof CARE_PLANS)[number]["id"];

export const ADDON_GROUPS = ["website", "content"] as const;
export const ADDONS = [
  { id: "section", group: "website", price: 149_000, max: 10 },
  { id: "page", group: "website", price: 349_000, max: 10 },
  { id: "reservation", group: "website", price: 249_000, max: 1, unavailablePlans: ["signature"] },
  { id: "cart", group: "website", price: 499_000, max: 1 },
  { id: "branch", group: "website", price: 199_000, max: 10 },
  { id: "english", group: "website", price: 399_000, max: 10 },
  { id: "revision", group: "website", price: 149_000, max: 10 },
  { id: "catalog", group: "content", price: 99_000, max: 10, unitQuantity: 10, unavailablePlans: ["essential"] },
  { id: "photos", group: "content", price: 149_000, max: 10, unitQuantity: 10 },
  { id: "copy", group: "content", price: 199_000, max: 1 },
  { id: "wordmark", group: "content", price: 299_000, max: 1 },
  { id: "business", group: "content", price: 199_000, max: 1 },
  { id: "qr", group: "content", price: 149_000, max: 1 },
] as const;
export type AddonId = (typeof ADDONS)[number]["id"];
export type AddonQuantities = Partial<Record<AddonId, number>>;

export function formatBusinessDays(days: readonly [number, number], locale: Locale): string {
  return locale === "id" ? `${days[0]}–${days[1]} hari kerja` : `${days[0]}–${days[1]} business days`;
}

export function readEstimateUrl(url: URL) {
  const validPlan = WEBSITE_PLANS.find((item) => item.id === url.searchParams.get("plan"))?.id;
  const hashPlan = url.hash.startsWith("#estimasi-")
    ? WEBSITE_PLANS.find((item) => item.id === url.hash.slice("#estimasi-".length))?.id
    : undefined;
  const domain = DOMAIN_OPTIONS.find((item) => item.id === url.searchParams.get("domain"))?.id;
  const care = CARE_PLANS.find((item) => item.id === url.searchParams.get("care"))?.id;
  const quantities: AddonQuantities = {};
  const serialized = url.searchParams.get("addons");
  if (serialized && serialized.length <= 160) {
    for (const pair of serialized.split(",")) {
      const [rawId, rawQuantity, ...extra] = pair.split(":");
      const addon = ADDONS.find((item) => item.id === rawId);
      if (!addon || extra.length || !/^\d{1,2}$/.test(rawQuantity ?? "")) continue;
      const quantity = Number(rawQuantity);
      if (quantity > 0 && quantity <= addon.max) quantities[addon.id] = quantity;
    }
  }
  const planId = hashPlan ?? validPlan ?? WEBSITE_PLANS[1].id;
  for (const addon of ADDONS) if (!isAddonAvailable(addon.id, planId)) delete quantities[addon.id];
  return {
    planId,
    domainId: domain ?? DOMAIN_OPTIONS[1].id,
    careId: care ?? CARE_PLANS[0].id,
    quantities,
  };
}

export function writeEstimateUrl(url: URL, estimate: { planId: PlanId; domainId: DomainId; careId: CareId; quantities: AddonQuantities }) {
  url.searchParams.set("plan", estimate.planId);
  url.searchParams.set("domain", estimate.domainId);
  url.searchParams.set("care", estimate.careId);
  const addons = ADDONS.flatMap((addon) => {
    const quantity = Math.min(addon.max, Math.max(0, Math.floor(estimate.quantities[addon.id] ?? 0)));
    return quantity && isAddonAvailable(addon.id, estimate.planId) ? [`${addon.id}:${quantity}`] : [];
  }).join(",");
  if (addons) url.searchParams.set("addons", addons);
  else url.searchParams.delete("addons");
  if (url.hash === "#estimasi" || url.hash.startsWith("#estimasi-")) {
    url.hash = estimate.planId === "menu" ? "estimasi" : `estimasi-${estimate.planId}`;
  }
  return url;
}

export function isAddonAvailable(id: AddonId, plan: PlanId): boolean {
  const addon = ADDONS.find((item) => item.id === id)!;
  return !("unavailablePlans" in addon && (addon.unavailablePlans as readonly PlanId[] | undefined)?.includes(plan));
}

export function addonAvailability(id: AddonId, plan: PlanId, locale: Locale = "id"): string | undefined {
  return isAddonAvailable(id, plan) ? undefined : addonCopy(locale, id).disabled?.[plan];
}

export function calculateEstimate(planId: PlanId, domainId: DomainId, careId: CareId, quantities: AddonQuantities) {
  const plan = WEBSITE_PLANS.find((item) => item.id === planId)!;
  const domain = DOMAIN_OPTIONS.find((item) => item.id === domainId)!;
  const care = CARE_PLANS.find((item) => item.id === careId)!;
  const addons = ADDONS.flatMap((addon) => {
    const quantity = isAddonAvailable(addon.id, planId) ? Math.min(addon.max, Math.max(0, Math.floor(quantities[addon.id] || 0))) : 0;
    return quantity ? [{ ...addon, quantity, total: quantity * addon.price }] : [];
  });
  const addonTotal = addons.reduce((sum, item) => sum + item.total, 0);
  const annualCare = care.price * 12;
  const savings = normalPrice(plan.price) - plan.price;
  return { plan, domain, care, addons, addonTotal, annualCare, savings, firstYear: plan.price + domain.price + annualCare + addonTotal, secondYear: HOSTING_ANNUAL + domain.price + annualCare };
}

export function estimateText(estimate: ReturnType<typeof calculateEstimate>, locale: Locale = "id") {
  const copy = pricingCopy(locale).estimate;
  const { plan, domain, care, addons, firstYear, secondYear, savings } = estimate;
  const domainName = domainLabel(locale, domain.id);
  const careName = careLabel(locale, care.id);
  const planName = planLabel(locale, plan.id);
  return [
    locale === "id" ? "Estimasi website bisnis — Tampiloka" : "Business website estimate — Tampiloka",
    `${locale === "id" ? "Paket" : "Package"} ${planName}: ${formatCurrency(plan.price, locale)} (${launchDiscountLabel(locale, Math.round(LAUNCH_DISCOUNT * 100))}; ${locale === "id" ? "hemat" : "save"} ${formatCurrency(savings, locale)})`,
    `${locale === "id" ? "Domain" : "Domain"}: ${domainName} — ${domain.price ? `${formatCurrency(domain.price, locale)}${copy.timeSuffix}` : domain.id === "own" ? copy.ownDomainEstimate : copy.includedWhileActive}`,
    domain.id === "own" ? copy.ownRenewalOutside : domain.example,
    ...(care.price ? [`${copy.careLine(careName)} — ${formatCurrency(care.price, locale)}/${locale === "id" ? "bulan" : "month"}.`, `${copy.calculatedForYear} ${formatCurrency(care.price * 3, locale)} ${copy.paidEvery}`] : [copy.noCare(formatCurrency(ON_DEMAND_REQUEST_PRICE, locale))]),
    ...addons.map((addon) => `${addonCopy(locale, addon.id, "unitQuantity" in addon ? addon.unitQuantity : 1).name} × ${addon.quantity}: ${formatCurrency(addon.total, locale)} (${locale === "id" ? "sekali bayar" : "one-time"})`),
    copy.hostingTermsText(formatCurrency(HOSTING_ANNUAL, locale)),
    `${locale === "id" ? "Total tahun pertama" : "First-year total"}: ${formatCurrency(firstYear, locale)}`,
    `${locale === "id" ? "Total tahun kedua" : "Second-year total"}: ${formatCurrency(secondYear, locale)}`,
    copy.estimateDisclaimer,
  ].join("\n");
}

export function pricingFaqs(locale: Locale) {
  const replacements: Record<string, string> = {
    discountPercent: String(Math.round(LAUNCH_DISCOUNT * 100)),
    onDemandPrice: formatCurrency(ON_DEMAND_REQUEST_PRICE, locale),
    depositPercent: String(PROJECT_DEPOSIT_PERCENT),
    careMenuLimit: String(CARE_REQUEST_MENU_LIMIT),
    fixWindowDays: String(TECHNICAL_FIX_WINDOW_DAYS),
  };
  return pricingCopy(locale).faqs.map((faq) => ({
    question: faq.question.replace(/\{([^}]+)\}/g, (_, key: string) => replacements[key] ?? ""),
    answer: faq.answer.replace(/\{([^}]+)\}/g, (_, key: string) => replacements[key] ?? ""),
  }));
}
