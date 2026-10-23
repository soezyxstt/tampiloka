import { PricingSection } from "@/components/marketing-sections";
import { JsonLd } from "@/components/json-ld";
import {
  createPageMetadata,
  temuraOfferCatalogSchema,
  temuraProductSchema,
  temuraWebPageSchema,
} from "@/lib/seo";

const pageTitle = "Harga undangan digital";
const pageDescription =
  "Bandingkan harga paket undangan digital Temura berdasarkan pilihan desain dan penyesuaiannya.";

export const metadata = createPageMetadata({
  path: "/harga",
  title: pageTitle,
  description: pageDescription,
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    temuraWebPageSchema({
      path: "/harga",
      title: `${pageTitle} | Temura`,
      description: pageDescription,
    }),
    temuraProductSchema(),
    temuraOfferCatalogSchema(),
  ],
};

export default function PricingPage() {
  return (
    <div className="temura-site temura-page-intro">
      <JsonLd data={structuredData} />
      <PricingSection headingLevel="h1" />
    </div>
  );
}
