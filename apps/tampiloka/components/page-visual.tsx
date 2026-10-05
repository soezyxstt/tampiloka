import Image from "next/image";

type ImageKey =
  | "service-overview"
  | "service-website"
  | "service-digital-product"
  | "service-development"
  | "service-branding"
  | "service-digital-invitation"
  | "industry-overview"
  | "industry-food"
  | "industry-fashion"
  | "industry-portfolio-architecture"
  | "industry-small-business"
  | "industry-technology"
  | "industry-enterprise"
  | "about-studio"
  | "creative-process"
  | "contact-invitation"
  | "studio-workspace"
  | "product-still-life";

type PageVisualProps = {
  imageKey?: ImageKey;
  kind?: "workspace" | "products";
  alt: string;
  position?: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
};

export function PageVisual({
  imageKey,
  kind,
  alt,
  position = "center",
  sizes = "(max-width: 680px) 88vw, (max-width: 900px) 70vw, 42vw",
  preload = false,
  className = "",
}: PageVisualProps) {
  const key = imageKey ?? (kind === "workspace" ? "studio-workspace" : "product-still-life");

  return (
    <figure className={`page-visual ${className}`} data-reveal>
      <Image
        className="page-visual__image"
        src={`/images/${key}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectPosition: position }}
      />
    </figure>
  );
}
