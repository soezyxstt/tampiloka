"use client";

import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { useEffect, useState, type MouseEvent } from "react";
import "../app/navigation.css";

const localeLabels: Record<Locale, { visible: string; name: string; switchTo: string; current: string }> = {
  id: { visible: "ID", name: "Bahasa Indonesia", switchTo: "Ganti ke Bahasa Indonesia", current: "Bahasa Indonesia, bahasa saat ini" },
  en: { visible: "EN", name: "English", switchTo: "Switch to English", current: "English, current language" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [locationSuffix, setLocationSuffix] = useState("");
  const locales: Locale[] = ["id", "en"];

  useEffect(() => {
    const updateLocationSuffix = () => setLocationSuffix(`${window.location.search}${window.location.hash}`);
    updateLocationSuffix();
    window.addEventListener("hashchange", updateLocationSuffix);
    window.addEventListener("popstate", updateLocationSuffix);
    return () => {
      window.removeEventListener("hashchange", updateLocationSuffix);
      window.removeEventListener("popstate", updateLocationSuffix);
    };
  }, []);

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
      {locales.map((targetLocale) => {
        const href = `${getPathname({ locale: targetLocale, href: pathname })}${locationSuffix}`;
        return (
          <a
            key={targetLocale}
            href={href}
            lang={targetLocale}
            hrefLang={targetLocale}
            aria-current={locale === targetLocale ? "page" : undefined}
            aria-label={locale === targetLocale ? localeLabels[targetLocale].current : localeLabels[targetLocale].switchTo}
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
