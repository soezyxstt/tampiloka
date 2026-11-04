import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[#166534] focus-visible:outline-offset-3";

export function BrandChoiceInput({ className, ...props }: ComponentProps<"input"> & { type: "checkbox" | "radio" }) {
  return <input {...props} className={cn("size-5 shrink-0", focusStyles, className)} />;
}

const controlStyles =
  `flex min-h-11 w-full border border-input bg-background px-3 py-2 font-sans text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 ${focusStyles}`;

export function BrandInput({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(controlStyles, "rounded-md", className)} />;
}

export function SelectField({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return <div className="min-w-0"><label className="type-label mb-2.5 block" htmlFor={id}>{label}</label><Select items={options} value={value} onValueChange={(next) => { if (next !== null) onChange(next); }}><SelectTrigger id={id} aria-label={label} data-value={value} className="type-body text-base min-h-12 w-full cursor-pointer rounded-md bg-background px-3 shadow-sm"><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value} data-value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>;
}

export function SearchField({ id, label, ...props }: ComponentProps<"input"> & { id: string; label: string }) {
  return <div className="min-w-0"><label className="type-label mb-2.5 block" htmlFor={id}>{label}</label><div className="relative"><Search size={18} className="pointer-events-none absolute left-3 top-4 text-muted-foreground" aria-hidden="true" /><BrandInput {...props} id={id} type="search" className="min-h-12 pl-10" /></div></div>;
}

export function BrandTextarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(controlStyles, "min-h-24 rounded-md", className)} />;
}
