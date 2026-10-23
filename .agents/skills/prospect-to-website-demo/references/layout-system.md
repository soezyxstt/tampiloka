# Variasi landing page yang tetap sesuai merek

Tujuannya hasil berbeda karena kebutuhan, konten dan komposisi; bukan random template atau identitas yang berubah. Reuse primitive dan interaction contract dari aturan desain.

## Art direction mendahului family

Selesaikan brief sumber dan board sesuai [art-direction.md](art-direction.md) dahulu. Product-first/place-first/service-first adalah cara mengatur prioritas informasi, bukan template visual. Tidak ada kombinasi hero, catalogue dan media yang otomatis kreatif. Aset dan identitas boleh menghasilkan komposisi yang tidak menyerupai contoh lama; ID di bawah hanya kosakata pencatatan.

## Lima sumbu komposisi

Gunakan ID konsisten di page plan dan history, disertai susunan section sebenarnya. Pilihan mesin bersumber pada `assessment-policy.json` bagian `layoutValues`; tabel berikut menjelaskan vocabulary tersebut. Assessor menolak ID di luar daftar pada plan/review/history. Jangan mengganti nama ID yang komposisinya sama demi mengecoh assessor. Jika vocabulary perlu diperluas, ubah policy, schema dan dokumentasi bersama serta uji kompatibilitas history.

| Sumbu | Pilihan yang dapat dikombinasikan |
| --- | --- |
| `hero` | `full-photo`, `split-product`, `brand-typographic`, `photo-collage`, `cinematic`, `compact-direct` |
| `sequence` | `product-first`, `place-first`, `story-to-offer`, `essentials-first`, `event-first`, `service-first` |
| `catalogue` | `open-grid`, `photo-rows`, `compact-rows`, `featured-to-grid`, `service-rows`, `none` |
| `media` | `horizontal-strip`, `mosaic`, `alternating-scenes`, `single-story-image`, `process-sequence`, `minimal` |
| `narrative` | `product-craft`, `shared-moments`, `destination`, `quick-visit`, `expertise`, `curated-selection` |

Palette, font, radius dan copy tetap ditentukan merek; tidak masuk jarak kebaruan. Komposisi mobile ditulis tersendiri: urutan baca, crop, panjang judul, kontrol satu baris dan kepadatan.

ID narasi adalah kosakata komposisi internal. `curated-selection` tidak mengizinkan klaim kurasi pemilik atau menyembunyikan produk; `product-craft` tidak membuktikan produk handmade atau proses tertentu. Copy tetap memerlukan sumber.

## Pilih elemen berdasarkan kebutuhan

Hero foto dominan cocok bila foto tempat/produk kuat; typographic cocok bila identitas tipografi benar-benar kuat; collage memerlukan foto yang saling mendukung. Semua pilihan tetap memerlukan desain skala, crop, framing dan alignment, bukan nama family saja. Cinematic tidak dipilih tanpa video sah/fallback; mosaic memerlukan cukup foto layak. None hanya jika katalog memang tidak diperlukan. Hindari menjalankan daftar kombinasi sebagai generator template.

## Prosedur memilih

1. Tetapkan tujuan utama dan 2–3 hal yang membedakan bisnis dari sumber nyata.
2. Inventaris media berdasarkan fungsi/crop, bukan jumlah file saja. Produk dominan → product-first; interior dominan → place-first; layanan → service-first.
3. Buat dua kandidat terlihat memakai materi merek yang sama pada desktop/mobile: pembuka, satu section utama dan contoh menu. Bandingkan fokus, navigasi, hubungan elemen, urutan baca dan densitas; jumlah ID berbeda bukan target desain. Tentukan skala/posisi foto, hirarki huruf, blok warna, urutan section desktop/mobile, CTA dan motion. Beda ID tanpa beda komposisi tidak memenuhi tujuan.
4. Gunakan history aktual built/accepted, seluruh prospek berbeda di file yang diberikan. Cari screenshot hasil yang benar-benar dibangun, termasuk semua demo dalam scope audit; bandingkan render terdekat secara visual pada ukuran sebanding melalui composition_comparison. Jarak metadata di bawah layoutReviewDistance hanya menyoroti pasangan untuk ditinjau. ID sama dapat mewakili komposisi berbeda; ID berbeda dapat tetap terasa serupa. Tidak ada kelulusan/kegagalan kreatif dari angka ini.
5. Bila review render menemukan kemiripan mayor, catat unresolved local major dan perbaiki komposisi yang tetap cocok dengan bukti. `layoutException` boleh menjelaskan kendala/keputusan; teks itu bukan bukti visual dan tidak menghapus temuan. Kemiripan metadata sendiri tidak membutuhkan persetujuan tambahan.
6. Simpan kandidat terpilih dan alternatif yang ditolak. Bangun satu, kecuali pengguna meminta beberapa. Setelah selesai, catat signature, section order, screenshot dan status built; accepted hanya setelah persetujuan pengguna.

History kosong berarti kebaruan belum dinilai, bukan otomatis terbukti orisinal. Seed Historia hanya baseline satu kasus. Saat memperbaiki demo prospek yang sama, jangan memaksa struktur baru hanya untuk berbeda dari versinya sendiri; history assessor mengecualikan prospek yang sama.

## Review kreativitas yang konkret

Reviewer menjelaskan hierarki foto/teks, ritme full-width vs terbatas, peralihan kepadatan, susunan mobile dan alasan bisnis. Nama blueprint, jumlah animasi atau warna baru bukan bukti kreativitas. Lihat screenshot berurutan dari atas sampai bawah; temukan section monoton, ruang kosong yang tidak berguna dan transisi informasi yang membingungkan.


Gunakan [referensi per section](section-reference-library.md) untuk brief, shortlist visual terbatas, matriks adaptasi dan pembandingan struktural. Pada quality, lampirkan hasilnya pada composition_comparison; dokumen/metadata saja tidak membuktikan kreativitas.
