import type { Metadata } from "next";
import { PricingSection } from "@/components/marketing-sections";
export const metadata:Metadata={title:"Harga & paket | Temura",alternates:{canonical:"/harga"}};
export default function PricingPage(){return <div className="temura-site temura-page-intro"><PricingSection/></div>}
