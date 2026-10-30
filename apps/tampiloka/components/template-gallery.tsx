"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchField, SelectField } from "@/components/ui/form-controls";
import { demoUrl, filterTemplates, levels, type CommerceLevel, type TemplateFamily } from "@/lib/template-catalog";
import { templateCopy } from "@/lib/template-copy";
import type { Locale } from "@/i18n/routing";

export function TemplateGallery({ locale }: { locale: Locale }) {
  const copy = templateCopy[locale];
  const [family, setFamily] = useState<TemplateFamily | "all">("all");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<CommerceLevel>("store");
  const results = filterTemplates(family, search, locale);
  return (
    <div className="template-gallery">
      <div className="template-gallery__controls" data-reveal>
        <SelectField id="template-family" label={copy.family} value={family} onChange={value => setFamily(value as TemplateFamily | "all")} options={[{ value: "all", label: copy.all }, { value: "commerce", label: copy.commerce }, { value: "cafe", label: copy.cafe }]} />
        <SearchField id="template-search" label={copy.search} value={search} onChange={event => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} />
        {family !== "cafe" && <SelectField id="template-level" label={copy.level} value={level} onChange={value => setLevel(value as CommerceLevel)} options={levels.map(item => ({ value: item.id, label: item.name[locale] }))} />}
      </div>
      {family !== "cafe" && <p className="template-gallery__level type-body-sm">{levels.find(item => item.id === level)?.description[locale]}</p>}
      <p className="template-gallery__count type-body-sm" role="status">{results.length} {copy.count}</p>
      {results.length ? <div className="template-gallery__grid">{results.map(item => {
        const url = demoUrl(item, level);
        return <Card className="template-gallery__item" key={`${item.family}-${item.id}`} data-reveal>
          <a className="template-gallery__image" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${item.name[locale]} (${copy.opens})`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/templates/${item.family}-${item.id}.webp`} alt="" loading="lazy" width={1000} height={750} />
          </a>
          <CardContent>
            <p className="type-body-sm text-muted-foreground">{copy[item.family]}</p>
            <CardTitle>{item.name[locale]}</CardTitle>
            <p className="type-body mt-2">{item.description[locale]}</p>
          </CardContent>
          <CardFooter><Button variant="link" nativeButton={false} render={<a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open} ${item.name[locale]} (${copy.opens})`} />}>{copy.open} <ArrowUpRight aria-hidden="true" /></Button></CardFooter>
        </Card>;
      })}</div> : <div className="template-gallery__empty"><p className="type-body">{copy.empty}</p><Button variant="outline" onClick={() => { setSearch(""); setFamily("all"); }}>{copy.reset}</Button></div>}
    </div>
  );
}
