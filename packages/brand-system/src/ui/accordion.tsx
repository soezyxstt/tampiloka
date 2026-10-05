"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import type { ComponentProps } from "react"

function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("faq-item", className)} {...props} />
}

function AccordionTrigger({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn("faq-trigger", className)} {...props} />
}

function AccordionContent({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Panel>) {
  return <AccordionPrimitive.Panel data-slot="accordion-content" className={cn("faq-panel", className)} {...props} />
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
