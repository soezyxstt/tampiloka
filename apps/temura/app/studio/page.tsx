import type { Metadata } from "next";
import { StudioEditor } from "@/components/studio/studio-editor";
import "../studio.css";

export const metadata: Metadata = {
  title: "Studio",
  description: "Coba Studio Temura untuk mengatur teks dan elemen undangan. Simpan draf di browser ini.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioEditor />;
}
