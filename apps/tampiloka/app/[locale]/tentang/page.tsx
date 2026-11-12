import { Check } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata, webPageSchema } from "@/lib/seo";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const pageCopy = getPrimaryCopy(locale);
  const copy = pageCopy.about;
  return createPageMetadata({ path: "/tentang", locale, ...pageCopy.metadata.about, imageAlt: copy.imageAlt, imagePath: "/images/about-studio.webp" });
}

export default async function TentangPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = await getLocale() as Locale;
  const pageCopy = getPrimaryCopy(locale);
  const copy = pageCopy.about;
  const meta = pageCopy.metadata.about;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema({ path: "/tentang", locale, title: `${meta.title} | Tampiloka`, description: meta.description, type: "AboutPage", imagePath: "/images/about-studio.webp" }),
    ],
  };

  return (
    <div className="inner-page inner-page--about">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="about-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="about-title" className="type-display-xl">{copy.title}</h1>
          <p className="type-body-lg">{copy.description}</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<a href="#cara-kerja" />}>
            {copy.processCta}
          </Button>
        </div>
        <PageVisual imageKey="about-studio" alt={copy.imageAlt} preload />
      </section>

      <section className="about-note">
        <div data-reveal>
          <h2 className="type-heading-1">{copy.principlesTitle}</h2>
          <p className="type-body-lg">{copy.principlesDescription}</p>
        </div>
        <ul className="about-principles type-body" data-reveal>
          {copy.principles.map((principle) => <li key={principle}><Check aria-hidden="true" />{principle}</li>)}
        </ul>
      </section>

      <section className="about-visual-section" id="cara-kerja" aria-label={copy.processLabel}>
        <PageVisual imageKey="creative-process" alt={copy.processImageAlt} />
        <div data-reveal>
          <h2 className="type-heading-1">{copy.processTitle}</h2>
          <p className="type-body-lg">{copy.processDescription}</p>
          <div className="about-process-action">
            <Button variant="brand" size="pill" nativeButton={false} render={<Link href="/contact" />}>{copy.endCta}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
