import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { selectedFamily } from "@/lib/service-selection.mjs";
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
export default async function PricingPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{family?:string|string[]}>}) {
 const {locale}=await params;
 if(!hasLocale(locales,locale)) notFound();
 setRequestLocale(locale);
 const family = selectedFamily((await searchParams).family);
 return <ServicePricing key={`${locale}:${family}`} locale={locale} initialFamily={family}/>;
}
