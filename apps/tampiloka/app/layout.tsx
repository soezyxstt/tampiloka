import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./marketing.css";
import "./showcase.css";
import "./studio-sections.css";
import "./inner-pages.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteFaq } from "@/components/site-faq";
import { JsonLd } from "@/components/json-ld";
import SiteMotion from "@/components/site-motion";
import {
  DEFAULT_ROBOTS,
  DEFAULT_SOCIAL_IMAGE,
  DEFAULT_SOCIAL_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_METADATA_BASE,
  SITE_NAME,
  SITE_ORIGIN,
  SOCIAL_HANDLE,
  organizationSchema,
  siteVerification,
  websiteSchema,
} from "@/lib/seo";

const defaultSocialTitle = "Tampiloka | Desain dan Pembuatan Website";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema(), websiteSchema()],
};

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#22C55E",
};

export const metadata: Metadata = {
  title: { default: defaultSocialTitle, template: "%s | Tampiloka" },
  description: SITE_DESCRIPTION,
  metadataBase: SITE_METADATA_BASE,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "design",
  robots: DEFAULT_ROBOTS,
  verification: siteVerification(),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    title: defaultSocialTitle,
    description: SITE_DESCRIPTION,
    url: SITE_ORIGIN,
    images: [{
      url: DEFAULT_SOCIAL_IMAGE_URL,
      alt: DEFAULT_SOCIAL_IMAGE.alt,
      width: DEFAULT_SOCIAL_IMAGE.width,
      height: DEFAULT_SOCIAL_IMAGE.height,
      type: DEFAULT_SOCIAL_IMAGE.type,
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL_HANDLE,
    creator: SOCIAL_HANDLE,
    title: defaultSocialTitle,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/brand/icons/light/tampiloka-favicon-32-light.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/icons/light/tampiloka-apple-touch-light.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={structuredData} />
        <SiteMotion><div className="marketing-site" id="top"><a className="skip-link type-label" href="#main-content">Langsung ke isi halaman</a><SiteHeader /><main id="main-content">{children}<SiteFaq /></main><SiteFooter /></div></SiteMotion>
      </body>
    </html>
  );
}
