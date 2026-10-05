export const metadata = { title: 'Contact' };
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";

const contactLinks = [
  { label: "Instagram", href: "https://www.instagram.com/adihnursyam/" },
  { label: "X", href: "https://x.com/soezyxsttt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adihnursyam/" },
];

export default function ContactPage() {
  return (
    <div className="inner-page inner-page--contact">
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="contact-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="contact-title" className="type-display-xl">Ada rencana untuk web Anda?</h1>
          <p className="type-body-lg">Ceritakan sedikit tentang proyeknya. Kita mulai dari sana.</p>
          <Button className="inner-page__cta" size="lg" nativeButton={false} render={<a href="mailto:soezyxst@gmail.com?subject=Diskusi%20proyek%20Tampiloka" />}>
            <Mail aria-hidden="true" /> Kirim email <ArrowUpRight aria-hidden="true" />
          </Button>
          <a className="contact-page__email type-body" href="mailto:soezyxst@gmail.com">soezyxst@gmail.com</a>
        </div>
        <PageVisual imageKey="contact-invitation" preload />
      </section>

      <section className="contact-page__social" aria-labelledby="social-title" data-reveal>
        <h2 id="social-title" className="type-heading-3">Temukan kami di</h2>
        <div className="contact-page__links">
          {contactLinks.map(({ label, href }) => (
            <Link key={label} className="type-label-lg" href={href} target="_blank" rel="noopener noreferrer">
              {label}<ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <div className="inner-page__end-link" data-reveal>
        <Link className="type-label" href="/">Kembali ke beranda <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}


