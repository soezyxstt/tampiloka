export const LAUNCH_DISCOUNT = 0.4;
export const HOSTING_ANNUAL = 299_000;

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
export const formatRupiah = (value: number) => rupiah.format(value).replace(/\s/g, "");
export const formatPromoPrice = (value: number) => `Rp${new Intl.NumberFormat("id-ID").format(value / 1_000)}k`;
// The brief supplies promotional prices. Round their pre-discount equivalents to rupiah.
export const normalPrice = (price: number) => Math.round(price / (1 - LAUNCH_DISCOUNT));

export const WEBSITE_PLANS = [
  { id: "essential", name: "Essential", price: 999_000, features: ["1 halaman, hingga 5 bagian", "6 menu unggulan", "Galeri, lokasi & jam buka", "Tautan Instagram & WhatsApp"], revisions: 1, timeline: "3–5 hari kerja" },
  { id: "menu", name: "Menu", price: 1_699_000, features: ["Katalog hingga 30 item", "Kategori, foto & harga menu", "Pencarian menu sederhana", "Berkas QR menu digital"], revisions: 2, timeline: "5–8 hari kerja" },
  { id: "signature", name: "Signature", price: 2_499_000, features: ["Katalog hingga 60 item", "1 halaman tambahan", "Formulir reservasi ke WhatsApp", "Pilihan tampilan lebih luas"], revisions: 2, timeline: "7–12 hari kerja" },
] as const;
export type PlanId = (typeof WEBSITE_PLANS)[number]["id"];

export const DOMAIN_OPTIONS = [
  { id: "subdomain", name: "Subdomain Tampiloka", example: "namakafe.tampiloka.site", price: 0 },
  { id: "com", name: "Domain .com", example: "namakafe.com", price: 299_000 },
  { id: "id", name: "Domain .id", example: "namakafe.id", price: 299_000 },
  { id: "co-id", name: "Domain .co.id", example: "namakafe.co.id", price: 399_000 },
  { id: "own", name: "Domain milik Anda", example: "Koneksi awal standar gratis", price: 0 },
] as const;
export type DomainId = (typeof DOMAIN_OPTIONS)[number]["id"];

export const CARE_PLANS = [
  { id: "none", name: "On-demand", price: 0, requests: "Tanpa langganan bulanan", description: "Rp119.000 untuk setiap permintaan perubahan kecil.", time: "Sesuai kesepakatan" },
  { id: "care", name: "Care", price: 79_000, requests: "1 permintaan per bulan", description: "Untuk pembaruan isi website sesekali.", time: "Maksimal 3 hari kerja" },
  { id: "plus", name: "Care Plus", price: 179_000, requests: "3 permintaan per bulan", description: "Untuk menu dan informasi yang lebih sering berubah.", time: "Maksimal 2 hari kerja" },
] as const;
export type CareId = (typeof CARE_PLANS)[number]["id"];

export const ADDON_GROUPS = ["Fitur website", "Konten & tampilan"] as const;
export const ADDONS = [
  { id: "section", group: "Fitur website", name: "Bagian landing page tambahan", unit: "per bagian", price: 149_000, max: 10 },
  { id: "page", group: "Fitur website", name: "Halaman tambahan", unit: "per halaman, tata letak standar", price: 349_000, max: 10 },
  { id: "reservation", group: "Fitur website", name: "Formulir reservasi ke WhatsApp", unit: "sekali bayar", price: 249_000, max: 1 },
  { id: "cart", group: "Fitur website", name: "Keranjang pesanan ke WhatsApp", unit: "sekali bayar", price: 499_000, max: 1 },
  { id: "branch", group: "Fitur website", name: "Informasi cabang tambahan", unit: "per cabang", price: 199_000, max: 10 },
  { id: "english", group: "Fitur website", name: "Tambahan bahasa Inggris", unit: "per halaman", price: 399_000, max: 10 },
  { id: "revision", group: "Fitur website", name: "Putaran revisi tambahan", unit: "per putaran", price: 149_000, max: 10 },
  { id: "catalog", group: "Konten & tampilan", name: "Tambahan 10 item katalog", unit: "per 10 item saat pembuatan", price: 99_000, max: 10 },
  { id: "photos", group: "Konten & tampilan", name: "Olah 10 foto produk", unit: "per 10 foto yang sudah tersedia", price: 149_000, max: 10 },
  { id: "copy", group: "Konten & tampilan", name: "Penulisan teks landing page", unit: "dari bahan Anda", price: 199_000, max: 1 },
  { id: "wordmark", group: "Konten & tampilan", name: "Desain logo teks sederhana", unit: "sekali bayar", price: 299_000, max: 1 },
  { id: "business", group: "Konten & tampilan", name: "Penataan Google Business Profile", unit: "sekali bayar", price: 199_000, max: 1 },
  { id: "qr", group: "Konten & tampilan", name: "Desain QR dengan identitas kafe", unit: "berkas siap cetak; biaya cetak terpisah", price: 149_000, max: 1 },
] as const;
export type AddonId = (typeof ADDONS)[number]["id"];
export type AddonQuantities = Partial<Record<AddonId, number>>;

export function addonAvailability(id: AddonId, plan: PlanId): string | undefined {
  if (id === "reservation" && plan === "signature") return "Sudah termasuk Signature";
  if (id === "catalog" && plan === "essential") return "Tersedia untuk Menu & Signature";
}

export function calculateEstimate(planId: PlanId, domainId: DomainId, careId: CareId, quantities: AddonQuantities) {
  const plan = WEBSITE_PLANS.find((item) => item.id === planId)!;
  const domain = DOMAIN_OPTIONS.find((item) => item.id === domainId)!;
  const care = CARE_PLANS.find((item) => item.id === careId)!;
  const addons = ADDONS.flatMap((addon) => {
    const quantity = addonAvailability(addon.id, planId) ? 0 : Math.min(addon.max, Math.max(0, Math.floor(quantities[addon.id] || 0)));
    return quantity ? [{ ...addon, quantity, total: quantity * addon.price }] : [];
  });
  const addonTotal = addons.reduce((sum, item) => sum + item.total, 0);
  const annualCare = care.price * 12;
  const savings = normalPrice(plan.price) - plan.price;
  return { plan, domain, care, addons, addonTotal, annualCare, savings, firstYear: plan.price + domain.price + annualCare + addonTotal, secondYear: HOSTING_ANNUAL + domain.price + annualCare };
}

export function estimateText(estimate: ReturnType<typeof calculateEstimate>) {
  const { plan, domain, care, addons, firstYear, secondYear, savings } = estimate;
  return [
    "Estimasi website kafe — Tampiloka",
    `Paket ${plan.name}: ${formatRupiah(plan.price)} (promo peluncuran 40%; hemat ${formatRupiah(savings)})`,
    `Domain: ${domain.name} — ${domain.price ? `${formatRupiah(domain.price)}/tahun` : domain.id === "own" ? "koneksi awal standar gratis" : "termasuk selama layanan aktif"}`,
    domain.id === "own" ? "Perpanjangan domain milik Anda dibayar langsung ke penyedia, di luar estimasi." : domain.example,
    ...(care.price ? [`Perawatan: ${care.name} — ${formatRupiah(care.price)}/bulan.`, `Dihitung untuk 12 bulan; dibayar ${formatRupiah(care.price * 3)} setiap 3 bulan.`] : ["Perawatan: tanpa langganan. Perubahan kecil Rp119.000/permintaan, di luar estimasi."]),
    ...addons.map((addon) => `${addon.name} × ${addon.quantity}: ${formatRupiah(addon.total)} (sekali bayar)`),
    "Hosting & SSL: termasuk selama 12 bulan pertama, lalu Rp299.000/tahun.",
    `Total tahun pertama: ${formatRupiah(firstYear)}`,
    `Total tahun kedua: ${formatRupiah(secondYear)}`,
    "Estimasi belum termasuk pajak yang mungkin berlaku. Biaya perpanjangan dihitung dengan tarif saat ini. Harga akhir mengikuti lingkup yang disepakati.",
  ].join("\n");
}

export const PRICING_FAQS = [
  { question: "Apa yang mendapat diskon peluncuran 40%?", answer: "Diskon 40% berlaku untuk pembuatan Essential, Menu, dan Signature. Harga yang ditampilkan sudah termasuk diskon; harga normal dibulatkan ke rupiah terdekat. Domain, tambahan, hosting tahun berikutnya, dan Care memakai tarif masing-masing. Custom mengikuti penawaran." },
  { question: "Apakah saya harus berlangganan Care?", answer: "Tidak. Anda bisa membayar Rp119.000 per permintaan perubahan kecil tanpa langganan. Care membantu pembaruan isi website. Perbaikan gangguan teknis dari sistem Tampiloka tetap tercakup selama hosting aktif." },
  { question: "Apakah menu bisa saya ubah sendiri?", answer: "Essential, Menu, dan Signature tidak memiliki dashboard untuk mengubah konten sendiri. Kami memasukkan isi awal dari bahan Anda. Pembaruan berikutnya bisa dibayar per permintaan atau melalui Care dan Care Plus. Dashboard dan sistem pesanan dibahas dalam paket Custom." },
  { question: "Bagaimana proses dan pembayarannya?", answer: "Pengerjaan dimulai setelah DP 50% dan bahan lengkap: logo, foto, menu, harga, serta informasi usaha. Estimasi waktu dihitung sejak bahan lengkap. Satu putaran revisi adalah satu daftar perubahan yang dikumpulkan sekaligus. Pelunasan dilakukan sebelum website tayang. Perubahan besar setelah desain disetujui dikenakan biaya tambahan. Kunjungan langsung tidak termasuk Essential." },
  { question: "Apakah Signature berarti desain dari nol?", answer: "Signature memakai komponen dan struktur Tampiloka yang sudah tersedia. Pilihan penempatan foto, warna, tipografi, dan susunan halamannya lebih luas. Desain dari nol atau sistem di luar paket dibahas melalui penawaran Custom." },
  { question: "Siapa pemilik domain dan bagaimana perpanjangannya?", answer: "Domain didaftarkan atas nama usaha Anda dan bisa dipindahkan jika berhenti memakai Tampiloka. Tagihan dikirim sebelum masa aktif berakhir. Tidak ada debit otomatis tanpa persetujuan Anda. Harga domain mencakup pendaftaran atau perpanjangan dan pengelolaan DNS; domain premium tidak termasuk. Kode dasar dan template tetap milik Tampiloka. Hak penggunaan website dan ketentuan ekspor dijelaskan dalam perjanjian." },
  { question: "Apa yang termasuk satu perubahan kecil?", answer: "Satu permintaan mencakup maksimal 5 item menu (harga, teks, atau foto), satu banner dengan bahan siap pakai, atau satu perubahan teks pada bagian yang sudah ada. Kuota Care tidak dibawa ke bulan berikutnya. Halaman baru, perubahan besar tata letak, fitur baru, penulisan dari nol, dan pemotretan tidak termasuk. Target waktu dihitung setelah bahan lengkap." },
  { question: "Apa bedanya keranjang WhatsApp dengan sistem Custom?", answer: "Keranjang WhatsApp menyusun daftar pesanan untuk dikirim ke nomor kafe. Fitur ini tidak mencatat pesanan otomatis, menampilkan status, atau menerima pembayaran. QR per meja, dashboard, kasir, pembayaran digital, stok, dan laporan masuk penawaran Custom. Biaya operasional dan biaya layanan pembayaran dihitung terpisah." },
  { question: "Bagaimana jika ada gangguan setelah website tayang?", answer: "Kesalahan teknis awal diperbaiki tanpa biaya selama 30 hari. Setelah itu, hosting aktif mencakup SSL, pengawasan dasar, cadangan berkas, dan perbaikan gangguan dari sistem Tampiloka. Layanan teknis ini tetap berlaku tanpa Care." },
];
