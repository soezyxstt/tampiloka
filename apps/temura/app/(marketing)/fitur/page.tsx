import type { Metadata } from "next";
import Link from "next/link";
import { WelcomeExample } from "@/components/welcome-example";
export const metadata: Metadata = { title: "Fitur undangan | Temura", alternates: { canonical: "/fitur" } };
const groups = [
  { name: "Undangan", rows: [["Detail acara", "Nama pasangan, keluarga, tanggal, dan lokasi."], ["Maps", "Tautan peta lokasi acara."], ["Sambutan", "Salam pembuka yang bisa disesuaikan."], ["Musik & galeri", "Lagu pilihan, foto, dan cerita pasangan."], ["Hadiah", "Transfer atau QRIS dengan ucapan."]] },
  { name: "Tamu", rows: [["Tautan personal", "Bagikan undangan dengan nama tamu."], ["RSVP", "Konfirmasi kehadiran dan jumlah tamu."], ["Ucapan", "Doa dan pesan dari keluarga dan sahabat."]] },
  { name: "Pengelolaan", rows: [["Dashboard", "Detail acara, daftar tamu, RSVP, dan ucapan."], ["Studio", "Susun teks dan elemen dengan drag & drop."]] },
];
export default function FeaturesPage() {
  return <div className="temura-site"><section className="temura-section temura-container temura-page-intro"><h1 className="type-display">Fitur</h1><p className="type-body temura-muted temura-page-description">Ketersediaan mengikuti paket dan tahap pengembangan.</p><div className="temura-feature-groups">{groups.map((group) => <section key={group.name}><h2 className="type-heading-3">{group.name}</h2><dl>{group.rows.map(([title, description]) => <div key={title} className="temura-feature-row"><dt className="type-label-lg">{title}</dt><dd className="type-body temura-muted">{description}{title === "Sambutan" && <WelcomeExample />}{(title === "Studio" || title === "Dashboard") && <Link className="temura-inline-link type-label" href={`/${title.toLowerCase()}`}>Buka demo ↗</Link>}</dd></div>)}</dl></section>)}</div></section></div>;
}
