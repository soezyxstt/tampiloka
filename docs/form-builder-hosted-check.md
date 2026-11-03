# Hosted preview checks

2026-11-04, commit `7410fb9cde65d3d226155bf0f27e39da2363f392`.

Tampiloka preview: `https://tampiloka-git-feat-admin-form-builder-soezyxst-projects.vercel.app`. Both Tampiloka and e-invitation Vercel builds reached READY after the exact-version esbuild approval. No production promotion occurred.

The shared T3 browser initially reached Vercel Authentication. An authorized deployment-scoped share link with a 15-minute expiry permitted inspection; it was revoked after the browser tab was closed. Project protection was not disabled. No access token is recorded here.

Observed in the hosted browser:

- `/admin/login` loads the logo and Inter/Manrope fonts.
- Desktop 1280px and mobile 390px login checks found no horizontal overflow; the mobile heading used 30px Manrope.
- Tab focused the Google button. Enter activated it; with the intentionally missing OAuth settings, the page returned to an enabled button and displayed `Tidak dapat memulai login.` Real Google sign-in was not tested.
- An unauthenticated `/admin` request redirected to `/admin/login` (final 200).
- `/api/admin/forms` and `/api/cron/form-maintenance` returned 401 without credentials.
- `/f/verification-missing-form` returned 404.

These are limited login, keyboard and HTTP-denial checks. No authenticated editor/response UI, published fixture submission, upload, private download or full accessibility acceptance was verified in the hosted browser.

`BETTER_AUTH_URL` has been set for the `feat/admin-form-builder` Preview target to this verified branch origin. The next deployment receives the setting; Google callback registration and actual OAuth credentials/allowlist remain required. Other preview branches retain their existing settings.

One GitHub CI run passed on this head. Another failed in the existing gallery browser helper because the outgoing select listbox overlapped the next listbox during animation. The helper now resolves the trigger's `aria-controls`, selects only that listbox, and waits for it to close. Local syntax and ESLint checks passed; the next CI run must verify actual browser behavior.
