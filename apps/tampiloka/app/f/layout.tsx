import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SITE_METADATA_BASE } from "@/lib/seo";
import "../globals.css";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "600"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600", "700"] });
export const metadata: Metadata = { metadataBase: SITE_METADATA_BASE, robots: { index: false, follow: false } };
export default function FormLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id" className={`${inter.variable} ${manrope.variable} antialiased`}><body>{children}</body></html>;
}
