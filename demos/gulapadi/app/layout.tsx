import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({ src: "./fonts/manrope-latin.woff2", variable: "--font-brand", display: "swap" });
export const metadata: Metadata = {
  title: "Gulapadi Garut — Warung Makan Nusantara",
  description: "Menu sarapan, masakan Nusantara, donat, dan informasi kunjungan Gulapadi Garut.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.ico" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={manrope.variable}>{children}</body></html>;
}
