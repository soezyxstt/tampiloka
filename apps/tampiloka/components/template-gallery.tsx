"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchField, SelectField } from "@/components/ui/form-controls";
import { demoUrl, filterTemplates, type TemplateCatalog } from "@/lib/template-catalog";
import { templateCopy } from "@/lib/template-copy";
import { useTemplateCatalog } from "@/components/use-template-catalog";
import { TemplatePreview } from "@/components/template-preview";
import type { Locale } from "@/i18n/routing";

export function TemplateGallery({ locale, initialCatalog = null }: { locale: Locale; initialCatalog?: TemplateCatalog | null }) {
  const copy = templateCopy[locale];
  const { catalog, status, retry } = useTemplateCatalog(initialCatalog);
  const [family, setFamily] = useState("all");
  const [search, setSearch] = useState("");
  const [modes, setModes] = useState<Record<string, string>>({});
  const activeFamily = catalog?.families.find(item => item.id === family);
  const effectiveFamily = activeFamily ? family : "all";
  const availableModes = activeFamily?.modes?.filter(mode => catalog?.entries.some(entry => entry.family === family && entry.modeUrls?.[mode.id])) ?? [];
  const savedMode = modes[family] || activeFamily?.defaultMode;
  const mode = availableModes.some(item => item.id === savedMode) ? savedMode : availableModes[0]?.id;
  const results = catalog ? filterTemplates(catalog, effectiveFamily, search, locale) : [];
  const modeDescription = availableModes.find(item => item.id === mode)?.description?.[locale];

  return (
    <div className="template-gallery" aria-busy={status === "loading"}>
      <div className={`template-gallery__controls${availableModes.length ? " template-gallery__controls--with-mode" : ""}`} data-reveal>
        <SelectField id="template-family" label={copy.family} value={effectiveFamily} onChange={setFamily} options={[{ value: "all", label: copy.all }, ...(catalog?.families.map(item => ({ value: item.id, label: item.name[locale] })) ?? [])]} />
        <SearchField id="template-search" label={copy.search} value={search} onChange={event => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} />
        {availableModes.length > 0 && <SelectField id="template-mode" label={copy.mode} value={mode || ""} onChange={value => setModes(current => ({ ...current, [family]: value }))} options={availableModes.map(item => ({ value: item.id, label: item.name[locale] }))} />}
      </div>
      {modeDescription && <p className="template-gallery__level type-body-sm">{modeDescription}</p>}
      {(status === "stale" || status === "error") && <div className="template-catalog-status" role="status"><p className="type-body-sm">{status === "stale" ? copy.stale : copy.unavailable}</p><Button variant="outline" onClick={retry}>{copy.retry}</Button></div>}
      {status === "loading" && <p className="template-gallery__count type-body-sm" role="status">{copy.loading}</p>}
      {catalog && <p className="template-gallery__count type-body-sm" role="status">{results.length} {copy.count}</p>}
      {results.length ? <div className="template-gallery__grid">{results.map(item => {
        const url = demoUrl(item, effectiveFamily === "all" ? undefined : mode, locale);
        const familyName = catalog?.families.find(family => family.id === item.family)?.name[locale];
        return <Card className="template-gallery__item" key={`${item.family}-${item.id}`} data-reveal>
          <a className="template-gallery__image" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${item.name[locale]} (${copy.opens})`}>
            <TemplatePreview src={item.imageUrl} />
          </a>
          <CardContent>
            <p className="type-body-sm text-muted-foreground">{familyName}</p>
            <CardTitle>{item.name[locale]}</CardTitle>
            <p className="type-body mt-2">{item.description[locale]}</p>
          </CardContent>
          <CardFooter><Button variant="link" nativeButton={false} render={<a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${item.name[locale]} (${copy.opens})`} />}>{copy.open} <ArrowUpRight aria-hidden="true" /></Button></CardFooter>
        </Card>;
      })}</div> : catalog && <div className="template-gallery__empty"><p className="type-body">{catalog.entries.length ? copy.empty : copy.noTemplates}</p>{catalog.entries.length > 0 && <Button variant="outline" onClick={() => { setSearch(""); setFamily("all"); setModes({}); }}>{copy.reset}</Button>}</div>}
      <noscript><p className="type-body-sm">{copy.noScript}</p></noscript>
    </div>
  );
}

