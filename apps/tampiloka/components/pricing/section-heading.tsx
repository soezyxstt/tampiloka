export function PricingSectionHeading({ title, id }: { title: string; id: string }) {
  return <div className="pricing-section-heading" data-reveal><h2 id={id} className="type-heading-2">{title}</h2></div>;
}
