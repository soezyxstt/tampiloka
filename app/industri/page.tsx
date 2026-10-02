export const metadata = { title: 'Industri' };
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndustryPreview } from "@/components/industry-preview";

const industries = [
  { name: "Food & beverage", description: "Dari menu hingga reservasi, pengalaman yang mengundang pelanggan datang.", id: "industry-food", kind: "food" as const, uses: ["Restoran & kafe", "Menu digital", "Reservasi", "Pemesanan"] },
  { name: "Fashion", description: "Ruang untuk koleksi, cerita, dan karakter brand Anda.", id: "industry-fashion", kind: "fashion" as const, uses: ["Label fashion", "Toko online", "Lookbook", "Koleksi musiman"] },
  { name: "Portfolio", description: "Karya menjadi pusat perhatian. Pengalaman tersusun dengan jelas.", id: "industry-portfolio-architecture", kind: "portfolio" as const, uses: ["Arsitektur", "Fotografi", "Desain", "Profesional independen"] },
  { name: "UMKM", description: "Produk mudah dikenal, mudah dipilih, dan mudah dipesan.", id: "industry-small-business", kind: "small-business" as const, uses: ["Katalog produk", "Usaha lokal", "Produk kerajinan", "Pemesanan langsung"] },
  { name: "Elektronik & teknologi", description: "Produk dan spesifikasi hadir dalam pengalaman yang mudah dipahami.", id: "industry-technology", kind: "technology" as const, uses: ["Elektronik", "Gadget", "Peluncuran produk", "Katalog teknologi"] },
  { name: "B2B & enterprise", description: "Layanan kompleks, disampaikan dengan jelas untuk keputusan bisnis.", id: "industry-enterprise", kind: "enterprise" as const, uses: ["Company profile", "Layanan bisnis", "Platform digital", "Produk SaaS"] },
];

export default function IndustriPage() {
  return (
    <div className="inner-page inner-page--industries">
      <section className="industry-intro" aria-labelledby="industries-title">
        <div className="inner-page__intro" data-reveal>
          <h1 id="industries-title" className="type-display-xl">Website yang mengerti bisnis Anda.</h1>
          <p className="type-body-lg">Pengalaman digital yang dirancang sesuai cara bisnis Anda bekerja.</p>
        </div>
      </section>

      <div className="industry-sections">
        {industries.map(({ name, description, id, kind, uses }) => (
          <section className="industry-row" id={id} key={id} aria-labelledby={`${id}-title`}>
            <div className="industry-row__copy" data-reveal>
              <h2 id={`${id}-title`} className="type-heading-2">{name}</h2>
              <p className="type-body">{description}</p>
              <ul className="industry-row__uses type-label">
                {uses.map(use => <li key={use}>{use}</li>)}
              </ul>
              <Button variant="link" className="industry-row__link" render={<Link href="/contact" />}>
                Diskusikan proyek <ArrowUpRight aria-hidden="true" />
              </Button>
            </div>
            <div className="industry-row__visual" data-reveal><IndustryPreview kind={kind} /></div>
          </section>
        ))}
      </div>
      <p className="industry-disclosure type-caption" data-reveal>Preview konsep untuk ilustrasi, bukan proyek klien.</p>

      <div className="inner-page__end-link" data-reveal>
        <p className="type-body-lg">Punya kebutuhan yang berbeda?</p>
        <Button className="inner-page__cta" render={<Link href="/contact" />}>
          Ceritakan rencana Anda <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}



