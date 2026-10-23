# Historia Coffee demo

Standalone Next.js concept for Historia Coffee & Eatery Garut. This directory is outside the Tampiloka/Temura apps and the pnpm workspace. It has no workspace package dependencies and can be copied into its own repository.

## Local development

From this directory:

```powershell
bun install
bun run dev
```

Open http://localhost:3004. Use Node.js 20.9 or newer. Stack: Next.js 16.3.8, React 19.2.8, TypeScript, Tailwind CSS 4, and Motion (`motion/react`).

## Checks and build

```powershell
bun run lint
bun run typecheck
bun run build
node scripts/check-demo.mjs
```

If this Windows host cannot start a Turbopack CSS worker, use `bun run build --webpack`. Run checks from this directory; root workspace commands do not include this independent project. There is no Tampiloka brand verifier because this concept uses the prospect's visual direction.

## Handoff

This is a local, independent design concept, not Historia's official website. No deployment or outreach is performed by these setup files. Keep demo disclosure and `noindex` metadata in place. Before sharing or deployment, verify current business facts and obtain permission for third-party assets recorded with pending rights in `research/`. `noindex` does not restrict access; configure preview access with the chosen host if required.

For a separate deployment, select this directory as the project root, install its dependencies, build it, and configure its own subdomain. Set `NEXT_PUBLIC_SITE_URL` only to that verified origin if sharing metadata uses it.

Hosting uses the existing Cloudflare Pages Direct Upload project `historia-demo`, production branch `master`, custom domain `https://historia.tampiloka.site`. The old Vercel project was removed during migration. Upload the verified static `out/` artifact; do not create a new project or change the domain.

Original PDFs, research media and screenshots stay local and are ignored by Git. The source URL, SHA-256 fingerprint, product data and image provenance are committed. To repeat PDF-level extraction checks, download the source recorded in `data/menu.json` to its documented research path. Catalogue and runtime-asset checks also work without that original file.

## Research and design

`research/business.json` records factual evidence; `assets.json` records media provenance and pending permissions. `selected-assets.json` maps optimized public images to the retained originals. `strategy.json` captures the page plan and reference decisions; `client-brief.md` includes an unsent outreach draft. These files preserve the first run for the later skill extraction.

Typography follows the official menu's Poppins hierarchy (400/500/600/700), locally hosted with its OFL license. PDF font inspection also found Quiche Display in supporting text; its embedded subsets are not reused as webfonts. Main UI uses the verified Poppins family rather than the earlier editorial serif.

The catalogue contains 71 products in 17 source categories with extracted, transparent product photos. Source PDF, prices, page mappings and image provenance remain in `research/menu/` and `data/menu.json`. The visitor flow uses the web catalogue, with no PDF navigation or internal source annotations. Original research downloads are not served from `public/`.

## Reusable UI

`components/ui/` contains themeable shadcn/Base UI primitives: Button, Accordion, Dialog, Collapsible, Input and Select. All six primitives are adapted from the official base-nova registry, retaining its Base UI composition, accessibility and exports. Local cn/Lucide imports, brand CSS and Button cream/icon variants are the adaptations. Select source: https://ui.shadcn.com/r/styles/base-nova/select.json (only local cn import and Lucide icons adapted). Pattern reference: https://ui.shadcn.com/docs/components/base/accordion. Styling lives in `components/ui/primitives.css`; brand fonts, colors and radii are CSS variables in `app/globals.css`. Accordion uses single-open mode for events, with an animated height/opacity transition. Dialog includes focus trapping, Escape dismissal and focus restoration. Navigation uses the same collapsible motion conventions.

Feature components consume these primitives rather than depending on Tampiloka or Temura packages. This portable directory can be reused for the next standalone demo; shared package/skill extraction follows acceptance of this first demo. Do not run shadcn init over existing brand styles.

Run `node scripts/check-catalogue.mjs` for category/search checks and `node scripts/check-demo.mjs http://localhost:3004` for local HTML/image checks. These complement browser interaction checks; they do not establish owner approval or current availability.

WhatsApp CTA icon: Simple Icons, https://github.com/simple-icons/simple-icons/blob/develop/icons/whatsapp.svg (CC0 collection). It identifies the existing WhatsApp destination; no message is sent by the site.

Revision 2026-10-23: see [the parent comparison and validation report](../prospect-to-web-review.md) and this package’s `design-brief.md` / `reference-selection.json` for the current composition, actual checks and source-evidence limits. The new revision is built; user acceptance and a complete source-gate pass are not claimed.

Cloudflare deployment target: `historia-demo`, production branch `master`, existing domain https://historia.tampiloka.site. See [deployment record](../../docs/demo-redesign-deployment-2026-10-23.md) for the current push/deploy status; earlier local-only notes describe setup history.
