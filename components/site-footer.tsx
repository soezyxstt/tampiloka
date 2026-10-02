import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const studioLinks = [
  ["Produk", "/produk"],
  ["Layanan", "/layanan"],
  ["Industri", "/industri"],
  ["Tentang", "/tentang"],
  ["Kontak", "/contact"],
];

const serviceLinks = [
  ["Website", "/layanan#service-website"],
  ["Produk digital", "/layanan#service-digital-product"],
  ["Pengembangan", "/layanan#service-development"],
  ["Branding", "/layanan#service-branding"],
];

const industryLinks = [
  ["Food & beverage", "/industri#industry-food"],
  ["Fashion", "/industri#industry-fashion"],
  ["Portfolio", "/industri#industry-portfolio-architecture"],
  ["UMKM", "/industri#industry-small-business"],
  ["Elektronik & teknologi", "/industri#industry-technology"],
  ["B2B & enterprise", "/industri#industry-enterprise"],
];

const socials = [
  ["Instagram", "https://www.instagram.com/adihnursyam/"],
  ["X", "https://x.com/soezyxsttt"],
  ["LinkedIn", "https://www.linkedin.com/in/adihnursyam/"],
  ["Email", "mailto:soezyxst@gmail.com"],
];

function FooterGroup({
  title,
  items,
  className,
}: {
  title: string;
  items: string[][];
  className?: string;
}) {
  return (
    <nav className={`footer-group ${className ?? ""}`} aria-label={title}>
      <h3 className="type-overline">{title}</h3>
      <div>
        {items.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="studio-footer">
      <div className="footer-watermark" aria-hidden="true">
        <Image src="/symbol-green.svg" alt="" width={420} height={420} />
      </div>

      <div className="footer-main">
        <section className="footer-invitation" data-reveal>
          <h2 className="type-display">Mari <span>bicara.</span></h2>
          <a className="footer-email type-heading-4" href="mailto:soezyxst@gmail.com?subject=Diskusi%20proyek%20Tampiloka">
            soezyxst@gmail.com <ArrowUpRight aria-hidden="true" />
          </a>
        </section>

        <div className="footer-directory" data-reveal>
          <div className="footer-directory__top">
            <FooterGroup title="Studio" items={studioLinks} />
            <FooterGroup title="Layanan" items={serviceLinks} />
          </div>
          <FooterGroup title="Industri" items={industryLinks} className="footer-industries" />
        </div>
      </div>

      <div className="footer-bottom" data-reveal>
        <Link href="/" aria-label="Beranda Tampiloka">
          <Image src="/brand/logos/light/tampiloka-horizontal-light.svg" alt="Tampiloka" width={800} height={200} className="footer-logo" />
        </Link>
        <div className="footer-socials type-label" aria-label="Media sosial Tampiloka">
          {socials.map(([name, href]) => (
            <a key={name} href={href} target={href.startsWith("https") ? "_blank" : undefined} rel={href.startsWith("https") ? "noopener noreferrer" : undefined}>
              {name}<ArrowUpRight aria-hidden="true" size={14} />
            </a>
          ))}
          <span className="social-pending" title="Nomor WhatsApp bisnis belum tersedia">
            WhatsApp <span className="type-caption">segera</span>
          </span>
        </div>
        <span className="footer-copyright type-caption">© {new Date().getFullYear()} Tampiloka</span>
      </div>
    </footer>
  );
}
