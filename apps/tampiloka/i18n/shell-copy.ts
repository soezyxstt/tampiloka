import type { Locale } from "./routing";

export const SHELL_COPY = {
  id: {
    a11y: {
      skipToContent: "Langsung ke isi halaman",
    },
    nav: {
      work: "Karya",
      services: "Layanan",
      industries: "Industri",
      pricing: "Paket",
      about: "Tentang",
      contact: "Kontak",
      primaryNavigation: "Navigasi utama",
      mobileNavigation: "Navigasi Tampiloka",
      openNavigation: "Buka navigasi",
      closeNavigation: "Tutup navigasi",
      home: "beranda",
    },
    footer: {
      studio: "Studio",
      services: "Layanan",
      industries: "Industri",
      website: "Website",
      digitalProducts: "Produk digital",
      development: "Pengembangan",
      visualIdentity: "Identitas visual",
      digitalInvitations: "Undangan digital",
      food: "Kuliner",
      fashion: "Fashion",
      portfolio: "Portofolio",
      smallBusiness: "UMKM",
      technology: "Elektronik & teknologi",
      businessServices: "Layanan bisnis",
      weddingInvitations: "Undangan pernikahan",
      contactUs: "Hubungi",
      footerLinks: "Tautan footer",
    },
    faq: {
      title: "Pertanyaan umum.",
    },
  },
  en: {
    a11y: {
      skipToContent: "Skip to main content",
    },
    nav: {
      work: "Work",
      services: "Services",
      industries: "Industries",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      primaryNavigation: "Main navigation",
      mobileNavigation: "Tampiloka navigation",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      home: "home",
    },
    footer: {
      studio: "Studio",
      services: "Services",
      industries: "Industries",
      website: "Websites",
      digitalProducts: "Digital products",
      development: "Development",
      visualIdentity: "Visual identity",
      digitalInvitations: "Digital invitations",
      food: "Food & beverage",
      fashion: "Fashion",
      portfolio: "Portfolio",
      smallBusiness: "Small businesses",
      technology: "Electronics & technology",
      businessServices: "Business services",
      weddingInvitations: "Wedding invitations",
      contactUs: "Contact us",
      footerLinks: "Footer links",
    },
    faq: {
      title: "Frequently asked questions.",
    },
  },
} as const;

export function shellCopy(locale: Locale) {
  return SHELL_COPY[locale];
}
