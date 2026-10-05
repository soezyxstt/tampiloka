# Web-ready Temura assets

2026-10-05. Converted the 108 selected native sources to 324 WebP derivatives directly in `apps/temura/public/assets/templates/`. No source PNG was modified. No invitation preview was created.

| Set | Bytes | Decimal MB |
| --- | ---: | ---: |
| Selected PNG originals | 139,089,520 | 139.1 |
| Main WebP versions | 20,423,830 | 20.4 |
| All three WebP sizes combined | 28,055,136 | 28.1 |

Main-file reduction: 85.3%. These are library totals, not the payload of one invitation. Load only the assets a design needs, and choose variants based on rendered size.

- Backgrounds: 1024×1536, 480×720, 240×360.
- Ornaments: fit within 1024, 512, or 192 pixels on each axis; original proportions preserved, no crop or upscaling.
- WebP quality 84 for backgrounds and 90 for ornaments, with exact alpha encoding. Pixel art and inexpensive line artwork use lossless encoding. Thumbnails use quality 78–84 unless lossless.
- Thumbnail mean size: 12.0 kB. Small-version mean: 58.7 kB. Main-version mean: 189.1 kB.

All 324 derivatives decoded successfully and matched their manifest hashes and dimensions. Main-file alpha channels for all 90 ornaments exactly match the resized sources. Representative side-by-side visual comparisons cover adat texture, a dark retro background, a game landscape, thin metallic linework, batik divider, Minecraft figures, and Tom & Jerry artwork. No material degradation was visible at the inspected presentation size. Transparent ornaments were viewed on light and dark opaque surfaces.

Evidence: `artifacts/temura-overhaul/webp-comparison-1.png` and `webp-comparison-2.png`. Runtime URLs, dimensions, byte counts, encoding, and SHA-256 hashes are recorded in `apps/temura/public/assets/templates/manifest.json`. Usage notes are in its sibling README.md. Use this runtime manifest instead of the planned catalog's PNG paths. Studio/library UI integration and invitation previews remain separate work.

Reproduce with `optimize-assets.cjs`; verify with `verify-webp.cjs`, using the bundled Node runtime and Sharp. Regional source artwork remains an AI-inspired decorative interpretation.
