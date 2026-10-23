# Bentuk informasi menentukan komponen

Baca bersama art-direction sebelum membangun katalog/paket. Dataset lengkap bukan alasan merender setiap record dengan komponen sama. Bedakan produk, varian, aturan bersama, periode layanan, paket dan cerita tempat; masing-masing memiliki tugas UI berbeda.

## Rancang model tampilan sebelum memilih card/list

Pada `pagePlan.catalogueDesign`, catat: kelompok pengunjung, jumlah item awal, cara mencapai seluruh item, metadata tingkat halaman/kelompok/item, relasi produk–varian, navigasi kategori, aturan waktu bila ada, dan hubungan katalog dengan lokasi/paket/cerita. Ini keputusan desain, bukan kewajiban menambah database atau mengganti data sumber. ID, harga, sumber dan foto setiap SKU tetap dapat ditelusuri setelah pengelompokan tampilan.

- **Metadata bersama:** jam layanan, pajak dan syarat umum ditempatkan sekali pada konteks yang menaunginya. Item hanya menampilkan pengecualian yang benar-benar perlu diketahui. Jangan mengulang jam operasional pada ratusan kartu. Kategori yang sedang aktif tidak perlu dicetak lagi di setiap item.
- **Waktu:** jika sumber membedakan sarapan/reguler, default boleh adaptif berdasarkan zona waktu bisnis dan jam yang terbukti. Inisialisasi server/client deterministik; setelah mount, terapkan hanya sebelum pengguna berinteraksi. Hormati pilihan manual, query dan deep link. Sediakan cara melihat menu periode lain; di luar jam tidak berarti produk dihapus dari katalog atau dijanjikan tersedia.
- **Paket:** nama A/B yang berulang memerlukan konteks pembeda terlihat, bukan empat kartu sejajar berlabel sama. Gunakan tabel perbandingan atau accordion sesuai jumlah detail. Kelompokkan berdasarkan perbedaan yang terbukti; tampilkan harga/unit, minimum orang, isi, batas waktu dan pengecualian. Label “standar/premium” tidak menjadi klaim resmi tanpa sumber atau instruksi eksplisit. Jika nama asli ambigu, tambahkan pembeda deskriptif yang jujur.
- **Varian:** beberapa foto hampir identik tidak selalu perlu empat showcase. Satu spotlight dengan pilihan protein/rasa/sambal dapat lebih jelas. Gunakan shadcn RadioGroup atau kontrol sesuai; label biasa/segmented yang tidak berbentuk pill cukup. Nama SKU, foto, harga dan ketersediaan mengikuti pilihan sebenarnya. Jangan menggabungkan produk berbeda hanya karena tampilannya mirip. Katalog tetap menemukan tiap varian yang valid.
- **Kategori:** pilih satu kontrol klasifikasi utama: Select, plain Tabs horizontal atau sidebar vertikal. Jenis kontrol mengikuti jumlah kategori, panjang label, viewport dan tujuan; bukan selalu Select karena Historia memakainya. Sidebar dapat berubah menjadi tab horizontal di mobile. Jangan menduplikasi Select dan tabs untuk kategori sama. Label tab plain/underline bukan pill dekoratif.
- **Subset:** katalog besar memakai kategori aktif/subset awal yang disengaja dan navigasi jelas. Batasi jumlah item yang terlihat sekaligus (misalnya 8–12 sesuai densitas); untuk kategori panjang, pagination mengganti subset sebelumnya agar katalog tidak terus memanjang. Load-more akumulatif bukan default dan harus dibenarkan lewat review halaman penuh. Search dapat menjelajah seluruh data dan menampilkan hasil lintas kategori; UI menjelaskan scope dan cara kembali. Semua item dapat dicapai tanpa gulir seluruh halaman atau memaksa pembukaan PDF. Sticky berakhir bersama katalog; category change menampilkan awal hasil tanpa melompat berlebihan.
- **Cerita merek:** nostalgia, kehangatan atau filosofi ruang perlu diterjemahkan ke framing, tipografi, tekstur, ritme dan interaksi yang bersumber. Jangan mengganti sekadar copy. Photobooth dapat menjadi galeri kenangan bila aset mendukung; foto tempat tidak boleh disebut hasil photobooth pelanggan bila tidak terbukti. Whitespace adalah relasi/pengelompokan yang memberi napas, bukan padding kosong berlebihan.

## Empat kasus evaluasi, bukan empat template

| Kasus | Masalah yang harus hilang | Bukti penerimaan |
| --- | --- | --- |
| Gulapadi | Jam berulang per menu dan nama paket A/B tanpa konteks | Jam ditampilkan pada tingkat yang tepat; default waktu dapat diuji; setiap penawaran dapat dibedakan tanpa menebak dari harga |
| Bumi Upi | Cerita Rumah Tamah terputus dari katalog mekanis/arch default | Sample menu serta galeri menyatu dengan arah rumah/buku kenangan; semua menu tetap dapat ditemukan |
| Duduk Gembira | Empat foto varian serupa dan karakter logo tidak berlanjut | Spotlight pilihan varian mengubah SKU/foto/harga tepat; treatment warung berlanjut pada type/frame/menu |
| Talkie Space | Tembok menu lintas kategori dan informasi kunjungan terkubur | Satu kategori terlihat pada satu waktu; navigasi sticky keyboard/mobile berfungsi; search menjangkau semua kategori; ruang baca terasa lega |

Arahan serif/typewriter, polaroid, papan warung atau Scandinavian dalam kasus ini adalah preferensi per prospek dari pengguna, bukan aturan font/layout semua demo. Bila arahan baru mengubah preferensi lama, catat override spesifik tanpa menghapus aturan global yang tidak terkait.

## QA alur informasi

Masukkan pemeriksaan berikut dalam catalogue_data, catalogue_pacing, working_actions dan review brand yang sudah ada; jangan menambah skor pass berdasarkan niat.

1. Cari satu produk dari kategori bawah tanpa scroll panjang, lalu kembali ke kategori awal. Periksa jumlah hasil dan kondisi kosong/reset.
2. Uji default waktu pada batas jam sumber, zona bisnis, render awal/hydration dan pilihan manual. Jika fitur waktu tidak dipakai, jangan membuat test pass palsu.
3. Bandingkan paket bernama sama: pengunjung dapat membedakan isi/harga/unit/syarat; tabel dapat dibaca mobile, accordion beranimasi dan hanya satu terbuka bila itu kontraknya.
4. Ubah seluruh kombinasi varian yang valid dengan keyboard; nama, foto dan harga tetap sesuai record asli. Kombinasi tidak tersedia tidak ditawarkan sebagai produk nyata.
5. Periksa halaman penuh setelah katalog berubah: metadata umum tidak berulang, cerita/lokasi tidak terkubur, dan fitur tidak hanya menambah panjang tanpa manfaat.

Pengujian otomatis dapat memeriksa state/data/overflow. Keterbacaan, emosi merek dan kejelasan pilihan tetap dinilai pada render nyata.

