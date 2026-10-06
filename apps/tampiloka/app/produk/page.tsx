import ProjectShowcase from "@/components/project-showcase";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/produk",
  title: "Contoh Website dan Undangan Digital",
  description:
    "Jelajahi website Syahril MC, konsep website kuliner dan katalog, serta undangan digital Temura.",
  imageAlt: "Contoh katalog produk pada layar laptop dan ponsel.",
  imagePath: "/images/service-website.webp",
});

export default function ProdukPage() {
  return <ProjectShowcase page />;
}
