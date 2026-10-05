import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterGroupProps {
  title: string;
  items: readonly FooterLinkItem[] | FooterLinkItem[];
  className?: string;
}

export interface FooterLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  href?: string;
}

export interface SiteFooterProps {
  watermarkSrc?: string;
  ctaHeading: {
    prefix: string;
    highlight: string;
  };
  ctaLink: {
    label: string;
    href: string;
  };
  directoryGroups: FooterGroupProps[];
  wideGroup?: FooterGroupProps;
  logo: FooterLogo;
  socials?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  pendingNotice?: {
    label: string;
    badge: string;
  };
  copyright?: string;
  extraBottom?: ReactNode;
}

function FooterGroup({ title, items, className = "" }: FooterGroupProps) {
  return (
    <nav className={`footer-group ${className}`} aria-label={title}>
      <h3 className="type-overline">{title}</h3>
      <div>
        {items.map(({ label, href, external }) =>
          external || href.startsWith("http") || href.startsWith("mailto:") ? (
            <a
              key={label + href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {label}
            </a>
          ) : (
            <Link key={label + href} href={href}>
              {label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export function SiteFooter({
  watermarkSrc = "/symbol-green.svg",
  ctaHeading,
  ctaLink,
  directoryGroups,
  wideGroup,
  logo,
  socials = [],
  pendingNotice,
  copyright,
  extraBottom,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="studio-footer">
      {watermarkSrc && (
        <div className="footer-watermark" aria-hidden="true">
          <Image src={watermarkSrc} alt="" width={420} height={420} />
        </div>
      )}

      <div className="footer-main">
        <section className="footer-invitation" data-reveal>
          <h2 className="type-display">
            {ctaHeading.prefix} <span>{ctaHeading.highlight}</span>
          </h2>
          <a className="footer-email type-heading-4" href={ctaLink.href}>
            {ctaLink.label} <ArrowUpRight aria-hidden="true" />
          </a>
        </section>

        <div className="footer-directory" data-reveal>
          <div className="footer-directory__top">
            {directoryGroups.map((group) => (
              <FooterGroup key={group.title} {...group} />
            ))}
          </div>
          {wideGroup && <FooterGroup {...wideGroup} className="footer-industries" />}
        </div>
      </div>

      <div className="footer-bottom" data-reveal>
        <Link href={logo.href ?? "/"} aria-label={logo.alt}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width ?? 800}
            height={logo.height ?? 200}
            className="footer-logo"
          />
        </Link>
        <div className="footer-socials type-label" aria-label="Tautan footer">
          {socials.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external || href.startsWith("http") ? "_blank" : undefined}
              rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {label}
              <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          ))}
          {pendingNotice && (
            <span className="social-pending" title={pendingNotice.label}>
              {pendingNotice.label} <span className="type-caption">{pendingNotice.badge}</span>
            </span>
          )}
          {extraBottom}
        </div>
        <span className="footer-copyright type-caption">
          {copyright ?? `© ${currentYear} Tampiloka`}
        </span>
      </div>
    </footer>
  );
}

export default SiteFooter;
