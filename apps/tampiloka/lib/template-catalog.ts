export type CatalogLocale = "id" | "en";
export type CatalogText = Record<CatalogLocale, string>;
export type CatalogMode = { id: string; name: CatalogText; description?: CatalogText };
export type CatalogFamily = {
  id: string;
  name: CatalogText;
  description?: CatalogText;
  modes?: CatalogMode[];
  defaultMode?: string;
};
export type Template = {
  id: string;
  family: string;
  name: CatalogText;
  description: CatalogText;
  url: string;
  imageUrl: string;
  visibility: "public";
  modeUrls?: Record<string, string>;
  featured?: boolean;
};
export type TemplateCatalog = {
  schemaVersion: 1;
  updatedAt: string;
  families: CatalogFamily[];
  entries: Template[];
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`Invalid ${label}`);
  return value as Record<string, unknown>;
}
function slug(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length > 100 || !slugPattern.test(value)) throw new Error(`Invalid ${label}`);
  return value;
}
function text(value: unknown, label: string): CatalogText {
  const item = record(value, label);
  if (["id", "en"].some(locale => typeof item[locale] !== "string" || !(item[locale] as string).trim() || (item[locale] as string).length > 1200)) throw new Error(`Invalid ${label}`);
  return { id: item.id as string, en: item.en as string };
}
function httpsUrl(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length > 2048) throw new Error(`Invalid ${label}`);
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password) throw new Error(`Invalid ${label}`);
  return url.href;
}

/** Validate the shared manifest and return only public data that the UI uses. */
export function parseTemplateCatalog(value: unknown): TemplateCatalog {
  const input = record(value, "catalog");
  if (input.schemaVersion !== 1) throw new Error("Unsupported catalog version");
  if (typeof input.updatedAt !== "string" || !Number.isFinite(Date.parse(input.updatedAt))) throw new Error("Invalid catalog date");
  if (!Array.isArray(input.families) || input.families.length > 100 || !Array.isArray(input.entries) || input.entries.length > 5000) throw new Error("Invalid catalog collections");

  const familyIds = new Set<string>();
  const families = input.families.map((value): CatalogFamily => {
    const item = record(value, "family");
    const id = slug(item.id, "family id");
    if (familyIds.has(id)) throw new Error("Duplicate catalog family");
    familyIds.add(id);
    const family: CatalogFamily = { id, name: text(item.name, "family name") };
    if (item.description !== undefined) family.description = text(item.description, "family description");
    if (item.modes !== undefined) {
      if (!Array.isArray(item.modes) || item.modes.length > 100) throw new Error("Invalid family modes");
      const modeIds = new Set<string>();
      family.modes = item.modes.map((value): CatalogMode => {
        const mode = record(value, "mode");
        const id = slug(mode.id, "mode id");
        if (modeIds.has(id)) throw new Error("Duplicate family mode");
        modeIds.add(id);
        return { id, name: text(mode.name, "mode name"), ...(mode.description !== undefined ? { description: text(mode.description, "mode description") } : {}) };
      });
    }
    if (item.defaultMode !== undefined) {
      family.defaultMode = slug(item.defaultMode, "default mode");
      if (!family.modes?.some(mode => mode.id === family.defaultMode)) throw new Error("Unknown default mode");
    }
    return family;
  });

  const keys = new Set<string>();
  const entries: Template[] = [];
  for (const value of input.entries) {
    const item = record(value, "entry");
    // Private/prospect entries never reach server HTML, browser storage or API responses.
    if (item.visibility !== "public") continue;
    const id = slug(item.id, "entry id");
    const familyId = slug(item.family, "entry family");
    const family = families.find(family => family.id === familyId);
    if (!family) throw new Error("Unknown entry family");
    if (keys.has(id)) throw new Error("Duplicate catalog entry");
    keys.add(id);
    const entry: Template = {
      id, family: familyId, name: text(item.name, "entry name"), description: text(item.description, "entry description"),
      url: httpsUrl(item.url, "demo URL"), imageUrl: httpsUrl(item.imageUrl, "preview URL"), visibility: "public",
    };
    if (item.featured !== undefined) {
      if (typeof item.featured !== "boolean") throw new Error("Invalid featured flag");
      entry.featured = item.featured;
    }
    if (item.modeUrls !== undefined) {
      entry.modeUrls = {};
      for (const [id, url] of Object.entries(record(item.modeUrls, "mode URLs"))) {
        if (!family.modes?.some(mode => mode.id === id)) throw new Error("Unknown entry mode");
        entry.modeUrls[id] = httpsUrl(url, "mode URL");
      }
    }
    for (const mode of family.modes ?? []) {
      if (!entry.modeUrls?.[mode.id]) throw new Error("Missing entry mode URL");
    }
    entries.push(entry);
  }
  return { schemaVersion: 1, updatedAt: input.updatedAt, families: families.filter(family => entries.some(entry => entry.family === family.id)), entries };
}

export function demoUrl(template: Template, mode: string | undefined, locale: CatalogLocale): string {
  const url = new URL((mode && template.modeUrls?.[mode]) || template.url);
  url.searchParams.set("lang", locale);
  return url.href;
}

export function filterTemplates(catalog: TemplateCatalog, family: string, search: string, locale: CatalogLocale): Template[] {
  const query = search.trim().toLocaleLowerCase(locale);
  return catalog.entries.filter(item => (family === "all" || item.family === family) && `${item.id} ${item.name[locale]} ${item.description[locale]}`.toLocaleLowerCase(locale).includes(query));
}

export function featuredTemplates(catalog: TemplateCatalog, limit = 3): Template[] {
  const candidates = [...catalog.entries].sort((left, right) => Number(Boolean(right.featured)) - Number(Boolean(left.featured)));
  const seen = new Set<string>();
  return candidates.filter(entry => {
    if (seen.has(entry.family)) return false;
    seen.add(entry.family);
    return true;
  }).slice(0, limit);
}

/** Fetch at request time, including when a new manifest replaces the previous one. */
export async function fetchTemplateCatalog(source: string, fetcher: typeof fetch = fetch): Promise<TemplateCatalog> {
  const url = new URL(httpsUrl(source, "catalog source"));
  const response = await fetcher(url, {
    cache: "no-store", headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(6000), redirect: "error",
  });
  if (!response.ok) throw new Error("Catalog source is unavailable");
  const limit = 1_000_000;
  if (Number(response.headers.get("content-length")) > limit) throw new Error("Catalog exceeds the size limit");
  const body = await response.text();
  if (new TextEncoder().encode(body).byteLength > limit) throw new Error("Catalog exceeds the size limit");
  return parseTemplateCatalog(JSON.parse(body));
}

export const CATALOG_CACHE_MAX_AGE = 24 * 60 * 60 * 1000;
const storageKey = "tampiloka.public-template-catalog.v1";
type CatalogStorage = { getItem(key: string): string | null; setItem(key: string, value: string): void };

export function readCatalogCache(storage: CatalogStorage, now = Date.now()): TemplateCatalog | null {
  try {
    const cached = JSON.parse(storage.getItem(storageKey) || "null");
    if (!cached || typeof cached.savedAt !== "number" || now - cached.savedAt > CATALOG_CACHE_MAX_AGE || cached.savedAt > now) return null;
    return parseTemplateCatalog(cached.catalog);
  } catch { return null; }
}

export function writeCatalogCache(storage: CatalogStorage, catalog: TemplateCatalog, now = Date.now()): boolean {
  try {
    storage.setItem(storageKey, JSON.stringify({ savedAt: now, catalog: parseTemplateCatalog(catalog) }));
    return true;
  } catch { return false; }
}

