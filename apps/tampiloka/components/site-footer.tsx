import { getLocale } from "next-intl/server";
import { SiteFooter as SharedSiteFooter } from "@tampiloka/brand-system/footer";
import { Link, toLocalizedHref } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { shellCopy } from "@/i18n/shell-copy";
import { TEMURA_URL } from "@/lib/temura-url";
import { ContactPlatformIcon } from "@/components/contact-icon-link";
import { CONTACT, CONTACT_LINKS } from "@/lib/contact-links";

export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const copy = shellCopy(locale);

  const studioLinks = [
    { label: copy.nav.work, href: "/produk" },
    { label: copy.nav.templates, href: "/templates" },
    { label: copy.nav.services, href: "/layanan" },
    { label: locale === "en" ? "Website pricing" : "Paket website", href: "/paket" },
    { label: copy.nav.industries, href: "/industri" },
    { label: copy.nav.about, href: "/tentang" },
    { label: copy.nav.contact, href: "/contact" },
  ];

  const serviceLinks = [
    { label: copy.footer.website, href: "/layanan#service-website" },
    { label: copy.footer.digitalProducts, href: "/layanan#service-digital-product" },
    { label: copy.footer.development, href: "/layanan#service-development" },
    { label: copy.footer.visualIdentity, href: "/layanan#service-branding" },
    { label: copy.footer.digitalInvitations, href: TEMURA_URL, external: true },
  ];

  const industryLinks = [
    { label: copy.footer.food, href: "/industri#industry-food" },
    { label: copy.footer.fashion, href: "/industri#industry-fashion" },
    { label: copy.footer.portfolio, href: "/industri#industry-portfolio-architecture" },
    { label: copy.footer.smallBusiness, href: "/industri#industry-small-business" },
    { label: copy.footer.technology, href: "/industri#industry-technology" },
    { label: copy.footer.businessServices, href: "/industri#industry-enterprise" },
    { label: copy.footer.weddingInvitations, href: "/industri#industry-wedding" },
  ];

  const socials = CONTACT_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
    ariaLabel: link.label,
    icon: <ContactPlatformIcon platform={link.platform} />,
  }));

  return (
    <SharedSiteFooter
      watermarkSrc="/symbol-green.svg"
      ctaHeading={locale === "en" ? { prefix: "Get in", highlight: "touch." } : { prefix: "Hubungi", highlight: "kami." }}
      ctaLink={{
        label: locale === "en" ? "Contact us on WhatsApp" : "Hubungi lewat WhatsApp",
        ariaLabel: locale === "en" ? "Contact us on WhatsApp" : "Hubungi lewat WhatsApp",
        href: CONTACT.whatsapp,
        icon: <ContactPlatformIcon platform="whatsapp" size={24} />,
      }}
      directoryGroups={[
        { title: copy.footer.studio, items: studioLinks },
        { title: copy.footer.services, items: serviceLinks },
      ]}
      wideGroup={{ title: copy.footer.industries, items: industryLinks }}
      logo={{
        src: "/brand/logos/light/tampiloka-horizontal-light.svg",
        alt: "Tampiloka",
        width: 800,
        height: 200,
        href: "/",
      }}
      socials={socials}
      copyright={`© ${new Date().getFullYear()} Tampiloka`}
      socialsLabel={copy.footer.footerLinks}
      renderInternalLink={({ href, children, className, ariaLabel }) => (
        <Link href={toLocalizedHref(href)} className={className} aria-label={ariaLabel}>
          {children}
        </Link>
      )}
    />
  );
}
