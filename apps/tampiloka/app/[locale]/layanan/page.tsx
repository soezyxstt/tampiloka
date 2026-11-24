import { MarketingCTA } from "@/components/marketing-cta";
import type { Metadata } from "next";
import "../../templates.css";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ServiceFields, ServiceHeroPreview } from "@/components/service-fields";
import { JsonLd } from "@/components/json-ld";
import { TEMURA_URL } from "@/lib/temura-url";
import { createPageMetadata, itemListSchema, localizedSiteUrl, webPageSchema } from "@/lib/seo";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { serviceFields } from "@/lib/service-fields";

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
          <div className="service-hero__actions">
            <MarketingCTA primary nativeButton={false} render={<Link href="/contact" />}>{copy.contactCta}</MarketingCTA>
            <Link className={buttonVariants({ variant: "link" })} href="/paket">{locale === "en" ? "View packages" : "Lihat paket"}</Link>
          </div>
        </div>
        <ServiceHeroPreview locale={locale} />
      </section>

      <nav className="service-directory" id="pilih-bidang" aria-label={locale === "en" ? "Choose a field" : "Pilih bidang"}>
        <div className="service-directory__head">
          <h2 className="type-heading-4">{locale === "en" ? "Jump to your field" : "Pilih bidang usaha"}</h2>
          <Link className={buttonVariants({ variant: "link" })} href="/templates">{locale === "en" ? "Browse all templates" : "Jelajahi semua template"}</Link>
        </div>
        <div className="service-directory__grid">
          {serviceFields[locale].map((field, index) => (
            <a className="service-directory__item" href={`#${field.id}`} key={field.id}>
              <span className="service-directory__num type-caption" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="type-label">{field.name}</span>
            </a>
          ))}
        </div>
      </nav>

      <ServiceFields locale={locale} />
    </div>
  );
}
