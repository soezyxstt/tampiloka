import type { Locale } from "@/i18n/routing";
import { families } from "@/lib/service-pricing.mjs";

const plan = (family: string, index: number, locale: Locale) => families.find(item => item.id === family)!.plans[index][locale === "en" ? 1 : 0];

export const serviceFields = {
  id: [
    {
      id: "kafe-restoran",
      name: "Kafe dan restoran",
      family: "cafe",
      description: "Menu digital, pemesanan meja, hingga alur kasir dan dapur yang terhubung.",
      features: [
        `Pencatatan pesanan staf dan tampilan dapur, dengan opsi QR meja pada ${plan("cafe", 1, "id")} ke atas.`,
        `Rekap pembayaran dan laporan penjualan mulai ${plan("cafe", 2, "id")}; website usaha dan pembayaran online di ${plan("cafe", 3, "id")}.`,
      ],
      scope: "Reservasi atau stok bahan berbasis resep dapat dibahas sebagai lingkup tambahan.",
      input: "Daftar menu, jumlah outlet, dan alur pencatatan pesanan saat ini.",
    },
    {
      id: "toko-online",
      name: "Toko online",
      family: "commerce",
      description: "Katalog produk yang rapi dengan alur pemesanan sesuai cara Anda berjualan.",
      features: [
        `Pencarian produk dan harga jelas; kirim pesanan lewat WhatsApp mulai ${plan("commerce", 1, "id")}.`,
        `Kelola pesanan dan stok di ${plan("commerce", 2, "id")}; pembayaran online, kupon, dan ulasan di ${plan("commerce", 3, "id")}.`,
      ],
      scope: "Pilih katalog, pesanan lewat pesan, atau pengelolaan toko penuh.",
      input: "Jumlah produk dan varian, foto, harga, serta metode pembayaran dan pengiriman.",
    },
    {
      id: "sekolah",
      name: "Sekolah dan pusat belajar",
      family: "school",
      description: "Informasi program yang jelas dan alur pendaftaran siswa yang tertata.",
      features: [
        `Tampilkan program, pengajar, jadwal, dan biaya; pertanyaan via WhatsApp pada ${plan("school", 1, "id")}.`,
        `Pendaftaran online dan daftar tunggu di ${plan("school", 2, "id")}; tagihan, materi, dan kehadiran di ${plan("school", 3, "id")}.`,
      ],
      scope: "Sesuaikan paket dengan tahapan siswa dan kebutuhan administrasi staf.",
      input: "Daftar program, jadwal, jumlah siswa aktif, dan proses pendaftaran saat ini.",
    },
    {
      id: "booking",
      name: "Layanan dan reservasi",
      family: "booking",
      description: "Daftar layanan transparan agar pelanggan mudah menanyakan atau memilih jadwal.",
      features: [
        `${plan("booking", 0, "id")} menampilkan harga, staf, dan jam buka; permintaan lewat WhatsApp di ${plan("booking", 1, "id")}.`,
        `Slot waktu tersedia dan kelola janji di ${plan("booking", 2, "id")}; pembayaran online dan tiket QR di ${plan("booking", 3, "id")}.`,
      ],
      scope: "Permintaan lewat WhatsApp tidak otomatis mengunci slot jadwal.",
      input: "Daftar layanan, durasi, jam kerja, dan cara pengaturan ulang jadwal.",
    },
    {
      id: "umkm",
      name: "UMKM",
      family: "",
      description: "Website profil usaha yang ringkas agar pelanggan cepat memahami penawaran dan menghubungi Anda.",
      features: [
        "Profil usaha, layanan utama, dan kontak dalam satu website rapi—bisa dibantu update atau kelola sendiri.",
        "Butuh katalog produk dan alur pesanan? Tersedia pilihan paket toko online terpisah.",
      ],
      scope: "Materi disediakan klien; domain terpisah.",
      input: "Profil usaha, tujuan website, serta foto dan teks yang tersedia.",
    },
    {
      id: "portofolio",
      name: "Portofolio dan profil profesional",
      family: "",
      description: "Tampilkan karya pilihan, layanan, dan jalur kontak yang jelas untuk calon klien.",
      features: [
        "Susun profil, studi kasus, dan galeri karya dalam struktur halaman yang fokus.",
        "Pilih pembaruan konten dibantu Tampiloka atau dikelola mandiri.",
      ],
      scope: "Materi disediakan klien; lingkup tambahan dapat dibahas.",
      input: "Profil singkat, pilihan karya beserta keterangannya, dan kontak utama.",
    },
    {
      id: "multioutlet",
      name: "Operasional multioutlet",
      family: "",
      description: "Sistem terkoordinasi untuk usaha dengan lebih dari satu lokasi dan peran staf.",
      features: [
        "Diskusikan alur pesanan, pembayaran, stok, dan laporan lintas cabang.",
        "Tinjau integrasi dengan sistem yang sudah digunakan di tiap lokasi.",
      ],
      scope: "Dibahas sebagai proyek konsultasi sesuai kesiapan dan alur tiap cabang.",
      input: "Jumlah lokasi, alur tiap outlet, peran staf, dan sistem eksisting.",
    },
    {
      id: "lainnya",
      name: "Lainnya",
      family: "",
      description: "Kebutuhan website khusus, integrasi sistem, atau proyek di luar kategori yang ada.",
      features: [
        "Website informasi, katalog khusus, aplikasi web, hingga integrasi sistem internal.",
        "Identitas visual dan undangan digital juga dapat masuk dalam lingkup diskusi.",
      ],
      scope: "Kami bantu memetakan kelayakan, lingkup, dan tahapan pengerjaan.",
      input: "Tujuan proyek, pengguna utama, dan materi atau sistem yang sudah ada.",
    },
  ],
  en: [
    {
      id: "kafe-restoran",
      name: "Cafes and restaurants",
      family: "cafe",
      description: "Digital menus, table ordering, and connected cashier-to-kitchen workflows.",
      features: [
        `Staff order entry and kitchen display, with table QR ordering from ${plan("cafe", 1, "en")} upward.`,
        `Payment tracking and sales reports from ${plan("cafe", 2, "en")}; business website and online payments in ${plan("cafe", 3, "en")}.`,
      ],
      scope: "Reservations or recipe-based ingredient inventory can be scoped separately.",
      input: "Your menu, outlet count, and how staff currently take orders.",
    },
    {
      id: "toko-online",
      name: "Online stores",
      family: "commerce",
      description: "Clear product catalogs with an ordering flow matched to how you sell.",
      features: [
        `Searchable products and pricing; WhatsApp ordering starts in ${plan("commerce", 1, "en")}.`,
        `Order and stock management in ${plan("commerce", 2, "en")}; online payments, coupons, and reviews in ${plan("commerce", 3, "en")}.`,
      ],
      scope: "Choose a catalog, messaging-based orders, or full store management.",
      input: "Product and variant counts, photos, pricing, and payment/shipping methods.",
    },
    {
      id: "sekolah",
      name: "Schools and learning centres",
      family: "school",
      description: "Clear programme information and a structured path for prospective students to enrol.",
      features: [
        `Show programmes, teachers, schedules, and fees; WhatsApp inquiries in ${plan("school", 1, "en")}.`,
        `Online applications and waitlists in ${plan("school", 2, "en")}; billing, materials, and attendance in ${plan("school", 3, "en")}.`,
      ],
      scope: "Match the package to the student journey and staff workflow.",
      input: "Programmes, schedules, active student counts, and current enrollment process.",
    },
    {
      id: "booking",
      name: "Services and bookings",
      family: "booking",
      description: "Transparent service listings that make it easy to inquire or book a time.",
      features: [
        `${plan("booking", 0, "en")} lists prices, staff, and hours; WhatsApp requests in ${plan("booking", 1, "en")}.`,
        `Available time slots and appointment management in ${plan("booking", 2, "en")}; online payments and QR tickets in ${plan("booking", 3, "en")}.`,
      ],
      scope: "WhatsApp requests do not automatically lock a time slot.",
      input: "Services, durations, working hours, and how rescheduling is handled.",
    },
    {
      id: "umkm",
      name: "Small businesses",
      family: "",
      description: "A focused business website so customers quickly understand your offer and reach you.",
      features: [
        "Business profile, key services, and contact details—updated by Tampiloka or managed yourself.",
        "Need product search and ordering? Dedicated online store packages are available.",
      ],
      scope: "Content is supplied by the client; domain is separate.",
      input: "Business overview, website goals, and existing photos or copy.",
    },
    {
      id: "portofolio",
      name: "Portfolios and professional profiles",
      family: "",
      description: "Present selected work, services, and a clear way for prospective clients to connect.",
      features: [
        "Organise your profile, case studies, and work gallery in a clean page structure.",
        "Choose content updates by Tampiloka or self-managed editing.",
      ],
      scope: "Content is supplied by the client; additional scope can be discussed.",
      input: "Profile summary, selected work with captions, and preferred contact method.",
    },
    {
      id: "multioutlet",
      name: "Multi-outlet operations",
      family: "",
      description: "Coordinated workflows for businesses operating across multiple locations and roles.",
      features: [
        "Scope order recording, payments, stock, and cross-outlet reporting.",
        "Review integration feasibility with systems already running at each location.",
      ],
      scope: "Scoped as a consultation project rather than an off-the-shelf package.",
      input: "Location count, per-outlet workflow, staff roles, and existing systems.",
    },
    {
      id: "lainnya",
      name: "Other needs",
      family: "",
      description: "Custom websites, web applications, or integrations outside standard categories.",
      features: [
        "Information sites, custom catalogs, web apps, and internal system integrations.",
        "Visual identity and digital invitations can also be included in the scope.",
      ],
      scope: "We map feasibility, scope, and clear next steps together.",
      input: "Project goals, primary users, and any existing content or systems.",
    },
  ],
} as const;

export function fieldLinks(locale: Locale) {
  return serviceFields[locale].map(({ id, name }) => ({ label: name, href: `/layanan#${id}` }));
}
