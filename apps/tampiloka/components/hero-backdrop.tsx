import { IndustryPreview } from "@/components/industry-preview";

export function HeroBackdrop() {
  return (
    <div className="hero-stage">
      <div className="hero-stage__art" aria-hidden="true">
        <div className="hero-stage__orbit" />
        <div className="hero-stage__sheet hero-stage__sheet--back" />
        <div className="hero-stage__sheet hero-stage__sheet--front">
          <IndustryPreview kind="small-business" />
        </div>
        <div className="hero-stage__sphere" />
      </div>
    </div>
  );
}
