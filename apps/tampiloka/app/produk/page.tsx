import ProjectShowcase from "@/components/project-showcase";
import { JsonLd } from "@/components/json-ld";
import { PROJECTS } from "@/lib/projects";
import { createPageMetadata, itemListSchema, webPageSchema } from "@/lib/seo";

const pageTitle = "Contoh Website dan Undangan Digital";
const pageDescription =
  "Lihat website, katalog, platform belajar, dan undangan digital dalam pilihan karya Tampiloka. Konsep demo ditandai terpisah dari proyek klien.";

export const metadata = createPageMetadata({
  path: "/produk",
  title: pageTitle,
  description: pageDescription,
  imageAlt: "Contoh katalog produk pada layar laptop dan ponsel.",
  imagePath: "/images/service-website.webp",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      path: "/produk",
      title: `${pageTitle} | Tampiloka`,
      description: pageDescription,
      type: "CollectionPage",
      imagePath: "/images/service-website.webp",
    }),
    itemListSchema(
      "Karya Tampiloka",
      PROJECTS.map((project) => ({
        name: project.name,
        description: project.description,
        url: project.url,
        itemType: "WebSite",
      })),
    ),
  ],
};

export default function ProdukPage() {
  return <>
    <JsonLd data={structuredData} />
    <ProjectShowcase page />
  </>;
}
