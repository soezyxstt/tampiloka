import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[#166534] focus-visible:outline-offset-3";

export function BrandChoiceInput({ className, ...props }: ComponentProps<"input"> & { type: "checkbox" | "radio" }) {
  return <input {...props} className={cn("size-5 shrink-0", focusStyles, className)} />;
}

const controlStyles =
  "flex min-h-11 w-full rounded-xl border border-[#d3dfd5] bg-white/95 px-3.5 py-2.5 font-sans text-base text-[#15241e] shadow-[0_1px_2px_rgba(21,36,30,0.04)] outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-[#66776c] hover:border-[#8cb596] hover:bg-[#f9fcf9] focus-visible:border-[var(--form-accent,#15803d)] focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-[#15803d]/18 disabled:cursor-not-allowed disabled:opacity-50 dark:border-input dark:bg-input/30 dark:text-foreground dark:placeholder:text-muted-foreground dark:hover:border-ring/60 dark:hover:bg-input/50 dark:focus-visible:border-ring dark:focus-visible:bg-input/40 dark:focus-visible:ring-ring/40";

const inlineControlStyles = "block min-h-11 h-auto w-full [field-sizing:content] border-0 border-b border-transparent rounded-none bg-transparent px-0 py-2 font-sans text-base text-inherit shadow-none outline-none resize-none overflow-hidden leading-normal transition-colors placeholder:text-muted-foreground hover:border-b-[var(--form-border)] focus:border-b-[var(--form-accent)] focus:shadow-[0_1px_var(--form-accent)] disabled:cursor-not-allowed disabled:opacity-50";

export function BrandInput({ className, variant = "default", ...props }: ComponentProps<"input"> & { variant?: "default" | "inline" }) {
  return <input {...props} className={cn(variant === "inline" ? inlineControlStyles : controlStyles, className)} />;
}

export function SelectField({ id, label, value, onChange, options, hideLabel = false }: { id: string; label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[]; hideLabel?: boolean }) {
  return <div className="min-w-0"><label className={hideLabel ? "sr-only" : "type-label mb-2 block text-[#273a2f] dark:text-foreground"} htmlFor={id}>{label}</label><Select items={options} value={value} onValueChange={(next) => { if (next !== null) onChange(next); }}><SelectTrigger id={id} aria-label={label} data-value={value} className="type-body min-h-12 data-[size=default]:h-auto w-full cursor-pointer font-normal"><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value} data-value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>;
}

export function SearchField({ id, label, ...props }: ComponentProps<"input"> & { id: string; label: string }) {
  return <div className="min-w-0"><label className="type-label mb-2 block text-[#273a2f] dark:text-foreground" htmlFor={id}>{label}</label><div className="relative"><Search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#53645a] dark:text-muted-foreground" aria-hidden="true" /><BrandInput {...props} id={id} type="search" className="min-h-12 pl-10" /></div></div>;
}

export function BrandTextarea({ className, variant = "default", ...props }: ComponentProps<"textarea"> & { variant?: "default" | "inline" }) {
  return <textarea {...props} className={cn(variant === "inline" ? inlineControlStyles : `${controlStyles} min-h-24`, className)} />;
}
