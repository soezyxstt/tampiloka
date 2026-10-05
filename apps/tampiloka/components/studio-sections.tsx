import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { TEMURA_URL } from "@/lib/temura-url";

const services: { title: string; description: string; href?: string }[] = [
  { title: "Website", description: "Brand website, company profile, katalog produk, dan landing page." },
  { title: "Produk digital", description: "Aplikasi web, dashboard, dan portal untuk pelanggan maupun tim." },
  { title: "Pengembangan", description: "Pengembangan web, integrasi sistem, dan pemeliharaan." },
  { title: "Branding", description: "Identitas visual, logo, dan panduan brand." },
  { title: "Undangan digital", description: "Undangan pernikahan personal yang mudah dibagikan melalui Temura.", href: TEMURA_URL },
];
const steps = [["Diskusi", "Mengenali bisnis dan kebutuhan Anda."], ["Arah desain", "Menentukan struktur, konten, dan tampilan."], ["Desain & bangun", "Merancang, membangun, dan menguji."], ["Tayang", "Review akhir, lalu peluncuran."]];

export function StudioSections() {
  return <div className="studio-sections">
    <section id="layanan" className="studio-section studio-services">
      <div className="studio-inner studio-split-layout">
        <div className="studio-section-heading"><h2 className="type-heading-1" data-reveal>Dari ide<br />hingga tayang.</h2><p className="type-body-lg" data-reveal>Desain dan teknologi yang bekerja bersama.</p><Button variant="link" className="text-link" nativeButton={false} render={<Link href="/layanan" />}>Semua layanan <ArrowUpRight /></Button></div>
        <Accordion className="studio-service-list" defaultValue={["Website"]}>
          {services.map(({ title, description, href }) => <AccordionItem className="studio-service" value={title} key={title} data-reveal><AccordionTrigger className="type-heading-3">{title}<Plus className="faq-icon" aria-hidden="true" /></AccordionTrigger><AccordionContent><p className="type-body">{description}</p>{href && <a className="studio-service__link type-label" href={href} target="_blank" rel="noopener noreferrer">Kunjungi Temura <ArrowUpRight aria-hidden="true" /></a>}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
    <section id="tentang" className="studio-section studio-about">
      <div className="studio-inner"><div className="studio-about-intro"><h2 className="type-heading-1" data-reveal>Ide Anda.<br />Kita wujudkan bersama.</h2><div><p className="type-body-lg" data-reveal>Kami bekerja langsung bersama Anda, dari diskusi pertama hingga peluncuran.</p><Button variant="link" className="text-link" nativeButton={false} render={<Link href="/tentang" />}>Kenali Tampiloka <ArrowUpRight /></Button></div></div><PageVisual kind="workspace" className="studio-editorial-visual" /><p className="type-caption studio-visual-caption">Ilustrasi suasana kreatif.</p></div>
    </section>
    <section className="studio-section studio-process"><div className="studio-inner"><h2 className="type-heading-1" data-reveal>Proses yang jelas.</h2><ol className="studio-process-list">{steps.map(([title,description],index)=><li className="studio-process-step" key={title} data-reveal><span className="studio-process-number type-label-sm">0{index+1}</span><h3 className="type-heading-4">{title}</h3><p className="type-body">{description}</p></li>)}</ol></div></section>
    <section id="industri" className="studio-section studio-industries"><div className="studio-inner studio-industry-preview"><div><h2 className="type-heading-1" data-reveal>Beragam bisnis.<br />Satu perhatian pada detail.</h2><p className="type-body-lg" data-reveal>F&B, fashion, portfolio, UMKM, teknologi, B2B, hingga wedding.</p><Button variant="link" className="text-link" nativeButton={false} render={<Link href="/industri" />}>Jelajahi industri <ArrowUpRight /></Button></div><PageVisual kind="products" /></div></section>
  </div>;
}
