import type { Locale } from "@/i18n/routing";

export type PrimaryPageCopy = {
  metadata: {
    home: { title: string; description: string };
    services: { title: string; description: string };
    about: { title: string; description: string };
    contact: { title: string; description: string };
  };
  home: {
    title: string;
    titleEmphasis: string;
    description: string;
    contactCta: string;
    workLink: string;
    imageAlt: string;
  };
  services: {
    title: string;
    description: string;
    contactCta: string;
    endCta: string;
    ariaLabel: string;
    packageCta: string;
    temuraCta: string;
    imageAlt: string;
    items: readonly {
      title: string;
      description: string;
      items: readonly string[];
      imageKey: "service-website" | "service-digital-product" | "service-development" | "service-branding" | "service-digital-invitation";
      imageAlt: string;
      href?: "temura";
    }[];
  };
  about: {
    title: string;
    description: string;
    processCta: string;
    principlesTitle: string;
    principlesDescription: string;
    principles: readonly string[];
    processLabel: string;
    processTitle: string;
    processDescription: string;
    endCta: string;
    imageAlt: string;
    processImageAlt: string;
  };
  contact: {
    title: string;
    description: string;
    cta: string;
    imageAlt: string;
  };
  studio: {
    servicesTitle: string;
    servicesLink: string;
    services: readonly { title: string; description: string; href?: string }[];
    temuraCta: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutLink: string;
    aboutImageAlt: string;
    aboutCaption: string;
    processTitle: string;
    steps: readonly { title: string; description: string }[];
    industriesTitle: string;
    industriesDescription: string;
    industriesLink: string;
    industriesImageAlt: string;
  };
};

export const PRIMARY_COPY: Record<Locale, PrimaryPageCopy> = {
  id: {
    metadata: {
      home: { title: "Desain dan Pembuatan Website untuk Bisnis", description: "Tampiloka merancang dan membangun website, aplikasi web, serta identitas visual untuk bisnis. Undangan pernikahan digital tersedia melalui Temura." },
      services: { title: "Layanan Desain dan Pengembangan Web", description: "Desain website, aplikasi web, identitas visual, dan undangan digital. Lihat cakupan layanan Tampiloka dan diskusikan kebutuhan bisnis Anda." },
      about: { title: "Tentang Tampiloka", description: "Tampiloka adalah studio web independen untuk desain website, pengembangan web, dan identitas visual bisnis." },
      contact: { title: "Kontak", description: "Bahas kebutuhan website, aplikasi web, atau identitas visual bisnis Anda dengan Tampiloka melalui WhatsApp atau email." },
    },
    home: {
      title: "Website untuk",
      titleEmphasis: "bisnis Anda.",
      description: "Kami merancang dan membangun website, aplikasi web, serta identitas visual. Undangan pernikahan tersedia melalui Temura.",
      contactCta: "Diskusikan kebutuhan",
      workLink: "Lihat karya",
      imageAlt: "Rancangan website dengan antarmuka hijau di layar laptop dan contoh palet warna.",
    },
    services: {
      title: "Layanan Tampiloka.",
      description: "Website, aplikasi web, identitas visual, dan undangan digital.",
      contactCta: "Diskusikan kebutuhan",
      endCta: "Diskusikan kebutuhan",
      ariaLabel: "Layanan Tampiloka",
      packageCta: "Lihat paket website kafe",
      temuraCta: "Lihat undangan di Temura",
      imageAlt: "Rancangan website dengan antarmuka hijau di layar laptop.",
      items: [
        { title: "Website", description: "Website untuk menampilkan profil usaha, produk, dan cara menghubungi bisnis Anda.", items: ["Profil perusahaan", "Toko online", "Landing page"], imageKey: "service-website", imageAlt: "Contoh katalog produk pada layar laptop dan ponsel." },
        { title: "Produk digital", description: "Rancangan aplikasi web, dashboard, dan portal untuk pelanggan atau tim.", items: ["Riset kebutuhan", "Desain antarmuka", "Prototipe"], imageKey: "service-digital-product", imageAlt: "Tampilan jadwal dan data pada tablet dan ponsel." },
        { title: "Pengembangan", description: "Pembuatan aplikasi web, integrasi sistem, dan perawatan teknis sesuai lingkup proyek.", items: ["Pengembangan antarmuka", "Integrasi sistem", "Perawatan teknis"], imageKey: "service-development", imageAlt: "Pengembang mengetik kode di keyboard dengan monitor di hadapannya." },
        { title: "Identitas visual", description: "Logo, warna, tipografi, dan panduan agar identitas usaha konsisten.", items: ["Logo", "Warna & tipografi", "Panduan penggunaan"], imageKey: "service-branding", imageAlt: "Contoh identitas visual berupa kemasan, kartu, dan amplop berwarna hijau." },
        { title: "Undangan digital", description: "Undangan pernikahan dari Temura dengan jadwal, lokasi, dan konfirmasi kehadiran.", items: ["Desain undangan", "Jadwal & lokasi", "Konfirmasi kehadiran"], imageKey: "service-digital-invitation", imageAlt: "Pasangan pengantin berbusana Jawa di taman pernikahan.", href: "temura" },
      ],
    },
    about: {
      title: "Tentang Tampiloka.",
      description: "Tampiloka adalah studio web independen untuk desain website, pengembangan web, dan identitas visual bisnis.",
      processCta: "Lihat cara kerja",
      principlesTitle: "Yang kami utamakan.",
      principlesDescription: "Tujuan website, isi halaman, dan cara pengunjung menggunakannya menjadi dasar rancangan.",
      principles: ["Kebutuhan bisnis sebagai titik awal", "Informasi yang mudah ditemukan", "Tampilan untuk ponsel dan komputer", "Lingkup dan tahapan yang disepakati"],
      processLabel: "Cara kerja Tampiloka",
      processTitle: "Dari rancangan hingga tayang.",
      processDescription: "Kami menyusun struktur halaman, merancang tampilan, lalu membangun dan menguji website di ponsel serta komputer.",
      endCta: "Diskusikan kebutuhan",
      imageAlt: "Sketsa antarmuka pada papan inspirasi di ruang kerja.",
      processImageAlt: "Tangan menata sketsa antarmuka website dan ponsel di atas meja.",
    },
    contact: {
      title: "Bicarakan proyek Anda.",
      description: "Sampaikan jenis usaha, kebutuhan, dan waktu pengerjaan yang Anda harapkan.",
      cta: "Hubungi lewat WhatsApp",
      imageAlt: "Pasangan pengantin berbusana Jawa di taman sebagai contoh undangan digital.",
    },
    studio: {
      servicesTitle: "Layanan.", servicesLink: "Lihat layanan",
      services: [
        { title: "Website", description: "Profil usaha, katalog produk, toko online, dan landing page." },
        { title: "Produk digital", description: "Rancangan aplikasi web, dashboard, dan portal untuk pelanggan atau tim." },
        { title: "Pengembangan", description: "Pembuatan aplikasi web, integrasi sistem, dan perawatan teknis." },
        { title: "Identitas visual", description: "Logo, warna, tipografi, dan panduan penggunaan." },
        { title: "Undangan digital", description: "Undangan pernikahan dengan jadwal, lokasi, dan konfirmasi kehadiran melalui Temura.", href: "temura" },
      ],
      temuraCta: "Lihat undangan di Temura",
      aboutTitle: "Tentang Tampiloka.", aboutDescription: "Anda berdiskusi langsung dengan kami, dari pembahasan kebutuhan sampai website tayang.", aboutLink: "Kenali Tampiloka",
      aboutImageAlt: "Meja kerja dengan laptop dan sketsa rancangan website.", aboutCaption: "Ilustrasi ruang kerja.",
      processTitle: "Cara kerja.", steps: [
        { title: "Diskusi", description: "Tentukan tujuan, kebutuhan, dan lingkup pekerjaan." },
        { title: "Rancangan", description: "Susun halaman, konten, dan tampilan." },
        { title: "Pembuatan", description: "Bangun website dan uji fungsi serta tampilannya." },
        { title: "Tayang", description: "Periksa hasil bersama sebelum website diluncurkan." },
      ],
      industriesTitle: "Untuk berbagai\nbidang usaha.", industriesDescription: "Dari kafe dan usaha lokal hingga layanan bisnis dan portofolio profesional.", industriesLink: "Lihat bidang usaha",
      industriesImageAlt: "Contoh produk perawatan diri, aksesori, dan tekstil pada latar terang.",
    },
  },
  en: {
    metadata: {
      home: { title: "Website Design and Development for Businesses", description: "Tampiloka designs and builds websites, web applications, and visual identities for businesses. Digital wedding invitations are available through Temura." },
      services: { title: "Web Design and Development Services", description: "Website design, web applications, visual identity, and digital invitations. Explore Tampiloka’s services and discuss your business needs with us." },
      about: { title: "About Tampiloka", description: "Tampiloka is an independent web studio for business website design, web development, and visual identity." },
      contact: { title: "Contact", description: "Discuss your website, web application, or business visual identity needs with Tampiloka via WhatsApp or email." },
    },
    home: {
      title: "Websites for",
      titleEmphasis: "your business.",
      description: "We design and build websites, web applications, and visual identities. Wedding invitations are available through Temura.",
      contactCta: "Discuss your project",
      workLink: "View our work",
      imageAlt: "A green website design on a laptop beside a sample color palette.",
    },
    services: {
      title: "Tampiloka services.",
      description: "Websites, web applications, visual identity, and digital invitations.",
      contactCta: "Discuss your project",
      endCta: "Discuss your project",
      ariaLabel: "Tampiloka services",
      packageCta: "See café website packages",
      temuraCta: "View invitations on Temura",
      imageAlt: "A green website design displayed on a laptop.",
      items: [
        { title: "Websites", description: "Websites that present your business, products, and contact details.", items: ["Company profiles", "Online stores", "Landing pages"], imageKey: "service-website", imageAlt: "A product catalog displayed on a laptop and phone." },
        { title: "Digital products", description: "Web application, dashboard, and portal design for customers or teams.", items: ["Requirements research", "Interface design", "Prototypes"], imageKey: "service-digital-product", imageAlt: "Schedules and data displayed on a tablet and phone." },
        { title: "Development", description: "Web application development, system integrations, and technical maintenance within the agreed project scope.", items: ["Front-end development", "System integrations", "Technical maintenance"], imageKey: "service-development", imageAlt: "A developer typing code at a keyboard with a monitor in front of them." },
        { title: "Visual identity", description: "Logos, colors, typography, and guidelines to keep your business identity consistent.", items: ["Logo", "Color & typography", "Usage guidelines"], imageKey: "service-branding", imageAlt: "A visual identity shown on green packaging, a card, and an envelope." },
        { title: "Digital invitations", description: "Wedding invitations from Temura with schedules, venue details, and RSVP.", items: ["Invitation design", "Schedule & venue", "RSVP"], imageKey: "service-digital-invitation", imageAlt: "A couple in Javanese wedding attire in a garden setting.", href: "temura" },
      ],
    },
    about: {
      title: "About Tampiloka.",
      description: "Tampiloka is an independent web studio for business website design, web development, and visual identity.",
      processCta: "See how we work",
      principlesTitle: "What guides our work.",
      principlesDescription: "A website’s purpose, content, and the way visitors use it shape our design decisions.",
      principles: ["Business needs come first", "Information is easy to find", "Layouts for phones and computers", "Agreed scope and project stages"],
      processLabel: "How Tampiloka works",
      processTitle: "From design to launch.",
      processDescription: "We plan the page structure, design the interface, then build and test the website on phones and computers.",
      endCta: "Discuss your project",
      imageAlt: "Interface sketches pinned to an inspiration board in a workspace.",
      processImageAlt: "Hands arranging website interface sketches and a phone on a desk.",
    },
    contact: {
      title: "Let’s talk about your project.",
      description: "Tell us about your business, what you need, and your preferred timeline.",
      cta: "Contact us on WhatsApp",
      imageAlt: "A couple in Javanese wedding attire in a garden, shown as an example of a digital invitation.",
    },
    studio: {
      servicesTitle: "Services.", servicesLink: "View services",
      services: [
        { title: "Websites", description: "Business profiles, product catalogs, online stores, and landing pages." },
        { title: "Digital products", description: "Web application, dashboard, and portal design for customers or teams." },
        { title: "Development", description: "Web application development, system integrations, and technical maintenance." },
        { title: "Visual identity", description: "Logos, colors, typography, and usage guidelines." },
        { title: "Digital invitations", description: "Wedding invitations with schedules, venue details, and RSVP through Temura.", href: "temura" },
      ],
      temuraCta: "View invitations on Temura",
      aboutTitle: "About Tampiloka.", aboutDescription: "You work directly with us, from discussing your needs through to your website launch.", aboutLink: "Meet Tampiloka",
      aboutImageAlt: "A desk with a laptop and website design sketches.", aboutCaption: "Illustration of a workspace.",
      processTitle: "Our process.", steps: [
        { title: "Discussion", description: "Set the project goals, needs, and scope." },
        { title: "Design", description: "Plan the pages, content, and visual direction." },
        { title: "Development", description: "Build the website and test its features and appearance." },
        { title: "Launch", description: "Review the result together before the website goes live." },
      ],
      industriesTitle: "For businesses\nin many fields.", industriesDescription: "From cafés and local businesses to business services and professional portfolios.", industriesLink: "Explore industries",
      industriesImageAlt: "Personal care products, accessories, and textiles arranged on a light background.",
    },
  },
};

export function getPrimaryCopy(locale: Locale): PrimaryPageCopy {
  return PRIMARY_COPY[locale];
}
