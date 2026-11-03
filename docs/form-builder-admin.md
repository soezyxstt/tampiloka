# Admin lane handoff

## Scope and interfaces

- Independent `/admin` root layout; protected route group and editor parent layout call backend `getAdminSession` and redirects unauthenticated users to `/admin/login`. Backend APIs and downloads must independently authorize every request. Google login and signout use Better Auth `/api/auth/sign-in/social` and `/api/auth/sign-out`.
- CMS consumes `/api/admin/forms`, `/api/admin/forms/[id]`, and `/api/admin/forms/[id]/responses`. Settings send the entire draft and `expectedVersion`; version conflict is shown and never automatically overwrites newer edits. Lifecycle operations are confirmed. List supports search, status filter, duplicate, archive and soft-delete actions.
- Response data uses each row's `revisionSchema` for answer labels and detail. `/api/admin/files/[id]` returns a short-lived `{url}` and the client requests it only after a download action. TanStack Table v8 supplies sort, search, pagination and column visibility.
- `/admin` and `/f` bypass locale rewriting; robots excludes admin and public forms. Public renderer owns its own metadata and root layout.

## Verification and remaining integration

- Installed Next layout, authentication and proxy documentation and shadcn dashboard, sidebar, login and data-table references reviewed.
- Direct proxy test passed for `/admin`, `/admin/forms`, `/f/example`. Targeted ESLint: no errors, three warnings (native logo image, internal signout navigation, TanStack compiler compatibility). TypeScript found no admin errors, but full app check currently fails in concurrent public/storage lane files; rerun after integration.
- No browser, real Google OAuth, database lifecycle, signed download or end-to-end checks performed. Google credentials and allowlist remain pending. Verify all routes and server authorization once the other lanes settle.
- Settings schema currently has no response count/date limits; no limits control is exposed. Table header uses one current label per durable question ID; details use the exact revision label. Status filter/metrics are unavailable because submissions have no status field. Native confirmation is used; sidebar collapses on mobile, not desktop. Response detail is inline rather than a modal/sheet. Mobile, keyboard, focus, loading, failure and long-data behavior require browser QA.
- Lifecycle and slug aliases rely on backend semantics. Storage and migration must be finalized before testing file downloads; do not treat a signed URL implementation as verified security or production readiness.
