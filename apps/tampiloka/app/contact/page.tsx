import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageVisual } from "@/components/page-visual";
import { JsonLd } from "@/components/json-ld";
import { CONTACT, absoluteSiteUrl, createPageMetadata, webPageSchema } from "@/lib/seo";

const pageTitle = "Kontak";
const pageDescription =
  "Hubungi Tampiloka untuk membahas website, produk digital, branding, atau kebutuhan pengembangan digital untuk bisnis Anda.";

export const metadata = createPageMetadata({
  path: "/contact",
  title: pageTitle,
  description: pageDescription,
  imageAlt: "Ruang kerja dengan laptop dan contoh rancangan website.",
  imagePath: "/images/studio-workspace.webp",
});

const contactPointId = `${absoluteSiteUrl("/contact")}#contact-point`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...webPageSchema({
        path: "/contact",
        title: `${pageTitle} | Tampiloka`,
        description: pageDescription,
        type: "ContactPage",
        imagePath: "/images/studio-workspace.webp",
      }),
      mainEntity: { "@id": contactPointId },
    },
    {
      "@type": "ContactPoint",
      "@id": contactPointId,
      contactType: "sales",
      telephone: CONTACT.telephone,
      email: CONTACT.email,
      url: CONTACT.whatsapp,
      availableLanguage: ["id"],
      areaServed: "ID",
    },
  ],
};

const contactLinks = [
  { label: "Email", href: "mailto:soezyxst@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/adihnursyam/" },
  { label: "X", href: "https://x.com/soezyxsttt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adihnursyam/" },
];

export default function ContactPage() {
  return (
    <div className="inner-page inner-page--contact">
      <JsonLd data={structuredData} />
      <section className="inner-page__hero inner-page__hero--split" aria-labelledby="contact-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="contact-title" className="type-display-xl">Ada rencana untuk web Anda?</h1>
          <p className="type-body-lg">Ceritakan sedikit tentang proyeknya. Kita mulai dari sana.</p>
          <Button className="inner-page__cta" size="pill" nativeButton={false} render={<a href="https://wa.me/6282119307102" target="_blank" rel="noopener noreferrer" />}>
            <MessageCircle aria-hidden="true" /> Hubungi via WhatsApp <ArrowUpRight aria-hidden="true" />
          </Button>
          <a className="contact-page__email type-body" href="https://wa.me/6282119307102" target="_blank" rel="noopener noreferrer">+62 821-1930-7102</a>
        </div>
        <PageVisual imageKey="contact-invitation" alt="Pasangan pengantin berbusana Jawa di taman sebagai contoh undangan digital." preload />
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


