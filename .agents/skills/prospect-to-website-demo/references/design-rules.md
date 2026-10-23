# Aturan desain dan implementasi

Mutu wajib mencakup kebenaran data, hak aset, fungsi, disclosure dan aksesibilitas. Preferensi UI eksplisit di bawah tetap berlaku sampai pengguna mengubahnya; catat override dan instruksi sumbernya. Keputusan komposisi mengikuti tiap proyek.

## Identitas dan gaya

- Mulai dari logo/font/palette/bentuk/tone prospek. Pertahankan rasio, warna dan clear space logo.
- Cocokkan **hierarki** font. Menu dominan sans bold/medium tidak mendukung mengganti seluruh landing menjadi giant italic serif editorial.
- Pilih ekspresi, radius, kepadatan, ruang kosong, proporsi media dan panel/kartu berdasarkan merek, aset dan tugas pengunjung. Editorial, split hero, serif, krem atau grid dapat tepat bila beralasan; tidak ada gaya dasar universal untuk F&B.
- Preferensi pengguna: tanpa pill, eyebrow/overline heading, badge/chip dekoratif. Gunakan label langsung dan pengelompokan yang jelas; kartu dipakai bila membantu perbandingan atau interaksi, bukan membungkus setiap paragraf.
- Font/warna tidak dihitung sebagai variasi layout. Variasikan komposisi dengan identitas tetap benar.

Gunakan [art-direction.md](art-direction.md) sebagai prosedur wajib penerjemahan Instagram/halaman resmi menjadi web. Krem, sans tebal, foto arch, aksen merah/hijau dan rows bukan gaya default. Motif/tekstur/frame autentik boleh diterjemahkan secara selektif. Pemangkasan copy mempertahankan ciri khas usaha. Bukti visual mendahului pemilihan font dan surface.

## Reuse yang benar

Gunakan komponen resmi shadcn yang sesuai: Select, Button, Input, Dialog, Accordion, Collapsible, Sheet, dan lainnya. Periksa source/library repo. Native select atau wrapper ad hoc tidak menjadi shadcn hanya karena namanya diganti. Catat asal registry, primitive Base UI/Radix dan perubahan tema.

Sesuaikan token/varian/styling; pertahankan API, ARIA, keyboard, focus trap dan aksesibilitas. Reuse komponen yang ada sebelum menambah. Jangan ulang init yang menimpa brand. Default Button seperti nowrap, gap dan justify-center harus disesuaikan pada kartu produk agar teks membungkus dan berkelompok.

Reuse tiga lapis: primitive → pola (toolbar katalog, product dialog, kontrol galeri) → komposisi landing yang berbeda. Package demo mandiri dan dapat dipindah; hindari import aplikasi Tampiloka/Temura atau workspace dependency tanpa permintaan. Jangan membawa foto, menu atau kontak Historia ke prospek lain.

Stack awal mengikuti project relevan: Next.js, React, TypeScript, Tailwind, `motion/react`. Periksa versi/scripts/docs terpasang; jangan mengunci versi studi kasus. Package manager mengikuti project mandiri. Pakai font lokal dan gambar teroptimasi bila tersedia.

Target demo baru adalah static export untuk Cloudflare Pages Free. Pada Next.js, gunakan `output: "export"` sesuai docs versi terpasang; pilih strategi gambar statis (pre-optimized dengan loader statis atau unoptimized yang disengaja), bukan optimizer server bawaan. Katalog/filter/dialog dan animasi tetap dapat berjalan di browser. Jangan menambahkan SSR, Server Actions, API routes, ISR atau middleware runtime tanpa kebutuhan yang diminta. Jika fitur server benar-benar diperlukan, jelaskan ketidakcocokan dan minta arahan untuk bagian itu; jangan menghapus fungsi yang diminta atau mengganti hosting secara sepihak. Alur build Novita dan upload Wrangler ada di [delivery.md](delivery.md).

## Konten pengunjung dan konversi

- Website terasa siap dipakai: produk, harga, lokasi dan tindakan berguna. Banner konsep singkat di atas diperbolehkan; konsep independen tetap noindex.
- Sumber, halaman PDF dan narasi proses internal tidak menjadi copy kartu/CTA. Katalog lengkap menggantikan CTA “menu digital asli” atau PDF duplikat. Keterangan harga/ketersediaan singkat masih wajar.
- Satu primary CTA per konteks, solid dan dominan; secondary ghost/outline. Aksi nyata ke menu/kunjungan/kontak, bukan dekorasi.
- Panah bawah untuk melompat ke menu; panah keluar hanya untuk tujuan sesuai. Ikon WhatsApp asli dan label aksesibel memperjelas chat ke kontak resmi.
- Carousel hidangan: CTA “Jelajahi seluruh menu” dan tombol kiri/kanan **satu baris pada 320 px**. Nomor slide boleh disederhanakan, tombol tetap sekitar 40–44 px dan berlabel.
- Hindari form order/reservasi/payment pura-pura berhasil. Gunakan jalur kontak nyata atau backend dalam scope eksplisit.

## Copy bersih

Mulai dari nama, fakta yang membantu memilih dan label aksi langsung. Pangkas tagline, helper text, secondary label dan deskripsi bila pengunjung tetap dapat memahami isi dan bertindak tanpa teks tersebut. Tagline resmi boleh dipakai saat berfungsi sebagai identitas; status resmi bukan kewajiban menampilkannya. Kelengkapan riset tidak berarti semua caption atau deskripsi sumber harus tampil.

Jika layar membutuhkan kalimat penjelas agar susunannya masuk akal, perbaiki layout terlebih dahulu: kedekatan nama–harga–aksi, pengelompokan varian, hierarki judul, urutan baca, penempatan kontrol dan label aksi yang spesifik. Tambahkan teks hanya bila informasi yang diperlukan tetap belum terwakili. Hindari subjudul yang mengulang judul, petunjuk untuk kontrol yang sudah jelas, serta deskripsi dekoratif pada setiap section/kartu.

Pertahankan isi yang memengaruhi keputusan atau mencegah kesalahan: isi/porsi paket, varian, durasi, harga/satuan, syarat, ketersediaan yang bersumber, instruksi input yang perlu, error/recovery, disclosure, atribusi wajib dan label aksesibel. Nama aksesibel dapat memakai aria-label atau teks sr-only saat sesuai; label form yang diperlukan tetap jelas. Minimal copy tidak membenarkan kontrol tanpa nama atau informasi penting hilang.

Untuk copy buatan agent, coba ganti nama bisnis: bila kalimat tetap cocok di hampir semua demo dan tidak membawa detail nyata, hapus atau tulis ulang secara faktual. Jangan membuat klaim bahan, proses, fasilitas atau janji layanan agar terdengar khas. Pada review desktop/mobile, periksa apakah setiap teks yang tersisa punya fungsi; bila penghapusan membingungkan, uji perbaikan layout sebelum mengembalikannya.

## Katalog: satu keputusan pada satu waktu

Pilih kemampuan dari skala dan kebutuhan pengunjung, bukan jumlah fitur Historia. Delapan produk yang terbaca dalam satu layar panjang dapat memakai rows/grid lengkap tanpa filter, search, sticky, load-more atau dialog. Daftar lima jasa biasanya cukup rows dengan harga/durasi. Katalog besar dengan variasi nyata dapat memakai filter/search; sticky berguna bila kontrol perlu diakses sepanjang daftar, load-more hanya bila benar-benar membantu pemuatan. Catat alasan pilihan di page plan. Angka tersebut contoh keputusan, bukan threshold otomatis.

Kontrak berikut berlaku **jika kemampuan terkait dipilih**:

1. Satu klasifikasi utama melalui Select atau plain Tabs/sidebar shadcn, dipilih menurut [information-architecture.md](information-architecture.md). Kategori sumber boleh dipetakan ke kelompok tampilan; jangan menduplikasi kontrol kategori sama. Granularitas mengikuti produk. Jika kategori tidak bermakna, gunakan pencarian saja; jangan membuat dropdown satu opsi.
2. Select dan pencarian bila dipakai inline; pola tabs/sidebar dapat menempatkan search pada baris toolbar yang jelas tanpa menggandakan klasifikasi.
3. Mobile: magnifier mengembangkan pencarian beranimasi, memfokuskan input dan menghemat ruang. Escape/close kembali ke kontrol kategori dan fokus ke toggle. Jika memakai Select, ekspansi menggantikannya pada baris sama; jika memakai tabs/sidebar, pastikan kategori aktif serta scope search jelas. Label, aria-expanded dan aria-controls benar.
4. Memulai pencarian mereset kategori; memilih kategori mengosongkan query. Uji memilih Kopi lalu mencari hidangan daging yang memang ada: kategori lama tidak boleh menyembunyikannya.
5. Sticky di bawah header aktual, berakhir bersama katalog. Uji tengah katalog **dan** section setelahnya. Periksa parent overflow, stacking dan portal dropdown.
6. Perubahan filter saat scroll jauh memperlihatkan awal hasil. Hindari offset ganda scroll-padding + scroll-margin.
7. Search/filter memiliki jumlah hasil, reset dan empty state yang benar. Pagination mengganti subset dan mereset halaman ketika filter berubah; semua hasil tetap dapat dicapai. Untuk katalog panjang, utamakan ini agar lokasi tidak terkubur. Load-more bila dipakai menambah item tanpa duplikasi, berhenti pada akhir, dan mereset batas saat query/kategori berubah. Data lengkap tidak berarti semua gambar eager.
8. Nama–deskripsi–harga satu kelompok rapat, teks pekat; jangan auto margin yang memisahkan harga jauh.
9. Product dialog memakai foto yang tepat dan data bersumber. Konten bertahan sampai animasi keluar selesai; Escape menutup dan fokus kembali ke trigger.

Daftar jasa ringkas boleh rows/list tanpa search/sticky yang tak perlu. Applicability QA mengikuti fitur nyata; bukan cara melewati pemeriksaan katalog besar.

## Motion, aksesibilitas dan tempat

Entrance hero, reveal section dan state komponen membentuk ritme. Accordion/collapsible/dialog/Select/search/carousel benar-benar animated, bukan hover saja. Accordion informasi membuka satu panel sekaligus.

Gunakan motion/react untuk orchestration; CSS transition boleh untuk layout/state primitive. Pilih efek sesuai merek/aset: parallax, stagger, mask, carousel atau marquee bukan semua wajib. Konten/aksi tetap bisa dipakai sebelum animasi selesai.

Uji prefers-reduced-motion pada CSS dan JS, termasuk render baru: hentikan parallax/marquee/scroll halus yang relevan. Server/client style deterministik; hindari hydration mismatch. Entrance setelah mount boleh; konten server jangan seluruhnya disembunyikan menunggu motion.

Kontras teks normal ≥4.5:1, teks besar ≥3:1, kontrol/fokus bermakna ≥3:1 terhadap latar **aktual**, termasuk foto/alpha/hover. Angka satu pasangan bukan sertifikasi situs. Arah awal body 16 px, hero 18 px desktop/16 px mobile; sesuaikan font/ruang. Deskripsi produk sekunder 14 px boleh bila terbaca. Periksa keyboard, focus-visible, tap target dan overflow pada 320, 390, 768, sekitar 1280–1440 px.

Alamat/cabang/jam bersumber, peta nyata menunjuk tempat benar, arah dan fallback tautan. Pin ilustratif bukan bukti lokasi. Fasilitas hanya yang terbukti.

Section lokasi memuat iframe Google Maps untuk cabang yang terverifikasi, title aksesibel, loading lazy, rasio responsif dan tautan arah/fallback. Sesuaikan frame dengan bahasa visual merek; pertahankan kontrol/atribusi Google. Jika memungkinkan, pasangkan foto asli tempat/cabang yang tepat. Foto bisnis di dalam embed bergantung tampilan Google: jangan menjanjikan kemunculannya atau menggantinya dengan foto tempat lain. Verifikasi hasil embed di browser; jika diblokir, catat gap dan pertahankan alamat serta tautan arah yang bekerja.

