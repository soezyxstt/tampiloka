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
import { absoluteSiteUrl, SITE_METADATA_BASE, SITE_ORIGIN } from "@/lib/seo";

const siteDescription =
  "Studio web independen untuk brand dan bisnis. Tampiloka merancang website, produk digital, branding, dan undangan pernikahan digital melalui Temura.";
const defaultSocialTitle = "Tampiloka | Studio Web";
const defaultSocialImage = absoluteSiteUrl("/images/service-overview.webp");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "Tampiloka",
      url: SITE_ORIGIN,
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: absoluteSiteUrl("/brand/social/light/tampiloka-profile-light.png"),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: "Tampiloka",
      inLanguage: "id-ID",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    },
  ],
};
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

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
  title: { default: defaultSocialTitle, template: "%s | Tampiloka" },
  description: siteDescription,
  metadataBase: SITE_METADATA_BASE,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Tampiloka",
    title: defaultSocialTitle,
    description: siteDescription,
    images: [{
      url: defaultSocialImage,
      alt: "Rancangan website dengan antarmuka hijau di layar laptop dan contoh palet warna.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSocialTitle,
    description: siteDescription,
    images: [defaultSocialImage],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: { url: "/favicon.ico", type: "image/x-icon" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
        <SiteMotion><div className="marketing-site" id="top"><a className="skip-link type-label" href="#main-content">Langsung ke konten</a><SiteHeader /><main id="main-content">{children}<SiteFaq /></main><SiteFooter /></div></SiteMotion>
      </body>
    </html>
  );
}
