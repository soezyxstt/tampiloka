# Kontrak data — skill v0.4.0 (schema bundle tetap 2)

Nama file boleh mengikuti repo; relasi ID mengikuti schema. Migrasi v0.1 harus eksplisit: pertahankan tanggal, bukti dan status unknown, jangan mengarang nilai agar valid. Snapshot v0.2 yang belum punya fakta identitas wajib dilengkapi dari sumber sebelum diperiksa ulang; screenshot lama harus diberi metadata capture aktual, bukan dimodifikasi agar tampak cocok.

## State dan resume

run-state.json mencatat prospectId, businessName, branch, stage, projectRoot, scope, artifacts, decisions, openIssues, authorization, sourceFingerprints dan lastUpdated. Authorization adalah kutipan instruksi pengguna untuk push/deploy/share/send; kredensial bukan izin. Resume dari bukti yang masih cocok. Fingerprint berubah mengulang pemeriksaan terdampak.

## Bundle riset

Mulai dari [research-bundle.template.json](../assets/research-bundle.template.json), yang sengaja belum valid. [research.schema.json](../schemas/research.schema.json) memuat definisi profile, offerings, assets dan pagePlan. File kerja boleh tetap terpisah; gabungkan snapshot final menjadi research-bundle.json dengan schemaVersion 2 sebelum validasi. Bundle adalah snapshot terkoordinasi, bukan salinan yang diedit terpisah.

Letakkan bundle di root project/run yang menaungi semua file sumber/runtime yang dirujuk. Semua path relatif ke direktori bundle, harus tetap di dalamnya, termasuk symlink, dan menunjuk file tidak kosong. Simpan raw seperlunya; tanpa cookie/token/data akun browser. public/ hanya runtime media yang sengaja tampil.

- **profile:** prospectId, name, branch nullable, sources, facts. Source: id, url URI (file: boleh untuk sumber lokal), accessedAt tanggal ISO, locator halaman/object/post, summary, evidencePath, fingerprint SHA-256 file. Evidence boleh PDF asli atau catatan URL/waktu/klaim/batas verifikasi. Fact: id, field, value, sourceIds, checkedAt, status verified/unverified/conflicting, used, limitation. Fakta konflik yang tidak tampil tetap dapat disimpan.
- **offerings.items:** id, name, kind product/service, category nullable, description, sourceIds, status, price, promo, variants, imageId nullable. Price: amount number >=0 atau null, currency, checkedAt, sourceIds. Amount terisi wajib tanggal/sumber. Variant: id, name, price. Promo null atau description/checkedAt/sourceIds. ID unik, referensi ditemukan, tanggal tidak di masa depan. Tanggal lama bukan bukti harga masih berlaku hari ini.
- **assets.items:** id, kind image/logo/font/video/illustration, subject, sourceIds, productIds, sectionIds, authenticity verified/illustration/unknown, rightsStatus cleared/licensed/embed_only/pending/restricted, rightsEvidence path[], attribution, deliveryMethod file/embed, runtimePath, embedUrl, width, height. Nilai yang tidak relevan boleh null. Semua media/font yang tampil masuk inventori. Autentisitas terpisah dari hak pakai; sumber resmi tidak otomatis cleared. Foto produk harus verified untuk SKU-nya; tanpa foto tepat, imageId tetap null.
- **pagePlan:** prospectId, primaryGoal, features, sections, media, layoutSignature, candidates minimal dua, selectedCandidate. Section: id, features[] aktual. Media: assetId, productId nullable, sectionId. Mapping harus cocok dengan productIds/sectionIds aset. Candidate: id, layoutSignature, rationale. Signature terpilih sama dengan plan. Tambahkan brand evidence/tokens, provenance komponen, desktop/mobile, motion, conversion path, gap dan history comparison; schema mengizinkan metadata strategi tambahan.

Features: catalogue, categoryFilter, search, stickyToolbar, loadMore, productDialog, carousel, accordion, location. Semua boolean final dipilih berdasarkan kebutuhan. Union fitur per section sama dengan flag true. Filter/search/sticky/loadMore/dialog memerlukan catalogue; sticky memerlukan search atau filter. Catalogue cocok dengan offerings dan signature selain none. Filter kategori membutuhkan dua kategori bermakna. Aset/SKU/section tidak boleh tertukar.

pagePlan.visualIdentity wajib sejak v0.2.4. Isinya confidence high/medium/low, observations, retained, adapted, avoidedDefaults. Setiap observation: aspect palette/typography/composition/imagery/graphicLanguage, sourceId yang ditemukan, evidencePath gambar sumber lokal PNG/JPEG/WebP yang dapat dibaca, observation dan translation spesifik. Kelima aspek wajib tercakup; tidak harus lima gambar berbeda. Render PDF ke gambar bila perlu. Retained/avoidedDefaults minimal satu keputusan; adapted boleh kosong jika tidak ada penyesuaian. Lihat [art-direction.md](art-direction.md). Gambar sumber dapat sama bila membuktikan beberapa aspek; sourceIds dan path tetap jujur. Validator memeriksa schema/relasi/gambar, bukan isi analisis.

Snapshot lama dilengkapi brief dari sumber nyata sebelum dinilai ulang, bukan diisi retroaktif dengan klaim yang belum diamati. Review template memuat brand_translation/composition_comparison dan catalogue_pacing; ulangi checks tersebut pada render yang sebenarnya. Jangan menimpa report demo lama seolah sudah memenuhi pemeriksaan baru.

Nama profil wajib cocok persis dengan fact `field: "name"`, status verified, used true dan sumber valid. Branch non-null membutuhkan fact `field: "branch"` dengan nilai sama. Facts kosong, nama yang diganti tanpa bukti atau identitas yang ditandai unused ditolak bahkan untuk validasi lokal. Fakta alamat/kontak/jam mengikuti apa yang benar-benar ditampilkan; jangan memaksa kelengkapannya dengan nilai rekaan.

## Validasi mesin

Gunakan virtualenv Python 3.10+ untuk validator riset, screenshot dan publication. requirements.txt mencakup jsonschema dan Pillow:

```text
python -m venv <run>/.venv
<venv-python> -m pip install -r <skill>/scripts/requirements.txt
<venv-python> <skill>/scripts/validate_research.py <project>/research-bundle.json
```

Validator memakai JSON Schema Draft 2020-12 dengan format checker tanggal/URI, lalu memeriksa ID, fingerprint/file, mapping foto serta konsistensi fitur. API mengikuti [dokumentasi jsonschema](https://python-jsonschema.readthedocs.io/en/stable/validate/). Ia tidak browsing/OCR atau membuktikan isi sumber benar. Exit 0 research_valid, 2 invalid_research. Hak pending/fakta konflik yang tidak dipakai dapat valid secara struktur; publicationIssues tetap dilaporkan.

## Review lokal

Salin [review.template.json](../assets/review.template.json) ke research/quality/review.json; evidence di subfolder evidence/. Salin pagePlan final bundle ke quality/page-plan.json sebagai snapshot, dirujuk pagePlanPath relatif di dalam folder review. Perubahan plan memperbarui keduanya dan mengulang QA terdampak. Gate publikasi menilai ulang review memakai plan bundle, sehingga skor lama tidak meloloskan plan berbeda.

- Identitas: prospectId, reviewId, reviewedAt, reviewer, scope local.
- Features: seluruh boolean policy dan featureNotes untuk setiap false. Template null berarti belum diputuskan.
- Evidence: ID -> kind, path, summary, viewport opsional. Kind screenshot/log/dom/source/review, path tetap di folder review. Screenshot PNG utuh wajib viewport width/height dalam CSS px; captureMode default viewport dan deviceScaleFactor default 1. Untuk retina/capture device pixels catat scale aktual; capture dalam CSS pixels memakai 1. Ukuran PNG harus sama dengan viewport dikali scale. Full-page harus menyebut captureMode fullPage, lebar tetap cocok dan tinggi minimal viewport dikali scale. Crop section bukan screenshot viewport dan tidak menggantikan bukti render wajib.
- Gates/checks: status, observed, evidence ID[]. Pass hanya setelah tindakan/observasi nyata. Feature inventory wajib memeriksa implementasi/DOM/render, bukan plan saja.
- Ratings: rating 0..5, observation, evidence ID[]. Signature kanonik cocok dengan plan; layoutException tetap catatan opsional tanpa mengubah gate/status; unresolved berisi scope/severity/description. Kemiripan visual mayor menjadi temuan local major. Check inti clean_copy memerlukan screenshot dan review nyata; review lama perlu menjalankan check baru, bukan diberi pass retroaktif. Schema research/publication tetap sama; output assessor dan policy v3 berubah sesuai kontrak ini.

```text
python <skill>/scripts/assess_demo.py <review.json> --history <layout-history.json> --output <qa-report.json>
```

`--history` wajib pada assessor dan check_publication; tanpa argumen CLI berhenti dengan exit 2. Gunakan riwayat workspace aktual, array kosong bila belum ada hasil, atau seed hanya bila sengaja dipilih sebagai baseline satu kasus. Laporan novelty mencatat historyPath (CLI), historyRecords, comparedProspects dan comparisons berisi prospectId/name/distance/differentAxes. Seluruh prospek berbeda dibandingkan, versi terbaru per prospek; prospek yang sedang dinilai dikecualikan. Status novelty unassessed/metadata_overlap/metadata_distinct hanya diagnostik. Exit 0 ready_for_local_review, 1 needs_revision, 2 invalid_review. Laporan publication menyertakan historyPath dan localComparison. Assessor tidak browsing/deploy atau memverifikasi hak. Lihat [publication.md](publication.md) sebelum hosting/sharing.

## History

Array tertua ke terbaru: prospectId, name, status built/accepted, date, signature, sectionOrder, evidence. Signature menggambarkan hasil nyata dengan ID kanonik. Gunakan history lintas demo. Historia satu baseline awal; tiga referensi bukan tiga hasil yang diuji skill.
