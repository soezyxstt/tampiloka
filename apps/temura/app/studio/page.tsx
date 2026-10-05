import type { Metadata } from "next";
import { StudioEditor } from "@/components/studio/studio-editor";
import "../studio.css";

export const metadata: Metadata = {
  title: "Studio",
  description: "Coba ruang kreasi Temura. Susun teks dan elemen, lalu simpan draf di perangkat Anda.",
};

export default function StudioPage() {
  return <StudioEditor />;
}
