import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectShowcase from "@/components/project-showcase";
import { StudioSections } from "@/components/studio-sections";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { FAQ_ITEMS } from "@/lib/faq";
import { createPageMetadata, faqPageSchema, webPageSchema } from "@/lib/seo";

import { HeroBackdrop } from "@/components/hero-backdrop";

const pageTitle = "Studio Web untuk Brand dan Bisnis";
const pageDescription =
  "Studio web independen untuk brand dan bisnis. Tampiloka merancang website, produk digital, branding, dan undangan pernikahan digital melalui Temura.";

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
        <h1 id="hero-title" className="type-display-xl" data-reveal>Studio web untuk<br /><span className="hero-highlight">brand dan bisnis.</span></h1>
        <div className="hero-aside"><div className="hero-sculpture" aria-hidden="true"><span /><span /><span /><span /></div><p className="type-body-lg" data-reveal>Kami merancang website, produk digital, identitas brand, dan undangan pernikahan digital melalui Temura.</p><Button variant="link" className="text-link type-label-lg" nativeButton={false} render={<Link href="/contact" />}>Mulai proyek <ArrowUpRight size={21} /></Button></div>
      </div>
      <div className="hero-bottom" data-reveal><Link className="type-label" href="/produk">Lihat karya <ArrowDown size={18} /></Link></div>
    </section>
    <ProjectShowcase />
    <StudioSections />
  </>;
}
