# Art direction: sumber merek menjadi pengalaman web

Baca sebelum memilih layout atau font. Tujuan: website terasa milik usaha tersebut, dengan komposisi yang sengaja dirancang. Logo benar dan palette serupa belum membuktikan kecocokan identitas. Reuse shadcn menjaga perilaku; ia tidak menentukan hero, art direction, crop, irama section atau katalog.

## 1. Lihat bahasa visual yang sudah dipakai

Buka Instagram resmi secara visual: profil/feed, beberapa materi promosi atau poster representatif, highlight yang relevan, bukan hanya caption dan foto interior. Bandingkan dengan menu PDF, kemasan/signage dan halaman resmi/hub. Target beberapa contoh yang cukup untuk membedakan pola berulang dari satu campaign; jumlah post bukan skor. Gunakan arsip sumber yang jelas bila live gagal, serta catat tanggal dan keterbatasannya. Hasil pencarian teks bukan review feed.

Prioritas bukti: arahan/panduan merek yang diberikan pengguna → pola berulang pada materi resmi Instagram/website/menu terkini → signage/kemasan → sumber discovery. Jika materi resmi berbeda, identifikasi campaign lama, sub-brand atau perbedaan fungsi; pilih arah dengan alasan, jangan mencampur semua menjadi palette baru. Foto bangunan krem tidak otomatis berarti background merek krem. Satu cover menu tidak membuktikan seluruh identitas bisnis.

Simpan screenshot/crop sumber yang terbaca dan locator post/halaman. Buat papan sumber kecil, lalu isi lima aspek berikut pada `pagePlan.visualIdentity.observations`:

| Aspek | Yang diamati | Keputusan website |
| --- | --- | --- |
| palette | Warna dominan/aksen/netral, perbandingan area gelap–terang, saturasi | Peran dan proporsi surface, blok warna, teks dan CTA; bukan daftar hex saja |
| typography | Sans/serif/script/condensed/rounded, lebar huruf, weight, hirarki dan penggunaan judul vs body | Font sama bila tersedia/berlisensi atau padanan bentuk yang dijelaskan; peran tiap font dan sample rendering |
| composition | Alignment, framing, ruang kosong, densitas, keseimbangan teks–foto, treatment poster | Komposisi hero/section yang menafsirkan pola, bukan menyalin poster sebagai seluruh website |
| imagery | Cahaya, mood, crop, cutout atau foto ruang, manusia vs produk, framing | Foto dan crop yang tepat, rasio, ukuran serta posisi focal point |
| graphicLanguage | Motif, ilustrasi, tekstur, garis, bentuk frame, sudut, ornamen yang berulang | Elemen khas yang dipertahankan dengan hemat dan treatment komponen; ketidakhadiran motif juga observasi sah |

Setiap record: aspect, sourceId, evidencePath gambar sumber lokal, observation konkret, translation ke website. Confidence high/medium/low adalah keyakinan terhadap arah, bukan nilai kualitas. Retained menyebut ciri yang dipertahankan; adapted menjelaskan penyesuaian untuk keterbacaan/responsif/lisensi; avoidedDefaults menyebut kebiasaan dari demo lama yang sengaja tidak dibawa. Bukti minim harus ditulis jujur sebagai gap, bukan lima klaim rekaan.

Jika font persis belum diketahui atau tidak tersedia untuk web, bandingkan bentuk beberapa padanan dengan cuplikan sumber dan sample judul nyata. Nilai lebar, bentuk huruf, kontras stroke, weight dan perannya; alasan “heavy sans” saja terlalu umum. Jangan mengambil font Tampiloka/demo lama karena sudah terpasang. Font ekspresif pada poster boleh menjadi aksen, sementara body tetap nyaman dibaca. Nama font baru tidak otomatis berarti hirarki visual berbeda.

## 2. Rancang dua komposisi yang dapat dibedakan saat dilihat

Mulai dari bukti di atas, tujuan bisnis dan aset. Tulis satu kalimat arah yang spesifik, misalnya hubungan antara fotografi, tipografi, area warna dan gerak; kata “modern, clean, premium” saja belum menjadi arah. Pilih beberapa ciri merek yang benar-benar terbukti sebagai jangkar pengenal.

Bandingkan dua kandidat terlihat memakai materi merek yang sama, masing-masing pembuka, satu section utama dan contoh menu pada desktop/mobile. Tunjukkan titik perhatian pertama, peran gambar, navigasi, hubungan elemen, urutan baca, panjang dan densitas bagian. Tidak perlu membangun dua website. Perubahan kiri/kanan desktop yang menumpuk menjadi susunan sama di mobile bukan variasi kuat. Nama ID signature tetap untuk metadata, bukan pengganti board.

Vocabulary signature adalah klasifikasi kasar. Komposisi baru boleh memakai layering, framing atau ritme lain dan dicatat pada ID terdekat yang jujur beserta uraian sebenarnya; jangan memaksa layout mengikuti nama ID atau kombinasi resep.

Uji secara visual dengan demo sebelumnya: jika logo/nama disembunyikan, apakah tata bahasa komposisinya masih hampir sama? Jika ya, perbaiki hubungan teks–foto, skala, framing, transisi section atau interaksi yang mendukung tujuan. Palette/font tetap mengikuti merek; keduanya boleh sama bila bukti mengharuskan. Jangan mengganti karakter merek hanya demi novelty. Riwayat harus memuat hasil terbaru yang benar-benar ada di workspace, bukan selalu seed Historia.

## 3. Bangun slice yang membuktikan arah sebelum mengisi seluruh halaman

Implementasikan hero, satu section pembeda dan contoh katalog pada mobile serta desktop. Render dan bandingkan dengan papan sumber sebelum menggandakan pola ke seluruh data. Ini checkpoint internal; hanya pada mode kalibrasi yang diminta pengguna, berhenti pada dua prototipe untuk penilaian arah sebelum katalog penuh. Sesudah kalibrasi, proses biasa kembali mandiri.

- Komposisi boleh memakai foto dominan, tipografi berkarakter, layering, cutout, pergantian skala/densitas atau transisi surface bila sesuai bukti. Tidak ada kewajiban menggunakan semua efek atau dekorasi pada setiap situs.
- Bentuk, radius, ruang kosong dan densitas dipilih per proyek. Arch, krem, serif, split hero atau grid boleh bila sesuai bukti; jangan memilihnya otomatis berdasarkan kategori usaha.
- Ornamen yang autentik boleh dipakai: motif garis, tekstur, ilustrasi atau frame yang terbukti. Pilih berdasarkan fungsi dan karakter merek. Aturan eksplisit pengguna tentang pill dan eyebrow tetap berlaku.
- Terapkan [copy bersih](design-rules.md#copy-bersih): fakta dan suara usaha, tagline hanya bila perlu; perbaiki layout sebelum menambah penjelasan. Copy buatan agent diuji lintas nama bisnis agar pola slogan generik tidak menjadi suara semua usaha.
- Rancang motion sebagai bagian komposisi: tujuan, trigger, elemen bergerak, hasil state dan reduced-motion fallback. Reveal yang sama pada setiap section bukan bukti art direction. Pilih beberapa momen yang berarti; kontrol dasar tetap dianimasikan sesuai kontraknya.

## 4. Katalog lengkap tanpa mengambil alih seluruh landing

Sebelum memilih layout katalog, terapkan [information-architecture.md](information-architecture.md): pisahkan metadata bersama, periode layanan, paket dan varian. Perbedaan komponen berasal dari keputusan informasi dan identitas, bukan mengganti tema satu dataset renderer.

Kelengkapan data berbeda dari menampilkan seluruh item sekaligus pada halaman awal. Gunakan pilihan awal yang representatif dengan kategori/pencarian, load-more atau tampilan daftar yang dapat dibuka jika jumlahnya memang memerlukan. Semua item tetap dapat ditemukan di website; jangan mengganti katalog dengan PDF atau menyembunyikan produk permanen.

Foto tepat yang sudah tersedia harus dimanfaatkan pada skala yang berguna. Thumbnail kecil di antara puluhan baris teks tidak selalu cukup untuk F&B. Kombinasikan showcase dan katalog terstruktur sesuai brand/aset. Hindari memecah setiap SKU menjadi kartu besar; hemat ruang dan jaga jarak harga/nama. Jika foto hanya mendukung kategori, label sebagai foto kategori dan jangan menyamar sebagai foto semua SKU di dalamnya.

Nilai katalog pada screenshot halaman utuh dan state hasil filter: berapa lama pengunjung melewati pola sama, apakah lokasi/paket/kontak terkubur, apakah setiap kategori butuh banner foto, dan apakah tindakan utama tetap mudah ditemukan. Daftar panjang boleh bila diperlukan; alasannya bukan sekadar karena datanya tersedia.

## 5. Review hasil terhadap sumber dan terhadap demo lain

`brand_translation` memerlukan bukti source, screenshot hasil, dan catatan review perbandingan. Sebut apa yang cocok dan menyimpang pada kelima aspek, termasuk alasan adaptasi. `composition_comparison` menampilkan referensi, screenshot hasil dan pembanding dari riwayat aktual pada ukuran sebanding, dengan catatan tentang hero, irama section, framing, katalog dan mobile, termasuk bagian yang masih mirip. Review oleh orang/agent yang tidak menyusun desain dipakai bila tersedia dan diizinkan; jangan mengklaim review independen bila dilakukan pembuat sendiri. Bila history belum tersedia, gunakan dua kandidat sebagai pembanding dan nyatakan cakupannya.

`catalogue_pacing` berlaku bila catalogue ada: bukti render dengan data nyata, coverage seluruh produk dan keputusan tampilan awal. Hasil yang hanya berbeda token, ID metadata atau urutan section tidak dinilai khas secara otomatis. Temuan kemiripan mayor atau hilangnya ciri merek menjadi issue lokal major dan menghalangi kelulusan sampai diperbaiki atau ada override eksplisit pengguna. Jika keahlian reviewer terbatas, laporkan batasnya; skor bukan bukti visual objektif.

Validator hanya memastikan brief/relasi/bukti gambar tersedia dan checks menggunakan jenis bukti yang tepat. Ia tidak mengenali identitas, menilai kreativitas atau membuktikan sumber benar secara mandiri.


Gunakan [referensi per section](section-reference-library.md) untuk brief, shortlist visual terbatas, matriks adaptasi dan pembandingan struktural. Pada quality, lampirkan hasilnya pada composition_comparison; dokumen/metadata saja tidak membuktikan kreativitas.
