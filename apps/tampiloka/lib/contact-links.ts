export const CONTACT = {
  email: "halo@tampiloka.site",
  whatsapp: "https://wa.me/6282119307102",
} as const;

export const CONTACT_LINKS = [
  { platform: "whatsapp", label: "WhatsApp", href: CONTACT.whatsapp },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/adihnursyam/" },
  { platform: "x", label: "X", href: "https://x.com/soezyxsttt" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/adihnursyam/" },
  { platform: "email", label: CONTACT.email, href: `mailto:${CONTACT.email}` },
] as const;

export const SOCIAL_PROFILES = [
  CONTACT_LINKS[1].href,
  CONTACT_LINKS[2].href,
  CONTACT_LINKS[3].href,
] as const;
