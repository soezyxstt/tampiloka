# Revisi enam demo — 23 Oktober 2026

Enam demo dikerjakan oleh enam subagent **GPT-6.1 Sol, reasoning medium**, satu demo per agent. Parent memilih batas arah desain, memeriksa render secara independen, membandingkan keenam hasil, dan meminta revisi ketika komposisi atau perilaku belum sesuai. `temura-preview` tidak termasuk karena merupakan preview undangan.

Semua preview di bawah menyajikan **hasil ekspor statis lokal**. Server sesi dapat berhenti; setiap package tetap memiliki script pengembangan/build sendiri. Instalasi dan build di cloud workspace Codex telah diizinkan pengguna sebagai pengganti Novita yang tidak tersedia pada sesi ini.

| Demo | Preview lokal | Pembeda hasil | Referensi utama | Skor editorial parent / 100 |
| --- | --- | --- | --- | --- |
| Historia | http://127.0.0.1:3104 | Panorama ruang makan, pasangan foto meja–hidangan, acara dan galeri sebelum katalog cutout | Schulhaus 19 + Crumb 01 | 88,6 |
| Duduk Gembira | http://127.0.0.1:3116 | Papan warung, teras dan jam buka, pemilih lauk/sambal, katalog bergaris dengan sidebar | Kreme 01 + Brasa 01 | 87,4 |
| Talkie Space | http://127.0.0.1:3018 | Foto kopi dominan dengan dua jendela pendamping, SAPA, foto kategori di samping daftar harga | Qitchen 02/01/05 | 86,8 |
| Gulapadi | http://127.0.0.1:3121 | Foto makanan mendahului judul pada desktop/mobile, pemilih donat, perbandingan buffet sebelum katalog | Sorimi 03/02 | 86,0 |
| Bumi Upi | http://127.0.0.1:3017 | Album rumah dengan skala cetakan berbeda, katalog dua halaman buku, album foto interaktif | WHISK 03 | 86,0 |
| Classico Coffee | http://127.0.0.1:3026 | Papan condensed, tiga pintu kategori berupa foto, konter sarapan, katalog foto besar | Kreme 01 + Crumb 04 | 88,6 |

Skor di atas merupakan penilaian manusia pada dimensi berbobot skill, berdasarkan render dan bukti implementasi. **Skor tersebut bukan kelulusan seluruh gate skill atau penerimaan pengguna.** Assessor tetap `needs_revision`: original PDF/screenshot riset tidak tersedia lengkap, sehingga gate sumber dan terjemahan merek secara penuh belum bisa disahkan. Lima embed Google Maps juga mengembalikan kegagalan upstream pada lingkungan pemeriksaan; alamat dan tautan petunjuk arah tetap tersedia. Historia berhasil menampilkan pin bisnis melalui proxy yang dikonfigurasi.

## Perbandingan parent

![Enam pembuka desktop](../artifacts/prospect-to-web-2026-10-23/six-demo-openings.jpg)

![Enam pembuka mobile](../artifacts/prospect-to-web-2026-10-23/six-demo-mobile-openings.jpg)

Perbandingan mencakup seluruh halaman dan keadaan katalog, serta pembuka pada skala yang sama. Parent juga melihat contact sheet referensi utama dan gambar asli terpilih. Referensi dipakai untuk hubungan skala foto/teks, urutan baca, navigasi, dan kepadatan. Logo, foto, informasi dan produk dari situs referensi tidak dijadikan materi bisnis prospek.

Kemiripan terdekat yang masih ada adalah Duduk–Bumi: keduanya memakai judul merek besar dan katalog ringkas. Duduk menyusun papan–teras–pemilih nasi–sidebar; Bumi memakai cetakan rumah bertumpuk–buku dua halaman–album. Classico dan Duduk sama-sama menemukan Kreme, tetapi Classico mempertahankan tiga foto kategori yang dapat diklik, katalog foto besar, dan konter sarapan; Duduk memakai foto tempat serta pilihan lauk. Identitas warna dan font tetap mengikuti bukti bisnis yang tersedia.

Pada putaran pertama, Talkie dan Gulapadi masih sama-sama memulai dengan judul besar di kiri, informasi di kanan, lalu foto lebar. Parent meminta Gulapadi menjadi **foto makanan → judul/informasi** pada desktop dan mobile. Perubahan ini diterapkan dan diperiksa kembali. ID signature yang berbeda tidak dipakai sebagai bukti kreativitas; `layout-history.json` tetap menyimpan ID kanonik beserta uraian dan bukti render.

## Pemeriksaan dan perbaikan

- Keenam package berhasil melalui build produksi Webpack, lint, dan TypeScript. Build awal yang dibatasi sandbox gagal saat subprocess TypeScript; build dengan izin proses yang sesuai berhasil.
- Parent memeriksa ekspor statis pada **320, 390, 768, dan 1440 px**: HTTP 200, satu `h1`, noindex/disclosure, font, gambar lokal, anchor, dan overflow. Tidak ditemukan overflow dokumen, gambar lokal rusak, anchor hilang, atau page JavaScript error pada hasil akhir.
- Seluruh **615 item** tetap utuh: Historia 71, Duduk 47, Talkie 94, Gulapadi 206, Bumi 116, Classico 81. Hash enam file `data/menu.json` sama persis dengan awal pekerjaan. Builder menelusuri seluruh item melalui kategori/pagination; harga, varian dan harga yang belum diketahui dipertahankan.
- Pengujian interaksi mencakup pencarian lintas kategori, kosong/reset, pagination yang mengganti hasil, keyboard, fokus dan Escape pada pencarian mobile, serta kontrol khusus yang benar-benar dipakai: radio lauk/sambal, album, donat, sarapan, carousel/dialog, dan accordion.
- Parent menemukan dan meminta perbaikan overflow carousel Historia pada mobile, mismatch hydration saat reduced motion, favicon yang hilang, serta copy penutup yang terlalu generik. Builder juga memperbaiki divider buku Bumi yang menangkap klik reset dan label radio Duduk yang berulang.
- Fresh-context console pada keenam ekspor statis tidak menunjukkan error aplikasi saat reduced motion. Embed Maps diperiksa terpisah; error eksternal tidak dianggap sebagai keberhasilan render peta.
- Kontras teks pada latar datar diperiksa dengan perhitungan luminance WCAG dan review visual. Pemeriksaan tidak mencakup seluruh kombinasi state/assistive technology. Teks kecil pada foto/gradient tetap memerlukan penilaian visual; lihat bukti dan cakupan aktual.

## Bukti dan batas

Setiap demo menyimpan `design-brief.md` dan `reference-selection.json` di samping source. Dua kandidat dengan aset nyata, gambar referensi, screenshot, log build, observasi browser, dan handoff builder tersedia di `../artifacts/prospect-to-web-2026-10-23/<demo>/`. Review independen parent dan keluaran `assess_demo.py --history demos/layout-history.json` berada di `../artifacts/prospect-to-web-2026-10-23/parent-review/<demo>/`.

Riset asal bertanggal 21 Oktober untuk Historia dan 22 Oktober 2026 untuk demo lain. Revisi ini memakai transkripsi, logo dan foto arsip yang tersedia; tidak mengklaim pemeriksaan Instagram/menu terbaru. Validitas harga saat ini serta izin publikasi aset belum dikonfirmasi kembali. Original yang hilang tidak diganti dengan bukti buatan. Temuan tersebut dicatat sebagai batas gate sumber, terpisah dari build dan pengujian implementasi yang berhasil.

Semua revisi baru dicatat berstatus **built**, termasuk Historia; status accepted pada versi Historia lama tidak diwariskan ke revisi baru. Penilaian akhir selera desain tetap milik pengguna.
