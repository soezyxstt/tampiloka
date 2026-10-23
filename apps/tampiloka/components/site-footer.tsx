import { SiteFooter as SharedSiteFooter } from "@tampiloka/brand-system/footer";
import { TEMURA_URL } from "@/lib/temura-url";

const studioLinks = [
  { label: "Karya", href: "/produk" },
  { label: "Layanan", href: "/layanan" },
  { label: "Paket website", href: "/paket" },
  { label: "Industri", href: "/industri" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/contact" },
];

const serviceLinks = [
  { label: "Website", href: "/layanan#service-website" },
  { label: "Produk digital", href: "/layanan#service-digital-product" },
  { label: "Pengembangan", href: "/layanan#service-development" },
  { label: "Identitas visual", href: "/layanan#service-branding" },
  { label: "Undangan digital", href: TEMURA_URL, external: true },
];

const industryLinks = [
  { label: "Kuliner", href: "/industri#industry-food" },
  { label: "Fashion", href: "/industri#industry-fashion" },
  { label: "Portofolio", href: "/industri#industry-portfolio-architecture" },
  { label: "UMKM", href: "/industri#industry-small-business" },
  { label: "Elektronik & teknologi", href: "/industri#industry-technology" },
  { label: "Layanan bisnis", href: "/industri#industry-enterprise" },
  { label: "Undangan pernikahan", href: "/industri#industry-wedding" },
];

const socials = [
  { label: "WhatsApp", href: "https://wa.me/6282119307102" },
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
        prefix: "Hubungi",
        highlight: "kami.",
      }}
      ctaLink={{
        label: "+62 821-1930-7102",
        href: "https://wa.me/6282119307102",
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
      copyright={`© ${new Date().getFullYear()} Tampiloka`}
    />
  );
}
