import { MarketingCTA } from "@/components/marketing-cta";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ProjectShowcase from "@/components/project-showcase";
import { TemplateDiscovery } from "@/components/template-discovery";
import { StudioSections } from "@/components/studio-sections";
import { JsonLd } from "@/components/json-ld";
import { getFaqItems } from "@/lib/faq";
import { createPageMetadata, faqPageSchema, webPageSchema } from "@/lib/seo";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { SolutionTeasers } from "@/components/solution-teasers";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import "../templates.css";
import "../landing.css";

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
    <div className="landing-page">
    <section className="studio-hero" aria-labelledby="hero-title">
      <div className="hero-composition">
        <div className="hero-copy">
          <h1 id="hero-title" className="type-display-xl">{copy.home.title}<br /><span className="hero-highlight">{copy.home.titleEmphasis}</span></h1>
          <p className="type-body-lg">{copy.home.description}</p>
          <div className="hero-actions">
            <MarketingCTA primary nativeButton={false} render={<Link href="/contact" />}>{copy.home.contactCta}</MarketingCTA>
            <MarketingCTA nativeButton={false} render={<Link href="/templates" />}>{copy.home.templatesCta}</MarketingCTA>
          </div>
        </div>
        <HeroBackdrop />
      </div>
    </section>
    <SolutionTeasers locale={locale} />
    <TemplateDiscovery locale={locale} />
    <ProjectShowcase locale={locale} />
    <StudioSections locale={locale} />
    </div>
  </>;
}

