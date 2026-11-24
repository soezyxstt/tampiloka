"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Suspense, useEffect, useSyncExternalStore, type MouseEvent } from "react";

const localeLabels: Record<Locale, { visible: string; name: string; switchTo: string; current: string }> = {
  id: { visible: "ID", name: "Bahasa Indonesia", switchTo: "Ganti ke Bahasa Indonesia", current: "Bahasa Indonesia, bahasa saat ini" },
  en: { visible: "EN", name: "English", switchTo: "Switch to English", current: "English, current language" },
};

const locationListeners = new Set<() => void>();
const notifyLocationListeners = () => {
  for (const listener of locationListeners) listener();
};
function subscribeLocation(listener: () => void) {
  locationListeners.add(listener);
  window.addEventListener("hashchange", listener);
  window.addEventListener("popstate", listener);
  return () => {
    locationListeners.delete(listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("popstate", listener);
  };
}
const getLocationSnapshot = () => `${window.location.search}${window.location.hash}`;
const getServerLocationSnapshot = () => "";

function SearchSync() {
  const searchParams = useSearchParams();
  useEffect(() => { notifyLocationListeners(); }, [searchParams]);
  return null;
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const locationSuffix = useSyncExternalStore(subscribeLocation, getLocationSnapshot, getServerLocationSnapshot);
  const locales: Locale[] = ["id", "en"];

  function preserveCurrentLocation(event: MouseEvent<HTMLAnchorElement>, targetLocale: Locale) {
    if (typeof window === "undefined") return;
    const target = new URL(event.currentTarget.href);
    target.search = window.location.search;
    target.hash = window.location.hash;
    event.currentTarget.href = target.href;
    try {
      window.localStorage.setItem("tampiloka-language-choice", targetLocale);
    } catch {
      // Storage may be unavailable; the locale link still works normally.
    }
  }

  return (
    <nav className="language-switcher" aria-label={locale === "en" ? "Choose language" : "Pilih bahasa"}>
      <Suspense fallback={null}><SearchSync /></Suspense>
      {locales.map((targetLocale) => {
        const href = `${getPathname({ locale: targetLocale, href: pathname })}${locationSuffix}`;
        return (
          <a
            key={targetLocale}
            href={href}
            lang={targetLocale}
            hrefLang={targetLocale}
            aria-current={locale === targetLocale ? "page" : undefined}
            aria-label={`${localeLabels[targetLocale].visible}: ${locale === targetLocale ? localeLabels[targetLocale].current : localeLabels[targetLocale].switchTo}`}
            onClick={(event) => preserveCurrentLocation(event, targetLocale)}
          >
            <span aria-hidden="true">{localeLabels[targetLocale].visible}</span>
            <span className="sr-only">{localeLabels[targetLocale].name}</span>
          </a>
        );
      })}
    </nav>
  );
}
