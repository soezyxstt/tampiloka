# Classico Coffee & Bake

Standalone Next.js static-export concept. No application imports, production booking backend, or external mutations. Sources and visual-reference decisions are in `research/`; menu and assets are local. Independent demo, noindex.

```sh
npm ci
npm run dev
```

Development: http://localhost:3026. `npm run build` generates `out/`; `npm start` serves the export at http://127.0.0.1:3036. Node 22 or newer. The user explicitly authorized local build and QA for this run. Browser review uses Chrome through Codex's browser tools.

Prices reproduce inspected business source material; current validity and reuse rights need confirmation before publication. The source menu has 25 raster pages; the F&B catalogue includes pages 1–24 plus newer official pizza and ricebowl posts. Tobacco advertising on page 25 is outside the cafe F&B demo scope. Asset crops retain page coordinates in `research/prepared/media/crop-manifest.json`.

UI provenance: official shadcn base-nova registry, Base UI primitives. Registry originals archived under `research/registry/design/`; only theme and Lucide icon adapter changed. Font downloads are TrueType (TTF), locally hosted Barlow Condensed and DM Sans, sourced from Google Fonts. Shape matches, not claimed exact proprietary brand fonts.

Revision v2: source-based copper menu cover and unequal photographic composition. Local QA 86/100 (self-review), 29 required checks passed; user acceptance pending. See research/quality/qa-report.json and research/design-brief.md.

Deployment uses GitHub repository soezyxstt/tampiloka, branch master, root demos/classico-coffee. Classico CI runs npm ci, lint, typecheck and build; the linked Vercel project also builds and validates source from the same commit. Do not upload out/ manually. Vercel project classico-coffee; custom domain https://classico.tampiloka.site. Research archives remain local.
