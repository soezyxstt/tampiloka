# Form builder security fixes handoff

## Uploads

Completion reads at most 32 bytes from the copied private object and requires its signature, filename extension, declared MIME and configured restriction to agree. Supported types: JPEG (.jpg/.jpeg), PNG, GIF, WebP and PDF. Unsupported configured types, including text and ZIP, fail closed. The UI should communicate this supported set. Signatures do not validate the entire file or scan for malware. Respondent downloads remain private attachments. S3 byte range and Content-Range support is required and must be verified in the dedicated development bucket. Copy/read/commit failures can leave unreferenced final objects; orphan reconciliation remains necessary.

## Retention and UI contract

Deleted responses become eligible for permanent purge 30 days after deletion. Deleted forms and all their responses, assets, revisions and aliases become eligible 30 days after form deletion (`forms.updated_at`). Active and archived records are retained. Suggested confirmation: "Respons dan berkas yang dihapus akan dihapus permanen setelah 30 hari. Formulir yang dihapus beserta seluruh respons dan berkasnya juga akan dihapus permanen setelah 30 hari." Admin lane owns UI wiring. Existing deleted responses are conservatively dated from migration execution.

Apply migration `0004_response_retention.sql` via the normal migration process on the explicitly selected dedicated CMS database before deploying this code. It adds `submissions.deleted_at`; schema and Drizzle journal changes were necessary. No migration was run here. Reconcile the Drizzle snapshot before generating future migrations.

Run `node scripts/purge-form-retention.mjs` for dry-run; inspect the CMS_DATABASE_URL and CMS_STORAGE_* target, then pass `--apply` to delete. Schedule the apply command daily in a trusted scheduler with those server-only variables, capture nonzero exit status and alert/retry failures. No scheduler was configured. Each form is locked while eligible objects are deleted and then related rows are removed in FK-safe order. Storage failure rolls back the database transaction and retains references for retry; some already deleted objects may be absent. Database commit failure also retains rows for retry. Backup and object-version retention must be configured separately. Purged submissions no longer count toward response limits, and idempotency records disappear after the grace period.

## Other behavior and verification

A replay compares canonical revision/answers and attached upload session before checking whether the form is closed. Deleted forms and deleted responses do not replay. Form duplication copies each referenced admin image to a distinct private object and rebinds IDs. Failed transactions attempt to remove copied objects; failed cleanup still requires orphan reconciliation.

Local tests cover signature and extension spoofing, retention dry-run and storage failure; existing backend policy and API tests passed. Live database/storage tests for lost-response replay, concurrent lifecycle changes, duplication and purge remain outstanding. Google OAuth, allowlist, malware scanning, orphan reconciliation, scheduled purge and deployment remain outstanding. No production data was modified.

References: https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html and https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html.
