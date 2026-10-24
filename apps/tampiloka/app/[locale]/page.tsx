import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ProjectShowcase from "@/components/project-showcase";
import { StudioSections } from "@/components/studio-sections";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { getFaqItems } from "@/lib/faq";
import { createPageMetadata, faqPageSchema, webPageSchema } from "@/lib/seo";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const copy = getPrimaryCopy(locale);
  const meta = copy.metadata.home;
  return createPageMetadata({
    path: "/",
    locale,
    title: meta.title,
    description: meta.description,
    imageAlt: copy.home.imageAlt,
    imagePath: "/images/service-overview.webp",
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = await getLocale() as Locale;
  const copy = getPrimaryCopy(locale);
  const meta = copy.metadata.home;
  const faqItems = getFaqItems(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema({
        path: "/",
        locale,
        title: `${meta.title} | Tampiloka`,
        description: meta.description,
        imagePath: "/images/service-overview.webp",
      }),
      faqPageSchema(faqItems, locale),
    ],
  };

  return <>
    <JsonLd data={structuredData} />
    <section className="studio-hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-composition">
        <h1 id="hero-title" className="type-display-xl" data-reveal>{copy.home.title}<br /><span className="hero-highlight">{copy.home.titleEmphasis}</span></h1>
        <div className="hero-aside"><div className="hero-sculpture" aria-hidden="true"><span /><span /><span /><span /></div><p className="type-body-lg" data-reveal>{copy.home.description}</p><Button variant="link" className="text-link type-label-lg" nativeButton={false} render={<Link href="/contact" />}>{copy.home.contactCta} <ArrowUpRight size={21} /></Button></div>
      </div>
      <div className="hero-bottom" data-reveal><Link className="type-label" href="/produk">{copy.home.workLink} <ArrowDown size={18} /></Link></div>
    </section>
    <ProjectShowcase locale={locale} />
    <StudioSections locale={locale} />
  </>;
}
