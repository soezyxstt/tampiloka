"use client";

import { Button } from "@/components/ui/button";
import { TemplatePreview } from "@/components/template-preview";
import { useTemplateCatalog } from "@/components/use-template-catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { serviceFields } from "@/lib/service-fields";
import { families } from "@/lib/service-pricing.mjs";
import { familyForField, representativeDemos } from "@/lib/service-selection.mjs";
import { demoUrl, featuredTemplates } from "@/lib/template-catalog";
import { templateCopy } from "@/lib/template-copy";
import { getPrimaryCopy } from "@/i18n/primary-copy";
import { TEMURA_URL } from "@/lib/temura-url";

const legacyAnchors: Record<string, string[]> = {
  "kafe-restoran": ["industry-food"], "toko-online": ["industry-fashion"],
  portofolio: ["industry-portfolio-architecture"], umkm: ["industry-small-business", "service-website"],
  lainnya: ["industry-technology", "industry-enterprise", "industry-wedding"],
};

export function ServiceHeroPreview({ locale }: { locale: Locale }) {
  const { catalog, status, retry } = useTemplateCatalog();
  const copy = templateCopy[locale];
  const entry = catalog ? featuredTemplates(catalog, 1)[0] : undefined;
  const family = catalog?.families.find(item => item.id === entry?.family);
  return <figure className="service-hero__visual">
    {entry && <a className="template-discovery__image" href={demoUrl(entry, family?.defaultMode, locale)} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`}><TemplatePreview src={entry.imageUrl} /></a>}
    <figcaption className="type-body-sm" aria-live="polite">
      {entry && <Button className="px-0" variant="link" nativeButton={false} render={<a href={demoUrl(entry, family?.defaultMode, locale)} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`} />}>{copy.open}</Button>}
      {entry && <p>{entry.name[locale]}. {copy.disclosure}</p>}
      {status === "loading" && <p>{copy.loading}</p>}
      {status === "ready" && !entry && <p>{copy.noTemplates}</p>}
      {(status === "stale" || status === "error") && <div className="template-catalog-status"><p>{status === "stale" ? copy.stale : copy.unavailable}</p><Button variant="outline" onClick={retry}>{copy.retry}</Button></div>}
    </figcaption>
  </figure>;
}

export function ServiceFields({ locale }: { locale: Locale }) {
  const { catalog, status, retry } = useTemplateCatalog();
  const copy = templateCopy[locale];
  const en = locale === "en";
  return <div className="service-fields">
    <noscript><p className="type-body-sm">{copy.noScript}</p></noscript>
    {serviceFields[locale].map(field => {
      const demoFamily = field.id === "umkm" ? "commerce" : field.family;
      const entries = catalog && demoFamily ? representativeDemos(catalog.entries, demoFamily) : [];
      const family = catalog?.families.find(item => item.id === demoFamily);
      const pricingId = familyForField(field.id);
      const pricing = families.find(item => item.id === pricingId);
      const lang = en ? 1 : 0;
      return <section className={`service-field${demoFamily ? "" : " service-field--single"}`} id={field.id} key={field.id} aria-labelledby={`${field.id}-title`}>
        {(legacyAnchors[field.id] ?? []).map(id => <span className="service-field__anchor" id={id} key={id} aria-hidden="true" />)}
        <div data-reveal><h2 className="type-heading-1" id={`${field.id}-title`}>{field.name}</h2><p className="type-body-lg">{field.description}</p>
          <h3 className="type-heading-5">{field.id === "multioutlet" ? (en ? "Topics to discuss" : "Hal yang dapat dibahas") : (en ? "Options and capabilities" : "Pilihan dan kemampuan")}</h3>
          <ul className="service-field__features type-body">{field.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          <p className="type-body">{field.scope}</p>
          {pricing && <details className="service-field__packages"><summary className="type-label">{en ? "Compare package options" : "Bandingkan pilihan paket"}</summary>
            <dl>{pricing.plans.map(plan => <div key={plan[0]}><dt className="type-label">{plan[lang]}</dt><dd className="type-body">{plan[en ? 3 : 2]}</dd></div>)}</dl>
            <p className="type-body-sm">{pricing.scope[lang]}</p>
          </details>}
          <p className="type-body"><strong>{en ? "To get started: " : "Untuk memulai: "}</strong>{field.input}</p>
          <div className="service-field__actions"><Button variant="brand" size="pill" nativeButton={false} render={<Link href="/contact" />}>{en ? "Discuss your needs" : "Bahas kebutuhan"}</Button>{pricingId && <Button variant="link" nativeButton={false} render={<Link href={{ pathname: "/paket", query: { family: pricingId } }} />}>{en ? "View packages and terms" : "Lihat paket dan ketentuan"}</Button>}{field.id === "umkm" && <Button variant="link" nativeButton={false} render={<Link href={{ pathname: "/paket", query: { family: "commerce" } }} />}>{en ? "View store packages" : "Lihat paket toko"}</Button>}</div>
          {!demoFamily && <p className="type-body-sm">{en ? "There is no dedicated demo for this field yet." : "Belum ada demo khusus untuk bidang ini."}</p>}
        </div>
        {demoFamily && <div className="service-field__demos"><h3 className="type-heading-3">{field.id === "umkm" ? (en ? "Online store examples" : "Contoh toko online") : (en ? "Demo examples" : "Contoh demo")}</h3><p className="type-body-sm">{copy.disclosure}</p>
          <div aria-live="polite">
            {status === "loading" && <p>{copy.loading}</p>}
            {(status === "stale" || status === "error") && <div className="template-catalog-status"><p>{status === "stale" ? copy.stale : copy.unavailable}</p><Button variant="outline" onClick={retry}>{copy.retry}</Button></div>}
          </div>
          {entries.map((entry, index) => <article key={entry.id} className="service-field__demo">{index === 0 && <div className="template-discovery__image"><TemplatePreview src={entry.imageUrl} /></div>}<h4 className="type-heading-5">{entry.name[locale]}</h4><p className="type-body">{entry.description[locale]}</p><Button variant="link" nativeButton={false} render={<a href={demoUrl(entry, family?.defaultMode, locale)} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`} />}>{en ? "Try demo" : "Coba demo"}</Button></article>)}
          {catalog && entries.length === 0 && <p className="type-body">{en ? "No matching demo is available yet. Contact us to discuss your needs." : "Belum ada demo yang sesuai. Hubungi kami untuk membahas kebutuhan Anda."}</p>}
          {entries.length > 0 && <Button variant="link" nativeButton={false} render={<Link href="/templates" />}>{en ? "View all templates" : "Lihat semua template"}</Button>}
        </div>}
      </section>;
    })}
    <section className="service-support" aria-label={en ? "Other services" : "Layanan lainnya"}>
      {getPrimaryCopy(locale).services.items.filter(item => item.imageKey !== "service-website").map(item => <article id={item.imageKey} key={item.imageKey} data-reveal><h3 className="type-heading-4">{item.title}</h3><p className="type-body">{item.description}</p><p className="type-body-sm">{item.items.join(" · ")}</p>{item.href === "temura" && <Button variant="link" nativeButton={false} render={<a href={TEMURA_URL} target="_blank" rel="noopener noreferrer" />}>{getPrimaryCopy(locale).services.temuraCta}</Button>}</article>)}
    </section>
    <section className="service-field__process" data-reveal><h2 className="type-heading-2">{en ? "How to get started" : "Cara memulai"}</h2><p className="type-body">{en ? "Contact us with your business or organisation, the pages or workflow you need, and any existing materials. We will discuss the scope and a suitable package or proposal before work begins." : "Hubungi kami dengan cerita singkat tentang usaha atau organisasi, halaman atau alur yang dibutuhkan, serta materi yang sudah tersedia. Kami akan membahas lingkup dan paket atau penawaran yang sesuai sebelum pengerjaan dimulai."}</p><Button variant="brand" size="pill" nativeButton={false} render={<Link href="/contact" />}>{en ? "Contact Tampiloka" : "Hubungi Tampiloka"}</Button></section>
  </div>;
}
