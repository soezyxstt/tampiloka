import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Warung Kopi Duduk Gembira — Garut',
  description: 'Ngopi, sarapan, dan duduk gembira di Jalan Otista, Garut.',
  robots: { index: false, follow: false },
  icons: { icon: [{ url: '/images/logo.webp', type: 'image/webp' }] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body id="top">{children}</body></html>;
}

