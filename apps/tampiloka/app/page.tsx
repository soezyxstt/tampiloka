import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectShowcase from "@/components/project-showcase";
import { StudioSections } from "@/components/studio-sections";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { FAQ_ITEMS } from "@/lib/faq";
import { SITE_DESCRIPTION, createPageMetadata, faqPageSchema, webPageSchema } from "@/lib/seo";

import { HeroBackdrop } from "@/components/hero-backdrop";

const pageTitle = "Desain dan Pembuatan Website untuk Bisnis";
const pageDescription = SITE_DESCRIPTION;

export const metadata = createPageMetadata({
  path: "/",
  title: pageTitle,
  description: pageDescription,
  imageAlt: "Rancangan website dengan antarmuka hijau di layar laptop dan contoh palet warna.",
  imagePath: "/images/service-overview.webp",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      path: "/",
      title: `${pageTitle} | Tampiloka`,
      description: pageDescription,
      imagePath: "/images/service-overview.webp",
    }),
    faqPageSchema(FAQ_ITEMS),
  ],
};

export default function Home() {
  return <>
    <JsonLd data={structuredData} />
    <section className="studio-hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-composition">
        <h1 id="hero-title" className="type-display-xl" data-reveal>Website untuk<br /><span className="hero-highlight">bisnis Anda.</span></h1>
        <div className="hero-aside"><div className="hero-sculpture" aria-hidden="true"><span /><span /><span /><span /></div><p className="type-body-lg" data-reveal>Kami merancang dan membangun website, aplikasi web, serta identitas visual. Undangan pernikahan tersedia melalui Temura.</p><Button variant="link" className="text-link type-label-lg" nativeButton={false} render={<Link href="/contact" />}>Diskusikan kebutuhan <ArrowUpRight size={21} /></Button></div>
      </div>
      <div className="hero-bottom" data-reveal><Link className="type-label" href="/produk">Lihat karya <ArrowDown size={18} /></Link></div>
    </section>
    <ProjectShowcase />
    <StudioSections />
  </>;
}
