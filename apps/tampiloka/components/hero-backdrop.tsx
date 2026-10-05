import Image from "next/image";

export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      {/* SVG ClipPath for the broad, organic ambient island */}
      <svg
        className="hero-backdrop__defs"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="hero-island-shape" clipPathUnits="objectBoundingBox">
            <path d="M 0.18 0.18 C 0.35 0.02, 0.72 -0.04, 0.90 0.12 C 1.04 0.26, 1.02 0.58, 0.94 0.80 C 0.84 0.99, 0.52 1.03, 0.28 0.95 C 0.06 0.87, -0.02 0.65, 0.02 0.44 C 0.05 0.30, 0.08 0.26, 0.18 0.18 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-island-wrap">
        <div className="hero-island">
          {/* Primary web layout preview */}
          <div className="hero-island__layer hero-island__layer--primary">
            <Image
              src="/images/service-website.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 300px, 640px"
              className="hero-island__img"
              priority
            />
          </div>

          {/* Secondary editorial lookbook / catalog preview */}
          <div className="hero-island__layer hero-island__layer--secondary">
            <Image
              src="/images/nayara-fashion.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 220px, 440px"
              className="hero-island__img"
            />
          </div>

          {/* Tertiary Temura digital invitation preview */}
          <div className="hero-island__layer hero-island__layer--tertiary">
            <Image
              src="/images/service-digital-invitation.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 180px, 340px"
              className="hero-island__img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
