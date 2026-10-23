import { ArrowDown, ArrowUpRight, Check, Minus } from "lucide-react";
import { PricingCard, CustomPricingCard } from "@/components/pricing/pricing-card";
import { PricingSectionHeading } from "@/components/pricing/section-heading";
import { EstimateCalculator } from "@/components/pricing/estimate-calculator";
import { PricingLink } from "@/components/pricing/pricing-link";
import { JsonLd } from "@/components/json-ld";
import { CARE_PLANS, DOMAIN_OPTIONS, PRICING_FAQS, WEBSITE_PLANS, formatPromoPrice, formatRupiah } from "@/lib/pricing";
import { createPageMetadata, faqPageSchema, webPageSchema } from "@/lib/seo";
import "./pricing.css";

export const metadata = createPageMetadata({ path: "/paket", title: "Paket Website Kafe & Kalkulator Harga", description: "Website kafe mulai Rp999.000 dengan promo peluncuran 40%. Bandingkan Essential, Menu, Signature, dan Custom. Hitung biaya domain, tambahan, dan perawatan secara transparan.", imageAlt: "Tampiloka, paket pembuatan website kafe." });

const comparison: { name: string; values: (string | boolean)[] }[] = [
  { name: "Halaman utama · hingga 5 bagian", values: [true, true, true] },
  { name: "Menu unggulan", values: ["6 item", "6 item", "6 item"] },
  { name: "Katalog menu lengkap", values: [false, "30 item", "60 item"] },
  { name: "Kategori & pencarian menu", values: [false, true, true] },
  { name: "Berkas QR menu digital", values: [false, true, true] },
  { name: "Halaman tambahan", values: [false, false, "1 halaman"] },
  { name: "Formulir reservasi ke WhatsApp", values: [false, false, true] },
  { name: "Pilihan tata letak", values: ["Terbatas", "Lebih banyak", "Lebih fleksibel"] },
  { name: "Putaran revisi", values: ["1 kali", "2 kali", "2 kali"] },
  { name: "Waktu pengerjaan", values: ["3–5 hari kerja", "5–8 hari kerja", "7–12 hari kerja"] },
];

export default function PricingPage() {
  return <div className="pricing-page">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [webPageSchema({ path: "/paket", title: "Paket Website Kafe & Kalkulator Harga | Tampiloka", description: "Paket website kafe dengan promo peluncuran 40%, kalkulator estimasi, dan biaya lanjutan yang jelas." }), faqPageSchema(PRICING_FAQS)] }} />
    <section className="pricing-hero" aria-labelledby="pricing-title">
      <div><h1 id="pricing-title" className="type-display">Paket website kafe.</h1><p className="type-body-lg">Promo peluncuran 40%. Sekali bayar untuk pembuatan.</p></div>
      <a href="#estimasi" className="pricing-text-link type-label">Hitung estimasi <ArrowDown size={16} aria-hidden="true" /></a>
    </section>

    <section className="pricing-plans" aria-label="Pilihan paket website">
      <div className="pricing-grid">{WEBSITE_PLANS.map((plan) => <PricingCard key={plan.id} plan={plan} />)}<CustomPricingCard /></div>
      <p className="pricing-included type-body">Paket standar termasuk subdomain, hosting 12 bulan, SSL, SEO dasar, dan tampilan mobile.</p>
    </section>

    <section className="pricing-section pricing-estimate-section" id="estimasi" aria-labelledby="estimate-title">
      {WEBSITE_PLANS.map((plan) => <span key={plan.id} id={`estimasi-${plan.id}`} className="pricing-anchor" aria-hidden="true" />)}
      <PricingSectionHeading title="Hitung estimasi." id="estimate-title" />
      <EstimateCalculator />
    </section>

    <section className="pricing-section" id="bandingkan" aria-labelledby="comparison-title">
      <PricingSectionHeading title="Bandingkan paket." id="comparison-title" />
      <div className="pricing-comparison-wrap" role="region" aria-label="Tabel perbandingan paket, geser untuk melihat semua kolom" tabIndex={0}><table className="pricing-comparison type-body"><caption className="sr-only">Perbandingan fitur Essential, Menu, dan Signature</caption><thead><tr><th scope="col">Fitur</th>{WEBSITE_PLANS.map((plan) => <th scope="col" key={plan.id}>{plan.name}</th>)}</tr></thead><tbody>{comparison.map((row) => <tr key={row.name}><th scope="row">{row.name}</th>{row.values.map((value, index) => <td key={index}>{typeof value === "boolean" ? value ? <><Check size={18} aria-hidden="true" /><span className="sr-only">Termasuk</span></> : <><Minus size={16} aria-hidden="true" /><span className="sr-only">Tidak termasuk</span></> : value}</td>)}</tr>)}</tbody></table></div>
      <p className="pricing-note type-body">Paket standar tidak memiliki dashboard edit mandiri. Pengerjaan dimulai setelah DP 50% dan bahan lengkap.</p>
    </section>

    <section className="pricing-section" id="domain-hosting" aria-labelledby="domain-title">
      <PricingSectionHeading title="Domain & hosting." id="domain-title" />
      <div className="pricing-infrastructure">
        <div className="pricing-domains"><h3 className="type-heading-5">Domain</h3><dl>{DOMAIN_OPTIONS.map((domain) => <div key={domain.id}><dt className="type-body">{domain.id === "own" ? "Domain milik Anda" : domain.example}</dt><dd className="type-body">{domain.price ? `${formatRupiah(domain.price)}/tahun` : "Gratis"}</dd></div>)}</dl><p className="type-body">Domain didaftarkan atas nama usaha Anda. Harga termasuk pengelolaan DNS. Domain premium tidak termasuk.</p></div>
        <div className="pricing-hosting"><h3 className="type-heading-5">Hosting</h3><dl className="type-body"><div><dt>12 bulan pertama</dt><dd>Termasuk</dd></div><div><dt>Tahun berikutnya</dt><dd>Rp299.000/tahun</dd></div></dl><ul className="pricing-check-list type-body">{["Hosting & SSL", "Pengawasan situs & cadangan berkas", "Perbaikan gangguan sistem Tampiloka"].map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><p className="type-body">Berlaku untuk paket standar, dengan atau tanpa Care. Operasional Custom ditawarkan terpisah.</p></div>
      </div>
    </section>

    <section className="pricing-section pricing-care-section" id="perawatan" aria-labelledby="care-title">
      <PricingSectionHeading title="Perawatan konten." id="care-title" />
      <div className="pricing-care-grid">{CARE_PLANS.map((care) => <article className="pricing-care-card" key={care.id}>
        <h3 className="type-heading-5">{care.name}</h3>
        <p className="pricing-care-card__price type-heading-2">{care.id === "none" ? "Rp119k" : formatPromoPrice(care.price)}<span className="type-body">/{care.id === "none" ? "permintaan" : "bulan"}</span></p>
        {care.price ? <><p className="type-body">{care.requests}</p><p className="type-body">{formatRupiah(care.price * 3)} setiap 3 bulan.<br />{care.time} setelah bahan lengkap.</p></> : <p className="type-body">Tanpa langganan.</p>}
      </article>)}</div>
      <p className="pricing-note type-body">Satu permintaan mencakup maksimal 5 item menu, satu banner dengan bahan siap pakai, atau satu perubahan teks. Kuota tidak dibawa ke bulan berikutnya. Halaman baru, fitur baru, dan perubahan besar tata letak tidak termasuk. Hosting dan domain dibayar terpisah.</p>
      <PricingLink className="pricing-back-link" href="#estimasi">Hitung estimasi <ArrowUpRight size={16} aria-hidden="true" /></PricingLink>
    </section>
  </div>;
}
