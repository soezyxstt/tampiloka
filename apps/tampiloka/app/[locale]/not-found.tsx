import { getLocale } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";
import type { Locale } from "@/i18n/routing";

export default async function LocalizedNotFound() {
  const locale = await getLocale() as Locale;
  return <NotFoundContent locale={locale} />;
}
