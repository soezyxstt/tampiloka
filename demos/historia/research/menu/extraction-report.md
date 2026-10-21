# Official Historia menu extraction

Accessed 21 October 2026 through the menu folder linked by Historia's official Instagram/Linktree. Public file ID: `1wnKDZJ8krV-tRUSY0PDZiIUsckuxN5X-`. Original PDF is retained locally as `MENU-DIGITAL-HISTORIA.pdf` (54,601,001 bytes, 31 pages). The original was not edited.

## Result

- `../../data/menu.json`: 71 actual products in 17 source categories, with numeric Rupiah prices, concise descriptions adapted from the PDF, public image paths and one-based page pointers.
- `product-image-manifest.json`: source page, embedded-image object, placement bounding box, image dimensions and pending publication permission for every product.
- `brand-assets.json` and `scene-assets.json`: source pointers for the real logo, wordmark, symbol, spoon and seven atmosphere/food photographs.
- `normalized-pages.json` / `normalized-text.txt`: selectable text extracted using pdfplumber. `raw-images.json` records 135 embedded images extracted with pypdf.
- `contact-01.jpg`, `contact-13.jpg`, `contact-25.jpg`: rendered-page review sheets. `products-01.jpg`, `products-25.jpg`, `products-49.jpg`: all 71 extracted product-image review sheets.

The product photographs are genuine embedded transparent cutouts, not crops of whole menu pages and not AI-generated food. Alpha transparency was preserved. Transparent padding was trimmed, then images were resized to at most 1000px and compressed to WebP. The Es Kopi Susu Historia and Es Kopi Susu Large entries use the same cup cutout because the PDF itself reuses it; this is not a claim that the physical sizes are identical.

## Brand evidence

The cover is cream with orange/rust typography and original Historia assets. Sampled cover background is `#FFF8E6` (RGB 255,248,230); the dominant opaque color of the original logo is approximately `#CD3C0F` (RGB 205,60,15). These are sampled artwork colors, not an assertion that a formal brand guideline has been supplied. Original logo assets were not recolored or recreated as text.

`/images/menu/historia-space.webp` is the clean embedded photograph from page 2, before the PDF's separate logo overlay. Other authentic scene photographs include `table-spread.webp`, `shared-table.webp`, `coffee-scene.webp`, `frappe-scene.webp`, `strawberry-scene.webp` and landscape `pasta-scene.webp`.

## Validation

All pages were rendered and reviewed in contact sheets. All 71 product cutouts were visually checked against the corresponding page layout; the unusual numbered mocktail arrangement on page 30 was manually mapped. Assertions checked unique IDs, image existence, positive prices, source PDF signature and SHA-256, page ranges, each product name's presence on its source page, and each price's presence on that page. Publication permission remains pending for these business assets.

Prices describe the PDF as accessed, not a guarantee of current operational pricing or availability. No owner confirmation, price update, publication, or outreach was performed. Keep the 191MB of local PDF/raw/review material outside the deployed public directory; only approximately 4.95MB of selected optimized assets were placed in `public/images/menu/`.
