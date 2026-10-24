import { getLocale } from "next-intl/server";
import { SiteFooter as SharedSiteFooter } from "@tampiloka/brand-system/footer";
import { Link, toLocalizedHref } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { shellCopy } from "@/i18n/shell-copy";
import { TEMURA_URL } from "@/lib/temura-url";
import { CONTACT } from "@/lib/seo";

export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const copy = shellCopy(locale);

  const studioLinks = [
    { label: copy.nav.work, href: "/produk" },
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

  const socials = [
    { label: "WhatsApp", href: "https://wa.me/6282119307102" },
    { label: "Instagram", href: "https://www.instagram.com/adihnursyam/" },
    { label: "X", href: "https://x.com/soezyxsttt" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adihnursyam/" },
    { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <SharedSiteFooter
      watermarkSrc="/symbol-green.svg"
      ctaHeading={locale === "en" ? { prefix: "Get in", highlight: "touch." } : { prefix: "Hubungi", highlight: "kami." }}
      ctaLink={{ label: "+62 821-1930-7102", href: "https://wa.me/6282119307102" }}
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
