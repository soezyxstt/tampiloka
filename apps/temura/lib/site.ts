const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const defaultSiteUrl = process.env.NODE_ENV === "production"
  ? "https://temura.adihnursyam.com"
  : "http://localhost:3001";

export const siteOrigin = new URL(configuredSiteUrl || defaultSiteUrl).origin;

export function contactLink(packageName?: string) {
  const number = process.env.ADMIN_WHATSAPP?.replace(/\D/g, "");
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(`Halo Temura, saya ingin bertanya tentang ${packageName ? `paket ${packageName}` : "undangan digital"}.`)}`
    : "https://tampiloka.adihnursyam.com/contact";
}
