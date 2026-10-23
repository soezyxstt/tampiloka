# Gate sebelum hosting dan berbagi tautan

QA lokal dan clearance publikasi adalah keluaran terpisah. Protected preview tetap hosting eksternal. Hak dan fakta ditinjau berdasarkan bukti, bukan tebakan skrip. Gate ini persyaratan workflow, bukan nasihat hukum atau izin dari pemilik.

## Input dan checks

Gunakan bundle tervalidasi, review lokal aktual, history dan [publication.template.json](../assets/publication.template.json). Schema: [publication.schema.json](../schemas/publication.schema.json). EvidencePaths relatif ke direktori bundle. Isi prospectId, target public/protected-preview, hash SHA-256 byte bundle/review yang persis akan dirilis, checks dan authorization.

Setiap check memiliki status pass/pending/fail, observed, checkedAt tanggal ISO, dan evidencePaths file nyata. Template kosong sengaja invalid. Pending bukan pass; isi tanggal review aktual dan bukti status yang tersedia.

- **factAccuracy:** tinjau sumber identitas/cabang/lokasi/kontak dan seluruh produk/harga/varian/promo yang tampil. Catat tanggal sumber dan konfirmasi terbaru; tanggal ada bukan jaminan harga masih berlaku. Fakta used dan offerings harus verified. Fakta konflik dihilangkan dari copy sambil mempertahankan catatan. Harga belum terkonfirmasi boleh null dengan jalur kontak yang tepat.
- **assetInventory:** cocokkan semua runtime image/font/logo/video/embed di source/CSS/DOM dengan manifest dan penempatan. Aset yang digunakan memerlukan cleared/licensed dengan bukti hak. Embed_only hanya embed HTTPS sesuai izin yang dibuktikan, bukan file unduhan. Pending/restricted diganti atau dihilangkan. Arsip yang tidak dipakai boleh tetap pending.
- **previewAccess:** periksa audience dan konfigurasi akses yang akan diterapkan, metadata/noindex serta data/rahasia yang terekspos. Noindex bukan kontrol akses. Target protected-preview memerlukan konfigurasi proteksi nyata, bukan URL sulit ditebak.
- **demoDisclosure:** periksa banner konsep independen yang terlihat, metadata dan copy yang tidak menyamar sebagai situs resmi yang disetujui. Konten pengunjung tetap terasa nyata, tanpa CTA PDF internal.
- **liveAccess:** setelah deployment, periksa HTTPS, audience/akses yang berlaku, noindex dan banner aktual. Boleh pending sebelum deploy pertama; tautan belum boleh dibagikan sebelum pass.

Authorization mencatat deploy/shareLink/outreach dan kutipan instruksi pengguna sebenarnya. Kesiapan bukan izin bertindak. ShareLink berarti membagikan tautan di kanal yang diminta; mengirim kepada prospek memerlukan outreach eksplisit beserta kanal/penerima/isi. Jangan meminta ulang izin yang sudah berlaku.

## Jalankan dan tindak lanjuti

```text
<venv-python> <skill>/scripts/check_publication.py <research-bundle.json> --review <review.json> --release <publication.json> --history <layout-history.json>
```

Skrip memvalidasi schema, mengulang relasi riset dan QA lokal dengan plan bundle, memeriksa hash input, rights/facts dan file bukti. Hasil terpisah: localQA, researchAccuracy, assetRights, publicRelease, deploy, shareLink, outreach. Release checks lulus dapat tetap menghasilkan tindakan not_authorized. Deploy boleh ready sebelum liveAccess, tetapi sharing/outreach menunggu live dan izin masing-masing. Exit 0 release_checks_passed, 1 release_blocked, 2 invalid_publication_review. Baca status tiap tindakan; exit 0 bukan perintah deploy/send.

Jika terblokir, selesaikan penggantian aset/koreksi data yang tersedia dalam scope. Input hanya diminta untuk ketergantungan nyata. Default lokal tidak mewajibkan memperoleh izin publikasi atau menghubungi pihak lain. Perubahan isi website mengulang QA/gate terdampak. Sebelum sharing, jalankan lagi dengan bukti live terbaru.

Skrip tidak menilai screenshot, mengonfirmasi sumber/hak secara mandiri, menerapkan proteksi provider atau mengirim pesan. Catatan reviewer memerlukan pemeriksaan aktual; deployment READY bukan bukti akses/disclosure benar.
