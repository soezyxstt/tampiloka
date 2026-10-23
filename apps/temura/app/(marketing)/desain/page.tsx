import { DesignShowcase } from "@/components/design-showcase";
import { PortfolioSection } from "@/components/marketing-sections";
import { JsonLd } from "@/components/json-ld";
import { TEMPLATE_CATALOG } from "@/lib/template-catalog";
import {
  createPageMetadata,
  temuraItemListSchema,
  temuraWebPageSchema,
} from "@/lib/seo";

const pageTitle = "Desain undangan digital";
const pageDescription =
  "Pilih desain undangan pernikahan Temura dan lihat contohnya sebelum menentukan pilihan.";

export const metadata = createPageMetadata({
  path: "/desain",
  title: pageTitle,
  description: pageDescription,
});

// The catalog defaults to the "adat" category, so the structured data mirrors
// the designs that are visible on first paint.
const visibleDesigns = TEMPLATE_CATALOG.filter(
  (item) => item.categoryId === "adat" && item.assetStatus === "ready",
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    temuraWebPageSchema({
      path: "/desain",
      title: `${pageTitle} | Temura`,
      description: pageDescription,
      type: "CollectionPage",
    }),
    temuraItemListSchema(
      "Desain undangan pernikahan Temura",
      visibleDesigns.map((design) => ({
        name: design.name,
        description: design.description,
        image: design.coverImage?.replace(".webp", "-480.webp"),
        itemType: "CreativeWork",
      })),
    ),
  ],
};

export default function DesignsPage() {
  return (
    <div className="temura-site">
      <JsonLd data={structuredData} />
      <section className="temura-section temura-container temura-page-intro">
        <h1 className="type-display">Desain</h1>
        <div className="temura-page-description"><DesignShowcase /></div>
      </section>
      <PortfolioSection />
    </div>
  );
}
