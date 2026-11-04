"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { demoUrl, featuredTemplates } from "@/lib/template-catalog";
import { templateCopy } from "@/lib/template-copy";
import { TemplatePreview } from "@/components/template-preview";
import { useTemplateCatalog } from "@/components/use-template-catalog";

export function TemplateDiscovery({ locale }: { locale: Locale }) {
  const copy = templateCopy[locale];
  const { catalog, status, retry } = useTemplateCatalog();
  const entries = catalog ? featuredTemplates(catalog) : [];
  return <section className="template-discovery" id="templates" aria-labelledby="template-discovery-title">
    <div className="template-discovery__inner">
      <header className="template-discovery__heading" data-reveal>
        <div><h2 className="type-heading-1" id="template-discovery-title">{copy.home.title}</h2><p className="type-body-lg">{copy.home.description}</p></div>
        <Button variant="secondary" nativeButton={false} render={<Link href="/templates" />}>{copy.home.browse}</Button>
      </header>
      {status === "loading" && <p className="template-discovery__status type-body-sm" role="status">{copy.loading}</p>}
      {(status === "stale" || status === "error") && <div className="template-catalog-status" role="status"><p className="type-body-sm">{status === "stale" ? copy.stale : copy.unavailable}</p><Button variant="outline" onClick={retry}>{copy.retry}</Button></div>}
      {entries.length > 0 && <div className="template-discovery__grid">{entries.map(entry => {
        const family = catalog?.families.find(family => family.id === entry.family);
        const url = demoUrl(entry, family?.defaultMode, locale);
        return <article className="template-discovery__item" key={`${entry.family}-${entry.id}`} data-reveal>
          <a className="template-discovery__image" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${entry.name[locale]} (${copy.opens})`}><TemplatePreview src={entry.imageUrl} /></a>
          <div className="template-discovery__details"><h3 className="type-heading-3">{family?.name[locale] || entry.name[locale]}</h3><p className="type-body">{family?.description?.[locale] || entry.description[locale]}</p></div>
        </article>;
      })}</div>}
      <p className="template-discovery__disclosure type-body-sm">{copy.home.disclosure}</p>
    </div>
  </section>;
}
