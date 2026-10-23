import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata, webPageSchema } from "@/lib/seo";

const pageTitle = "Tentang Tampiloka";
const pageDescription =
  "Tampiloka adalah studio web independen untuk desain website, pengembangan web, dan identitas visual bisnis.";

export const metadata = createPageMetadata({
  path: "/tentang",
  title: pageTitle,
  description: pageDescription,
  imageAlt: "Ruang kerja dengan sketsa desain di papan inspirasi.",
  imagePath: "/images/about-studio.webp",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      path: "/tentang",
      title: `${pageTitle} | Tampiloka`,
      description: pageDescription,
      type: "AboutPage",
      imagePath: "/images/about-studio.webp",
    }),
  ],
};

const principles = [
  "Kebutuhan bisnis sebagai titik awal",
  "Informasi yang mudah ditemukan",
  "Tampilan untuk ponsel dan komputer",
  "Lingkup dan tahapan yang disepakati",
];

export default function TentangPage() {
  return (
    <div className="inner-page inner-page--about">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="about-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="about-title" className="type-display-xl">Tentang Tampiloka.</h1>
          <p className="type-body-lg">Tampiloka adalah studio web independen untuk desain website, pengembangan web, dan identitas visual bisnis.</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<Link href="#cara-kerja" />}>
            Lihat cara kerja <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <PageVisual imageKey="about-studio" alt="Sketsa antarmuka pada papan inspirasi di ruang kerja." preload />
      </section>

      <section className="about-note">
        <div data-reveal>
          <h2 className="type-heading-1">Yang kami utamakan.</h2>
          <p className="type-body-lg">Tujuan website, isi halaman, dan cara pengunjung menggunakannya menjadi dasar rancangan.</p>
        </div>
        <ul className="about-principles type-body" data-reveal>
          {principles.map((principle) => <li key={principle}><Check aria-hidden="true" />{principle}</li>)}
        </ul>
      </section>

      <section className="about-visual-section" id="cara-kerja" aria-label="Cara kerja Tampiloka">
        <PageVisual imageKey="creative-process" alt="Tangan menata sketsa antarmuka website dan ponsel di atas meja." />
        <div data-reveal>
          <h2 className="type-heading-1">Dari rancangan hingga tayang.</h2>
          <p className="type-body-lg">Kami menyusun struktur halaman, merancang tampilan, lalu membangun dan menguji website di ponsel serta komputer.</p>
        </div>
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label-lg" href="/contact">Diskusikan kebutuhan <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}


