import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { CONTACT, createPageMetadata, localizedSiteUrl, webPageSchema } from "@/lib/seo";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();
  const locale: Locale = requestedLocale;
  const pageCopy = getPrimaryCopy(locale);
  const copy = pageCopy.contact;
  return createPageMetadata({ path: "/contact", locale, ...pageCopy.metadata.contact, imageAlt: copy.imageAlt, imagePath: "/images/studio-workspace.webp" });
}

const contactLinks = [
  { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Instagram", href: "https://www.instagram.com/adihnursyam/" },
  { label: "X", href: "https://x.com/soezyxsttt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adihnursyam/" },
];

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
        telephone: CONTACT.telephone,
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
          <Button className="inner-page__cta" size="pill" nativeButton={false} render={<a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" />}>
            <MessageCircle aria-hidden="true" /> {copy.cta} <ArrowUpRight aria-hidden="true" />
          </Button>
          <a className="contact-page__email type-body" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">{CONTACT.phone}</a>
          <a className="contact-page__email type-body" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <PageVisual imageKey="contact-invitation" alt={copy.imageAlt} preload />
      </section>

      <section className="contact-page__social" aria-labelledby="social-title" data-reveal>
        <h2 id="social-title" className="type-heading-3">{copy.socialTitle}</h2>
        <div className="contact-page__links">
          {contactLinks.map(({ label, href }) => (
            <a key={label} className="type-label-lg" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {label}<ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label" href="/">{copy.homeCta} <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
