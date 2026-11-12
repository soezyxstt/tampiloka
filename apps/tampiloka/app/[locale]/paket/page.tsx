import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { ServicePricing } from "@/components/pricing/service-pricing";
import "./pricing.css";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 return {title:locale === "en" ? "Packages | Tampiloka" : "Paket | Tampiloka"};
}
export default async function PricingPage({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!hasLocale(locales,locale)) notFound();
 setRequestLocale(locale);
 return <ServicePricing locale={locale}/>;
}
