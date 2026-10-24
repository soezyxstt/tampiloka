import type { Locale } from "@/i18n/routing";
import type { Project } from "@/lib/projects";

type IndustryKey = "food" | "fashion" | "portfolio" | "small-business" | "technology" | "enterprise" | "wedding";
type IndustryContent = {
  name: string;
  description: string;
  uses: readonly string[];
  ctaLabel?: string;
};
type LocalizedShowcaseContent = {
  projectDescriptions: Record<Project["id"], string>;
  industries: Record<IndustryKey, IndustryContent>;
  [key: string]: unknown;
};

export const showcaseCopy = {
  id: {
    projectPageTitle: "Contoh Website dan Undangan Digital",
    projectPageDescription:
      "Lihat website, katalog, platform belajar, dan undangan digital dalam pilihan karya Tampiloka. Konsep demo ditandai terpisah dari proyek klien.",
    projectImageAlt: "Contoh katalog produk pada layar laptop dan ponsel.",
    projectListTitle: "Karya Tampiloka",
    projectHeading: "Website & undangan digital.",
    featuredHeading: "Karya pilihan.",
    filterLabel: "Saring karya",
    filters: {
      all: "Semua",
      food: "Kuliner",
      portfolio: "Portofolio",
      catalog: "Katalog",
      education: "Edukasi",
      organization: "Organisasi",
      invitation: "Undangan digital",
    },
    categories: {
      Kuliner: "Kuliner",
      Portofolio: "Portofolio",
      Katalog: "Katalog",
      Edukasi: "Edukasi",
      Organisasi: "Organisasi",
      "Undangan digital": "Undangan digital",
    },
    projectDescriptions: {
      "pagi-roti": "Konsep kedai roti dan kopi di Yogyakarta.",
      "syahril-mc": "Website MC pernikahan dengan portofolio dan pilihan paket.",
      "zyx-academy": "Platform belajar untuk mahasiswa tahun pertama dan kedua ITB.",
      "tepi-sagara": "Konsep restoran pesisir di Labuan Bajo.",
      "sela-rasa": "Konsep restoran dan ruang berkumpul di Malang.",
      "rona-forma": "Konsep katalog sepatu, tas, dan aksesori.",
      ginalist: "Portofolio model Gina Listya Nuraini.",
      "iam-itb": "Website Ikatan Alumni Mahasiswa Teknik Mesin ITB.",
      pamoka: "Situs resmi Paguyuban Mojang Jajaka.",
      "temura-nara-aruna": "Konsep undangan pernikahan digital dari Temura.",
    } satisfies Record<Project["id"], string>,
    conceptDisclosure:
      "Pagi & Roti, Tepi Sagara, Sela Rasa, Rona Forma, dan Nara & Aruna adalah konsep demo, bukan proyek klien.",
    pausePreview: "Jeda pratinjau",
    resumePreview: "Lanjutkan pratinjau",
    pause: "Jeda",
    play: "Putar",
    previewSite: (name: string) => `Pratinjau website ${name}`,
    viewPreview: (name: string) => `Lihat pratinjau ${name}`,
    openSite: (name: string) => `Buka situs ${name} di tab baru`,
    closeOrDrag: "Tutup pratinjau atau tarik ke bawah",
    closePreview: "Tutup pratinjau",
    site: (name: string) => `Situs ${name}`,
    industriesTitle: "Website untuk Berbagai Bidang Usaha",
    industriesDescription:
      "Contoh kebutuhan website untuk kuliner, fashion, portofolio, UMKM, teknologi, layanan bisnis, dan undangan pernikahan.",
    industriesImageAlt: "Koleksi benda dan material yang mewakili beragam bidang usaha.",
    industriesListTitle: "Industri yang dilayani Tampiloka",
    industriesHeading: "Website untuk bidang usaha Anda.",
    industriesIntro: "Lihat contoh kebutuhan dan tampilan website untuk setiap bidang.",
    industryDisclosure: "Contoh tampilan untuk ilustrasi, bukan proyek klien.",
    discussNeeds: "Diskusikan kebutuhan",
    industries: {
      food: {
        name: "Kuliner",
        description: "Website untuk menampilkan menu, lokasi, jam buka, serta cara reservasi atau memesan.",
        uses: ["Restoran & kafe", "Menu digital", "Reservasi", "Pemesanan"],
      },
      fashion: {
        name: "Fashion",
        description: "Katalog koleksi, foto produk, dan informasi pembelian untuk label fashion.",
        uses: ["Label fashion", "Toko online", "Lookbook", "Koleksi musiman"],
      },
      portfolio: {
        name: "Portofolio",
        description: "Tampilkan karya, profil profesional, dan kontak dalam satu website.",
        uses: ["Arsitektur", "Fotografi", "Desain", "Profesional independen"],
      },
      "small-business": {
        name: "UMKM",
        description: "Katalog produk dan informasi usaha dengan tautan pemesanan langsung.",
        uses: ["Katalog produk", "Usaha lokal", "Produk kerajinan", "Pemesanan langsung"],
      },
      technology: {
        name: "Elektronik & teknologi",
        description: "Sajikan spesifikasi, foto produk, dan informasi pembelian.",
        uses: ["Elektronik", "Gadget", "Peluncuran produk", "Katalog teknologi"],
      },
      enterprise: {
        name: "Layanan bisnis",
        description: "Jelaskan layanan, profil perusahaan, dan cara menghubungi tim Anda.",
        uses: ["Profil perusahaan", "Layanan bisnis", "Platform digital", "Produk SaaS"],
      },
      wedding: {
        name: "Undangan pernikahan",
        description: "Undangan Temura dengan tautan nama tamu, jadwal, lokasi, dan konfirmasi kehadiran.",
        uses: ["Tautan nama tamu", "Jadwal & lokasi", "Konfirmasi kehadiran (RSVP)", "Buku tamu digital"],
        ctaLabel: "Lihat undangan di Temura",
      },
    },
    preview: {
      menu: "Menu", brew: "Seduh", cafe: "Kedai", coffeeBreakfast: "Kopi &\nsarapan.",
      localBread: "Roti sourdough dan kopi seduh lokal.", viewMenu: "Lihat menu", menuLabel: "MENU",
      collection: "Koleksi", lookbook: "Lookbook", store: "Toko", linenCollection: "Koleksi\nlinen.",
      linenDescription: "Serat linen alami untuk sehari-hari.", viewCollection: "Lihat koleksi", linenSeries: "LINEN SERIES", models: "12 MODEL",
      work: "Karya", approach: "Pendekatan", contact: "Kontak", architectureWork: "Karya\narsitektur.",
      homeDago: "Rumah Lereng Dago", dago: "Dago, 540 m²", catalog: "Katalog", process: "Proses",
      tableCeramics: "Keramik\nmeja.", handmadeCeramics: "Keramik buatan tangan untuk rumah.", viewCatalog: "Lihat katalog",
      products: "PRODUK", productNames: "Cangkir Seduh · Mangkuk Saji · Teko Saring", specs: "Spesifikasi",
      wirelessAudio: "Audio.\nTanpa kabel.", audioSpecs: "Driver khusus 40 mm dan peredam bising aktif.", viewProduct: "Lihat produk",
      startingPrice: "Mulai Rp1,8 juta", drivers: "DRIVER 40MM", noiseReduction: "PEREDAM BISING", battery: "36 JAM BATERAI",
      solutions: "Solusi", compliance: "Kepatuhan", demo: "Demo", manageTeam: "Kelola tim.\nPantau proyek.",
      procurement: "Pengadaan dan persetujuan anggaran terpadu.", operations: "PIPELINE OPERASIONAL", active: "● AKTIF",
      procurementFlow: "Alur pengadaan", budget: "Anggaran", approved: "Disetujui", inventory: "Inventaris", done: "Selesai",
      invoice: "Faktur", processing: "Diproses", event: "Acara", location: "Lokasi", rsvp: "RSVP",
      weddingDate: "Sabtu, 14 November 2026 · Jakarta.", confirmAttendance: "Konfirmasi kehadiran",
      ceremony: "AKAD 08.30 · RESEPSI 19.00", confirmation: "KONFIRMASI",
    },
  },
  en: {
    projectPageTitle: "Website and Digital Invitation Examples",
    projectPageDescription:
      "Explore selected Tampiloka websites, catalogs, learning platforms, and digital invitations. Concept demos are identified separately from client projects.",
    projectImageAlt: "A product catalog displayed on a laptop and phone.",
    projectListTitle: "Selected Tampiloka work",
    projectHeading: "Websites & digital invitations.",
    featuredHeading: "Selected work.",
    filterLabel: "Filter work",
    filters: {
      all: "All",
      food: "Food & drink",
      portfolio: "Portfolio",
      catalog: "Catalog",
      education: "Education",
      organization: "Organizations",
      invitation: "Digital invitations",
    },
    categories: {
      Kuliner: "Food & drink",
      Portofolio: "Portfolio",
      Katalog: "Catalog",
      Edukasi: "Education",
      Organisasi: "Organizations",
      "Undangan digital": "Digital invitation",
    },
    projectDescriptions: {
      "pagi-roti": "A bakery and coffee shop concept in Yogyakarta.",
      "syahril-mc": "A wedding MC website with a portfolio and package options.",
      "zyx-academy": "A learning platform for first- and second-year ITB students.",
      "tepi-sagara": "A coastal restaurant concept in Labuan Bajo.",
      "sela-rasa": "A restaurant and gathering space concept in Malang.",
      "rona-forma": "A concept catalog for shoes, bags, and accessories.",
      ginalist: "A portfolio for model Gina Listya Nuraini.",
      "iam-itb": "The website of the ITB Mechanical Engineering Alumni Association.",
      pamoka: "The official site of Paguyuban Mojang Jajaka.",
      "temura-nara-aruna": "A concept digital wedding invitation from Temura.",
    } satisfies Record<Project["id"], string>,
    conceptDisclosure:
      "Pagi & Roti, Tepi Sagara, Sela Rasa, Rona Forma, and Nara & Aruna are concept demos, not client projects.",
    pausePreview: "Pause previews",
    resumePreview: "Resume previews",
    pause: "Pause",
    play: "Play",
    previewSite: (name: string) => `${name} website preview`,
    viewPreview: (name: string) => `View ${name} preview`,
    openSite: (name: string) => `Open ${name} website in a new tab`,
    closeOrDrag: "Close preview or drag down",
    closePreview: "Close preview",
    site: (name: string) => `${name} website`,
    industriesTitle: "Websites for Different Industries",
    industriesDescription:
      "Website examples for food and drink, fashion, portfolios, small businesses, technology, business services, and wedding invitations.",
    industriesImageAlt: "Objects and materials representing different industries.",
    industriesListTitle: "Industries served by Tampiloka",
    industriesHeading: "Websites for your industry.",
    industriesIntro: "Explore example website needs and designs for each industry.",
    industryDisclosure: "These illustrative designs are concepts, not client projects.",
    discussNeeds: "Discuss your needs",
    industries: {
      food: {
        name: "Food & drink",
        description: "A website to show your menu, location, opening hours, and how to book or order.",
        uses: ["Restaurants & cafés", "Digital menus", "Reservations", "Ordering"],
      },
      fashion: {
        name: "Fashion",
        description: "A collection catalog, product photography, and purchasing information for fashion labels.",
        uses: ["Fashion labels", "Online stores", "Lookbooks", "Seasonal collections"],
      },
      portfolio: {
        name: "Portfolio",
        description: "Showcase your work, professional profile, and contact details on one website.",
        uses: ["Architecture", "Photography", "Design", "Independent professionals"],
      },
      "small-business": {
        name: "Small businesses",
        description: "A product catalog and business information with a direct ordering link.",
        uses: ["Product catalogs", "Local businesses", "Handmade goods", "Direct orders"],
      },
      technology: {
        name: "Electronics & technology",
        description: "Present product specifications, photos, and purchasing information.",
        uses: ["Electronics", "Gadgets", "Product launches", "Technology catalogs"],
      },
      enterprise: {
        name: "Business services",
        description: "Explain your services and company, and show customers how to contact your team.",
        uses: ["Company profiles", "Business services", "Digital platforms", "SaaS products"],
      },
      wedding: {
        name: "Wedding invitations",
        description: "Temura invitations with guest-name links, schedules, locations, and attendance confirmations.",
        uses: ["Guest-name links", "Schedule & location", "Attendance confirmation (RSVP)", "Digital guestbooks"],
        ctaLabel: "View invitations on Temura",
      },
    },
    preview: {
      menu: "Menu", brew: "Coffee", cafe: "Our café", coffeeBreakfast: "Coffee &\nbreakfast.",
      localBread: "Sourdough bread and locally brewed coffee.", viewMenu: "View menu", menuLabel: "MENU",
      collection: "Collection", lookbook: "Lookbook", store: "Shop", linenCollection: "Linen\ncollection.",
      linenDescription: "Natural linen for everyday wear.", viewCollection: "View collection", linenSeries: "LINEN SERIES", models: "12 STYLES",
      work: "Work", approach: "Approach", contact: "Contact", architectureWork: "Architecture\nportfolio.",
      homeDago: "Dago Hillside House", dago: "Dago, 540 m²", catalog: "Catalog", process: "Process",
      tableCeramics: "Table\nceramics.", handmadeCeramics: "Handmade ceramics for the home.", viewCatalog: "View catalog",
      products: "PRODUCTS", productNames: "Pour-over cup · Serving bowl · Filter pot", specs: "Specifications",
      wirelessAudio: "Audio.\nWireless.", audioSpecs: "Custom 40 mm drivers and active noise cancellation.", viewProduct: "View product",
      startingPrice: "From Rp1.8 million", drivers: "40MM DRIVERS", noiseReduction: "NOISE CANCELLATION", battery: "36-HOUR BATTERY",
      solutions: "Solutions", compliance: "Compliance", demo: "Demo", manageTeam: "Manage teams.\nTrack projects.",
      procurement: "Integrated procurement and budget approvals.", operations: "OPERATIONS PIPELINE", active: "● ACTIVE",
      procurementFlow: "Procurement workflow", budget: "Budget", approved: "Approved", inventory: "Inventory", done: "Done",
      invoice: "Invoice", processing: "In progress", event: "Event", location: "Location", rsvp: "RSVP",
      weddingDate: "Saturday, November 14, 2026 · Jakarta.", confirmAttendance: "Confirm attendance",
      ceremony: "CEREMONY 08:30 · RECEPTION 19:00", confirmation: "CONFIRM",
    },
  },
} satisfies Record<Locale, LocalizedShowcaseContent>;

export type ShowcaseCopy = (typeof showcaseCopy)[Locale];
