# Remote Forms MCP

Tampiloka exposes a stateless Streamable HTTP MCP server at `https://YOUR-TAMPILOKA-ORIGIN/api/mcp`. The endpoint uses OAuth authorization code flow with PKCE through Better Auth. A user signs in with their existing Google-backed Tampiloka admin account and consents to the client accessing their forms. Each request is bound to that verified, allowlisted user's forms. The server uses the same form services and validation as the admin UI.

## Deployment and connection

Apply the reviewed migration `0005_mcp_oauth.sql` to the dedicated CMS database using the project's normal `pnpm db:migrate` procedure, then deploy the application. This adds Better Auth OAuth client, consent, token, resource, and signing-key tables. Back up and verify the target database before applying it. The migration has not been applied to production as part of this change.

Set the existing `CMS_DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, Google OAuth credentials, `ADMIN_EMAIL_ALLOWLIST`, and storage variables. `BETTER_AUTH_URL` must be the publicly reachable canonical HTTPS origin. Register its existing Google callback URL with Google. No manually shared MCP bearer secret is needed. The `BETTER_AUTH_SECRET` protects authentication and signing-key material; keep it stable and secret. Each environment needs its own database, origin, and secrets.

In an OAuth-capable MCP client, add `https://YOUR-TAMPILOKA-ORIGIN/api/mcp` as a Streamable HTTP server. The client discovers the authorization endpoints, registers dynamically, and asks the user to sign in and authorize `forms:manage`. This permission includes reading and modifying forms, publication, and access to responses and uploaded files. `offline_access` allows a client to refresh its access without asking the user to sign in again. Use only trusted clients; the authorization screen displays the client identifier and requested scopes. Dynamic registration is enabled for compatibility with MCP clients that do not support client ID metadata documents. It does not itself grant access; the user must sign in and consent.

The server rechecks the user is verified and in the admin allowlist on every request. Removing the account from the allowlist immediately blocks MCP requests. Tokens are audience-bound to this MCP endpoint and cannot be used as Tampiloka browser sessions. Better Auth's OAuth revocation endpoint supports token revocation; Tampiloka does not yet provide an admin screen to list or revoke connected clients. Access tokens are JWTs validated locally and may remain usable until their expiry after token or consent revocation; removing the user from the allowlist blocks them immediately. The provider uses short-lived access tokens and rotating refresh tokens.

The endpoint supports stateless POST requests and limits request bodies to 1 MB. Browser `Origin` headers must match the configured site origin. The existing database-backed rate limiter applies. Clients that cannot perform OAuth discovery and dynamic registration need a compatible MCP client.

## Tools

- `list_forms`, `get_form`, `create_form`, `update_form`, and `form_action` cover form CRUD and publishing, closing, reopening, archiving and duplication.
- `get_form_schema` or the `tampiloka://forms/schema` resource describes the full draft, including header and logo assets, sections, routing, question types, options, validations and settings. Read the form first, modify its full draft, and pass `draftVersion` as `expectedVersion`. Re-read and reconcile on a conflict. Publish to make changes visible to respondents. Cross-field and publication checks are also enforced by the service.
- `start_image_upload` returns a temporary signed POST URL and fields. POST the fields and image as multipart form data, then call `complete_image_upload`; use the returned asset ID in the form draft. Treat signed URLs and fields as secrets. The storage policy verifies size, content type and file signature.
- `list_responses` includes responses and their original revision schemas; `response_action` archives, restores or soft-deletes them. `get_file_download` returns a 60-second private file download URL. Response data and signed URLs are sensitive. The existing response service returns all active and archived responses without pagination.

Clients should treat form and response contents as untrusted data and use their own approval controls for sensitive actions. Tool annotations are hints, not access controls.

## Verification

Run `bun run test:mcp` and `pnpm typecheck` in `apps/tampiloka`. A local PostgreSQL integration check exercised discovery, dynamic registration, a seeded signed-in admin session, consent, PKCE code exchange, token issuance and an MCP call. A real Google sign-in and deployed storage upload were not exercised; verify those against a configured non-production environment before rollout.
