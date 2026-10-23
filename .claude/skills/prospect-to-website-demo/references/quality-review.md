# Penilaian dan bukti kualitas

## Empat hal yang tidak boleh disatukan

1. **Pemeriksaan mesin:** build, data, HTTP, dimensi/overflow dan state yang dapat diamati.
2. **Review visual/UX:** kualitas komposisi, kecocokan merek, hierarki, animasi dan arahan konversi pada render nyata.
3. **Kesiapan publikasi:** fakta yang perlu konfirmasi, hak aset, batas akses dan otorisasi.
4. **Hasil eksternal:** commit/push, deployment READY/HTTPS, atau pesan terkirim yang dibuktikan terpisah.

Skor lokal tidak memberi izin publikasi. Pengujian skrip bukan bukti visual polished, izin aset atau efektivitas penjualan.

## Protokol penilaian

Gunakan `assets/review.template.json`, kebijakan `assessment-policy.json` dan `scripts/assess_demo.py`. Isi review hanya setelah menjalankan/meninjau bukti. Template sengaja memulai status `unknown`, bukan hasil pass.

Build/lint/typecheck dan pekerjaan berat mengikuti [build Novita](delivery.md#build-di-novita-sandbox). Periksa hasil static export yang dikembalikan, bukan hanya dev server atau exit code: serve folder artefak dengan server statis ringan, lalu uji direct-load/refresh rute, 404, font/gambar, noindex dan interaksi desktop/mobile. Browser QA otomatis yang berat juga berjalan remote; inspeksi interaktif ringan boleh lokal. Catat log, exit code, snapshot sumber dan hash artefak yang benar-benar diuji. Pemeriksaan ini tetap local-quality meskipun komputasinya remote; deployment dan liveAccess dibuktikan terpisah. Jangan rebuild lokal atau di Cloudflare untuk mengganti artefak yang belum lulus.

Gunakan virtualenv dan `scripts/requirements.txt` untuk assessor serta validator riset/publication; Pillow memeriksa screenshot. Audit HTTP tetap stdlib. Jalankan `python scripts/audit_http.py <url-lokal> --output <folder-review>/evidence/http.json` untuk memeriksa HTML 200, satu h1, noindex, anchor lokal, skema tautan aman dan maksimal 20 gambar same-origin yang ada di HTML. Skrip tidak menjalankan JavaScript, mengirim form/pesan, mengikuti tautan kontak, menilai seluruh katalog atau membuktikan aksesibilitas/motion. Gunakan hasilnya hanya untuk observasi yang benar-benar dicakup; browser dan pemeriksaan data tetap diperlukan.

Semua evidence path relatif ke folder review, tersimpan di dalamnya; assessor menolak path yang keluar dari folder. Salin log/screenshot/hasil DOM yang relevan ke `evidence/`. Sumber web disimpan sebagai catatan bukti berisi URL, waktu, klaim dan batas verifikasi, bukan sekadar URL tanpa observasi. Record evidence memiliki kind, path dan summary; screenshot juga viewport width/height. Assessor memakai Pillow verify dan decode penuh untuk menolak PNG header-only, terpotong atau rusak. Capture viewport harus cocok ukuran pikselnya; fullPage dan deviceScaleFactor dicatat eksplisit sesuai data-contracts. Ini memvalidasi file/dimensi, bukan membuktikan screenshot berasal dari website yang benar atau desainnya bagus. Assessor menghitung SHA-256 file bukti dalam laporan agar revisi bukti terlihat.

`features` mendeskripsikan fitur nyata dalam page plan/hasil. Template dimulai dengan null agar setiap pilihan disengaja. Assessor menuntut boolean final dan kecocokan dengan `pagePlanPath`, inventori fitur per section, dependency fitur dan signature plan. `feature_inventory` wajib memiliki pemeriksaan source/DOM/render aktual: flag yang cocok antardokumen belum membuktikan kode mematuhinya. Jangan mematikan flag untuk melewati tes komponen yang dipakai. Semua core wajib; conditional mengikuti fitur. Status unknown/failed/missing menghalangi kelulusan.

`catalogue` hanya mewajibkan data katalog. `categoryFilter`, `search`, `stickyToolbar`, `loadMore` dan `productDialog` memiliki checks terpisah. Filter kategori memerlukan minimal dua kategori bermakna; bila tidak ada, matikan flag dengan alasan. Search mobile diuji hanya jika search dipakai; filter saat scroll diuji jika sticky dan filter/search aktif. Tidak perlu mengisi pass palsu untuk fitur absen.

## Hard gate

Sebelum menyebut hasil polished, jalankan [review art direction](art-direction.md): brand_translation mencocokkan kelima aspek visual dengan sumber Instagram/halaman resmi; composition_comparison membandingkan render aktual dengan demo lain; catalogue_pacing memeriksa ritme landing dan akses ke semua item. Checks visual pertama membutuhkan evidence jenis source, screenshot dan review; comparison membutuhkan screenshot dan review. Catatan review bukan sekadar “berbeda/modern”. Brief visual sumber wajib pada research bundle. Kemiripan mayor atau ciri merek hilang menjadi temuan local major, bukan hanya mengurangi originality beberapa poin. Skrip memeriksa kelengkapan bukti/struktur, bukan menilai kreativitas otomatis.

Definisi mesin ada di policy. Reviewer menilai: identitas/sumber benar, produk/aset tidak rekaan, aturan desain eksplisit dipenuhi, CTA/interaksi dapat dipakai, responsive/keyboard tidak rusak, scope/claims jujur, serta kecocokan layout dengan bukti. Setiap gate pass harus punya observasi dan evidence. Salah cabang, harga rekaan, native select sebagai pengganti shadcn yang diminta, overflow yang menutupi aksi atau data yang salah tidak boleh ditutupi nilai visual tinggi.

## Skala 0–5

| Nilai | Arti |
| --- | --- |
| 0 | Tidak ada/keliru secara mendasar |
| 1 | Bermasalah serius, banyak kebutuhan belum terpenuhi |
| 2 | Sebagian ada, masih membingungkan/inkonsisten |
| 3 | Usable, bukti ada, masih membutuhkan polish yang jelas |
| 4 | Polished dan sesuai tujuan, hanya gap kecil yang dijelaskan |
| 5 | Kuat, khas merek, terarah, terbukti pada state/viewport relevan |

Nilai dapat memakai setengah poin. Tiap dimensi wajib menyebut observasi spesifik dan screenshot/log/sumber, bukan “bagus”, “modern”, atau mengulang niat builder. Bobot dan kriteria dimensi hanya didefinisikan pada policy agar tidak memiliki dua sumber angka.

Kriteria: brand fidelity, komposisi visual, kegunaan informasi, arahan konversi, interaction/accessibility, motion, kualitas teknis, dan variasi layout. Skor akhir = jumlah `weight × rating/5`.

Kelulusan lokal memerlukan skor ≥85, semua dimensi ≥3, brand/visual/interaction masing-masing ≥4, semua gate/check wajib pass berbukti, dan tidak ada temuan local major/blocker. `--history` wajib dipilih eksplisit; laporan mencantumkan path, jumlah record dan nama seluruh prospek pembanding. Array kosong berarti kebaruan unassessed dan nilai originality maksimal 4; seed Historia hanya satu baseline, bukan seluruh portofolio. Jarak ID menjadi diagnostik metadata_overlap/metadata_distinct, bukan keputusan kreatif atau gate. layoutException hanya catatan; composition_comparison dan temuan render menentukan perlunya revisi. Skor pembuat tidak menggantikan penerimaan desain oleh pengguna.

Ini **aturan operasional awal**, belum dikalibrasi terhadap konversi komersial. Perbaiki bobot/threshold berdasarkan beberapa hasil yang diterima pengguna dan respons prospek; jangan mengklaim skor memprediksi penjualan.

## Pemeriksaan browser yang benar-benar dilakukan

- `clean_copy`: tinjau seluruh copy desktop/mobile menurut [copy bersih](design-rules.md#copy-bersih), catat teks yang dihapus/dipertahankan beserta fungsinya dan bukti render. Pastikan informasi keputusan, disclosure, error dan label aksesibel tetap ada. Bila susunan membutuhkan penjelasan, perbaiki layout sebelum menambah teks. Copy generik lintas nama usaha diperbaiki tanpa klaim bisnis baru.
- Buka render desktop dan 320/390/768 px. Periksa font loaded, logo, crop, paragraf, harga, header, tombol dan overflow. Periksa seluruh halaman, bukan hero saja.
- Ikuti semua CTA utama dan anchor. Untuk kontak eksternal, verifikasi destination tanpa mengirim pesan. Peta harus menunjuk bisnis/cabang benar.
- Katalog: item/foto/harga/varian sesuai sumber, kategori, pencarian lintas kategori, kosong/reset/load-more, jumlah hasil dan dialog. Buka search mobile, periksa fokus, Escape/close, keyboard dan animasi.
- Scroll katalog: toolbar di bawah header, filter saat scroll jauh menampilkan hasil, toolbar hilang saat masuk section berikutnya. Uji dropdown portal ketika sticky.
- Carousel: previous/next mengubah item sebenarnya, caption tidak tabrakan, CTA berpanah bawah satu baris dengan kontrol pada 320 px.
- Accordion: hanya satu panel, transisi buka/tutup. Dialog: fokus terperangkap, Escape, fokus kembali, tidak menjadi kotak kosong saat exit.
- Emulasikan reduced motion dan muat halaman baru. Periksa parallax/marquee/scroll halus, konten tetap terlihat dan tidak ada hydration error.
- Periksa error browser, status gambar dan optimasi runtime. Tampilan lokal tidak membuktikan deployment.
- Periksa cakupan media terhadap inventori sumber: foto produk yang cocok sudah dipakai, pencarian pada jalur relevan tercatat, crop/resolusi sesuai desktop/mobile, dan gap dijelaskan di mediaCoverage. Nilai brand/visual/information serta gate authentic_content berdasarkan hasil nyata, bukan jumlah unduhan. Banyak gambar tidak menutupi foto salah atau komposisi buruk.

Cocokkan inventori tautan bio dan `pagePlan.contentCoverage` dengan halaman aktual. Paket, testimoni, layanan atau informasi penting yang ditemukan memiliki penempatan atau alasan penghilangan yang konkret. Nilai dimensi information dan checks content_sources berdasarkan kelengkapan temuan tersebut; jangan menyatakan lengkap hanya karena katalog menu sudah lengkap. Kutipan, atribusi, syarat paket dan validitas promo tetap akurat.

Checklist di atas mengikuti kemampuan aktif. Review visual dicatat terpisah dari hasil mesin, dengan screenshot seluruh halaman serta state terkait. Versi ini belum menyediakan runner Playwright/axe; jangan menyebut audit HTTP atau unit tests sebagai pengujian browser otomatis. Bila tooling browser tersedia, lakukan interaksi nyata dan rekam hasilnya; status unknown tetap memblokir kelulusan. Pengujian berikutnya yang bernilai: cafe 10–15 produk, barbershop lima jasa, restoran dengan PDF besar. Catat fakta salah, durasi, revisi manual, hasil setiap check dan penerimaan; fixture sintetis tidak menggantikan ketiganya.

Pakai browser tooling yang tersedia dan diizinkan. Jangan menulis DOM lewat evaluate untuk membuat tes lolos. Jika suatu kemampuan tidak tersedia, tandai unknown dengan batas yang jelas.

## Siklus perbaikan dan handoff

Simpan review awal → perbaiki gate/weakest dimension → review ulang bukti terdampak. Setelah dua putaran gagal pada masalah sama, diagnosis ulang dan ubah pendekatan; ini checkpoint, bukan batas penghentian pekerjaan. Lanjutkan perbaikan yang dapat diselesaikan dan laporkan ketergantungan nyata bila membutuhkan input. Hard blocker tidak menjadi pass karena budget/waktu. Sinyal metadata bukan alasan meminta approval; nilai kemiripan pada render. Untuk kalibrasi arah yang diminta, penilaian pengguna atas dua prototipe menjadi hasil tahap tersebut; bila masih serupa, revisi komposisi sebelum menambah katalog atau animasi.

Handoff menyebut status `ready_for_local_review`, `needs_revision`, atau `invalid_review`, skor/coverage, screenshot, temuan terbuka dan scope yang selesai. Nilai tinggi bukan pengganti acceptance pengguna. Bandingkan secara visual dengan referensi dan alternatif page plan sebelum menyebut hasil polished.


Gunakan [referensi per section](section-reference-library.md) untuk brief, shortlist visual terbatas, matriks adaptasi dan pembandingan struktural. Pada quality, lampirkan hasilnya pada composition_comparison; dokumen/metadata saja tidak membuktikan kreativitas.
