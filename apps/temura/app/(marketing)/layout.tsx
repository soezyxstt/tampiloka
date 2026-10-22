import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import SiteMotion from "@/components/site-motion";

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
