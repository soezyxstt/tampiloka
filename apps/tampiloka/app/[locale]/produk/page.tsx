import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import ProjectShowcase from "@/components/project-showcase";
import { PROJECTS } from "@/lib/projects";
import { showcaseCopy } from "@/lib/showcase-copy";
import { createPageMetadata, itemListSchema, webPageSchema } from "@/lib/seo";
import { locales, type Locale } from "@/i18n/routing";

type LocalizedPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const copy = showcaseCopy[locale];

  return createPageMetadata({
    path: "/produk",
    locale,
    title: copy.projectPageTitle,
    description: copy.projectPageDescription,
    imageAlt: copy.projectImageAlt,
    imagePath: "/images/service-website.webp",
  });
}

export default async function ProdukPage({ params }: LocalizedPageProps) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = (await getLocale()) as Locale;
  const copy = showcaseCopy[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema({
        path: "/produk",
        locale,
        title: `${copy.projectPageTitle} | Tampiloka`,
        description: copy.projectPageDescription,
        type: "CollectionPage",
        imagePath: "/images/service-website.webp",
      }),
      itemListSchema(
        copy.projectListTitle,
        PROJECTS.map((project) => ({
          name: project.name,
          description: copy.projectDescriptions[project.id],
          url: project.url,
          itemType: "WebSite",
        })),
        locale,
      ),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectShowcase page locale={locale} />
    </>
  );
}
