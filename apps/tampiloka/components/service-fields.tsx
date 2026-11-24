"use client";

import { ChevronDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const legacyAnchors: Record<string, string[]> = {
  "kafe-restoran": ["industry-food"],
  "toko-online": ["industry-fashion"],
  portofolio: ["industry-portfolio-architecture"],
  umkm: ["industry-small-business", "service-website"],
  lainnya: ["industry-technology", "industry-enterprise", "industry-wedding"],
};

export function ServiceHeroPreview({ locale }: { locale: Locale }) {
  const { catalog, status, retry } = useTemplateCatalog();
  const copy = templateCopy[locale];
  const entry = catalog ? featuredTemplates(catalog, 1)[0] : undefined;
  const family = catalog?.families.find((item) => item.id === entry?.family);

  return (
    <figure className="service-hero__visual" data-reveal>
      {entry ? (
        <a
          className="service-hero__frame"
          href={demoUrl(entry, family?.defaultMode, locale)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`}
        >
          <TemplatePreview src={entry.imageUrl} />
        </a>
      ) : (
        <div className="service-hero__frame service-hero__frame--empty" aria-hidden="true" />
      )}
      <figcaption className="service-hero__caption type-body-sm" aria-live="polite">
        {entry && (
          <div className="service-hero__caption-row">
            <span className="type-label text-[#15241e]">{entry.name[locale]}</span>
            <a
              className={cn(buttonVariants({ variant: "link" }), "h-auto px-0 py-0 text-[#15803d]")}
              href={demoUrl(entry, family?.defaultMode, locale)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`}
            >
              {copy.open}
            </a>
          </div>
        )}
        {entry && <p className="type-caption">{copy.disclosure}</p>}
        {status === "loading" && <p>{copy.loading}</p>}
        {status === "ready" && !entry && <p>{copy.noTemplates}</p>}
        {(status === "stale" || status === "error") && (
          <div className="template-catalog-status">
            <p>{status === "stale" ? copy.stale : copy.unavailable}</p>
            <Button variant="outline" onClick={retry}>{copy.retry}</Button>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export function ServiceFields({ locale }: { locale: Locale }) {
  const { catalog, status, retry } = useTemplateCatalog();
  const copy = templateCopy[locale];
  const servicesCopy = getPrimaryCopy(locale).services;
  const en = locale === "en";
  const lang = en ? 1 : 0;

  const allFields = serviceFields[locale];
  const coreFields = allFields.filter((field) => Boolean(field.family));
  const customFields = allFields.filter((field) => !field.family);
  const supportItems = servicesCopy.items.filter(
    (item) => item.imageKey !== "service-website",
  );

  return (
    <div className="service-sections">
      <noscript><p className="type-body-sm">{copy.noScript}</p></noscript>

      <section className="service-group" aria-labelledby="core-solutions-title">
        <div className="service-group__head" data-reveal>
          <div>
            <p className="type-overline service-group__eyebrow">
              {en ? "Ready-to-explore solutions" : "Solusi dengan demo"}
            </p>
            <h2 id="core-solutions-title" className="type-heading-1">
              {en ? "Websites and systems by field." : "Website dan sistem sesuai bidang."}
            </h2>
          </div>
          <p className="type-body-sm service-group__note">{copy.disclosure}</p>
        </div>

        {(status === "stale" || status === "error") && (
          <div className="template-catalog-status service-catalog-banner" role="status" aria-live="polite">
            <p className="type-body-sm">{status === "stale" ? copy.stale : copy.unavailable}</p>
            <Button variant="outline" onClick={retry}>{copy.retry}</Button>
          </div>
        )}

        <div className="service-solutions">
          {coreFields.map((field, index) => {
            const entries = catalog ? representativeDemos(catalog.entries, field.family) : [];
            const primaryDemo = entries[0];
            const extraDemos = entries.slice(1);
            const family = catalog?.families.find((item) => item.id === field.family);
            const pricingId = familyForField(field.id);
            const pricing = families.find((item) => item.id === pricingId);

            return (
              <article
                className="service-solution"
                id={field.id}
                key={field.id}
                aria-labelledby={`${field.id}-title`}
              >
                {(legacyAnchors[field.id] ?? []).map((id) => (
                  <span className="service-field__anchor" id={id} key={id} aria-hidden="true" />
                ))}

                <div className="service-solution__copy" data-reveal>
                  <span className="service-solution__index type-overline" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-heading-2" id={`${field.id}-title`}>{field.name}</h3>
                  <p className="type-body-lg service-solution__lead">{field.description}</p>

                  <ul className="service-solution__features type-body">
                    {field.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  {pricing && (
                    <details className="service-packages">
                      <summary className="type-label">
                        <span>{en ? "Compare package tiers" : "Lihat perbandingan paket"}</span>
                        <ChevronDown className="service-packages__icon" aria-hidden="true" size={16} />
                      </summary>
                      <dl className="service-packages__list">
                        {pricing.plans.map((plan) => (
                          <div key={plan[0]}>
                            <dt className="type-label">{plan[lang]}</dt>
                            <dd className="type-body-sm">{plan[en ? 3 : 2]}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="type-caption service-packages__scope">{pricing.scope[lang]} {field.scope}</p>
                    </details>
                  )}

                  <div className="service-solution__actions">
                    {pricingId && (
                      <Link
                        data-slot="button"
                        className={cn(buttonVariants({ variant: "outline", size: "pill" }), "service-action-pill")}
                        href={{ pathname: "/paket", query: { family: pricingId } }}
                      >
                        {en ? "View packages" : "Lihat paket"}
                      </Link>
                    )}
                    <Link
                      data-slot="button"
                      className={cn(buttonVariants({ variant: "link" }), "px-0")}
                      href="/contact"
                    >
                      {en ? "Discuss your needs" : "Bahas kebutuhan"}
                    </Link>
                  </div>
                </div>

                <div className="service-solution__showcase" data-reveal>
                  {primaryDemo ? (
                    <div className="service-demo-card">
                      <a
                        className="service-demo-card__media"
                        href={demoUrl(primaryDemo, family?.defaultMode, locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${copy.open} ${primaryDemo.name[locale]} (${copy.opens})`}
                      >
                        <TemplatePreview src={primaryDemo.imageUrl} />
                      </a>
                      <div className="service-demo-card__body">
                        <div className="service-demo-card__top">
                          <h4 className="type-heading-5">{primaryDemo.name[locale]}</h4>
                          <a
                            data-slot="button"
                            className={cn(buttonVariants({ variant: "link" }), "h-auto px-0 py-0 text-[#15803d]")}
                            href={demoUrl(primaryDemo, family?.defaultMode, locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${copy.open} ${primaryDemo.name[locale]} (${copy.opens})`}
                          >
                            {en ? "Try demo" : "Coba demo"}
                          </a>
                        </div>
                        <p className="type-body-sm">{primaryDemo.description[locale]}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="service-demo-placeholder">
                      {status === "loading" && <p className="type-body-sm">{copy.loading}</p>}
                      {status === "error" && (
                        <div className="service-demo-placeholder__error">
                          <p className="type-body-sm">{copy.unavailable}</p>
                          <Button variant="outline" onClick={retry}>{copy.retry}</Button>
                        </div>
                      )}
                      {catalog && entries.length === 0 && (
                        <p className="type-body-sm">
                          {en
                            ? "No matching demo is available yet. Contact us to discuss your needs."
                            : "Belum ada demo yang sesuai. Hubungi kami untuk membahas kebutuhan Anda."}
                        </p>
                      )}
                    </div>
                  )}

                  {extraDemos.length > 0 && (
                    <div className="service-demo-more">
                      <span className="type-caption service-demo-more__label">
                        {en ? "More demos" : "Demo lainnya"}
                      </span>
                      <div className="service-demo-more__links">
                        {extraDemos.map((entry) => (
                          <a
                            key={entry.id}
                            className="service-demo-more__link type-label"
                            href={demoUrl(entry, family?.defaultMode, locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`}
                          >
                            {entry.name[locale]}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="service-group" aria-labelledby="custom-solutions-title">
        <div className="service-group__head" data-reveal>
          <div>
            <p className="type-overline service-group__eyebrow">
              {en ? "Websites & consultation" : "Website usaha & konsultasi"}
            </p>
            <h2 id="custom-solutions-title" className="type-heading-1">
              {en ? "Profiles, portfolios, and custom scope." : "Profil usaha, portofolio, dan kebutuhan khusus."}
            </h2>
          </div>
        </div>

        <div className="service-custom-grid">
          {customFields.map((field) => {
            const pricingId = familyForField(field.id);
            return (
              <article
                className="service-custom-card"
                id={field.id}
                key={field.id}
                aria-labelledby={`${field.id}-title`}
                data-reveal
              >
                {(legacyAnchors[field.id] ?? []).map((id) => (
                  <span className="service-field__anchor" id={id} key={id} aria-hidden="true" />
                ))}
                <h3 className="type-heading-3" id={`${field.id}-title`}>{field.name}</h3>
                <p className="type-body service-custom-card__lead">{field.description}</p>
                <ul className="service-custom-card__features type-body">
                  {field.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="type-caption service-custom-card__scope">{field.scope}</p>
                <div className="service-custom-card__actions">
                  {pricingId && (
                    <Link
                      data-slot="button"
                      className={cn(buttonVariants({ variant: "outline", size: "pill" }), "service-action-pill")}
                      href={{ pathname: "/paket", query: { family: pricingId } }}
                    >
                      {en ? "View packages" : "Lihat paket"}
                    </Link>
                  )}
                  {field.id === "umkm" && (
                    <Link
                      data-slot="button"
                      className={cn(buttonVariants({ variant: "link" }), "px-0")}
                      href={{ pathname: "/paket", query: { family: "commerce" } }}
                    >
                      {en ? "Store packages" : "Paket toko"}
                    </Link>
                  )}
                  <Link
                    data-slot="button"
                    className={cn(buttonVariants({ variant: "link" }), "px-0")}
                    href="/contact"
                  >
                    {en ? "Discuss your needs" : "Bahas kebutuhan"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="service-group service-support-section" aria-labelledby="supporting-services-title">
        <div className="service-group__head" data-reveal>
          <div>
            <p className="type-overline service-group__eyebrow">
              {en ? "Supporting services" : "Layanan pendukung"}
            </p>
            <h2 id="supporting-services-title" className="type-heading-2">
              {en ? "Beyond business websites." : "Di luar pembuatan website."}
            </h2>
          </div>
        </div>
        <div className="service-support">
          {supportItems.map((item) => (
            <article id={item.imageKey} key={item.imageKey} data-reveal>
              <h3 className="type-heading-4">{item.title}</h3>
              <p className="type-body">{item.description}</p>
              <p className="type-caption service-support__tags">{item.items.join(" · ")}</p>
              {item.href === "temura" && (
                <a
                  data-slot="button"
                  className={cn(buttonVariants({ variant: "link" }), "px-0")}
                  href={TEMURA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {servicesCopy.temuraCta}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="service-closing" data-reveal>
        <div className="service-closing__copy">
          <h2 className="type-heading-2">{en ? "Ready to map your scope?" : "Siap membahas kebutuhan Anda?"}</h2>
          <p className="type-body">
            {en
              ? "Share your business overview, the workflow you need, and any existing materials. We will recommend the right package or proposal before work begins."
              : "Ceritakan usaha, alur yang dibutuhkan, serta materi yang sudah tersedia. Kami bantu menyusun lingkup dan paket yang paling sesuai sebelum pengerjaan dimulai."}
          </p>
        </div>
        <div className="service-closing__action">
          <Link
            data-slot="button"
            className={cn(buttonVariants({ variant: "brand", size: "pill-lg" }))}
            href="/contact"
          >
            {en ? "Contact Tampiloka" : "Hubungi Tampiloka"}
          </Link>
        </div>
      </section>
    </div>
  );
}
