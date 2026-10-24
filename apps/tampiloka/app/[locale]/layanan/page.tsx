import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { TEMURA_URL } from "@/lib/temura-url";
import { createPageMetadata, itemListSchema, localizedSiteUrl, webPageSchema } from "@/lib/seo";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const copy = getPrimaryCopy(locale);
  const meta = copy.metadata.services;
  return createPageMetadata({ path: "/layanan", locale, ...meta, imageAlt: copy.services.imageAlt, imagePath: "/images/service-overview.webp" });
}

export default async function LayananPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = await getLocale() as Locale;
  const pageCopy = getPrimaryCopy(locale);
  const copy = pageCopy.services;
  const meta = pageCopy.metadata.services;
  const services = copy.items.map((service) => ({ ...service, href: service.href === "temura" ? TEMURA_URL : undefined }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema({ path: "/layanan", locale, title: `${meta.title} | Tampiloka`, description: meta.description, imagePath: "/images/service-overview.webp" }),
      itemListSchema(
        locale === "id" ? "Layanan Tampiloka" : "Tampiloka services",
        services.map((service) => ({
          name: service.title,
          description: service.description,
          url: localizedSiteUrl(locale, `/layanan#${service.imageKey}`),
          image: `/images/${service.imageKey}.webp`,
          itemType: "Service",
        })),
        locale,
      ),
    ],
  };

  return (
    <div className="inner-page inner-page--services">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="services-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="services-title" className="type-display-xl">{copy.title}</h1>
          <p className="type-body-lg">{copy.description}</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<Link href="/contact" />}>
            {copy.contactCta} <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <PageVisual imageKey="service-overview" alt={copy.imageAlt} preload />
      </section>

      <section className="inner-page__services" aria-label={copy.ariaLabel}>
        {services.map((service) => (
          <article className="service-row" id={service.imageKey} key={service.title}>
            <div className="service-row__copy" data-reveal>
              <h2 className="type-heading-1">{service.title}</h2>
              <p className="type-body-lg">{service.description}</p>
              <ul className="service-row__list type-body-sm">
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              {service.href && <a className="service-row__cta type-label" href={service.href} target="_blank" rel="noopener noreferrer">{copy.temuraCta} <ArrowUpRight aria-hidden="true" /></a>}
              {service.imageKey === "service-website" && <Link className="service-row__cta type-label" href="/paket">{copy.packageCta} <ArrowUpRight aria-hidden="true" /></Link>}
            </div>
            <PageVisual imageKey={service.imageKey} alt={service.imageAlt} />
          </article>
        ))}
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label-lg" href="/contact">{copy.endCta} <ArrowDownRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
