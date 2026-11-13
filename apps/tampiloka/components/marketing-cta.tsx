import { cloneElement, type ReactElement, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** A navigation link styled with the shared marketing action hierarchy. */
export function MarketingCTA({ primary = false, className, render, children }: {
  primary?: boolean;
  className?: string;
  render: ReactElement<{ className?: string; children?: ReactNode }>;
  children: ReactNode;
  nativeButton?: false;
}) {
  return cloneElement(render, {
    className: cn(buttonVariants({ variant: primary ? "brand" : "outline", size: "pill" }), render.props.className, className),
    children,
  });
}
