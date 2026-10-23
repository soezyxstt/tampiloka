"use client"

import { Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/faq"
import { PRICING_FAQS } from "@/lib/pricing"
import "../app/navigation.css"

export function SiteFaq() {
  const items = usePathname() === "/paket" ? PRICING_FAQS : FAQ_ITEMS;
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-intro" data-reveal>
        <h2 id="faq-title" className="type-heading-1">Pertanyaan umum.</h2>
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
