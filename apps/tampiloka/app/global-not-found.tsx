import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Manrope, Geist_Mono } from "next/font/google";
import { hasLocale } from "next-intl";
import { NotFoundContent } from "@/components/not-found-content";
import { defaultLocale, locales } from "@/i18n/routing";
import { SITE_METADATA_BASE } from "@/lib/seo";
import "./globals.css";
import "./inner-pages.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 | Tampiloka",
  description: "The requested page could not be found.",
  metadataBase: SITE_METADATA_BASE,
  robots: { index: false, follow: false },
};

export default async function GlobalNotFound() {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-next-intl-locale");
  const locale = hasLocale(locales, requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="marketing-site" id="top">
          <main id="main-content"><NotFoundContent locale={locale} /></main>
        </div>
      </body>
    </html>
  );
}
