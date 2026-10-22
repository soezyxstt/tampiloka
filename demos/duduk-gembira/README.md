# Duduk Gembira — demo lokal

Package mandiri untuk Warung Kopi Duduk Gembira, Garut. Tidak mengubah aplikasi Tampiloka/Temura.

Jalankan dari folder ini:

```powershell
bun install
bun run dev
```

Buka http://127.0.0.1:3016. Pada host Windows dengan shim Node yang tidak aktif, jalankan Next langsung:

```powershell
& 'C:\Users\adiha\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules/next/dist/bin/next dev --webpack --port 3016 --hostname 127.0.0.1
```

`bun run build`, `bun run lint`, `bun run typecheck`, dan `bun run check:demo` menyediakan pemeriksaan package. Pada sesi ini Bun dalam sandbox gagal membaca cwd; pemeriksaan dijalankan memakai Node executable langsung. Server demo hanya mendengarkan loopback.

47 item: 43 pada menu sorotan Instagram dan empat nasi cumi/ayam pada carousel resmi. Empat harga yang tidak dipublikasikan tetap kosong. Foto tepat digunakan untuk empat hidangan; item lain ditampilkan sebagai baris teks. Varian minuman panas/dingin dan rasa roti tetap tercatat. Jam buka dan kontak mengikuti profil resmi yang dibaca 22 Oktober 2026. Promo lama tidak dinyatakan aktif. Tidak ada simulasi pembayaran atau reservasi.

Warna, logo, suasana dan hidangan mengikuti sumber usaha. Font Bricolage Grotesque dan DM Sans disimpan lokal beserta OFL. Komponen Button/Select shadcn memakai Base UI, disalin lokal dengan dependency eksplisit. Motion/react mendukung reduced motion.

Artefak:

- `research-bundle.json`: sumber, fakta, produk, manifest dan dua kandidat layout.
- `data/menu.json`: data katalog yang dipakai website; dihasilkan dari bundle.
- `research/quality/qa-report.json`: penilaian lokal 87.8/100, 23/23 pemeriksaan wajib, `ready_for_local_review`.
- `research/quality/evidence/`: screenshot aktual 320/390/768/1440 px, audit HTTP, hasil browser dan log build/lint/typecheck.
- `run-state.json`: scope, keputusan, status dan gap.

Foto teras/interior diterbitkan infogarut; foto nasi dan logo berasal dari akun usaha. Autentisitas tidak berarti izin publikasi sudah diberikan. Hak publikasi foto/logo dan harga terkini masih memerlukan konfirmasi pemilik. Listing Maps juga menunjuk menu Drive yang saat diperiksa mengembalikan Page Not Found. GoFood berhenti pada Safety check; tidak dilewati. Tidak ada klaim menu Drive berhasil diperoleh.

Status hanya demo lokal: tidak dipush, dideploy, dikirim ke prospek, atau diterima pemilik. Banner konsep dan noindex aktif. Kualitas lokal, izin publikasi dan acceptance pengguna terpisah.
