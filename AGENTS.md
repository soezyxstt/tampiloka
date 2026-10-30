<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Shared Tampiloka template discovery

The public template demos live in `soezyxstt/tampiloka-templates`. This repository owns the Tampiloka marketing site, shared brand system, and public discovery experience. Keep that boundary explicit when adding any new template family.

- Use the versioned public demo JSON from the templates repository at **runtime**. Both `apps/tampiloka`'s `/templates` gallery and its landing-page template preview use the same loader, validation, and catalog contract. New public entries must appear without a marketing source edit or rebuild.
- Derive families, labels, available modes, featured entries, demo URLs, and images from the catalog. Do not maintain another hardcoded demo array, closed `cafe | commerce` union, per-template URL constructor, or static count in marketing copy. A schema change must remain backward compatible or use an explicit new schema version.
- Validate the catalog before rendering it. Only show explicitly public entries; exclude client/prospect, unlisted, private, and unfinished demos. Require valid IDs, family/mode references, Indonesian/English text, and absolute HTTPS demo/image URLs. Never put repository tokens or private source URLs into browser code.
- Keep the catalog fetch independent of build time. Use a fixed server-side source and the same-origin catalog endpoint for the browser, with a request timeout and bounded caching. Reject malformed responses, retain only the last valid response for a limited time, label stale content, and offer retry. A catalog outage must leave the site's navigation, services, and contact routes usable. Do not silently substitute an old manually maintained list.
- The source defaults to `https://catalog.tampiloka.site/catalog.v1.json`; `TEMPLATE_CATALOG_URL` is a server-side runtime override. Share `lib/template-catalog.ts`, `lib/template-catalog-server.ts`, and `useTemplateCatalog` across consumers. `/api/template-catalog` remains dynamic with `Cache-Control: no-store`; use a six-second upstream timeout and validate before responding. Browser refresh is every 60 seconds while visible and on focus. Last valid browser data may survive for at most 24 hours and must show a stale state after a failed refresh.
- Preserve the locale when opening a demo with `lang=id|en`. Use `URL`/`URLSearchParams` so existing theme, mode, view, and hash state survives. Return links from demos lead to `/templates` or `/en/templates`.
- Keep preview images consistent with the current working demo. Refresh them when the shared demo chrome or template appearance changes, capture the real interface with a consistent 8:5 frame, and preserve the matching theme/mode. Future demo assets must have public HTTPS URLs that can be published with the demo or catalog, so adding a thumbnail does not require a marketing rebuild. Existing assets may retain their stable marketing URLs.
- Treat templates as a primary way to explore Tampiloka. Mention them in the landing page's opening and show a concise, working template preview early in the page. Keep the path to a discussion clear, keep real work separate from fictional demos, and do not invent counts, clients, results, or prices.
- Use existing shared header/footer/motion and reusable controls. The Tampiloka select at `apps/tampiloka/components/ui/select.tsx` is the visual reference for demo selectors. All demo families reuse the shared shell in `tampiloka-templates/packages/ui-core`, with top-level theme/mode selectors, consistent customer/staff navigation, and a bottom-right ID/EN control clear of fixed navigation/cart actions. A new family must join those rules rather than create a separate launcher.
- Check desktop/mobile layout, focus/keyboard behavior, open selects, language switching, search/empty states, unavailable/stale catalog states, URL preservation, and the appearance of a new catalog entry without rebuilding this app. Keep the relevant template and marketing tests in step with these contracts. Document actual verification and remaining limits.

These rules do not authorize publishing private prospect demos or changing Temura's unrelated product behavior. Changes to the public catalog belong in the templates repository; changes to marketing layout and its consumer belong here.

# Links and icon alignment

- Do not automatically append redirect arrows to every CTA, text link, card, or section heading. Use a clear destination label, the shared button/link variant, and visible hover/focus states. Text links may use a restrained underline; keep primary actions recognizable as buttons.
- Reserve icons for information or a distinct action: opening/closing a menu, expanding a select or accordion, moving a carousel, or a standalone external-launch control. Removing a decorative icon must not leave an empty control. Preserve native anchors, destinations, locale/query state, accessible names, and new-tab behavior.
- Center icon-only controls with flex/grid alignment, symmetric padding, and a nonshrinking block SVG. Give them an adequate touch target (at least 44 × 44 px for new controls). Text-link padding and typography must not leak into icon-only variants; fix the shared modifier and stylesheet cascade instead of applying per-icon translation offsets.
- Keep shared header/footer rules in `packages/brand-system`; do not patch the same issue separately on each route. Verify icon geometry and visual centering on desktop and mobile, with hover, keyboard focus, and menu open/closed states. Check a normal marketing page and an inner page after client navigation.

# Temura presentation rules

For work in `apps/temura`, follow the Tampiloka website's restrained style system. Keep copy short, concrete, and functional. Omit unnecessary headings, slogans, overlines, and repeated descriptions. Do not introduce decorative pills, badges, chips, or pill-shaped tabs. Avoid card-heavy layouts; prefer open sections, rows, lists, tables, and dividers, except where equal-size template previews or a specific interaction need cards. Dashboard and studio should read as working tools with essential labels and help. Primary CTA and header buttons follow Tampiloka's reusable brand system (`size="pill"` / `rounded-full`). These rules also apply to delegated work. See `apps/temura/AGENTS.md` for the detailed rules and the asset-download gate before creating invitation previews.

# Tampiloka brand assets and typography

## Assets

- Source of truth: `../GDV/brand-assets/`. Runtime copies: `public/brand/`. Keep the original export names and folder structure. Public URLs start at `/brand/`, never `/public/brand/`.
- Logos: `/brand/logos/{light,dark,black,white}/tampiloka-{symbol,wordmark,horizontal,vertical}-{theme}.svg`. Prefer SVG for interface logos; the wordmark is already outlined. PNG alternatives have `@1x` or `@2x` suffixes. Preserve aspect ratio, color, and clear space. Do not recreate the wordmark as live text or use CSS filters to recolor it.
- `light` logos belong on light surfaces; `dark` logos on dark surfaces. `black` and `white` are monochrome alternatives. Match the actual surface, not just the browser color scheme. The SVG artboards include transparent padding, so evaluate visible logo size when placing them.
- App assets: `/brand/icons/{theme}/`, including `app-icon`, `pwa-192`, `pwa-512`, `maskable-512`, `apple-touch`, and favicon PNG/ICO. Profile and OG images: `/brand/social/{theme}/`. Use the exported 1200x630 OG image and 512x512 profile image.
- App Router uses `app/favicon.ico`, `app/apple-icon.png`, and `app/opengraph-image.png`; refresh these copies when their source exports change. `public/site.webmanifest` references the PWA assets. A manifest alone does not implement offline support or a service worker.
- Reference guides are available under `public/brand/guides/` as PNG, SVG, and PDF. `public/brand/manifest.json` records export sizes and hashes. `public/brand/tokens/brand-tokens.json` records the exact Figma typography and colors. The copied `brand-tokens.css` is an export reference; do not import it alongside `app/globals.css`.
- Set `NEXT_PUBLIC_SITE_URL` to the verified absolute site origin before deployment so sharing metadata uses the correct domain. Do not assume the domain shown in a mockup is the deployment origin.

## Typography

- `app/layout.tsx` loads Inter 400/600 and Manrope 600/700 through `next/font/google`. `app/globals.css` is the runtime source of truth. Geist Mono is reserved for code. Tailwind `font-sans` maps to Inter and `font-heading` maps to Manrope; do not reintroduce a circular `--font-sans: var(--font-sans)` definition.
- Use complete `type-*` utilities instead of combining arbitrary sizes, weights, line heights, and tracking. They are mobile first and switch to desktop sizes at `48rem` (768px). Standard HTML headings inherit the corresponding heading styles; `h6` uses heading-5.

| Utility | Font / weight | Desktop / mobile | Line height | Tracking |
| --- | --- | --- | --- | --- |
| `type-display-xl` | Manrope 700 | 64 / 44 px | 1.05 | -3% |
| `type-display` | Manrope 700 | 56 / 40 px | 1.08 | -3% |
| `type-heading-1` | Manrope 700 | 48 / 36 px | 1.1 | -2.5% |
| `type-heading-2` | Manrope 700 | 36 / 30 px | 1.15 | -2% |
| `type-heading-3` | Manrope 600 | 28 / 24 px | 1.2 | -1.5% |
| `type-heading-4` | Manrope 600 | 22 / 20 px | 1.25 | -1% |
| `type-heading-5` | Manrope 600 | 18 / 18 px | 1.3 | -0.5% |
| `type-body-lg` | Inter 400 | 18 / 18 px | 1.6 | 0 |
| `type-body` | Inter 400 | 16 / 16 px | 1.6 | 0 |
| `type-body-sm` | Inter 400 | 14 / 14 px | 1.5 | 0 |
| `type-label-lg` | Inter 600 | 16 / 16 px | 1.2 | 0 |
| `type-label` | Inter 600 | 14 / 14 px | 1.2 | 0 |
| `type-label-sm` | Inter 600 | 12 / 12 px | 1.2 | +1% |
| `type-caption` | Inter 400 | 12 / 12 px | 1.4 | 0 |
| `type-overline` | Inter 600 | 12 / 12 px | 1.2 | +8%, uppercase |

- Typical landing hierarchy: Display → H2 → H3 → Body → Label → Caption. Use one semantic `h1` per page; a hero may use `<h1 className="type-display">`.
- Main website paragraphs stay at least 16px. Use body-sm only for secondary descriptions and caption only for helper text/metadata. Do not use Manrope for long paragraphs or Inter Bold for large headlines.
- shadcn components use Inter for controls. Button default/sm = label (14/600), lg = label-lg (16/600), xs = label-sm (12/600, +1%). Keep the Base UI behavior and accessibility props intact. When adding components, use heading styles for titles, label for actions/form labels, body for editable input text, and caption for helpers. Do not rerun shadcn init to reset the brand typography.
- Existing semantic color tokens remain the shadcn theme. Brand colors are exposed separately as `bg-brand-primary`, `text-brand-primary-dark`, `bg-brand-primary-light`, etc. Preserve readable text/background contrast.

## Validation

Use the installed Bun runtime: `bun run check:brand`, `bun run lint`, `bun run build`, and `bunx tsc --noEmit`. Check typography at desktop and mobile widths, confirm actual fonts load, and verify favicon, OG image, manifest, and public asset URLs before shipping. If this Windows host's nvm shim reports no active Node version, use an available Node executable directly for the Next.js/ESLint/TypeScript CLI; do not change machine-wide runtime settings as part of brand work. Webpack (`next build --webpack`) is a valid build verification fallback when Turbopack cannot start its Node CSS worker.

