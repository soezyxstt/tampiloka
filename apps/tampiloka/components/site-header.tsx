"use client";

import { SiteHeader as SharedSiteHeader } from "@tampiloka/brand-system/header";

const links = [
  { label: "Karya", href: "/produk" },
  { label: "Layanan", href: "/layanan" },
  { label: "Industri", href: "/industri" },
  { label: "Paket", href: "/paket" },
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
        label: "Kontak",
        href: "/contact",
      }}
      mobileTitle="Navigasi Tampiloka"
    />
  );
}
