"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TEMURA_CATEGORIES, TEMPLATE_CATALOG, TEMPLATE_TIERS } from "@/lib/template-catalog";

export function DesignShowcase() {
  const [category, setCategory] = useState<string>("adat");
  const items = TEMPLATE_CATALOG.filter((item) => item.categoryId === category && item.assetStatus === "ready");
  return (
    <div className="temura-catalog">
      <div className="temura-category-tabs" aria-label="Kategori desain">
        {TEMURA_CATEGORIES.map((item) => <button key={item.id} type="button" className="type-label" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
      </div>
      {items.length === 0 && <p className="type-body temura-muted temura-catalog-note">Belum ada desain di kategori ini. Coba kategori lain.</p>}
      <div className="temura-design-grid">
        {items.map((item) => (
          <article className="temura-design-card" key={item.id}>
            {item.coverImage && item.assetStatus === "ready" ? <Link className={`temura-concept temura-preview-tile temura-preview-tile--${item.id}`} href={`/preview/${item.id}`} aria-label={`Lihat contoh undangan ${item.name}`}><Image unoptimized src={item.coverImage.replace('.webp', '-480.webp')} alt={`Latar desain undangan digital ${item.styleName} dari Temura`} width={480} height={720} /><div className="temura-preview-tile-copy"><span>Undangan pernikahan</span><p>Nara<br /><i>&</i><br />Aruna</p><span>12 . 12 . 2027</span></div><span className="temura-preview-tile-open">Lihat undangan ↗</span></Link> : <div className={`temura-concept temura-concept--${category}`} aria-label={`Konsep ${item.styleName}`}>
              <div className="temura-concept-placeholder" aria-hidden="true"><span className="temura-concept-monogram">N <span>&</span> A</span><span className="type-label">Nara & Aruna</span></div>
            </div>}
            <div className="temura-design-caption"><h3 className="type-heading-5">{item.styleName}</h3><span className="temura-design-price type-label"><s className="type-caption temura-muted"><span className="sr-only">Harga normal </span>Rp{TEMPLATE_TIERS[item.tier].originalPriceIdr.toLocaleString("id-ID")}</s><span><span className="sr-only">Harga sekarang </span>Rp{item.priceIdr.toLocaleString("id-ID")}</span></span></div>
          </article>
        ))}
      </div>
    </div>
  );
}
export default DesignShowcase;
