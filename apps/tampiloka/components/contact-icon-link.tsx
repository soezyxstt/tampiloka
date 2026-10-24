import { Mail, type LucideProps } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

export type ContactPlatform = "whatsapp" | "instagram" | "x" | "linkedin" | "email";

type ContactPlatformIconProps = {
  platform: ContactPlatform;
  size?: number;
  className?: string;
};

export function ContactPlatformIcon({ platform, size = 20, className }: ContactPlatformIconProps) {
  const props: LucideProps = { size, className, "aria-hidden": true, focusable: false };

  switch (platform) {
    case "whatsapp":
      return (
        <svg aria-hidden="true" focusable="false" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M20.2 11.7a8.15 8.15 0 0 1-12.07 7.16L3 20l1.18-4.98A8.15 8.15 0 1 1 20.2 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.3 7.9c.18-.4.37-.4.56-.4h.47c.16 0 .36.06.47.34l.7 1.7c.09.21.07.39-.06.57l-.52.66c-.15.18-.17.32-.04.53.5.83 1.17 1.49 2 1.98.2.12.36.1.5-.06l.67-.8c.16-.19.33-.23.56-.14l1.64.77c.23.1.37.2.4.34.04.14.03.78-.34 1.23-.36.46-1.04.73-1.68.71-.59-.02-1.46-.25-2.43-.79-1.34-.75-2.42-1.91-3.14-3.05-.5-.8-.82-1.74-.74-2.52.07-.61.47-1.13.98-1.37Z" fill="currentColor" />
        </svg>
      );
    case "instagram":
      return (
        <svg aria-hidden="true" focusable="false" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" focusable="false" className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.42L5.56 22H2.43l7.25-8.29L1.8 2h6.4l4.43 6.77L18.9 2Zm-1.1 18h1.73L7.27 3.9H5.42L17.8 20Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg aria-hidden="true" focusable="false" className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.25 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM3.7 8.5h3.1v11.8H3.7V8.5Zm5.1 0h2.97v1.61h.04c.41-.78 1.42-1.98 3.39-1.98 3.62 0 4.29 2.38 4.29 5.47v6.7h-3.1v-5.94c0-1.42-.03-3.24-1.98-3.24s-2.29 1.55-2.29 3.14v6.04H8.8V8.5Z" />
        </svg>
      );
    case "email":
      return <Mail {...props} />;
  }
}

type ContactIconLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label" | "href"> & {
  platform: ContactPlatform;
  href: string;
  label: string;
  targetBlank?: boolean;
  iconSize?: number;
};

export function ContactIconLink({ platform, href, label, className, targetBlank, iconSize = 20, ...anchorProps }: ContactIconLinkProps) {
  const external = targetBlank ?? href.startsWith("http");

  return (
    <a
      {...anchorProps}
      className={className}
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <ContactPlatformIcon platform={platform} size={iconSize} />
    </a>
  );
}
