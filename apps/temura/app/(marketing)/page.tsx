import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DesignShowcase } from "@/components/design-showcase";
import { PortfolioSection, PricingSection, ProductSections } from "@/components/marketing-sections";
import { TEMPLATE_TIERS } from "@/lib/template-catalog";

export default function LandingPage() {
  return (
    <div className="temura-site">
      <section className="temura-hero">
        <Image className="temura-hero-background" src="/images/wedding-hero.webp" alt="" fill priority sizes="100vw" />
        <div className="temura-container temura-hero-inner">
          <div className="temura-hero-copy">
            <h1 className="type-display-xl" data-reveal>Undangan<br /><span>pernikahan digital.</span></h1>
            <p className="type-body-lg temura-intro" data-reveal>Pilih desain, sesuaikan, lalu bagikan.</p>
            <div className="temura-actions" data-reveal>
              <a
                href="#desain"
                className={buttonVariants({ variant: "brand", size: "pill" })}
              >
                Lihat desain
                <ArrowUpRight size={16} />
              </a>
              <Link href="/fitur" className="temura-text-link type-label">
                Fitur
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <p className="type-body temura-hero-note">Mulai Rp{TEMPLATE_TIERS.essential.priceIdr.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </section>
      <section id="desain" className="temura-section temura-container">
        <div className="temura-section-heading"><h2 className="type-display">Desain</h2><Link className="temura-inline-link type-label" href="/desain">Semua desain<ArrowUpRight size={18} /></Link></div>
        <DesignShowcase />
      </section>
      <PortfolioSection />
      <ProductSections />
      <PricingSection />
    </div>
  );
}
