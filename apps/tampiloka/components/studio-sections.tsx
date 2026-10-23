import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { TEMURA_URL } from "@/lib/temura-url";

const services: { title: string; description: string; href?: string }[] = [
  { title: "Website", description: "Profil usaha, katalog produk, toko online, dan landing page." },
  { title: "Produk digital", description: "Rancangan aplikasi web, dashboard, dan portal untuk pelanggan atau tim." },
  { title: "Pengembangan", description: "Pembuatan aplikasi web, integrasi sistem, dan perawatan teknis." },
  { title: "Identitas visual", description: "Logo, warna, tipografi, dan panduan penggunaan." },
  { title: "Undangan digital", description: "Undangan pernikahan dengan jadwal, lokasi, dan konfirmasi kehadiran melalui Temura.", href: TEMURA_URL },
];
const steps = [["Diskusi", "Tentukan tujuan, kebutuhan, dan lingkup pekerjaan."], ["Rancangan", "Susun halaman, konten, dan tampilan."], ["Pembuatan", "Bangun website dan uji fungsi serta tampilannya."], ["Tayang", "Periksa hasil bersama sebelum website diluncurkan."]];

export function StudioSections() {
  return <div className="studio-sections">
    <section id="layanan" className="studio-section studio-services">
      <div className="studio-inner studio-split-layout">
        <div className="studio-section-heading"><h2 className="type-heading-1" data-reveal>Layanan.</h2><Button variant="link" className="text-link" nativeButton={false} render={<Link href="/layanan" />}>Lihat layanan <ArrowUpRight /></Button></div>
        <Accordion className="studio-service-list" defaultValue={["Website"]}>
          {services.map(({ title, description, href }) => <AccordionItem className="studio-service" value={title} key={title} data-reveal><AccordionTrigger className="type-heading-3">{title}<Plus className="faq-icon" aria-hidden="true" /></AccordionTrigger><AccordionContent><p className="type-body">{description}</p>{href && <a className="studio-service__link type-label" href={href} target="_blank" rel="noopener noreferrer">Lihat undangan di Temura <ArrowUpRight aria-hidden="true" /></a>}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
    <section id="tentang" className="studio-section studio-about">
      <div className="studio-inner"><div className="studio-about-intro"><h2 className="type-heading-1" data-reveal>Tentang Tampiloka.</h2><div><p className="type-body-lg" data-reveal>Anda berdiskusi langsung dengan kami, dari pembahasan kebutuhan sampai website tayang.</p><Button variant="link" className="text-link" nativeButton={false} render={<Link href="/tentang" />}>Kenali Tampiloka <ArrowUpRight /></Button></div></div><PageVisual kind="workspace" alt="Meja kerja dengan laptop dan sketsa rancangan website." className="studio-editorial-visual" /><p className="type-caption studio-visual-caption">Ilustrasi ruang kerja.</p></div>
    </section>
    <section className="studio-section studio-process"><div className="studio-inner"><h2 className="type-heading-1" data-reveal>Cara kerja.</h2><ol className="studio-process-list">{steps.map(([title,description],index)=><li className="studio-process-step" key={title} data-reveal><span className="studio-process-number type-label-sm">0{index+1}</span><h3 className="type-heading-4">{title}</h3><p className="type-body">{description}</p></li>)}</ol></div></section>
    <section id="industri" className="studio-section studio-industries"><div className="studio-inner studio-industry-preview"><div><h2 className="type-heading-1" data-reveal>Untuk berbagai<br />bidang usaha.</h2><p className="type-body-lg" data-reveal>Dari kafe dan usaha lokal hingga layanan bisnis dan portofolio profesional.</p><Button variant="link" className="text-link" nativeButton={false} render={<Link href="/industri" />}>Lihat bidang usaha <ArrowUpRight /></Button></div><PageVisual kind="products" alt="Contoh produk perawatan diri, aksesori, dan tekstil pada latar terang." /></div></section>
  </div>;
}
