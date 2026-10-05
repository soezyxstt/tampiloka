export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export function contactLink(packageName?: string) {
  const number = process.env.ADMIN_WHATSAPP?.replace(/\D/g, "");
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(`Halo Temura, saya ingin bertanya tentang ${packageName ? `paket ${packageName}` : "undangan digital"}.`)}`
    : "https://tampiloka.adihnursyam.com/contact";
}
