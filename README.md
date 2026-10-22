# Tampiloka + Temura

Monorepo for two Next.js sites. Tampiloka is the web studio; Temura is its digital-invitation product. Both apps use the shared `@tampiloka/brand-system` package for colors, semantic theme tokens, and the responsive Inter/Manrope typography utilities.

## Apps

| Workspace | Local URL | Production origin |
| --- | --- | --- |
| `@tampiloka/web` | http://localhost:3000 | `NEXT_PUBLIC_SITE_URL` (`https://tampiloka.site`) |
| `@temura/web` | http://localhost:3001 | `NEXT_PUBLIC_SITE_URL` (Temura: `https://temura.tampiloka.site`) |

## Development

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts both apps. To run one app, use `pnpm dev:tampiloka` or `pnpm dev:temura`. `pnpm build`, `pnpm lint`, and `pnpm typecheck` run their matching tasks across the workspace. With Tampiloka running locally, use `pnpm verify:marketing` to check its marketing routes and assets. Set `MARKETING_ORIGIN` when Tampiloka uses a non-default port.

Each Vercel project should use its app folder as the project root (`apps/tampiloka` or `apps/temura`). Set `NEXT_PUBLIC_SITE_URL` separately for each deployment. `NEXT_PUBLIC_TEMURA_URL` on Tampiloka may override the default Temura destination.

## SEO

- Tampiloka sitemap: https://tampiloka.site/sitemap.xml
- Temura sitemap: https://temura.tampiloka.site/sitemap.xml
- Each app serves `robots.txt` at its origin root and references its sitemap.
- Search Console verification uses `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` per Vercel project.

See [docs/seo.md](docs/seo.md) for verification steps, indexing rules, and structured-data coverage.

## Shared brand system

`packages/brand-system/styles.css` owns the shared Tailwind theme mappings, color tokens, base styles, and all `type-*` utilities. Each app loads Inter 400/600 and Manrope 600/700 in its own root layout and imports this stylesheet. Keep those font families, weights, CSS variable names, and breakpoints aligned.

## Tampiloka marketing images

Keep original Gemini downloads in `apps/tampiloka/public/generated`; the site serves optimized WebP copies from `apps/tampiloka/public/images`. The Wedding industry image uses `Gemini_Generated_Image_351n32351n32351n.jpg` and becomes `industry-wedding.webp`. The digital-invitation image uses `Gemini_Generated_Image_sfow6usfow6usfow.jpg` and becomes `service-digital-invitation.webp`. To replace either source, update its entry in `apps/tampiloka/scripts/image-manifest.json`, then run:

```sh
pnpm prepare:images
```

The converter caps width at 1800 px without enlarging and writes WebP at quality 84.

Temura now contains the rebranded Sentuh Undang application. See [Temura setup and deployment](apps/temura/README.md) for database/auth environment variables and production verification.
