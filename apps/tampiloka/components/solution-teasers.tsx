import { Plus } from "lucide-react";
import { IndustryPreview } from "@/components/industry-preview";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function SolutionTeasers({ locale }: { locale: Locale }) {
  const copy = getPrimaryCopy(locale).solutions;
  return (
    <section className="solution-teasers" aria-labelledby="solutions-title">
      <div className="solution-teasers__intro">
        <h2 id="solutions-title" className="type-heading-1" data-reveal>{copy.title}</h2>
        <Button variant="link" size="pill" nativeButton={false} render={<Link href="/layanan" />}>{copy.link}</Button>
      </div>
      <div className="solution-teasers__list">
        {copy.items.map((item) => (
          <article className="solution-teaser" key={item.kind}>
            <div className="solution-teaser__visual"><IndustryPreview kind={item.kind} /></div>
            <div className="solution-teaser__copy" data-reveal>
              <h3 className="type-heading-3">{item.title}</h3>
              <p className="type-body">{item.description}</p>
              <Accordion>
                <AccordionItem value={item.kind}>
                  <AccordionTrigger className="solution-teaser__trigger type-label">{copy.details}<Plus className="faq-icon" aria-hidden="true" /></AccordionTrigger>
                  <AccordionContent><p className="type-body">{item.details}</p></AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
