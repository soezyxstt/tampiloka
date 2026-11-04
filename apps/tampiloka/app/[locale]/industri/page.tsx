import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IndustryPreview } from "@/components/industry-preview";
import { JsonLd } from "@/components/json-ld";
import { TEMURA_URL } from "@/lib/temura-url";
import { showcaseCopy } from "@/lib/showcase-copy";
import { createPageMetadata, itemListSchema, localizedSiteUrl, webPageSchema } from "@/lib/seo";
import { locales, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

const industries: {
  key: keyof (typeof showcaseCopy)[Locale]["industries"];
  id: string;
  kind: "food" | "fashion" | "portfolio" | "small-business" | "technology" | "enterprise" | "wedding";
  externalCta?: boolean;
}[] = [
  { key: "food", id: "industry-food", kind: "food" },
  { key: "fashion", id: "industry-fashion", kind: "fashion" },
  { key: "portfolio", id: "industry-portfolio-architecture", kind: "portfolio" },
  { key: "small-business", id: "industry-small-business", kind: "small-business" },
  { key: "technology", id: "industry-technology", kind: "technology" },
  { key: "enterprise", id: "industry-enterprise", kind: "enterprise" },
  { key: "wedding", id: "industry-wedding", kind: "wedding", externalCta: true },
];

type LocalizedPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const copy = showcaseCopy[locale];

  return createPageMetadata({
    path: "/industri",
    locale,
    title: copy.industriesTitle,
    description: copy.industriesDescription,
    imageAlt: copy.industriesImageAlt,
    imagePath: "/images/industry-overview.webp",
  });
}

export default async function IndustriPage({ params }: LocalizedPageProps) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = (await getLocale()) as Locale;
  const copy = showcaseCopy[locale];
  const industryUrl = localizedSiteUrl(locale, "/industri");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema({
        path: "/industri",
        locale,
        title: `${copy.industriesTitle} | Tampiloka`,
        description: copy.industriesDescription,
        type: "CollectionPage",
        imagePath: "/images/industry-overview.webp",
      }),
      itemListSchema(
        copy.industriesListTitle,
        industries.map(({ key, id }) => ({
          name: copy.industries[key].name,
          description: copy.industries[key].description,
          url: `${industryUrl}#${id}`,
          itemType: "Service",
        })),
        locale,
      ),
    ],
  };

  return (
    <div className="inner-page inner-page--industries">
      <JsonLd data={structuredData} />
      <section className="industry-intro" aria-labelledby="industries-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="industries-title" className="type-display-xl">{copy.industriesHeading}</h1>
          <p className="type-body-lg">{copy.industriesIntro}</p>
        </div>
      </section>

      <div className="industry-sections">
        {industries.map(({ key, id, kind, externalCta }) => {
          const industry = copy.industries[key];
          const label = "ctaLabel" in industry ? industry.ctaLabel ?? copy.discussNeeds : copy.discussNeeds;
          return (
            <section className="industry-row" id={id} key={id} aria-labelledby={`${id}-title`}>
              <div className="industry-row__copy" data-reveal>
                <h2 id={`${id}-title`} className="type-heading-2">{industry.name}</h2>
                <p className="type-body">{industry.description}</p>
                <ul className="industry-row__uses type-label">
                  {industry.uses.map(use => <li key={use}>{use}</li>)}
                </ul>
                {externalCta && <Button variant="secondary" nativeButton={false} render={<a href={TEMURA_URL} target="_blank" rel="noopener noreferrer" />}>{label}</Button>}
              </div>
              <div className="industry-row__visual" data-reveal><IndustryPreview kind={kind} /></div>
            </section>
          );
        })}
      </div>
      <p className="industry-disclosure type-caption" data-reveal>{copy.industryDisclosure}</p>

      <div className="inner-page__end-link" data-reveal>
        <Button className="inner-page__cta" nativeButton={false} render={<Link href="/contact" />}>
          {copy.discussNeeds}
        </Button>
      </div>
    </div>
  );
}
