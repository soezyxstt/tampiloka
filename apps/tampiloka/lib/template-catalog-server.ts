import "server-only";
import { fetchTemplateCatalog, type TemplateCatalog } from "./template-catalog";

export const DEFAULT_TEMPLATE_CATALOG_URL = "https://catalog.tampiloka.site/catalog.v1.json";

/** A runtime read: the marketing build never contains a copy of the demo list. */
export async function loadTemplateCatalog(): Promise<TemplateCatalog> {
  return fetchTemplateCatalog(process.env.TEMPLATE_CATALOG_URL || DEFAULT_TEMPLATE_CATALOG_URL);
}
