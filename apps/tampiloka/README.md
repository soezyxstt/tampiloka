# Tampiloka app

This Next.js app lives at `apps/tampiloka` in the Tampiloka + Temura workspace. Use the root `README.md` for workspace commands and the image download workflow.

## App commands

```sh
pnpm dev:tampiloka
pnpm --filter @tampiloka/web build
pnpm --filter @tampiloka/web check:brand
pnpm --filter @tampiloka/web verify:marketing
```

The app serves locally on http://localhost:3000. During development, links to Temura use http://localhost:3001; production links default to `https://temura.adihnursyam.com` and can be overridden with `NEXT_PUBLIC_TEMURA_URL`.