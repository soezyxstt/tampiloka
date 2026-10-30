import { Mail } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

export type ContactPlatform = "whatsapp" | "instagram" | "x" | "linkedin" | "email";

type ContactPlatformIconProps = {
  platform: ContactPlatform;
  size?: number;
  className?: string;
};

export function ContactPlatformIcon({ platform, size = 20, className }: ContactPlatformIconProps) {
  const props = { size, className, "aria-hidden": true as const, focusable: false };

  switch (platform) {
    case "whatsapp":
      return <FaWhatsapp {...props} />;
    case "instagram":
      return <FaInstagram {...props} />;
    case "x":
      return <FaXTwitter {...props} />;
    case "linkedin":
      return <FaLinkedinIn {...props} />;
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
