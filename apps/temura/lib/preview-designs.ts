import runtime from "@/public/assets/templates/manifest.json";

export type PreviewAsset = { url: string; width: number; height: number; srcSet: string };
export type PreviewDesign = {
  id: string;
  name: string;
  theme: "sawala" | "eunoia";
  background: PreviewAsset;
  flower: PreviewAsset;
  detail: PreviewAsset;
  divider: PreviewAsset;
  frame: PreviewAsset;
  medallion: PreviewAsset;
};

function asset(id: string, size: "full" | "small" = "small"): PreviewAsset {
  const source = runtime.assets.find((item) => item.id === id);
  const variant = source?.variants.find((item) => item.role === size);
  if (!variant) throw new Error(`Missing reviewed preview asset: ${id}/${size}`);
  return { url: variant.url, width: variant.width, height: variant.height, srcSet: source!.variants.map((item) => `${item.url} ${item.width}w`).join(", ") };
}

// Two reference designs only. The remaining catalog stays unimplemented until refinement.
export const PREVIEW_DESIGNS: readonly PreviewDesign[] = [
  {
    id: "adat-sunda", name: "Sawala", theme: "sawala",
    background: asset("bg-adat-sunda", "full"),
    flower: asset("orn-adat-sunda-03"),
    detail: asset("orn-adat-sunda-01"),
    divider: asset("orn-adat-sunda-06"),
    frame: asset("orn-adat-sunda-05"),
    medallion: asset("orn-adat-sunda-04"),
  },
  {
    id: "minimalist-eunoia", name: "Eunoia", theme: "eunoia",
    background: asset("bg-minimalist-eunoia", "full"),
    flower: asset("orn-minimalist-eunoia-01"),
    detail: asset("orn-minimalist-eunoia-02"),
    divider: asset("orn-minimalist-eunoia-04"),
    frame: asset("orn-minimalist-eunoia-02"),
    medallion: asset("orn-minimalist-eunoia-03"),
  },
];

export const PREVIEW_IDS = PREVIEW_DESIGNS.map((design) => design.id);
