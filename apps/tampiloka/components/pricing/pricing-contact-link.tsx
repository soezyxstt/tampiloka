"use client";

import type { ComponentProps } from "react";
import { ContactIconLink } from "@/components/contact-icon-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PricingContactLinkProps = Omit<ComponentProps<typeof ContactIconLink>, "platform">;

export function PricingContactLink({ className, ...props }: PricingContactLinkProps) {
  return (
    <ContactIconLink
      {...props}
      platform="whatsapp"
      className={cn(buttonVariants({ variant: "brand", size: "icon-lg" }), "pricing-action min-h-11 min-w-11", className)}
    />
  );
}
