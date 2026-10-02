"use client"

import { Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import "../app/navigation.css"

const questions = [
  ["Apa yang perlu disiapkan sebelum mulai?", "Cukup tujuan dan gambaran kebutuhan. Kami bantu merapikan sisanya di awal proyek."],
  ["Berapa lama proses pengerjaannya?", "Tergantung lingkup dan materi. Estimasi kami sepakati setelah kebutuhan proyek jelas."],
  ["Apakah website bisa dibuka dengan baik di ponsel?", "Ya. Tata letak dan interaksi dirancang untuk berbagai ukuran layar."],
  ["Apakah Tampiloka juga membantu branding?", "Ya. Kami membantu membangun identitas brand dan menerapkannya di website."],
  ["Bagaimana jika perlu bantuan setelah website tayang?", "Dukungan lanjutan bisa dibicarakan sesuai kebutuhan proyek."],
] as const

export function SiteFaq() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-intro" data-reveal>
        <h2 id="faq-title" className="type-heading-1">Pertanyaan umum.</h2>
      </div>
      <Accordion className="faq-list" data-reveal>
        {questions.map(([question, answer]) => (
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
