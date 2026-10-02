import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./marketing.css";
import "./showcase.css";
import "./studio-sections.css";
import "./inner-pages.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteFaq } from "@/components/site-faq";
import SiteMotion from "@/components/site-motion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Tampiloka | Web Studio", template: "%s | Tampiloka" },
  description: "Studio desain dan pengembangan website untuk brand dan bisnis. Website, produk digital, pengembangan, dan branding.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  manifest: "/site.webmanifest",
  icons: {
    icon: { url: "/favicon.ico", type: "image/x-icon" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><SiteMotion><div className="marketing-site" id="top"><a className="skip-link type-label" href="#main-content">Langsung ke konten</a><SiteHeader /><main id="main-content">{children}<SiteFaq /></main><SiteFooter /></div></SiteMotion></body>
    </html>
  );
}
