# Talkie Space Garut — local concept

Standalone Next.js demo in this folder. No changes to the Tampiloka or Temura applications.

## Preview

```powershell
bun install
bun run build
bun run start
```

Open http://127.0.0.1:3018. Development: `bun run dev`.
On this Windows host Bun scripts may fail within the sandbox. Use the available Node executable with `node_modules/next/dist/bin/next` directly. Do not change system runtime settings.

## Verify

`bun run lint`, `bun run typecheck`, `bun run check:demo`, and `bun run check:browser` (local server running; Chrome installed). Browser checks use headless Chrome, no authenticated browser profile and no external messages.

## Evidence and scope

- 94 menu items transcribed from the 24-page PDF linked by the official Carrd hub on 2026-10-22.
- 17 confidently mapped product photos plus group, coffee process, breakfast and facade images. No generated food or borrowed product images.
- Official Instagram confirms hours and breakfast. Carrd and PDF agree on WhatsApp. Its Maps link resolves to Talkie Space, Jl. Suherman No.52, Garut.
- Mineral Water has two source prices without size names. Import filter coffee remains “Tanya barista”. No invented review, facility, capacity or package price.
- DM Sans (SIL OFL) is an optical substitute for the heavy sans in the source artwork, not a verified brand font. Local copies and license are under public/fonts.
- Button and Select are shadcn Base UI primitives reused from the existing demo, with local tokens. Landing composition, copy, data and assets are independent.
- `research-bundle.json`: normalized source/fact/media/strategy record. `research/quality/`: review, screenshots and checks. `run-state.json`: handoff state.
- Original PDF stays local and is gitignored. `scripts/prepare-research.py` documents crop coordinates and visual transcription; it requires PyMuPDF and Pillow and regenerates the bundle. `scripts/check-demo.mjs` checks SKU count, IDs, files, unknown price and variants.

Concept disclosure and noindex are enabled. This demo is local only. Prices and availability reflect the source accessed on the research date; owner confirmation and publication rights remain pending. No deployment, push or outreach was performed.

Revision 2026-10-23: see [the parent comparison and validation report](../prospect-to-web-review.md) and this package’s `design-brief.md` / `reference-selection.json` for the current composition, actual checks and source-evidence limits. The new revision is built; user acceptance and a complete source-gate pass are not claimed.

Cloudflare deployment target: `talkie-space-demo`, production branch `master`, existing domain https://talkie.tampiloka.site. See [deployment record](../../docs/demo-redesign-deployment-2026-10-23.md) for the current push/deploy status; earlier local-only notes describe setup history.
