import type { Locale } from "@/i18n/routing";

export const FAQ_ITEMS = [
  {
    question: "Apa yang perlu disiapkan sebelum mulai?",
    answer: "Mulai dengan tujuan website dan gambaran usaha. Sebelum pengerjaan, kami membahas lingkup serta bahan yang perlu Anda siapkan.",
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer: "Waktu pengerjaan mengikuti lingkup proyek dan kelengkapan bahan. Estimasi disepakati sebelum proyek dimulai. Rincian waktu untuk website bisnis tersedia di halaman Paket.",
  },
  {
    question: "Apakah website bisa dibuka di ponsel?",
    answer: "Ya. Tampilan dan fungsi website disesuaikan serta diuji untuk ponsel dan komputer.",
  },
  {
    question: "Apakah bisa sekalian membuat identitas visual?",
    answer: "Bisa. Layanannya mencakup logo, warna, tipografi, dan panduan penggunaan. Lingkupnya dibahas sesuai kebutuhan usaha.",
  },
  {
    question: "Di mana saya bisa melihat undangan digital?",
    answer: "Undangan pernikahan digital tersedia melalui Temura, produk Tampiloka. Tautannya ada di bagian layanan Undangan digital.",
  },
  {
    question: "Bagaimana jika perlu bantuan setelah website tayang?",
    answer: "Untuk website bisnis, pembaruan konten tersedia per permintaan atau melalui Care. Selama hosting aktif, perbaikan gangguan dari sistem Tampiloka tetap tercakup. Dukungan untuk proyek lain mengikuti kesepakatan.",
  },
] as const;

export const FAQ_ITEMS_EN = [
  {
    question: "What should I prepare before we start?",
    answer: "Start with your website goals and a general picture of your business. Before work begins, we’ll discuss the project scope and the materials you need to prepare.",
  },
  {
    question: "How long does the work take?",
    answer: "The timeline depends on the project scope and whether all materials are ready. We agree on an estimate before the project starts. The website package page has a timeline for business websites.",
  },
  {
    question: "Will the website work on phones?",
    answer: "Yes. The website’s layout and functionality are adapted and tested for phones and computers.",
  },
  {
    question: "Can you also create a visual identity?",
    answer: "Yes. This service can cover a logo, colors, typography, and usage guidelines. We discuss the scope based on your business needs.",
  },
  {
    question: "Where can I see digital invitations?",
    answer: "Digital wedding invitations are available through Temura, a Tampiloka product. You can find the link in the Digital invitations service section.",
  },
  {
    question: "What if I need help after the website goes live?",
    answer: "For business websites, content updates are available per request or through Care. While hosting is active, fixes for issues caused by Tampiloka’s system remain covered. Support for other projects follows the agreed terms.",
  },
] as const;

export function getFaqItems(locale: Locale) {
  return locale === "en" ? FAQ_ITEMS_EN : FAQ_ITEMS;
}
