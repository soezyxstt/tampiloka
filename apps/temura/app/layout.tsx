import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono, Cormorant_Garamond, Lato } from "next/font/google";
import { Providers } from "./providers";
import { siteOrigin } from "@/lib/site";
import "./globals.css";
import "./temura.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-invitation-serif", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });
const lato = Lato({ variable: "--font-sans-inv", subsets: ["latin"], weight: ["300", "400", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "Temura | Undangan Digital oleh Tampiloka", template: "%s | Temura" },
  description: "Pilih desain undangan, bagikan kepada tamu, dan kelola kehadiran. Undangan digital oleh Tampiloka.",
  applicationName: "Temura",
  manifest: "/site.webmanifest",
  icons: {
    icon: { url: "/favicon.ico", type: "image/x-icon" },
  },
  openGraph: {
    siteName: "Temura",
    locale: "id_ID",
    type: "website",
    title: "Temura | Undangan Digital oleh Tampiloka",
    description: "Pilih desain undangan, bagikan kepada tamu, dan kelola kehadiran. Undangan digital oleh Tampiloka.",
    images: [{ url: "/brand/social/light/temura-og-image-light.png", width: 1200, height: 630, alt: "Temura | Undangan Digital oleh Tampiloka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temura | Undangan Digital oleh Tampiloka",
    description: "Pilih desain undangan, bagikan kepada tamu, dan kelola kehadiran. Undangan digital oleh Tampiloka.",
    images: ["/brand/social/light/temura-og-image-light.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${inter.variable} ${manrope.variable} ${mono.variable} ${cormorant.variable} ${lato.variable} h-full antialiased`}><body className="min-h-full"><Providers>{children}</Providers></body></html>;
}
