import { Check, ChevronDown, ChevronUp } from "lucide-react";
type Props = { lucide: string; className?: string; tabler?: string; hugeicons?: string; phosphor?: string; remixicon?: string };
// Official registry icon resolver replaced with the chosen Lucide icon set.
export function IconPlaceholder({lucide,className}:Props){
 const Icon=lucide==='CheckIcon'?Check:lucide==='ChevronUpIcon'?ChevronUp:ChevronDown;
 return <Icon aria-hidden="true" className={className} />;
}
