export function defaultMenuCategory(now: Date): "Sarapan" | "Semua Menu" {
  const parts = new Intl.DateTimeFormat("en-GB", {timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hourCycle: "h23"}).formatToParts(now);
  const minutes = Number(parts.find(part => part.type === "hour")?.value) * 60 + Number(parts.find(part => part.type === "minute")?.value);
  return minutes >= 360 && minutes < 630 ? "Sarapan" : "Semua Menu";
}

export const MENU_PAGE_SIZE = 12;

export function paginateMenu<T>(items: T[], requestedPage: number, pageSize = MENU_PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.max(1, Math.min(requestedPage, pages));
  const start = (page - 1) * pageSize;
  return {page, pages, items: items.slice(start, start + pageSize), first: items.length ? start + 1 : 0, last: Math.min(start + pageSize, items.length)};
}
