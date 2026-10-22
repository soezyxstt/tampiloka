import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata, webPageSchema } from "@/lib/seo";

const pageTitle = "Tentang Studio Web Independen";
const pageDescription =
  "Tampiloka adalah studio web independen yang menghubungkan strategi, desain, dan teknologi untuk membantu bisnis tampil lebih baik secara digital.";

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
  "Mulai dari kebutuhan bisnis",
  "Desain yang nyaman dipakai",
  "Proses kerja yang jelas",
  "Siap dikembangkan kemudian",
];

export default function TentangPage() {
  return (
    <div className="inner-page inner-page--about">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="about-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="about-title" className="type-display-xl">Detail kecil, dampak yang terasa.</h1>
          <p className="type-body-lg">Tampiloka adalah studio web independen yang menghubungkan strategi, desain, dan teknologi untuk membantu bisnis tampil lebih baik secara digital.</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<Link href="/contact" />}>
            Kenali cara kerja kami <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <PageVisual imageKey="about-studio" alt="Sketsa antarmuka pada papan inspirasi di ruang kerja." preload />
      </section>

      <section className="about-note">
        <div data-reveal>
          <h2 className="type-heading-1">Dibuat dengan tujuan.</h2>
          <p className="type-body-lg">Setiap keputusan desain punya alasan. Setiap baris kode membantu pengalaman terasa lebih mudah.</p>
        </div>
        <ul className="about-principles type-body" data-reveal>
          {principles.map((principle) => <li key={principle}><Check aria-hidden="true" />{principle}</li>)}
        </ul>
      </section>

      <section className="about-visual-section" aria-label="Cara kerja Tampiloka">
        <PageVisual imageKey="creative-process" alt="Tangan menata sketsa antarmuka website dan ponsel di atas meja." />
        <div data-reveal>
          <h2 className="type-heading-1">Rapi di layar. Siap dipakai.</h2>
          <p className="type-body-lg">Dari struktur informasi hingga detail visual, pengalaman dibangun agar tetap jelas di ponsel maupun desktop.</p>
        </div>
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label-lg" href="/contact">Mari mulai percakapan <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}


