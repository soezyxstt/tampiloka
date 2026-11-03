# Tampiloka CMS and forms

The CMS lives in `apps/tampiloka`. It has a separate Neon database, Better Auth configuration and private object storage. It does not use or migrate Temura's database or authentication.

## Routes and workflow

- `/admin/login`: Google sign-in for verified emails listed in server-side `ADMIN_EMAIL_ALLOWLIST`.
- `/admin`: current form counts and navigation.
- `/admin/forms`: search/filter, create, duplicate, archive and delete.
- `/admin/forms/new`: blank form or editable wedding-intake template.
- `/admin/forms/[id]/edit`: sections, all 18 question types, routing, images, draft autosave, recovery, undo/redo and shared-renderer preview.
- `/admin/forms/[id]/settings`: slug, colors, confirmation, response cap, UTC closing deadline and publication controls.
- `/admin/forms/[id]/responses`: historical revision labels, search/sort/filter, columns, pagination, details, private downloads, archive/restore/delete.
- `/f/[slug]`: anonymous, version-bound form submission and direct private-storage upload. Old slugs remain aliases.

Drafts use optimistic version checks. Publishing creates an immutable revision; submissions store that revision and canonical validated answers. Editing a draft does not change historical answers. Matching idempotent retries return the existing submission, including after closure. New submissions are rejected when closed or limited. The public response returns only a submission ID.

## Local configuration and migrations

Copy the variable **names** from `apps/tampiloka/.env.example` and configure the isolated development resources. `CMS_DATABASE_URL` is intentionally separate from Temura's `DATABASE_URL`. Never use the production database for ordinary development, disposable fixtures or integration tests.

The requested production values are stored in ignored, untracked `apps/tampiloka/.env.prod`. Next.js does not load this filename automatically. A deliberate production administration command must explicitly load it; do not rename it to `.env.local`. Both repository and app `.vercelignore` files exclude `.env*` from CLI deployment uploads. Never print, commit or attach these files.

From `apps/tampiloka`, review the selected database and SQL, then run `bun run db:migrate`. Use versioned Drizzle migrations, not schema push. Read [operations](form-builder-operations.md) for the actual migration ledger and maintenance configuration.

## Google setup still required

Supply `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and comma-separated `ADMIN_EMAIL_ALLOWLIST` as server-only environment variables. Existing admins are rechecked against the allowlist on every protected operation. Removing an address revokes CMS authorization. Adding an address grants an independent owner scope; sharing another owner's forms is not implemented.

For production, register `https://tampiloka.site` as the Google authorized origin and `https://tampiloka.site/api/auth/callback/google` as the redirect URI. Set `BETTER_AUTH_URL` to that exact origin. Register separate callback origins for development and any verified stable preview. Redeploy after environment changes. Missing Google/allowlist configuration fails closed; real Google login has not been verified.

## Upload and retention policy

Supported upload formats are JPEG, PNG, GIF, WebP and PDF, with matching filename extension, MIME metadata and content signature. The hard limit is 20 MiB per file, 20 files and 100 MiB per respondent upload session; a question can impose lower limits. Respondent uploads bind form, revision, question and session. Removing an unattached upload frees its question slot. Attached files cannot be removed through an anonymous upload operation.

Accepted objects have private, unpredictable keys. Public image delivery permits only owner-uploaded images referenced by the current published revision; authenticated owners can preview their own draft images. Respondent objects never use that endpoint. Admin downloads expire after 60 seconds and are denied for deleted forms/responses.

Deletion hides records immediately. Permanent removal becomes eligible after 30 days and is processed by maintenance after deployment; archives are retained. Storage failures preserve database references for retry. Unattached uploads and unreferenced incoming/final objects use a 24-hour grace period. See operations for bounds, scheduling and manual dry-run commands. Signatures identify a format; they do not scan malware or validate every byte of a document.

## Verification and limits

See [verification](form-builder-verification.md), [final regression](form-builder-final-verification.md), and [security fixes](form-builder-security-fixes.md) for exact commands, isolated targets and results. Source/type/build tests, live database/storage tests, HTTP routes, browser interactions and real OAuth are separate acceptance claims.

Local recovery is per browser/form. Simultaneous editor tabs can overwrite the same recovery backup; optimistic server versions still prevent silent draft overwrites. Browser-history navigation, interrupted uploads, nested-control contrast and full keyboard/mobile interaction require browser verification. CSV export, client/project modules, spreadsheet sync and staff sharing are not implemented.
