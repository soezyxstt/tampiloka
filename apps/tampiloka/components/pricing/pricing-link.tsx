"use client";

import type { ComponentProps } from "react";
import { MarketingCTA } from "@/components/marketing-cta";

export function PricingLink({ className, variant = "outline", children, ...props }: ComponentProps<"a"> & { variant?: "brand" | "outline" }) {
  return <MarketingCTA primary={variant === "brand"} className={["pricing-action", className].filter(Boolean).join(" ")} render={<a {...props} />}>{children}</MarketingCTA>;
}
