"use client";

import { useLocale } from "next-intl";
import { SiteHeader as SharedSiteHeader } from "@tampiloka/brand-system/header";
import { Link, toLocalizedHref, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { fieldLinks } from "@/lib/service-fields";
import { shellCopy } from "@/i18n/shell-copy";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const copy = shellCopy(locale);
  const links = [
    { label: copy.nav.work, href: "/produk" },
    { label: copy.nav.templates, href: "/templates" },
    { label: copy.nav.services, href: "/layanan", children: fieldLinks(locale), overviewLabel: locale === "en" ? "All services" : "Semua layanan", disclosureLabel: locale === "en" ? "Open service categories" : "Buka pilihan layanan" },
    { label: copy.nav.pricing, href: "/paket" },
    { label: copy.nav.about, href: "/tentang" },
  ] as const;

  return (
    <SharedSiteHeader
      logo={{
        src: "/brand/logos/light/tampiloka-horizontal-light.svg",
        alt: "Tampiloka",
        width: 800,
        height: 200,
        href: "/",
      }}
      links={links}
      action={{
        label: copy.nav.contact,
        href: "/contact",
      }}
      mobileTitle={copy.nav.mobileNavigation}
      navigationLabel={copy.nav.primaryNavigation}
      homeLabel={copy.nav.home}
      openMenuLabel={copy.nav.openNavigation}
      closeMenuLabel={copy.nav.closeNavigation}
      currentPath={pathname}
      localization={<LanguageSwitcher />}
      renderInternalLink={({ href, children, className, ariaLabel, ariaCurrent, onClick }) => {
        const props = {
          href: toLocalizedHref(href),
          className,
          "aria-label": ariaLabel,
          "aria-current": ariaCurrent,
          onClick,
        };
        return children === undefined ? <Link {...props} /> : <Link {...props}>{children}</Link>;
      }}
    />
  );
}
