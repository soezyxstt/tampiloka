import { Bodoni_Moda } from "next/font/google";
import "./preview.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-preview-editorial", display: "swap" });

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className={bodoni.variable}>{children}</div>;
}
