import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { TEMURA_URL } from "@/lib/temura-url";
import { absoluteSiteUrl, createPageMetadata, itemListSchema, webPageSchema } from "@/lib/seo";

const pageTitle = "Layanan Desain dan Pengembangan Web";
const pageDescription =
  "Desain website, aplikasi web, identitas visual, dan undangan digital. Lihat cakupan layanan Tampiloka dan diskusikan kebutuhan bisnis Anda.";

export const metadata = createPageMetadata({
  path: "/layanan",
  title: pageTitle,
  description: pageDescription,
  imageAlt: "Konsep website hijau ditampilkan pada laptop di meja desain.",
  imagePath: "/images/service-overview.webp",
});

type Service = {
  title: string;
  description: string;
  items: string[];
  imageKey: "service-website" | "service-digital-product" | "service-development" | "service-branding" | "service-digital-invitation";
  imageAlt: string;
  href?: string;
};

const services: Service[] = [
  {
    title: "Website",
    description: "Website untuk menampilkan profil usaha, produk, dan cara menghubungi bisnis Anda.",
    items: ["Profil perusahaan", "Toko online", "Landing page"],
    imageKey: "service-website",
    imageAlt: "Contoh katalog produk pada layar laptop dan ponsel.",
  },
  {
    title: "Produk digital",
    description: "Rancangan aplikasi web, dashboard, dan portal untuk pelanggan atau tim.",
    items: ["Riset kebutuhan", "Desain antarmuka", "Prototipe"],
    imageKey: "service-digital-product",
    imageAlt: "Tampilan jadwal dan data pada tablet dan ponsel.",
  },
  {
    title: "Pengembangan",
    description: "Pembuatan aplikasi web, integrasi sistem, dan perawatan teknis sesuai lingkup proyek.",
    items: ["Pengembangan antarmuka", "Integrasi sistem", "Perawatan teknis"],
    imageKey: "service-development",
    imageAlt: "Pengembang mengetik kode di keyboard dengan monitor di hadapannya.",
  },
  {
    title: "Identitas visual",
    description: "Logo, warna, tipografi, dan panduan agar identitas usaha konsisten.",
    items: ["Logo", "Warna & tipografi", "Panduan penggunaan"],
    imageKey: "service-branding",
    imageAlt: "Contoh identitas visual berupa kemasan, kartu, dan amplop berwarna hijau.",
  },
  {
    title: "Undangan digital",
    description: "Undangan pernikahan dari Temura dengan jadwal, lokasi, dan konfirmasi kehadiran.",
    items: ["Desain undangan", "Jadwal & lokasi", "Konfirmasi kehadiran"],
    imageKey: "service-digital-invitation",
    imageAlt: "Pasangan pengantin berbusana Jawa di taman pernikahan.",
    href: TEMURA_URL,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      path: "/layanan",
      title: `${pageTitle} | Tampiloka`,
      description: pageDescription,
      imagePath: "/images/service-overview.webp",
    }),
    itemListSchema(
      "Layanan Tampiloka",
      services.map((service) => ({
        name: service.title,
        description: service.description,
        url: `${absoluteSiteUrl("/layanan")}#${service.imageKey}`,
        image: `/images/${service.imageKey}.webp`,
        itemType: "Service",
      })),
    ),
  ],
};

export default function LayananPage() {
  return (
    <div className="inner-page inner-page--services">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="services-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="services-title" className="type-display-xl">Layanan Tampiloka.</h1>
          <p className="type-body-lg">Website, aplikasi web, identitas visual, dan undangan digital.</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<Link href="/contact" />}>
            Diskusikan kebutuhan <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <PageVisual imageKey="service-overview" alt="Rancangan website dengan antarmuka hijau di layar laptop." preload />
      </section>

      <section className="inner-page__services" aria-label="Layanan Tampiloka">
        {services.map((service) => (
          <article className="service-row" id={service.imageKey} key={service.title}>
            <div className="service-row__copy" data-reveal>
              <h2 className="type-heading-1">{service.title}</h2>
              <p className="type-body-lg">{service.description}</p>
              <ul className="service-row__list type-body-sm">
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              {service.href && <a className="service-row__cta type-label" href={service.href} target="_blank" rel="noopener noreferrer">Lihat undangan di Temura <ArrowUpRight aria-hidden="true" /></a>}
              {service.imageKey === "service-website" && <Link className="service-row__cta type-label" href="/paket">Lihat paket website kafe <ArrowUpRight aria-hidden="true" /></Link>}
            </div>
              <PageVisual imageKey={service.imageKey} alt={service.imageAlt} />
          </article>
        ))}
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label-lg" href="/contact">Diskusikan kebutuhan <ArrowDownRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
