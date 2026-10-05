"use client";

import { SiteHeader as SharedSiteHeader } from "@tampiloka/brand-system/header";

const links = [
  { label: "Produk", href: "/produk" },
  { label: "Layanan", href: "/layanan" },
  { label: "Industri", href: "/industri" },
  { label: "Tentang", href: "/tentang" },
] as const;

export function SiteHeader() {
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
        label: "Contact",
        href: "/contact",
      }}
      mobileTitle="Navigasi Tampiloka"
    />
  );
}
