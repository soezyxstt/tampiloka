# Public form renderer handoff

`FormRenderer` from `@/components/forms/form-renderer` accepts `{ schema, slug?, revisionId?, preview? }`. Editor preview passes `preview`, never submits or uploads. Public `/f/[slug]` reads `getPublicForm` directly and uses its immutable revision; metadata is noindex. Missing, draft, deleted and archived forms use 404; closed forms display a closed message. Next page rendering currently returns HTTP 200 for the closed message rather than 410; the JSON API returns 410. A route-level status solution is still required.

Answers use the shared schema contract including `other:<text>` and grid IDs. Section transitions use `getVisibleSections`; visible answers are validated and normalized with `validateAnswers` before sending. On an uncertain network/server failure the same in-memory payload and idempotency key are retried, with edits locked to avoid accidental duplicates. The retry state does not survive a reload or browser crash. API success is required before confirmation. When a revision changes the respondent is told to copy answers before reloading. A pending upload disables navigation and submission. The storage component supports selecting multiple files one at a time up to the question limit.

Integration gaps requiring coordinator attention:

- `/api/forms/assets/[id]` is referenced for form, question and option images but does not yet exist. Storage must supply an access-controlled public read route limited to assets referenced by the published revision, and a separate authorized draft-preview route. Do not expose private respondent files. Current image previews are broken until this is implemented.
- `FileUpload` owns its display list locally; navigating away and back retains file IDs but loses the visible file names/removal controls. The storage component must reconstruct its display from persistent metadata or lift that state; refresh/recovery of uploaded files is not implemented.
- Theme `accent` and `background` settings are not applied. Preview form values can become stale when the editor mutates its schema while mounted; validate editing interactions.
- Closed HTTP 410, upload completion and retries, branch navigation, keyboard/focus behavior, mobile layout, and actual persistence need integration/browser testing. No live database, object storage, browser, or deployment validation was performed by this lane. The SSR tests do not establish interaction or accessibility conformance.
- The custom native dropdown follows platform behavior but does not yet reuse the Base UI select. Scale controls are capped at 100 options; published schema should bound valid scale ranges accordingly.

Checks: `bun test ./components/forms/form-renderer.test.tsx` passed two server-rendered markup tests; `bunx tsc --noEmit --pretty false` passed at the integration snapshot; targeted ESLint passed with three Next image optimization warnings. No packages were added.

References reviewed: https://ui.shadcn.com/docs/components/base/questionnaire, https://ui.shadcn.com/docs/components/base/attachment, https://ui.shadcn.com/docs/components/base/field. Questionnaire informs navigation and native choice patterns; Attachment is presentation, while transport belongs to storage.
