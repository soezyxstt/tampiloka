import type { Metadata } from "next";
import { PricingSection } from "@/components/marketing-sections";
const title = "Harga undangan digital";
const description = "Bandingkan paket undangan digital Temura dan lihat fitur sesuai desain serta tingkat kustomisasi.";
const socialImage = { url: "/images/wedding-hero.webp", alt: "Pasangan pengantin di lokasi pernikahan dengan dekorasi bunga" };
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/harga" },
  openGraph: { title, description, url: "/harga", type: "website", siteName: "Temura", locale: "id_ID", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
};
export default function PricingPage(){return <div className="temura-site temura-page-intro"><PricingSection headingLevel="h1"/></div>}
