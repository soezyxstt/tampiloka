import { SiteFooter as SharedSiteFooter } from "@tampiloka/brand-system/footer";
import { TEMURA_URL } from "@/lib/temura-url";

const studioLinks = [
  { label: "Produk", href: "/produk" },
  { label: "Layanan", href: "/layanan" },
  { label: "Industri", href: "/industri" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/contact" },
];

const serviceLinks = [
  { label: "Website", href: "/layanan#service-website" },
  { label: "Produk digital", href: "/layanan#service-digital-product" },
  { label: "Pengembangan", href: "/layanan#service-development" },
  { label: "Branding", href: "/layanan#service-branding" },
  { label: "Undangan digital", href: TEMURA_URL, external: true },
];

const industryLinks = [
  { label: "Food & beverage", href: "/industri#industry-food" },
  { label: "Fashion", href: "/industri#industry-fashion" },
  { label: "Portfolio", href: "/industri#industry-portfolio-architecture" },
  { label: "UMKM", href: "/industri#industry-small-business" },
  { label: "Elektronik & teknologi", href: "/industri#industry-technology" },
  { label: "B2B & enterprise", href: "/industri#industry-enterprise" },
  { label: "Wedding", href: "/industri#industry-wedding" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/adihnursyam/" },
  { label: "X", href: "https://x.com/soezyxsttt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adihnursyam/" },
  { label: "Email", href: "mailto:soezyxst@gmail.com" },
];

export function SiteFooter() {
  return (
    <SharedSiteFooter
      watermarkSrc="/symbol-green.svg"
      ctaHeading={{
        prefix: "Mari",
        highlight: "bicara.",
      }}
      ctaLink={{
        label: "soezyxst@gmail.com",
        href: "mailto:soezyxst@gmail.com?subject=Diskusi%20proyek%20Tampiloka",
      }}
      directoryGroups={[
        { title: "Studio", items: studioLinks },
        { title: "Layanan", items: serviceLinks },
      ]}
      wideGroup={{
        title: "Industri",
        items: industryLinks,
      }}
      logo={{
        src: "/brand/logos/light/tampiloka-horizontal-light.svg",
        alt: "Tampiloka",
        width: 800,
        height: 200,
        href: "/",
      }}
      socials={socials}
      pendingNotice={{
        label: "WhatsApp",
        badge: "segera",
      }}
      copyright={`© ${new Date().getFullYear()} Tampiloka`}
    />
  );
}
