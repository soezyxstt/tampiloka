# Temura web assets

108 selected source assets, each with three WebP sizes. Runtime URLs and measured dimensions are in `manifest.json`. PNG source originals remain in `artifacts/temura-overhaul/downloaded-source/`; this directory contains web derivatives only.

| Asset | Main | Small | Thumbnail |
| --- | --- | --- | --- |
| Background | 1024 × 1536 | 480 × 720 | 240 × 360 |
| Ornament | Fits within 1024 × 1024 | Fits within 512 × 512 | Fits within 192 × 192 |

Aspect ratios are preserved, with no cropping or upscaling. Ornaments retain real alpha transparency. Main and small ornaments use WebP quality 90 with alpha quality 100, or lossless encoding for pixel art and inexpensive sparse artwork. Backgrounds use quality 84; thumbnails use 78–84. Embedded source metadata is stripped from web derivatives.

Use `variants[].url` from the manifest, not the PNG paths in the historical planned asset catalog. `full` has the plain canonical name with `.webp`; `small` adds `-480` or `-512`; thumbnails add `-thumb`.

Use thumbnails in the studio asset picker, small ornaments for modest placements, and main images for large or high-density placements. For background `srcset`, use the 480 and 1024 widths with the actual rendered `sizes`. Set image width/height or aspect ratio to avoid layout shifts. Lazy-load offscreen images; do not eagerly load the entire library. PNG originals are for source editing, not routine page delivery.

Generated files can be reproduced with `artifacts/temura-overhaul/optimize-assets.cjs` using the bundled Node runtime and Sharp. `verify-webp.cjs` verifies hashes and decodes every derivative, and builds visual comparison sheets. No invitation preview is implemented by this conversion.
