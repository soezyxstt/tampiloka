export const metadata = { title: 'Layanan' };
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { TEMURA_URL } from "@/lib/temura-url";

type Service = {
  title: string;
  description: string;
  items: string[];
  imageKey: "service-website" | "service-digital-product" | "service-development" | "service-branding" | "service-digital-invitation";
  href?: string;
};

const services: Service[] = [
  {
    title: "Website",
    description: "Website yang memperkenalkan brand dan memudahkan pelanggan mengenal produk Anda.",
    items: ["Company profile", "Toko online", "Landing page"],
    imageKey: "service-website",
  },
  {
    title: "Produk digital",
    description: "Pengalaman digital yang dirancang agar jelas, nyaman, dan mudah digunakan.",
    items: ["Riset kebutuhan", "UX & UI design", "Prototype"],
    imageKey: "service-digital-product",
  },
  {
    title: "Pengembangan",
    description: "Implementasi yang cepat, responsif, dan siap berkembang bersama bisnis.",
    items: ["Frontend development", "Integrasi", "Pemeliharaan"],
    imageKey: "service-development",
  },
  {
    title: "Branding",
    description: "Identitas visual yang konsisten dari kesan pertama hingga setiap titik interaksi.",
    items: ["Arah visual", "Identitas brand", "Panduan penggunaan"],
    imageKey: "service-branding",
  },
  {
    title: "Undangan digital",
    description: "Undangan pernikahan digital yang personal, mudah dibagikan, dan memuat seluruh detail acara dalam satu tautan.",
    items: ["Desain undangan personal", "Detail acara & lokasi", "Konfirmasi kehadiran"],
    imageKey: "service-digital-invitation",
    href: TEMURA_URL,
  },
];

export default function LayananPage() {
  return (
    <div className="inner-page inner-page--services">
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="services-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="services-title" className="type-display-xl">Dari ide hingga siap diluncurkan.</h1>
          <p className="type-body-lg">Desain, teknologi, dan brand yang bekerja bersama.</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<Link href="/contact" />}>
            Mulai proyek <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <PageVisual imageKey="service-overview" preload />
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
              {service.href && <a className="service-row__cta type-label" href={service.href} target="_blank" rel="noopener noreferrer">Jelajahi undangan di Temura <ArrowUpRight aria-hidden="true" /></a>}
            </div>
            <PageVisual imageKey={service.imageKey} alt={service.title === "Undangan digital" ? "Pasangan mengenakan busana pengantin Jawa di taman" : ""} />
          </article>
        ))}
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label-lg" href="/contact">Ada yang ingin dibuat? <ArrowDownRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}


