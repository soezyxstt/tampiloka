import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndustryPreview } from "@/components/industry-preview";
import { JsonLd } from "@/components/json-ld";
import { TEMURA_URL } from "@/lib/temura-url";
import { absoluteSiteUrl, createPageMetadata, itemListSchema, webPageSchema } from "@/lib/seo";

const pageTitle = "Website untuk Berbagai Bidang Usaha";
const pageDescription =
  "Contoh kebutuhan website untuk kuliner, fashion, portofolio, UMKM, teknologi, layanan bisnis, dan undangan pernikahan.";

export const metadata = createPageMetadata({
  path: "/industri",
  title: pageTitle,
  description: pageDescription,
  imageAlt: "Koleksi benda dan material yang mewakili beragam bidang usaha.",
  imagePath: "/images/industry-overview.webp",
});

type Industry = {
  name: string;
  description: string;
  id: string;
  kind: "food" | "fashion" | "portfolio" | "small-business" | "technology" | "enterprise" | "wedding";
  uses: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

const industries: Industry[] = [
  { name: "Kuliner", description: "Website untuk menampilkan menu, lokasi, jam buka, serta cara reservasi atau memesan.", id: "industry-food", kind: "food", uses: ["Restoran & kafe", "Menu digital", "Reservasi", "Pemesanan"] },
  { name: "Fashion", description: "Katalog koleksi, foto produk, dan informasi pembelian untuk label fashion.", id: "industry-fashion", kind: "fashion", uses: ["Label fashion", "Toko online", "Lookbook", "Koleksi musiman"] },
  { name: "Portofolio", description: "Tampilkan karya, profil profesional, dan kontak dalam satu website.", id: "industry-portfolio-architecture", kind: "portfolio", uses: ["Arsitektur", "Fotografi", "Desain", "Profesional independen"] },
  { name: "UMKM", description: "Katalog produk dan informasi usaha dengan tautan pemesanan langsung.", id: "industry-small-business", kind: "small-business", uses: ["Katalog produk", "Usaha lokal", "Produk kerajinan", "Pemesanan langsung"] },
  { name: "Elektronik & teknologi", description: "Sajikan spesifikasi, foto produk, dan informasi pembelian.", id: "industry-technology", kind: "technology", uses: ["Elektronik", "Gadget", "Peluncuran produk", "Katalog teknologi"] },
  { name: "Layanan bisnis", description: "Jelaskan layanan, profil perusahaan, dan cara menghubungi tim Anda.", id: "industry-enterprise", kind: "enterprise", uses: ["Profil perusahaan", "Layanan bisnis", "Platform digital", "Produk SaaS"] },
  { name: "Undangan pernikahan", description: "Undangan Temura dengan tautan nama tamu, jadwal, lokasi, dan konfirmasi kehadiran.", id: "industry-wedding", kind: "wedding", uses: ["Tautan nama tamu", "Jadwal & lokasi", "Konfirmasi kehadiran (RSVP)", "Buku tamu digital"], ctaHref: TEMURA_URL, ctaLabel: "Lihat undangan di Temura" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      path: "/industri",
      title: `${pageTitle} | Tampiloka`,
      description: pageDescription,
      type: "CollectionPage",
      imagePath: "/images/industry-overview.webp",
    }),
    itemListSchema(
      "Industri yang dilayani Tampiloka",
      industries.map((industry) => ({
        name: industry.name,
        description: industry.description,
        url: `${absoluteSiteUrl("/industri")}#${industry.id}`,
        itemType: "Service",
      })),
    ),
  ],
};

export default function IndustriPage() {
  return (
    <div className="inner-page inner-page--industries">
      <JsonLd data={structuredData} />
      <section className="industry-intro" aria-labelledby="industries-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="industries-title" className="type-display-xl">Website untuk bidang usaha Anda.</h1>
          <p className="type-body-lg">Lihat contoh kebutuhan dan tampilan website untuk setiap bidang.</p>
        </div>
      </section>

      <div className="industry-sections">
        {industries.map(({ name, description, id, kind, uses, ctaHref, ctaLabel }) => (
          <section className="industry-row" id={id} key={id} aria-labelledby={`${id}-title`}>
            <div className="industry-row__copy" data-reveal>
              <h2 id={`${id}-title`} className="type-heading-2">{name}</h2>
              <p className="type-body">{description}</p>
              <ul className="industry-row__uses type-label">
                {uses.map(use => <li key={use}>{use}</li>)}
              </ul>
              <Button variant="link" className="industry-row__link" nativeButton={false} render={<Link href={ctaHref ?? "/contact"} target={ctaHref ? "_blank" : undefined} rel={ctaHref ? "noopener noreferrer" : undefined} />}>
                {ctaLabel ?? "Diskusikan kebutuhan"} <ArrowUpRight aria-hidden="true" />
              </Button>
            </div>
            <div className="industry-row__visual" data-reveal><IndustryPreview kind={kind} /></div>
          </section>
        ))}
      </div>
      <p className="industry-disclosure type-caption" data-reveal>Contoh tampilan untuk ilustrasi, bukan proyek klien.</p>

      <div className="inner-page__end-link" data-reveal>
        <Button className="inner-page__cta" nativeButton={false} render={<Link href="/contact" />}>
          Diskusikan kebutuhan <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}



