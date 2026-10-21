# Tampiloka

The public studio site for Tampiloka, built with Next.js App Router and the shared brand system.

## Environment variables

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL and metadata origin for production | `https://tampiloka.site` |
| `NEXT_PUBLIC_TEMURA_URL` | Origin for the Temura digital-invitation application | Development: `http://localhost:3001`<br />Production: `https://temura.tampiloka.site` |

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
