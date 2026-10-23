"use client";

import { SiteHeader as SharedSiteHeader } from "@tampiloka/brand-system/header";
import { contactLink } from "@/lib/site";
import { usePathname } from "next/navigation";

const links = [
  { label: "Desain", href: "/desain" },
  { label: "Fitur", href: "/fitur" },
  { label: "Harga", href: "/harga" },
  { label: "Masuk", href: "/login" },
] as const;

export function SiteHeader() {
  const contact = contactLink();
  const pathname = usePathname();

  return (
    <SharedSiteHeader
      logo={{
        src: "/brand/logos/light/temura-horizontal-light.svg",
        alt: "Temura",
        width: 176,
        height: 44,
        href: "/",
      }}
      darkLogo={{
        src: "/brand/logos/dark/temura-horizontal-dark.svg",
        alt: "Temura",
        width: 176,
        height: 44,
        href: "/",
      }}
      transparentOnTop={pathname === "/"}
      links={links}
      action={{
        label: "Hubungi kami",
        href: contact,
      }}
      mobileTitle="Navigasi Temura"
    />
  );
}

export default SiteHeader;
