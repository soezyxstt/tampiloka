import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Geist_Mono, Cormorant_Garamond, Lato } from "next/font/google";
import { Providers } from "./providers";
import { JsonLd } from "@/components/json-ld";
import {
  TEMURA_DESCRIPTION,
  TEMURA_METADATA_BASE,
  TEMURA_NAME,
  TEMURA_ORIGIN,
  TEMURA_ROBOTS,
  TEMURA_SOCIAL_IMAGE,
  TEMURA_SOCIAL_IMAGE_URL,
  temuraBrandSchema,
  temuraOrganizationSchema,
  temuraSiteVerification,
  temuraWebsiteSchema,
} from "@/lib/seo";
import "./globals.css";
import "./temura.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-invitation-serif", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });
const lato = Lato({ variable: "--font-sans-inv", subsets: ["latin"], weight: ["300", "400", "700"], display: "swap" });

const defaultTitle = "Temura | Undangan Digital oleh Tampiloka";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#15803D",
};

export const metadata: Metadata = {
  metadataBase: TEMURA_METADATA_BASE,
  title: { default: defaultTitle, template: "%s | Temura" },
  description: TEMURA_DESCRIPTION,
  applicationName: TEMURA_NAME,
  authors: [{ name: "Tampiloka", url: "https://tampiloka.site" }],
  creator: "Tampiloka",
  publisher: "Tampiloka",
  category: "wedding",
  robots: TEMURA_ROBOTS,
  verification: temuraSiteVerification(),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/brand/icons/light/temura-favicon-32-light.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/icons/light/temura-apple-touch-light.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Temura",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    siteName: TEMURA_NAME,
    locale: "id_ID",
    type: "website",
    title: defaultTitle,
    description: TEMURA_DESCRIPTION,
    url: TEMURA_ORIGIN,
    images: [{
      url: TEMURA_SOCIAL_IMAGE_URL,
      alt: TEMURA_SOCIAL_IMAGE.alt,
      width: TEMURA_SOCIAL_IMAGE.width,
      height: TEMURA_SOCIAL_IMAGE.height,
      type: TEMURA_SOCIAL_IMAGE.type,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: TEMURA_DESCRIPTION,
    images: [TEMURA_SOCIAL_IMAGE_URL],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [temuraOrganizationSchema(), temuraBrandSchema(), temuraWebsiteSchema()],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${inter.variable} ${manrope.variable} ${mono.variable} ${cormorant.variable} ${lato.variable} h-full antialiased`}><body className="min-h-full"><JsonLd data={structuredData} /><Providers>{children}</Providers></body></html>;
}
