export type TemplateFamily = "commerce" | "cafe";
export type CommerceLevel = "catalog" | "whatsapp" | "store" | "advanced";
// shortcut: this catalog mirrors tampiloka-templates locally; refresh it when presets or demo URLs change.
export type Template = { id: string; name: { id: string; en: string }; description: { id: string; en: string } } & ({ family: "commerce" } | { family: "cafe"; url: string });

export const templates: Template[] = [
  { id: "editorial", family: "commerce", name: { id: "Editorial", en: "Editorial" }, description: { id: "Foto produk berukuran besar dengan susunan koleksi yang lapang.", en: "Large photos and an open collection layout." } },
  { id: "market", family: "commerce", name: { id: "Market", en: "Market" }, description: { id: "Kategori dan banyak produk dalam satu halaman.", en: "Persistent categories and a dense catalog." } },
  { id: "atelier", family: "commerce", name: { id: "Atelier", en: "Atelier" }, description: { id: "Koleksi pilihan dengan foto produk dalam ukuran beragam.", en: "A curated collection with varied image layouts." } },
  { id: "compact", family: "commerce", name: { id: "Compact", en: "Compact" }, description: { id: "Daftar produk ringkas untuk memudahkan pencarian.", en: "Compact rows for quick shopping." } },
  { id: "catalog", family: "cafe", name: { id: "Menu digital", en: "Menu + waiter request" }, description: { id: "Pengunjung melihat menu dan menyusun daftar pesanan. Pembayaran dilakukan langsung.", en: "Menu, guest order list, and offline payment." }, url: "https://cafe-catalog.tampiloka.site" },
  { id: "order-at-cashier", family: "cafe", name: { id: "Pesan, bayar di kasir", en: "Order, pay at cashier" }, description: { id: "Pengunjung memesan sendiri, lalu membayar di kasir.", en: "Self-service orders received by staff." }, url: "https://cafe-order.tampiloka.site" },
  { id: "order-and-pay", family: "cafe", name: { id: "Pesan dan bayar", en: "Order and pay" }, description: { id: "Menu, pesanan, dan simulasi pembayaran online.", en: "Menu, orders, and simulated online payment." }, url: "https://cafe-pay.tampiloka.site" },
  { id: "cashier", family: "cafe", name: { id: "Kasir", en: "Cashier" }, description: { id: "Pencatatan pesanan, diskon, pembayaran tunai, dan pergantian sif.", en: "Walk-in orders, discounts, cash, and shifts." }, url: "https://cafe-pos.tampiloka.site" },
  { id: "cashier-kitchen", family: "cafe", name: { id: "Kasir dan dapur", en: "Cashier + kitchen" }, description: { id: "Kasir dan antrean persiapan dapur.", en: "Cashier and kitchen preparation queue." }, url: "https://cafe-kitchen.tampiloka.site" },
  { id: "operations", family: "cafe", name: { id: "Operasional kafe", en: "Operations" }, description: { id: "Kasir, dapur, dan laporan.", en: "Cashier, kitchen, and reports." }, url: "https://cafe-operations.tampiloka.site" },
  { id: "menu-cashier", family: "cafe", name: { id: "Menu dan kasir", en: "Menu + cashier" }, description: { id: "Pelanggan melihat menu, staf mencatat pesanan.", en: "Guests browse the menu; staff record orders." }, url: "https://cafe-menu-pos.tampiloka.site" },
  { id: "menu-order-cashier", family: "cafe", name: { id: "Menu, pesanan, dan kasir", en: "Menu + orders + cashier" }, description: { id: "Pesan dari meja dengan kendali tagihan di kasir.", en: "Table orders with cashier-controlled bills." }, url: "https://cafe-menu-order-pos.tampiloka.site" },
  { id: "full", family: "cafe", name: { id: "Layanan lengkap", en: "Full service" }, description: { id: "Pelanggan, kasir, dapur, meja, dan laporan.", en: "Guests, cashier, kitchen, tables, and reports." }, url: "https://cafe-full.tampiloka.site" },
];
export const levels: { id: CommerceLevel; name: { id: string; en: string }; description: { id: string; en: string } }[] = [
  { id: "catalog", name: { id: "Katalog", en: "Catalog" }, description: { id: "Produk dan detail. Pembeli bertanya lewat kontak toko.", en: "Products and details, with inquiries through the store contact." } },
  { id: "whatsapp", name: { id: "Keranjang + WhatsApp", en: "Cart + WhatsApp" }, description: { id: "Pembeli menyusun keranjang dan mengirim daftar lewat WhatsApp.", en: "Customers send their cart through WhatsApp." } },
  { id: "store", name: { id: "Toko", en: "Store" }, description: { id: "Checkout, transfer manual atau COD, stok, pesanan, dan pengiriman.", en: "Checkout, manual transfer or cash on delivery, inventory, orders, and delivery." } },
  { id: "advanced", name: { id: "Toko lengkap", en: "Full store" }, description: { id: "Pembayaran online, kupon, retur, dan ulasan pembeli.", en: "Adds payment gateway, coupons, returns, and customer reviews." } },
];
export function demoUrl(template: Template, level: CommerceLevel): string {
  return template.family === "commerce" ? `https://ecommerce.tampiloka.site/?preset=${template.id}&level=${level}` : template.url;
}
export function filterTemplates(family: TemplateFamily | "all", search: string, locale: "id" | "en"): Template[] {
  const query = search.trim().toLocaleLowerCase();
  return templates.filter(item => (family === "all" || item.family === family) && `${item.id} ${item.name[locale]} ${item.description[locale]}`.toLocaleLowerCase().includes(query));
}
