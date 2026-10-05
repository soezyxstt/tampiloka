import type { Metadata } from "next";
import { DesignShowcase } from "@/components/design-showcase";
import { PortfolioSection } from "@/components/marketing-sections";
const title = "Desain undangan digital";
const description = "Lihat pilihan desain undangan digital Temura dan buka preview untuk membandingkan tampilannya.";
const socialImage = { url: "/images/wedding-hero.webp", alt: "Pasangan pengantin di lokasi pernikahan dengan dekorasi bunga" };
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/desain" },
  openGraph: { title, description, url: "/desain", type: "website", siteName: "Temura", locale: "id_ID", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
};
export default function DesignsPage() {
  return <div className="temura-site"><section className="temura-section temura-container temura-page-intro"><h1 className="type-display">Desain</h1><div className="temura-page-description"><DesignShowcase /></div></section><PortfolioSection /></div>;
}
