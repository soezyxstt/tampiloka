import type { Metadata } from "next";
import { DesignShowcase } from "@/components/design-showcase";
import { PortfolioSection } from "@/components/marketing-sections";
export const metadata: Metadata = { title: "Desain undangan | Temura", alternates: { canonical: "/desain" } };
export default function DesignsPage() {
  return <div className="temura-site"><section className="temura-section temura-container temura-page-intro"><h1 className="type-display">Desain</h1><div className="temura-page-description"><DesignShowcase /></div></section><PortfolioSection /></div>;
}
