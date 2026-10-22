# SEO dan Google Search Console

Dua origin produksi:

| Situs | Origin | Sitemap | robots.txt |
| --- | --- | --- | --- |
| Tampiloka | https://tampiloka.site | https://tampiloka.site/sitemap.xml | https://tampiloka.site/robots.txt |
| Temura | https://temura.tampiloka.site | https://temura.tampiloka.site/sitemap.xml | https://temura.tampiloka.site/robots.txt |

## 1. Verifikasi Search Console

### Opsi A — URL-prefix property (paling cepat)

1. Buka [Google Search Console](https://search.google.com/search-console) lalu **Add property**.
2. Pilih **URL prefix** dan masukkan origin tanpa slash di akhir:
   - `https://tampiloka.site`
   - `https://temura.tampiloka.site`
3. Pilih metode **HTML tag**, salin hanya nilai `content` dari tag
   `<meta name="google-site-verification" content="..." />`.
4. Set environment variable di project Vercel yang sesuai, lalu redeploy:

   | Vercel project | Variable | Nilai |
   | --- | --- | --- |
   | `tampiloka` (root `apps/tampiloka`) | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | token dari Search Console |
   | `e-invitation` (root `apps/temura`) | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | token dari Search Console |

   Token berbeda untuk setiap property. Jangan memakai satu token untuk dua origin.
5. Klik **Verify**. Tag akan muncul di `<head>` semua halaman setelah deploy.

### Opsi B — Domain property (disarankan jangka panjang)

Domain property mencakup `tampiloka.site`, `www`, dan semua subdomain (`temura.`) dalam satu property.
Verifikasi memakai DNS TXT record di registrar domain, bukan kode aplikasi:

1. **Add property** → **Domain** → masukkan `tampiloka.site`.
2. Salin TXT record yang diberikan Search Console ke DNS registrar.
3. Tunggu propagasi, lalu klik **Verify**.

Kode di repo ini tetap menyiapkan meta tag untuk Opsi A. Jika Opsi B dipakai, meta tag boleh dibiarkan kosong.

### Bing Webmaster Tools (opsional)

Gunakan `NEXT_PUBLIC_BING_SITE_VERIFICATION` (nilai `msvalidate.01`). Yandex memakai
`NEXT_PUBLIC_YANDEX_SITE_VERIFICATION`.

## 2. Submit sitemap

Setelah property terverifikasi:

1. Buka **Indexing → Sitemaps**.
2. Submit `sitemap.xml` untuk masing-masing origin.
3. Status awal biasanya **Discovered** atau **Success**. Pemrosesan pertama bisa memakan waktu beberapa jam sampai beberapa hari.
4. Gunakan **URL Inspection** untuk meminta indexing halaman utama bila perlu.

Sitemap hanya memuat halaman publik yang boleh diindeks:

- Tampiloka: `/`, `/layanan`, `/produk`, `/industri`, `/tentang`, `/contact`
- Temura: `/`, `/desain`, `/harga`, `/fitur`

Halaman privat sengaja tidak dimasukkan dan memakai `noindex`:

- Temura: `/studio`, `/dashboard`, `/preview/*`, `/admin/*`, `/login`, serta semua undangan `/[slug]` dan `/[slug]/live`
- API: `/api/*` diblokir di `robots.txt`

Halaman privat tetap dapat di-crawl agar Google membaca `noindex`; jangan menambahkannya ke
`Disallow` karena Google tidak dapat melihat `noindex` pada URL yang diblokir.

## 3. Yang sudah disiapkan di kode

- `app/sitemap.xml/route.ts` dengan `lastmod`, `changefreq`, `priority`, dan image sitemap. XML disusun manual karena route `sitemap.ts` bawaan Next.js menaruh `image:image` sebelum `lastmod`; urutan itu melanggar skema sitemap dan membuat Search Console menolak file. Elemen standar harus lebih dulu, ekstensi image setelahnya.
- `app/robots.ts` dengan referensi sitemap.
- Metadata per halaman: title, description, canonical absolut, Open Graph, Twitter Card, dan gambar 1200×630.
- Metadata global: `robots` (`max-image-preview:large`, `max-snippet:-1`), `theme-color`, ikon Apple, manifest, `appleWebApp`.
- JSON-LD:
  - Tampiloka: `Organization`, `WebSite`, `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`, `FAQPage`, `ItemList`, `Service`, `ContactPoint`.
  - Temura: `Organization` (dengan `parentOrganization` Tampiloka), `Brand`, `WebSite`, `WebPage`/`CollectionPage`, `Product` + `AggregateOffer`, `OfferCatalog`, `ItemList`.
- `noindex, nofollow` pada area privat.

## 4. Maintenance

- Saat isi halaman publik berubah secara signifikan, perbarui tanggal di:
  - `apps/tampiloka/lib/seo.ts` → `SITE_UPDATED_AT` / `PUBLIC_PAGES[path].updatedAt`
  - `apps/temura/lib/seo.ts` → `TEMURA_UPDATED_AT` / `TEMURA_PUBLIC_PAGES[path].updatedAt`

  Tanggal `lastmod` yang selalu berubah setiap deploy akan diabaikan Google, jadi hanya ubah saat konten benar-benar berubah.
- Setelah deploy, cek:
  - `https://tampiloka.site/sitemap.xml` dan `https://temura.tampiloka.site/sitemap.xml`
  - `https://tampiloka.site/robots.txt` dan `https://temura.tampiloka.site/robots.txt`
  - [Rich Results Test](https://search.google.com/test/rich-results) untuk halaman utama dan `/layanan`, `/harga`, `/desain`
  - Tab **Page indexing** di Search Console untuk melihat alasan halaman belum diindeks.

## 5. Catatan domain

- `www.tampiloka.site` sudah redirect 307 ke `tampiloka.site`; canonical memakai origin tanpa `www`.
- Trailing slash sudah dinormalisasi 308 oleh Next.js.
- `NEXT_PUBLIC_SITE_URL` harus berisi origin final yang terverifikasi. Jangan memakai domain sementara Vercel.
