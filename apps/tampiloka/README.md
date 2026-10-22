# Tampiloka

The public studio site for Tampiloka, built with Next.js App Router and the shared brand system.

## Environment variables

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL and metadata origin for production | `https://tampiloka.site` |
| `NEXT_PUBLIC_TEMURA_URL` | Origin for the Temura digital-invitation application | Development: `http://localhost:3001`<br />Production: `https://temura.tampiloka.site` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token | empty |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools `msvalidate.01` token | empty |
| `NEXT_PUBLIC_YANDEX_SITE_VERIFICATION` | Yandex Webmaster verification token | empty |

## Local development

The app serves locally on http://localhost:3000. During development, links to Temura use http://localhost:3001; production links default to `https://temura.tampiloka.site` and can be overridden with `NEXT_PUBLIC_TEMURA_URL`.

```sh
pnpm --filter @tampiloka/web dev
```

Run tests, linting, and type checking:

```sh
pnpm --filter @tampiloka/web lint
pnpm --filter @tampiloka/web typecheck
pnpm --filter @tampiloka/web build
```

Verify marketing page contents, navigation, and required assets:

```sh
pnpm --filter @tampiloka/web verify:marketing
```

Set `MARKETING_ORIGIN` if the dev server runs on another port or URL.

## Deployment on Vercel

Configure a Next.js project with Root Directory `apps/tampiloka`. Set `NEXT_PUBLIC_SITE_URL` to the assigned domain and optionally configure `NEXT_PUBLIC_TEMURA_URL` when Temura runs on a custom domain.

## SEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Search Console verification: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel, then redeploy.

See `docs/seo.md` in the repository root for the full Search Console checklist, indexing rules, and structured-data coverage.
