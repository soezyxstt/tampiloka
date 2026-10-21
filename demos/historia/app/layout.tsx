import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({ src: [
  { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
  { path: "./fonts/Poppins-Medium.ttf", weight: "500" },
  { path: "./fonts/Poppins-SemiBold.ttf", weight: "600" },
  { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
], display: "swap", variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Historia Coffee & Eatery — Konsep Website oleh Tampiloka",
  description: "Konsep independen untuk Historia Coffee & Eatery, Garut. Jelajahi pilihan menu, suasana, dan informasi kunjungan. Bukan situs resmi.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={poppins.variable}>{children}</body></html>;
}
