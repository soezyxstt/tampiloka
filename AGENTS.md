<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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
