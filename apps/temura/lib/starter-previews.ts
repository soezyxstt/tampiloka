import type { ComponentType } from "react";

type StarterPreviewModule = { Component: ComponentType };

/**
 * Only previews with a finished TSX/CSS pair belong here. Keep the imports
 * inside the selected loader so a request only resolves its own renderer.
 */
export const STARTER_PREVIEWS = [
  {
    id: "adat-bali",
    name: "Purnama",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/purnama");
      return { Component: previewModule.PurnamaPreview };
    },
  },
  {
    id: "adat-jawa",
    name: "Sekar Mataram",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/sekar-mataram");
      return { Component: previewModule.SekarMataramPreview };
    },
  },
  {
    id: "adat-minang",
    name: "Rangkiang",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/rangkiang");
      return { Component: previewModule.RangkiangPreview };
    },
  },
  {
    id: "adat-betawi",
    name: "Kembang Kelapa",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/kembang-kelapa");
      return { Component: previewModule.KembangKelapaPreview };
    },
  },
  {
    id: "game-minecraft",
    name: "Dunia Balok",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/dunia-balok");
      return { Component: previewModule.DuniaBalokPreview };
    },
  },
  {
    id: "game-block-blast",
    name: "Susun Bahagia",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/susun-bahagia");
      return { Component: previewModule.SusunBahagiaPreview };
    },
  },
  {
    id: "game-tom-jerry",
    name: "Tom & Jerry",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/tom-jerry");
      return { Component: previewModule.TomJerryPreview };
    },
  },
  {
    id: "game-upin-ipin",
    name: "Kampung Ceria",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/kampung-ceria");
      return { Component: previewModule.KampungCeriaPreview };
    },
  },
  {
    id: "minimalist-ruang-rindu",
    name: "Ruang Rindu",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/ruang-rindu");
      return { Component: previewModule.RuangRinduPreview };
    },
  },
  {
    id: "minimalist-senja",
    name: "Senja",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/senja");
      return { Component: previewModule.SenjaPreview };
    },
  },
  {
    id: "islamic-sakinah",
    name: "Sakinah",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/sakinah");
      return { Component: previewModule.SakinahPreview };
    },
  },
  {
    id: "islamic-mawaddah",
    name: "Mawaddah",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/mawaddah");
      return { Component: previewModule.MawaddahPreview };
    },
  },
  {
    id: "islamic-rahmah",
    name: "Rahmah",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/rahmah");
      return { Component: previewModule.RahmahPreview };
    },
  },
  {
    id: "retro-kabar-bahagia",
    name: "Kabar Bahagia",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/kabar-bahagia");
      return { Component: previewModule.KabarBahagiaPreview };
    },
  },
  {
    id: "retro-layar-tancep",
    name: "Layar Tancep",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/layar-tancep");
      return { Component: previewModule.LayarTancepPreview };
    },
  },
  {
    id: "retro-sundown-letters",
    name: "Sundown Letters",
    load: async (): Promise<StarterPreviewModule> => {
      const previewModule = await import("@/components/invitation/starter-previews/sundown-letters");
      return { Component: previewModule.SundownLettersPreview };
    },
  },
] as const;

export type StarterPreviewId = (typeof STARTER_PREVIEWS)[number]["id"];

export function findStarterPreview(templateId: string) {
  return STARTER_PREVIEWS.find((preview) => preview.id === templateId);
}
