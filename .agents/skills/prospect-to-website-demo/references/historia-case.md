# Historia: pelajaran teruji, bukan template universal

Pengguna menerima hasil setelah beberapa koreksi substantif. Sumber utama untuk aturan skill adalah instruksi/koreksi pengguna, bukan semua rekomendasi dokumen awal atau catatan QA versi pertama.

## Jalur yang benar-benar terjadi

Identifikasi Historia Coffee & Eatery Garut dari Instagram resmi → Linktree → menu Google Drive, WhatsApp dan lokasi. Riset awal menghasilkan shortlist dan visual hijau/editorial yang belum cukup. Ketiga referensi akhirnya dibuka di Chrome; kegagalan fetch sebelumnya bukan kegagalan situs.

PDF resmi 31 halaman menyediakan 71 item dan 17 kategori sumber, foto produk transparan, logo dan foto ruang. Warna cream/orange diambil dari artwork. Font Poppins/Quiche Display ditemukan dalam PDF; UI utama beralih ke Poppins berlisensi open font, bukan giant italic Instrument Serif. Subset Quiche tidak diubah menjadi webfont tanpa lisensi.

Redesign memakai foto autentik, featured dishes, katalog lengkap, galeri, single-open animated accordion dan peta nyata. Primitive kemudian benar-benar diganti dari registry shadcn; native select sebelumnya belum memenuhi permintaan pengguna. Sumber PDF dipindah dari alur pengunjung ke dokumentasi.

Polish memperkuat kontras, proximity kartu, hero body, hirarki CTA dan ikon WhatsApp. Koreksi terakhir menghapus klasifikasi ganda menjadi satu Select kelompok, membuat search mobile mengembang, scoped sticky toolbar dan CTA katalog berpanah bawah satu baris dengan carousel arrows. Ini kontrak interaksi yang dipertahankan untuk katalog sejenis.

Demo berupa package mandiri `demos/historia`, kemudian pengguna secara terpisah meminta GitHub/Vercel/domain. Pengguna selanjutnya menetapkan skill default **lokal; deploy saat diminta**.

## Referensi yang diperiksa

- Pagi & Roti: https://demo-cafe-1.tampiloka.adihnursyam.com/ — visual kuat, informasi produk relatif lengkap dan mudah ditemukan; pill/eyebrow pada referensi tidak boleh diikuti.
- Tepi Sagara: https://demo-fnb-2.tampiloka.adihnursyam.com/ — suasana dan kesan premium kuat, katalog relatif terbatas; skala media berguna jika aset mendukung.
- Sela Rasa: https://demo-fnb-1.tampiloka.adihnursyam.com/ — komposisi gathering/events dan carousel relevan; section yang tidak relevan tidak ikut disalin.

Itu catatan pada saat run, bukan audit permanen situs-situs tersebut. Periksa ulang referensi ketika digunakan lagi.

## Jangan diwariskan ke bisnis lain

Warna #FFF8E6/#CD3C0F, Poppins, angka 71/17/5 kelompok termasuk Semua, full-photo hero, marquee, urutan Historia, kontak, foto, branch master, ID Vercel dan domain adalah fakta/keputusan kasus ini. Wariskan prinsip pembuktiannya dan pola UI, bukan nilainya.

## Kegagalan yang harus dicegah

- Menyebut referensi mati karena satu fetch gagal.
- Menyalin penilaian “usable” menjadi klaim visual polished.
- Memilih font/palette dari selera agent ketika aset merek sudah tersedia.
- Mengaku shadcn sementara field masih native.
- Menggunakan foto meja sebagai foto hidangan tunggal atau tidak mengekstrak foto PDF yang tersedia.
- Mempertahankan dua tingkatan filter yang membingungkan dan search yang memakan baris penuh pada mobile.
- Sticky menimpa header/terus muncul setelah katalog; filter dari scroll jauh menghilangkan hasil.
- Default Button nowrap menyebabkan deskripsi overlap; exit dialog mengosongkan konten sebelum animasi selesai.
- Lulus checks lokal disamakan dengan live production atau harga/izin yang dikonfirmasi pemilik.

Izin foto dan kebaruan harga tetap memiliki status tersendiri. Jangan menggunakan contoh deployment Historia sebagai izin eksternal bagi prospek lain.
