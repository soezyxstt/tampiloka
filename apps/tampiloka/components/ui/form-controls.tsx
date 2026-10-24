import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const controlStyles =
  "flex min-h-11 w-full border border-input bg-background px-3 py-2 font-sans text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

export function BrandInput({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(controlStyles, "rounded-md", className)} />;
}

export function BrandSelect({ className, ...props }: ComponentProps<"select">) {
  return <select {...props} className={cn(controlStyles, "appearance-none rounded-md pr-9", className)} />;
}

export function BrandTextarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(controlStyles, "min-h-24 rounded-md", className)} />;
}
