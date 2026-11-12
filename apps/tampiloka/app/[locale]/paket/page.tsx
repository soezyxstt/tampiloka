import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { ServicePricing } from "@/components/pricing/service-pricing";
import { createPageMetadata } from "@/lib/seo";
import "./pricing.css";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if (!hasLocale(locales, locale)) notFound();
 return createPageMetadata({
  path: "/paket", locale,
  title: locale === "en" ? "Packages" : "Paket",
  description: locale === "en" ? "Compare packages for websites, stores, booking, education, and restaurants." : "Bandingkan paket untuk website, toko, booking, pendidikan, dan restoran.",
  imageAlt: locale === "en" ? "Tampiloka website and business services" : "Layanan website dan bisnis Tampiloka",
 });
}
export default async function PricingPage({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!hasLocale(locales,locale)) notFound();
 setRequestLocale(locale);
 return <ServicePricing locale={locale}/>;
}
