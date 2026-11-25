# Tampiloka → Cloudflare: workflow dan serah terima

Target: `apps/tampiloka` (`@tampiloka/web`) di repo `soezyxstt/tampiloka`, branch produksi `master`. Workflow: `.github/workflows/tampiloka-cloudflare.yml`.

Status: workflow disiapkan, belum dijalankan atau dideploy. Konfigurasi adapter, script aplikasi, dan kredensial belum tersedia. Workflow sengaja berhenti dengan error prasyarat yang jelas sampai setup selesai. File ini bukan bukti bahwa aplikasi sudah kompatibel dengan Workers.

## Lanjutkan oleh agent berikutnya

1. Gunakan checkout lengkap dan bersih dari `master` terbaru untuk menyiapkan adapter dan konfigurasi runtime.
2. Siapkan adapter runtime untuk Cloudflare Workers. Aplikasi memakai Next.js 16.3.8, next-intl, proxy, API routes, PostgreSQL (`pg`), better-auth, dan S3 SDK; jangan memakai static export atau upload direktori `.next` ke Pages. Tinjau kompatibilitas runtime sebelum memilih adapter. Dokumentasi Cloudflare saat penulisan merekomendasikan vinext, yang masih beta. Project belum memakai Wrangler; ikuti panduan `cf` untuk project baru dan pastikan perintah adapter yang digunakan sesuai dokumentasinya.
3. Tambahkan dependensi dengan versi terkunci dan perbarui `pnpm-lock.yaml`. Sediakan konfigurasi Worker dan dua script dalam `apps/tampiloka/package.json`: `build:cloudflare` membangun artifact Worker; `deploy:cloudflare` menerbitkan artifact tersebut secara noninteraktif menggunakan `CLOUDFLARE_API_TOKEN` dan `CLOUDFLARE_ACCOUNT_ID`. Jangan memasang adapter dengan versi `latest` secara ad hoc di workflow. Pertahankan script Next.js/Vercel yang sudah ada. Jika perintah deploy adapter membangun ulang, pastikan kebutuhan variabel build tetap terpenuhi.
4. Buat GitHub Environment **cloudflare-production**. Tambahkan secrets `CLOUDFLARE_API_TOKEN` (akses deploy Worker yang dibutuhkan adapter, dibatasi pada akun target) dan `CLOUDFLARE_ACCOUNT_ID`. Account historis tercatat di dokumen migrasi lama; verifikasi akun target sebelum menggunakannya.
5. Tambahkan environment variables `NEXT_PUBLIC_SITE_URL` dan `NEXT_PUBLIC_TEMURA_URL` dengan URL HTTPS yang diverifikasi. Opsional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`, `NEXT_PUBLIC_YANDEX_SITE_VERIFICATION`. Nilai publik ini tertanam saat build.
6. Siapkan secrets/bindings runtime langsung di Cloudflare dari `apps/tampiloka/.env.example`: database, storage S3/R2, better-auth, Google OAuth, admin allowlist, dan `CRON_SECRET`. Pastikan adapter mengekspos konfigurasi runtime ke aplikasi. Jangan memasukkan secret runtime ke artifact atau variabel `NEXT_PUBLIC_*`. Periksa batas koneksi database, dukungan TCP/TLS, URL callback OAuth, CORS storage, dan trusted origin untuk domain Worker. `TEMPLATE_CATALOG_URL` tetap konfigurasi server runtime jika perlu override.
7. `apps/tampiloka/vercel.json` berisi cron harian `/api/cron/form-maintenance` pukul 02:00 UTC; file ini tidak mengaktifkan cron di Workers. Siapkan pemicu terjadwal yang mengirim Bearer `CRON_SECRET` sebelum memindahkan operasi form ke Cloudflare.
8. Verifikasi build dan preview runtime di lingkungan yang diizinkan. Uji ID/EN, katalog dinamis, proxy, login/admin, database, upload/download, dan maintenance. Jalankan workflow melalui **Actions → Deploy Tampiloka to Cloudflare → Run workflow** pada `master`. Workflow ini tidak menjalankan CI marketing; pastikan pemeriksaan CI yang sudah ada lulus juga.
9. Deployment hanya dijalankan manual melalui **Run workflow** pada `master`. Push dan pull request tidak memicu deployment; tidak diperlukan variabel enabled. Concurrency mengantrikan deploy, tidak membatalkan deploy yang sedang berjalan.

Menambahkan workflow ini tidak mengubah domain/DNS atau memindahkan trafik dari Vercel; lakukan cutover terpisah setelah verifikasi Cloudflare berhasil.

## Referensi

- https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- https://developers.cloudflare.com/cf/agents/
- https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
