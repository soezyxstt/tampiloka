import { families } from "./service-pricing.mjs";

const fieldFamilies = { "kafe-restoran": "cafe", umkm: "website", sekolah: "school", "toko-online": "commerce", booking: "booking", portofolio: "website" };
export function familyForField(field) { return Object.hasOwn(fieldFamilies, field) ? fieldFamilies[field] : null; }
export function selectedFamily(value) { return typeof value === "string" && (value === "operations" || families.some(family => family.id === value)) ? value : "cafe"; }
export function familyUrl(href, family) { const url = new URL(href); url.searchParams.set("family", family); return `${url.pathname}${url.search}${url.hash}`; }
export function representativeDemos(entries, family) { return entries.filter(entry => entry.family === family).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 3); }
export function matchesIllustrationUrl(href, source) {
  try {
    const urls = [new URL(href), new URL(source)];
    for (const url of urls) { url.searchParams.delete("lang"); url.searchParams.sort(); }
    return urls[0].href === urls[1].href;
  } catch { return false; }
}
