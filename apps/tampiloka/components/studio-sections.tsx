import { Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { TEMURA_URL } from "@/lib/temura-url";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function StudioSections({ locale }: { locale: Locale }) {
  const copy = getPrimaryCopy(locale).studio;
  return <div className="studio-sections">
    <section id="layanan" className="studio-section studio-services">
      <div className="studio-inner studio-split-layout">
        <div className="studio-section-heading"><h2 className="type-heading-1" data-reveal>{copy.servicesTitle}</h2><Button variant="secondary" nativeButton={false} render={<Link href="/layanan" />}>{copy.servicesLink}</Button></div>
        <Accordion className="studio-service-list" defaultValue={[locale === "id" ? "Website" : "Websites"]}>
          {copy.services.map(({ title, description, href }) => <AccordionItem className="studio-service" value={title} key={title} data-reveal><AccordionTrigger className="type-heading-3">{title}<Plus className="faq-icon" aria-hidden="true" /></AccordionTrigger><AccordionContent><p className="type-body">{description}</p>{href && <Button variant="secondary" className="studio-service__link" nativeButton={false} render={<a href={TEMURA_URL} target="_blank" rel="noopener noreferrer" />}>{copy.temuraCta}</Button>}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
    <section id="tentang" className="studio-section studio-about">
      <div className="studio-inner"><div className="studio-about-intro"><h2 className="type-heading-1" data-reveal>{copy.aboutTitle}</h2><div><p className="type-body-lg" data-reveal>{copy.aboutDescription}</p><Button variant="secondary" nativeButton={false} render={<Link href="/tentang" />}>{copy.aboutLink}</Button></div></div><PageVisual kind="workspace" alt={copy.aboutImageAlt} className="studio-editorial-visual" /><p className="type-caption studio-visual-caption">{copy.aboutCaption}</p></div>
    </section>
    <section className="studio-section studio-process"><div className="studio-inner"><h2 className="type-heading-1" data-reveal>{copy.processTitle}</h2><ol className="studio-process-list">{copy.steps.map(({ title, description }, index) => <li className="studio-process-step" key={title} data-reveal><span className="studio-process-number type-label-sm">0{index + 1}</span><h3 className="type-heading-4">{title}</h3><p className="type-body">{description}</p></li>)}</ol></div></section>
    <section id="industri" className="studio-section studio-industries"><div className="studio-inner studio-industry-preview"><div><h2 className="type-heading-1" data-reveal>{copy.industriesTitle.split("\n").map((part, index) => <span key={part}>{index > 0 && <br />}{part}</span>)}</h2><p className="type-body-lg" data-reveal>{copy.industriesDescription}</p><Button variant="secondary" nativeButton={false} render={<Link href="/industri" />}>{copy.industriesLink}</Button></div><PageVisual kind="products" alt={copy.industriesImageAlt} /></div></section>
  </div>;
}
