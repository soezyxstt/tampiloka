import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Geist_Mono } from "next/font/google";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { SiteFaq } from "@/components/site-faq";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import SiteMotion from "@/components/site-motion";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { locales, type Locale } from "@/i18n/routing";
import { shellCopy } from "@/i18n/shell-copy";
import {
  createPageMetadata,
  DEFAULT_ROBOTS,
  organizationSchema,
  SITE_METADATA_BASE,
  SITE_NAME,
  SITE_ORIGIN,
  siteVerification,
  websiteSchema,
} from "@/lib/seo";
import "../globals.css";
import "../marketing.css";
import "../showcase.css";
import "../studio-sections.css";
import "../inner-pages.css";

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

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocalizedLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Pick<LocalizedLayoutProps, "params">): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();

  const locale: Locale = requestedLocale;
  const homeMetadata = getPrimaryCopy(locale).metadata.home;

  return {
    ...createPageMetadata({
      path: "/",
      locale,
      title: homeMetadata.title,
      description: homeMetadata.description,
      imageAlt: getPrimaryCopy(locale).home.imageAlt,
      imagePath: "/images/service-overview.webp",
    }),
    metadataBase: SITE_METADATA_BASE,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "design",
    robots: DEFAULT_ROBOTS,
    verification: siteVerification(),
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
}

const structuredData = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@graph": [organizationSchema(locale), websiteSchema(locale)],
});

export default async function RootLayout({ children, params }: LocalizedLayoutProps) {
  const { locale: requestedLocale } = await params;
  if (!hasLocale(locales, requestedLocale)) notFound();

  const locale: Locale = requestedLocale;
  setRequestLocale(locale);
  const copy = shellCopy(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={{}}>
          <JsonLd data={structuredData(locale)} />
          <SiteMotion>
            <div className="marketing-site" id="top">
              <a className="skip-link type-label" href="#main-content">{copy.a11y.skipToContent}</a>
              <SiteHeader />
              <main id="main-content">
                {children}
                <SiteFaq />
              </main>
              <SiteFooter />
            </div>
          </SiteMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
