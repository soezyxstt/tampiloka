# Temura

Temura is the Sentuh Undang application rebranded as a Tampiloka product. Source imported from `soezyxstt/e-invitation` at `aa70295`. It preserves Prisma/PostgreSQL, NextAuth credentials, Uploadthing, six invitation templates, invitation editing, RSVP, MC view, live wall, and QR check-in.

## Local development

Install from the monorepo root with `pnpm install`, then run `pnpm dev:temura`. Copy `.env.example` to `.env` and supply the database and auth secret. `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` should both be `http://localhost:3001` locally. Prisma generation runs during installation and build; it does not mutate the database.

The six landing previews use the existing `/demo-geulis` invitation with `?template=1` through `6`. Keep that published demo in the selected database. The legacy `/demo/nara-aruna` route redirects to it. Existing invitation slugs remain valid.

## Deployment on Vercel

Create a separate Next.js project connected to the monorepo, with Root Directory `apps/temura` and access to files outside that root for the shared brand package. Use the repository's pnpm workspace installation and `pnpm run build`. The default `.next` output applies.

Required environment variables:

- `DATABASE_URL`: existing Sentuh Undang Neon pooled PostgreSQL URL, or a separately prepared compatible database.
- `NEXTAUTH_SECRET`: existing auth secret or a newly generated strong secret. Changing it invalidates existing sessions.
- `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL`: the same verified production origin. The intended origin is `https://temura.adihnursyam.com`; confirm its Vercel domain assignment before shipping.
- `ADMIN_WHATSAPP`: the business number in international digits. If empty, ordering buttons link to Tampiloka's contact page.

Optional: `UPLOADTHING_TOKEN` for uploads, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for map embeds, `FONNTE_TOKEN` for automatic RSVP notifications.

No database migration is needed for the rebrand against the existing database. Do not run schema push or demo seed against an existing production database. A new database must be provisioned separately. The optional demo seed now requires `SEED_ADMIN_USERNAME` and a `SEED_ADMIN_PASSWORD` of at least 12 characters; it skips existing invitations and does not reset existing users' passwords.

## Verification

Run `pnpm --filter @temura/web check:brand`, `pnpm --filter @temura/web lint`, `pnpm --filter @temura/web typecheck`, and `pnpm --filter @temura/web build`. `pnpm --filter @temura/web build -- --webpack` may be used when a local Turbopack CSS worker cannot start (or invoke `next build --webpack` inside the app).

After deployment, check the landing, six template links, `/login`, logged-out `/admin` redirect, favicon, Apple icon, OG image, and `/site.webmanifest`. Verify admin CRUD, uploads, RSVP, MC, and check-in with disposable data in a test environment before changing the production origin. Rebrand validation itself does not write database records.

## Brand

`@tampiloka/brand-system/styles.css` owns the responsive Inter/Manrope typography and colors used by marketing, login, and admin. Invitation templates keep their own Cormorant/Lato design typography. The templates display the exported Temura endorsement logo.

`public/brand` contains 128 unchanged original Figma logo/icon/social exports from Logo Exports, plus the current Temura guide from Style Guide. Original filenames are preserved. `manifest.json` records source names and SHA-256 hashes. The ICO favicon is generated from exported favicon PNGs; the App Router OG and Apple images are copied from the originals. The web manifest does not provide offline support.
