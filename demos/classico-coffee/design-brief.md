# Classico — storefront index

Revision date: 23 October 2026. Existing SOURCE-NOTES.md records source inspection on 22 October; this run reuses those sources and the runtime image/menu archive. No new live Instagram, menu validity or publication-rights verification is claimed. Original research screenshots were not carried into this workspace. Runtime coffee-scene.webp and breakfast-table.webp were visually inspected: repeated geometric logo, warm copper coffee imagery, cream crockery and condensed/sans product typography. Interior imagery is predominantly warm wood and neutral dark framing. Dark green is retained only as the existing demo secondary surface; its exact status in the original brand system is unconfirmed. Existing Barlow Condensed and DM Sans remain licensed shape matches, not confirmed proprietary fonts.

## Candidates

Four self-contained HTML boards with matching PNGs show the opening, breakfast and catalogue at desktop/mobile widths. A uses a cream storefront masthead and three equally framed product doors; breakfast is a separate dark-green counter with a selected set and catalogue a photographic contact sheet. B uses one dominant coffee campaign image with a copper sign overlapping its corner; breakfast is a text price board and catalogue one image at a time. A is selected: actual product photographs do useful browsing work immediately, a denser above-fold structure replaces the old staggered photo collage, and a 2-column contact sheet on mobile preserves the distinction. B rejected: one-photo opening and sequential text ledger converge on other cafe demos. Board prices are illustrative composition labels; implementation must use unchanged menu.json transcriptions.

## System and reading order

Cream dominates the storefront and menu, copper acts as signage on the image doors and controls, dark green contains only breakfast. Barlow Condensed 700 provides sign-like scale; body DM Sans remains 16px. One factual h1: Coffee & bake. Three image anchors jump directly to a category in the real menu. Opening -> breakfast -> full menu -> WFC -> community forms -> location. Menu has six products per page, three columns desktop/two mobile; source photos are large, image-less products are typographic entries rather than invented images. Full variants and source-backed descriptions are retained. No new services, endorsements, claims or prices. Removed generic slogans and generic paragraph copy; business details, contact, hours and disclosure retained.

## Reference translation

| Section | Viewed ID | Retained mechanism | Adaptation | Rejected | Mobile |
|---|---|---|---|---|---|
| Opening / whole-page rhythm | template-kreme-01 | Oversized condensed sign above an image field; useful visit information as a compact edge | Three Classico product doors with shared baseline rather than floating photo scraps | Green/yellow palette, pills, random-floating photos | Sign remains first, three compact image doors remain side-by-side |
| Utility navigation / framing | template-crumb-02 | Masthead, ruled navigation and dense information edges | Copper/cream sans storefront, no newspaper costume | Serif masthead, heraldic crest, slogans | Logo and CTA stay short; image doors give direct menu access |
| Catalogue | template-crumb-04 | Strong difference in scale between image and compact name/price, clear rules | Contact sheet gives six genuine product photographs useful scale; variants follow their SKU | Newspaper typography, long editorial introductions | Two columns, image-less items retain name/price/details |
| Breakfast | template-streetwok-02 | Food image associated closely with an order-summary-like panel | Real breakfast set photo, tabs and factual prices on dark green | Neon, invented order tickets, split hero and pills | Two-part counter stacks photo above set selector and details |

Meaningful motion: door photographs zoom subtly on hover/focus; hero baseline settles once after mount; changing breakfast set crossfades only its source image; menu subset changes crossfade. Reduced-motion removes movement and smooth scrolling. Keep official shadcn/Base UI category selector, tabs and buttons, keyboard and Escape search focus behavior.

## Comparison and limits

All six demos are being revised concurrently, so final cross-demo comparison belongs to parent reviewer. Closest earlier composition is the previous Classico staggered three-photo copper cover: now equal-height image doors on cream, direct category navigation, breakfast before the menu, and two/three-column large photographs replace two-column thumbnail rows. Avoid Historia's immersive dining hero, Duduk's terrace/red hours and protein builder, Talkie's dark laboratory, Gulapadi's red food-market editorial and Bumi's album. Fonts/palette remain source-informed. Codex cloud runtime override was explicitly approved; isolated exact dependencies were provisioned and build/lint/tsc plus static Chromium checks passed; details in implementation-review.md. No local-quality pass claimed from boards alone.

## Refinement 2026-11-10

Etalase memberi porsi utama pada kopi, diikuti dapur dan pastry. Mobile memakai satu pintu tinggi dan dua pintu kecil bertumpuk. Foto sarapan lebar yang redundan disembunyikan di ponsel, tetapi foto set terpilih dan tabs tetap ada.

Identitas, aset dan data sumber arsip dipertahankan. Native anchors dan shadcn/Base UI controls tetap digunakan; panah pagination/galeri tetap fungsional. Motion gambar CSS hanya pada layar besar yang mendukung scroll timeline; fallback tetap terlihat, reveal mobile statis. Tidak ada fakta, harga atau testimoni baru. Referensi WF-08 menu ledger dilihat pada desktop/mobile untuk hubungan nama-harga dan garis pembatas, bukan untuk menyalin palet, serif, copy atau struktur seluruh halaman.

Validasi source: syntax-only TSX, parsing CSS, diff whitespace, aset literal dan integritas data. **Belum diverifikasi lewat render browser**: dependensi demo tidak tersedia dan instalasi/build/typecheck dilarang oleh batas sumber daya pengguna. Screenshot full-page dan tinggi aktual sebelum/sesudah belum tersedia. Status ini tidak menggantikan penerimaan desain sebelumnya atau mengklaim lulus visual. Laporan lengkap: `/data/workspace/cafe-brand-refinement/REPORT.md`.
