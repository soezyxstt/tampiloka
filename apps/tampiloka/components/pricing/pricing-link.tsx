"use client";

import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Keep native link semantics and keyboard behavior while reusing brand button styles.
export function PricingLink({ className, variant = "outline", ...props }: ComponentProps<"a"> & Pick<VariantProps<typeof buttonVariants>, "variant">) {
  return <a {...props} className={cn(buttonVariants({ variant, size: "lg" }), "pricing-action", className)} />;
}
