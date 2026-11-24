"use client"

import { Plus } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getFaqItems } from "@/lib/faq"

import { shellCopy } from "@/i18n/shell-copy"

export function SiteFaq() {
  const locale = useLocale() as Locale
  const copy = shellCopy(locale)
  const items = usePathname() === "/paket" ? (locale === "en" ? [
    {question:"How are payments scheduled?", answer:"Setup requires a 50% deposit and the balance after acceptance testing. Subscription starts on activation and is paid three months in advance."},
    {question:"What does the subscription include?", answer:"Hosting, maintenance, fixes for system errors and backups subject to tested recovery. Usage support is limited by the monthly rate; content and design changes are separate."},
    {question:"Are these final prices?", answer:"These are draft estimates. Promotion eligibility, scope, readiness and final price are confirmed during consultation."}
  ] : [
    {question:"Bagaimana jadwal pembayarannya?", answer:"Penyiapan dibayar dengan DP 50% dan pelunasan setelah uji penerimaan. Langganan dimulai saat aktif dan dibayar tiga bulan di muka."},
    {question:"Apa yang termasuk langganan?", answer:"Hosting, pemeliharaan, perbaikan kesalahan sistem dan cadangan sesuai hasil uji pemulihan. Bantuan penggunaan dibatasi sesuai tarif bulanan; perubahan isi dan desain terpisah."},
    {question:"Apakah harga ini sudah final?", answer:"Ini estimasi rancangan. Kelayakan promo, cakupan, kesiapan dan harga akhir dikonfirmasi saat konsultasi."}
  ]) : getFaqItems(locale)
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
