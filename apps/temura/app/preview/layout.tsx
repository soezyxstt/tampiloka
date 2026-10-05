import { Bodoni_Moda } from "next/font/google";
import type { Metadata } from "next";
import "./preview.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-preview-editorial", display: "swap" });

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className={bodoni.variable}>{children}</div>;
}
