"use client";

import { useEffect, useRef, useState } from "react";
import { CATALOG_CACHE_MAX_AGE, parseTemplateCatalog, readCatalogCache, writeCatalogCache, type TemplateCatalog } from "@/lib/template-catalog";

const REFRESH_INTERVAL = 60 * 1000;
type CatalogState = { catalog: TemplateCatalog | null; status: "loading" | "ready" | "stale" | "error" };

function cachedCatalog(): TemplateCatalog | null {
  try {
    return readCatalogCache(window.localStorage);
  } catch {
    return null;
  }
}

export function useTemplateCatalog(initialCatalog: TemplateCatalog | null = null) {
  const [state, setState] = useState<CatalogState>({ catalog: initialCatalog, status: initialCatalog ? "ready" : "loading" });
  const [attempt, setAttempt] = useState(0);
  const lastSuccess = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    let controller: AbortController | null = null;
    if (lastSuccess.current === null) lastSuccess.current = initialCatalog ? Date.now() : 0;

    async function refresh() {
      if (controller || !active) return;
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 8000);
      try {
        const response = await fetch("/api/template-catalog", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Catalog unavailable");
        const catalog = parseTemplateCatalog(await response.json());
        if (!active) return;
        lastSuccess.current = Date.now();
        try { writeCatalogCache(window.localStorage, catalog, lastSuccess.current); } catch { /* Storage is optional. */ }
        setState({ catalog, status: "ready" });
      } catch {
        if (!active) return;
        const cached = cachedCatalog();
        const hasRecentCatalog = Boolean(lastSuccess.current && Date.now() - lastSuccess.current <= CATALOG_CACHE_MAX_AGE);
        setState(current => {
          const catalog = hasRecentCatalog ? current.catalog : cached;
          return { catalog, status: catalog ? "stale" : "error" };
        });
      } finally {
        window.clearTimeout(timeout);
        controller = null;
      }
    }

    const refreshVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    void refresh();
    const interval = window.setInterval(refreshVisible, REFRESH_INTERVAL);
    window.addEventListener("focus", refreshVisible);
    document.addEventListener("visibilitychange", refreshVisible);
    return () => {
      active = false;
      controller?.abort();
      window.clearInterval(interval);
      window.removeEventListener("focus", refreshVisible);
      document.removeEventListener("visibilitychange", refreshVisible);
    };
  }, [initialCatalog, attempt]);

  const retry = () => {
    setState(current => ({ ...current, status: current.catalog ? "stale" : "loading" }));
    setAttempt(value => value + 1);
  };
  return { ...state, retry };
}
