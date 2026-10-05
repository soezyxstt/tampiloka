import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import SiteMotion from "@/components/site-motion";
import { siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Temura | Undangan Digital oleh Tampiloka",
    template: "%s | Temura",
  },
  description: "Pilih desain undangan, bagikan kepada tamu, dan kelola kehadiran. Undangan digital oleh Tampiloka.",
  alternates: { canonical: "/" },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteMotion>
      <div className="marketing-site temura-marketing" id="top">
        <a className="skip-link type-label" href="#main-content">
          Langsung ke konten
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </div>
    </SiteMotion>
  );
}
