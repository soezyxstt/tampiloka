# Handoff, build Novita, deploy Cloudflare dan penawaran

## Default: lokal siap ditinjau

Serahkan URL lokal, screenshot terbaik yang aktual, tujuan bisnis/keputusan desain, hasil checks dan scorecard, serta keterbatasan yang belum selesai. Jangan menjalankan Git push, membuat project/domain atau mengirim pesan hanya karena QA lulus. Draft penawaran opsional, bukan keluaran wajib default.

Runtime dapat berhenti antar-sesi; sebutkan cara menjalankan package mandiri. Jangan menyatakan URL localhost sebagai website publik. Simpan status penerimaan pengguna terpisah dari penilaian agent.

Preferensi pengguna untuk semua demo berikutnya: **build di Novita Sandbox, lalu ketika deploy diminta upload hasil statis ke Cloudflare Pages Free melalui Wrangler**. Tujuannya menghindari pemakaian build hosting dan biaya request server yang tidak dibutuhkan demo. Hosting statis gratis tidak berarti komputasi Novita, domain atau layanan tambahan gratis. Aturan ini tidak memigrasikan demo lama atau mengubah billing/account otomatis. Override provider/compute harus berasal dari instruksi eksplisit pengguna.

## Build di Novita Sandbox

Baca skill `novita-remote-build` yang tersedia (`C:/Users/adiha/.agents/skills/novita-remote-build/SKILL.md` pada host ini) dan referensi runner-nya sebelum eksekusi; verifikasi schema/parameter runner aktual. Preferensi ini berlaku untuk build, install dependency dan pemeriksaan berat, termasuk sebelum pengguna meminta deploy. Editing, Git dan pemeriksaan ringan tetap lokal.

1. Periksa script/lockfile/runtime dan kelayakan static export. Runner memerlukan Git workspace; untuk package non-Git, gunakan staging Git khusus sesuai panduan runner, tanpa mengubah repo lain. Hanya unggah source/input yang diperlukan. Pastikan aset yang diabaikan Git namun dibutuhkan build ikut dalam input yang aman; jangan mengandalkan node_modules laptop. Kredensial Cloudflare, env rahasia, auth browser dan data sensitif tetap di luar snapshot serta arsip keluaran.
2. Gunakan `novita_remote_run` bila schema live mendukung artifact return; jika tidak, gunakan wrapper PowerShell yang sudah terpasang. Perintah di sandbox adalah Linux, memakai runtime dan package manager project serta install dari lockfile. Jangan mengubah source hanya di sandbox: perubahan itu tidak diterapkan kembali ke laptop.
3. Simpan perintah multiline pada file UTF-8: install reproducible → checks yang diperlukan → build static export → arsip folder output aktual (`out/` untuk Next static export atau output project yang terverifikasi). Command harus gagal bila install/check/build/packaging gagal. Minta arsip file eksplisit melalui `artifact_paths`/`output_directory` atau `-ArtifactPaths`/`-OutputDirectory`, bukan direktori/glob. Ikuti batas ukuran runner aktual; optimasi atau pecah arsip bila perlu tanpa menghilangkan file runtime.
4. Unduh artefak dan log sebelum sandbox dibersihkan. Pastikan command exit 0, transfer artefak berhasil dan cleanup tercatat. Periksa entri arsip sebelum ekstraksi: tolak path absolut/traversal, symlink keluar dan file sensitif. Ekstrak ke direktori khusus yang diabaikan Git; simpan hash SHA-256 arsip, commit serta fingerprint snapshot sumber (termasuk dirty files), perintah/runtime dan log di artefak run.
5. Serve dan tinjau hasil statis yang dikembalikan menurut [quality-review.md](quality-review.md). Source berubah setelah build berarti artefak perlu dibangun ulang di Novita dan QA terdampak diulang. Jangan mengganti hasil yang diuji dengan rebuild di laptop atau Cloudflare.

Contoh invocation; isi path, timeout dan isi command file berdasarkan project serta budget runner:

```powershell
& "$env:LOCALAPPDATA\NovitaRemote\novita-remote.ps1" `
  -WorkingDirectory '<absolute-demo-or-staging-workspace>' `
  -CommandFile '<absolute-UTF8-Linux-build-script>' `
  -TimeoutSeconds <allowed-timeout> `
  -ArtifactPaths 'artifacts/demo-static.tar.gz' `
  -OutputDirectory '<absolute-local-ignored-artifact-directory>'
```

File command harus benar-benar menghasilkan arsip yang diminta dari output build; RPC selesai bukan bukti build atau download berhasil. Catat biaya/resource/lifecycle yang benar-benar dilaporkan, bukan perkiraan sebagai fakta billing. Missing auth, quota, batas budget atau resource mengikuti failure policy runner: perbaiki error source dalam scope, retry gangguan sementara secara terbatas; jangan menaikkan budget, pindah provider atau build lokal tanpa arahan pengguna. Bila jalur Novita tetap terblokir, laporkan ketergantungan spesifik dan lanjutkan pekerjaan ringan yang tidak bergantung padanya.

## Jika push atau deploy diminta

Push dan deploy adalah tindakan terpisah. Deploy via Direct Upload tidak mewajibkan Git push atau Git integration. Permintaan deploy yang jelas mengizinkan deployment demo tersebut, tanpa konfirmasi seremonial. Default tetap **Pages Free, statis, Wrangler**; jangan otomatis memakai Vercel, Workers/Functions atau layanan berbayar.

Sebelum hosting, jalankan [gate publikasi](publication.md). QA lokal lulus bukan izin memakai aset pending atau membagikan preview. Push ke remote publik juga memerlukan clearance konten yang terekspos; remote privat tidak mengubah hak pending menjadi cleared untuk website publik.

1. Periksa Git status, file di scope, remote/branch bila relevan dan snapshot yang menghasilkan artefak. Pertahankan perubahan lain; jangan destructive reset/force-push. Commit/push hanya bila diminta atau sudah diotorisasi. Simpan source, lockfile, lisensi font, provenance dan optimized assets yang diperlukan; ignore env/auth, build output dan arsip mentah besar. Periksa hook deployment lama agar push tidak tanpa sengaja memicu build Vercel/Cloudflare duplikat; tangani konfigurasi demo dalam scope yang diizinkan, tanpa mematikan proyek lain.
2. Jalankan Wrangler versi terpasang/terkunci dari host yang memegang autentikasi Cloudflare. Baca `wrangler pages --help` sesuai versi dan lakukan preflight read-only `wrangler whoami` serta `wrangler pages project list`. Verifikasi account dan nama project demo; jangan mewarisi ID Historia atau membuat project pengganti jika target ambigu. Jangan mengirim token Cloudflare ke Novita atau menaruhnya pada argumen/log.
3. Untuk demo baru, buat project Pages Direct Upload terpisah bila belum ada, dengan production branch yang disengaja. Tidak perlu cloud-side Git build. Arsip kode tetap boleh di Git tanpa integrasi build Pages. Bila pengguna secara khusus meminta Git integration, jelaskan konsekuensi terhadap alur build Novita dan ikuti instruksi eksplisitnya; jangan menambahkan pipeline lain diam-diam. Direct Upload tidak dapat diubah menjadi Git integration pada project yang sama; baca [docs terbaru](https://developers.cloudflare.com/pages/get-started/direct-upload/) sebelum memilih mode.
4. Unggah **folder hasil ekstraksi yang sudah diuji**, bukan repo, `.next/`, source, log, research bundle atau arsip tar. Gunakan executable Wrangler yang sudah tersedia; contoh berikut mengasumsikan target account sudah diverifikasi:

```text
wrangler pages project create <verified-project-name> --production-branch <actual-production-branch>
wrangler pages deploy <verified-static-output-directory> --project-name <verified-project-name> --branch <actual-production-branch>
wrangler pages deployment list --project-name <verified-project-name>
```

5. Branch upload harus cocok dengan production branch bila yang diminta production, atau branch preview yang disengaja bila preview. Pastikan URL/deployment ID benar dari output provider. Jangan mengaktifkan Functions, paid plan, R2 atau image optimizer server agar build lolos. Jika kebutuhan server benar-benar diminta dan tak dapat diekspor statis, jelaskan batas teknis serta pilihan kepada pengguna sebelum mengubah arsitektur/provider/biaya; pertahankan fungsi yang diminta.
6. Hubungkan domain yang diminta; bila belum ada, gunakan URL Pages yang dikembalikan provider. Periksa kepemilikan, project assignment dan authoritative DNS. Gunakan nilai DNS provider aktual; jangan mengubah record lain atau membeli domain tanpa instruksi. Deploy langsung tidak mengotorisasi pemindahan domain demo lama.
7. Tunggu deployment sukses, cocokkan snapshot/hash artefak dengan catatan run, lalu uji HTTPS URL final: direct-load/refresh rute, 404, metadata/noindex/banner, font/logo/gambar, kontak dan satu interaksi penting pada desktop/mobile. Lengkapi liveAccess dan ulangi gate sebelum membagikan tautan sesuai otorisasi. Upload sukses, build remote lulus dan situs live terverifikasi adalah tiga klaim berbeda.

Catat account/project, mode Direct Upload, branch, deployment ID/URL, domain, snapshot/hash build dan hasil verifikasi di run-state/artifacts. Sebut hanya status yang terbukti. Screenshot dev server tidak membuktikan artefak live. Harga/limit provider harus diperiksa saat dipakai, bukan dibekukan sebagai janji gratis tanpa batas. [Panduan Next.js statis di Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).

Permintaan push yang sudah jelas di akhir revisi berarti commit/push perubahan selesai dalam scope, tanpa terus mengubah desain. Jangan menunggu pengujian tambahan yang tidak relevan setelah pengguna meminta cukup/push. Jika belum memeriksa auto-deployment, laporkan push berhasil dan deployment belum diperiksa; jangan menyebut live baru hanya dari push.

Catat izin aset/fakta yang belum selesai dengan jujur dan pilih alternatif berizin jika perlu. Skill tidak mengubah otorisasi pengguna menjadi klaim clearance pihak ketiga atau alasan meminta persetujuan seremonial berulang.

## Draft outreach saat diminta

Paket singkat: tautan demo yang lulus gate dan liveAccess, dua screenshot final, 2–3 friksi digital teramati, manfaat konkret dari perbaikan, dan ajakan feedback/percakapan. Video 20–30 detik opsional jika diminta/berguna, bukan blocker tiap run.

Pesan menyebut nama bisnis, alasan pemilihan yang spesifik dan satu manfaat terbukti. Hindari menjelekkan pemilik atau menjanjikan kenaikan penjualan. Konsep independen tetap jelas, tanpa narasi teknis internal pada website.

Draft bukan izin mengirim. Kanal, penerima, isi dan otorisasi pengiriman harus jelas. Jika tidak ada instruksi send, serahkan draft tanpa mengirim atau membuat follow-up otomatis.
