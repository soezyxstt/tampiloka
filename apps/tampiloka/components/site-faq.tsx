"use client"

import { Plus } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getFaqItems } from "@/lib/faq"
import { pricingFaqs } from "@/lib/pricing"
import { shellCopy } from "@/i18n/shell-copy"
import "../app/navigation.css"

export function SiteFaq() {
  const locale = useLocale() as Locale
  const copy = shellCopy(locale)
  const items = usePathname() === "/paket" ? pricingFaqs(locale) : getFaqItems(locale)
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-intro" data-reveal>
        <h2 id="faq-title" className="type-heading-1">{copy.faq.title}</h2>
      </div>
      <Accordion className="faq-list" data-reveal>
        {items.map(({ question, answer }) => (
          <AccordionItem key={question}>
            <AccordionTrigger className="type-heading-5">
              <span>{question}</span>
              <Plus aria-hidden="true" className="faq-icon" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="faq-answer type-body">{answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
