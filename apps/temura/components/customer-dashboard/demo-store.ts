"use client";

import { useSyncExternalStore } from "react";

export type Guest = { id: string; name: string; group: string; attendance: "pending" | "attending" | "declined"; wish: string };
export type DashboardData = {
  couple: string; date: string; venue: string; address: string; maps: string;
  welcome: string; song: string; gallery: string[]; gift: "off" | "transfer" | "qris";
  giftMessage: string; guests: Guest[];
};
const KEY = "temura-customer-demo-v1";
const initial: DashboardData = {
  couple: "Nara & Aruna", date: "", venue: "", address: "", maps: "",
  welcome: "Dengan bahagia, kami mengundang Bapak/Ibu/Saudara/i untuk merayakan hari pernikahan kami.",
  song: "", gallery: [], gift: "off", giftMessage: "Terima kasih atas doa dan perhatian yang diberikan.", guests: [],
};
let cachedRaw: string | null = null;
let cached: DashboardData = initial;
const listeners = new Set<() => void>();
function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      const parsed = raw ? JSON.parse(raw) : null;
      // Local demo data has a fixed shape. Ignore malformed or outdated storage.
      const fields = ["couple", "date", "venue", "address", "maps", "welcome", "song", "giftMessage"];
      cached = parsed && fields.every((key) => typeof parsed[key] === "string") &&
        ["off", "transfer", "qris"].includes(parsed.gift) && Array.isArray(parsed.gallery) && parsed.gallery.every((url: unknown) => typeof url === "string") &&
        Array.isArray(parsed.guests) && parsed.guests.every((guest: Guest) => guest && typeof guest.id === "string" && typeof guest.name === "string" && typeof guest.group === "string" && typeof guest.wish === "string" && ["pending", "attending", "declined"].includes(guest.attendance))
        ? parsed : initial;
    }
  } catch { cached = initial; }
  return cached;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => { listeners.delete(listener); window.removeEventListener("storage", listener); };
}
export function useDashboardDemo() {
  const data = useSyncExternalStore(subscribe, read, () => initial);
  function update(next: DashboardData) {
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((listener) => listener());
  }
  return [data, update] as const;
}
