"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

interface LiteModeContextValue {
  isLiteMode: boolean;
  toggle: () => void;
}

const LiteModeContext = createContext<LiteModeContextValue>({
  isLiteMode: false,
  toggle: () => {},
});

const STORAGE_KEY = "sentuh-lite-mode";
let fallback = false;
function readLiteMode() {
  try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch { return fallback; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("temura-lite-mode", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("temura-lite-mode", callback);
  };
}

export function LiteModeProvider({ children }: { children: React.ReactNode }) {
  const isLiteMode = useSyncExternalStore(subscribe, readLiteMode, () => false);

  function toggle() {
    fallback = !readLiteMode();
    try { localStorage.setItem(STORAGE_KEY, fallback ? "1" : "0"); } catch {}
    window.dispatchEvent(new Event("temura-lite-mode"));
  }

  return (
    <LiteModeContext.Provider value={{ isLiteMode, toggle }}>
      {children}
    </LiteModeContext.Provider>
  );
}

export function useLiteMode() {
  return useContext(LiteModeContext);
}
