# Form builder integration verification

Date: 2026-11-04. Development only: Neon project `rapid-lake-09427207`, branch `br-orange-poetry-a1nkjdcu`, database `tampiloka_cms`, private bucket `form-uploads`. The Vercel `tampiloka` Development variables were pulled to a temporary file, and the DB host and storage branch were checked before use. No `.env.prod` was loaded.

## Actual checks

- Reviewed migrations 0000–0004; applied them with `node node_modules/drizzle-kit/bin.cjs migrate` against the dedicated development direct endpoint. The ledger reported five applied migrations. Migration 0004 adds `submissions.deleted_at` and backfills existing deleted rows.
- Ran `bun run scripts/verify-form-integration.ts` from `apps/tampiloka` with only development variables loaded. The harness pins both database endpoint and storage branch/bucket, creates one random fixture owner and only fixture forms, and cleans their explicitly tracked rows and object keys.
- Passed: real service create/edit, optimistic conflict, publish, old slug resolution, hidden-answer canonicalization, idempotent retry, response cap, historical revision, close/reopen, replay after close, duplicate/archive/delete, and response archive/restore/delete.
- Passed: real signed POST of a small PDF, different-session completion rejection, object signature check on completion, exact bytes through a signed read, anonymous object-read denial, wrong-session and cross-form attachment rejection, and successful attachment. Fixture cleanup reported success; subsequent SQL reported zero `@example.invalid` fixture users.
- This is a service/storage integration check; it does not assert that HTTP handlers or the browser work. It mocks only Next's `server-only` marker for Bun, not auth or business logic. The database service pool may keep the process alive briefly after cleanup.

## Remaining gates

- Browser checks: `preview_status` returned no tab. Opening localhost:3000 returned a browser error. An attempt to start the built app on port 3007 with isolated development variables was rejected by automatic execution policy. No desktop/mobile, keyboard, focus, editor, response table, or end-to-end browser flow was tested. The earlier build predates the latest proxy and security changes; rebuild before runtime checking.
- No live Google OAuth or authorized session/API/download route flow tested. Google credentials and the allowlist are pending. Test direct unauthorized APIs, a real authorized session, private download issuance, public and admin upload routes, limits and aliases, GET/HEAD 410 and client navigation against a fresh build.
- Harness does not cover all 18 question types through persistence, invalid signatures, oversized uploads, revision mismatch upload completion, every abuse limit, all deletion/retention scenarios, or cleanup after interrupted object writes. Read the other lane handoffs for their focused tests and known UI/security gaps. The object key deletion is limited to keys observed during this run; an interruption between copy and recording the resulting key could leave an orphan requiring reconciliation.
- The latest security/service files were in concurrent development while this check ran. Repeat after the owning lane finishes and after any pending migration is reviewed and applied to development. No production migration, deployment, or release was performed by this lane.

- After the harness edits, `bunx eslint scripts/verify-form-integration.ts` and `bunx tsc --noEmit --pretty false` both passed at this shared-tree snapshot. Parent owns final checks after all lanes settle.
