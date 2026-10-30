import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { TemplateGallery } from "@/components/template-gallery";
import { JsonLd } from "@/components/json-ld";
import { locales, type Locale } from "@/i18n/routing";
import { createPageMetadata, webPageSchema } from "@/lib/seo";
import { templateCopy } from "@/lib/template-copy";
import "../../templates.css";

type Props = { params: Promise<{ locale: string }> };
const path = "/templates";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  const copy = templateCopy[locale];
  return createPageMetadata({ path, locale, title: copy.title, description: copy.description, imageAlt: copy.title });
}

export default async function TemplatesPage({ params }: Props) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  setRequestLocale(locale);
  const copy = templateCopy[locale];
  return <div className="inner-page templates-page">
    <JsonLd data={{ "@context": "https://schema.org", ...webPageSchema({ path, locale, title: `${copy.title} | Tampiloka`, description: copy.description, type: "CollectionPage" }) }} />
    <section className="templates-page__intro" data-reveal><h1 className="type-display-xl">{copy.title}</h1><p className="type-body-lg">{copy.intro}</p><p className="templates-page__disclosure type-body">{copy.disclosure}</p></section>
    <TemplateGallery locale={locale} />
  </div>;
}
