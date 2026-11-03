# Implementation and acceptance status

2026-11-04. Implemented on `feat/admin-form-builder`, based on master `15d8104`. GPT-6.1 Terra agents at high reasoning effort worked in bounded parallel lanes, followed by independent read-only reviews and integration fixes. Unrelated pricing, Temura and demo edits remain outside this feature.

## Delivered

The CMS, all 18 question types, editor, public renderer, immutable revisions, server validation, allowlisted Better Auth integration, private uploads/downloads, response table/lifecycle, slug aliases, limits, starter template and maintenance implementation are present. See [setup and workflows](form-builder.md) and [operations](form-builder-operations.md).

Dedicated Neon project `rapid-lake-09427207` has production `br-sweet-snow-a1yo0t8m` and development `br-orange-poetry-a1nkjdcu`, each with database `tampiloka_cms` and a private `form-uploads` bucket. Migrations 0000–0004 were applied in both environments. The production database was inventoried as empty before migration; five migration entries and 11 public tables were verified afterwards. Temura was not migrated.

The existing Vercel project `tampiloka` (`prj_4i97czfxVv5Lbenah27FaZ8mDblv`) uses `apps/tampiloka` and domain `tampiloka.site`. Configured names include `CMS_DATABASE_URL`, `CMS_STORAGE_ENDPOINT`, `CMS_STORAGE_REGION`, `CMS_STORAGE_BUCKET`, `CMS_STORAGE_ACCESS_KEY_ID`, `CMS_STORAGE_SECRET_ACCESS_KEY`, `BETTER_AUTH_URL`, and `BETTER_AUTH_SECRET`, with separate isolated development/preview resources. Production also has `CRON_SECRET`. Google credentials and allowlist were not fabricated or installed as empty production values.

Matching production values are in `apps/tampiloka/.env.prod`; Git ignore and absence from tracked files were checked. Root/app `.vercelignore` exclude environment files. The temporary `.drizzle-snapshot-repair` directory is also excluded from Git, lint and deployment; removing it was rejected by automatic execution policy, so it remains local.

## Actual checks

- `bun run test:forms`: 32 passing tests covering schema, asset access policy, renderer markup, authorization failure, request bounds, proxy status, lifecycle policy, routing repair and maintenance.
- `bunx tsc --noEmit --pretty false`: passed.
- `bun run lint`: passed, five warnings concerning image optimization and TanStack compiler compatibility.
- `bun run check:brand`: passed; 101 assets and 15 responsive typography styles verified.
- `bun run verify:catalog`: 12 passed, one existing generated-producer check skipped.
- `bun run build -- --webpack`: passed with dynamic protected CMS routes, public forms, image endpoint and cron route. A subsequent metadata-origin adjustment also passed TypeScript; final build status is recorded in the PR handoff.
- Earlier isolated live service/storage integration passed for lifecycle, conflicts, aliases, canonical retry, limits, historical revisions, PDF upload/attachment, signed reads, anonymous-read denial and cross-session/form rejection. Fixtures were cleaned. These checks predate some final fixes and do not prove the final browser workflow.
- Production-targeted maintenance **dry runs** and Drizzle consistency checks passed; no production deletion or live cron execution was tested.

## Required acceptance before release

1. Supply Google OAuth client ID/secret and intended admin email allowlist through secure environment settings. Register the exact callback URLs described in the setup guide, then redeploy.
2. Execute the extended isolated integration harness against the final source in an environment permitted to load development credentials. Its final live rerun was rejected by automatic execution policy; it remains unverified.
3. Verify real authorized sessions, API/download routes, editor autosave/recovery/conflicts, image previews, public uploads/submission and response inspection in desktop/mobile browsers, including keyboard/focus and custom-theme contrast. The local app launch on port 3007 was rejected by automatic execution policy; these browser checks did not run.
4. Verify a reviewed hosted preview and its stable `BETTER_AUTH_URL`/Google callback. No production release is authorized by these local checks. Cron becomes active only after deployment; monitor its logs and backlog.

Signatures identify supported file formats, not malware absence. No malware scanner is configured. Editor recovery has a shared per-form browser key and browser-history limitations. Maintenance uses bounded batches, so purge completion can lag its 30-day eligibility date. Full acceptance remains open.
