import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactIconLink } from "@/components/contact-icon-link";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata, localizedSiteUrl, webPageSchema } from "@/lib/seo";
import { CONTACT, CONTACT_LINKS } from "@/lib/contact-links";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { locales, type Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const pageCopy = getPrimaryCopy(locale);
  const copy = pageCopy.contact;
  return createPageMetadata({ path: "/contact", locale, ...pageCopy.metadata.contact, imageAlt: copy.imageAlt, imagePath: "/images/studio-workspace.webp" });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  setRequestLocale(requestedLocale);
  const locale = await getLocale() as Locale;
  const pageCopy = getPrimaryCopy(locale);
  const copy = pageCopy.contact;
  const meta = pageCopy.metadata.contact;
  const contactPointId = `${localizedSiteUrl(locale, "/contact")}#contact-point`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...webPageSchema({ path: "/contact", locale, title: `${meta.title} | Tampiloka`, description: meta.description, type: "ContactPage", imagePath: "/images/studio-workspace.webp" }),
        mainEntity: { "@id": contactPointId },
      },
      {
        "@type": "ContactPoint",
        "@id": contactPointId,
        contactType: "sales",
        email: CONTACT.email,
        url: CONTACT.whatsapp,
        availableLanguage: [locale],
        areaServed: "ID",
      },
    ],
  };

  return (
    <div className="inner-page inner-page--contact">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="contact-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="contact-title" className="type-display-xl">{copy.title}</h1>
          <p className="type-body-lg">{copy.description}</p>
          <nav className="contact-page__links" aria-label={locale === "en" ? "Contact links" : "Tautan kontak"}>
            {CONTACT_LINKS.map((link) => (
              <ContactIconLink
                key={link.platform}
                className={link.platform === "whatsapp" ? "contact-page__link contact-page__link--primary" : "contact-page__link"}
                platform={link.platform}
                href={link.href}
                label={link.platform === "whatsapp" ? copy.cta : link.label}
                iconSize={link.platform === "whatsapp" ? 24 : 20}
              />
            ))}
          </nav>
          <a className="contact-page__email type-body" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <PageVisual imageKey="contact-invitation" alt={copy.imageAlt} preload />
      </section>
    </div>
  );
}
