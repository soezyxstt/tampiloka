# Demo hosting migration — 23 October 2026

Fourteen static demo projects are deployed on Cloudflare Pages via Wrangler Direct Upload. Builds and typechecks ran in Novita. The existing marketing site stays on Vercel; its catalog now links to the migrated portfolio and invitation URLs.

## Current provider state

| Demo | Cloudflare URL | Original Vercel project |
| --- | --- | --- |
| Historia | https://historia.tampiloka.site | Deleted after desktop/mobile and HTTPS checks |
| Bumi Upi | https://bumiupi.tampiloka.site | Deleted after desktop/mobile and HTTPS checks |
| Duduk Gembira | https://dudukgembira.tampiloka.site | Deleted after desktop/mobile and HTTPS checks |
| Gulapadi | https://gulapadi.tampiloka.site | Deleted after desktop/mobile and HTTPS checks |
| Talkie Space | https://talkie.tampiloka.site | Deleted after desktop/mobile and HTTPS checks |
| Classico Coffee | https://classico.tampiloka.site | Deleted after desktop/mobile and HTTPS checks |
| Collega Coffee | https://collega.tampiloka.site | Deleted after latest-version desktop/mobile and HTTPS checks |
| Tepi Sagara | https://demo-fnb-2.tampiloka.adihnursyam.com | Deleted after desktop/mobile and HTTPS checks |
| Pagi & Roti | https://demo-cafe-1.tampiloka.adihnursyam.com | Deleted after desktop/mobile and HTTPS checks |
| Sela Rasa | https://demo-fnb-1.tampiloka.adihnursyam.com | Deleted after desktop/mobile and HTTPS checks |
| Rona Forma | https://demo-katalog-1.tampiloka.adihnursyam.com | Deleted after desktop/mobile and HTTPS checks |
| Ginalist | https://ginalist.tampiloka.site | Deleted after hydration fix passed both browser viewports |
| Syahril MC | https://syahril.tampiloka.site | Deleted after desktop/mobile, video and HTTPS checks |
| Nara & Aruna preview | https://demo-undangan.tampiloka.site/preview/adat-sunda | Full Temura application retained by user instruction |

Final Vercel plugin read-back confirms 13 project deletions and 24 remaining projects. All 13 deleted IDs are absent from that read-back. The four excluded project IDs, full Temura, MC Space and Tampiloka are present. No demo project remains pending deletion.

ZYX Academy, IAM, PAMOKA (both `pamoka-garut` and `moka`), the full Temura application (`e-invitation`), MC Space, and Tampiloka marketing remain on Vercel. No outreach was performed.

## Verification

All 14 final public HTTPS endpoints returned HTTP 200 from Cloudflare with TLS verification enabled. All 14 migrated demo projects passed functional browser checks at 1440px and 390px, including image/font availability, overflow, JavaScript errors and relevant controls. The invitation project additionally passed its Eunoia route at both widths. Relevant interactions included carousels, opening-day selection, photograph filtering, a direct product route, portfolio/contact/package routes, both Syahril video streams and opening both invitation previews. Final screenshots were visually inspected.

The last Novita browser-QA invocation and its one permitted retry failed to connect before execution. The user then authorized local browser QA with “ya”. Local checks found a missing QRIS placeholder in the static invitation package; the existing non-payment placeholder was copied from Temura into both source public assets and the exported artifact, then uploaded through Wrangler (deployment `f67373ac.temura-demo.pages.dev`). Both invitation routes subsequently passed. Five remaining Vercel projects were deleted only after their desktop/mobile browser checks and a fresh HTTPS Cloudflare check passed. Local acceptance and deletion commands exited 0.

The laptop's default DNS resolver stopped resolving several hostnames during the final checks. Public DNS lookup through 1.1.1.1 confirms the correct CNAME/A records; final HTTP checks used those addresses per request while preserving hostname/SNI and TLS certificate verification. No system DNS settings were changed.

Marketing deployment `dpl_Gkj8y5728BtfaVxNPzwuynusegLh` was built in Novita, uploaded prebuilt to the existing Tampiloka project and promoted. The public `/produk` page was read back and contains all three new URLs plus the unchanged ZYX/IAM/PAMOKA links. Source selection used the live Git commit `a7417e5f7b7b8b9c9ed6efcd46804e5489cec5a6`; unrelated dirty marketing edits were excluded from this deployment and remain in the workspace.

## Source and artifact notes

- Authoritative Collega source is `D:/Work/ProspectDemos/collega-coffee`; the older monorepo copy was not used for the final deployment. The final version passed its two unit tests, build, typecheck and both browser viewports.
- Ginalist's reduced-motion preference is applied after hydration, preventing differing initial footer markup. The change exists in the canonical Ginalist source and its migration snapshot; the rebuilt artifact passed desktop/mobile browser verification without JavaScript errors.
- Syahril's two showreel videos were optimized in Novita to approximately 18.4 MB and 19.3 MB, below the Pages 25 MiB asset limit. Both streams passed desktop and mobile checks. Original source media was preserved.
- Rona Forma's existing client routes were enumerated for static export, including product, category and information pages. Its generated product route was loaded in the initial browser check.
- The standalone `demos/temura-preview` package contains only the existing Sawala and Eunoia static previews. Login, database, dashboard, real RSVP and live invitation routes remain in the original Temura app.
- User confirmation for pending historical publication records: “anggap sudah diizinkan dan dikonfirmasi”. This was recorded as user confirmation; no independent new business or third-party rights verification is claimed.

Cloudflare account: `06d62d8a9335fed189a6a59fda0a4f48`. Vercel team: `team_rMFT8hSTCTObKzXirjJcbMFc`.

Detailed source fingerprints, remote logs, static archives, deployment logs, screenshots and deletion logs are under `artifacts/cloudflare-migration-20261023/`. Final evidence: `inventory.json`, `vercel-final.json`, `cafe-browser-verified.json`, `catalog-qa-evidence/qa/catalog-browser.json` (Collega/Tepi), `local-browser-verified.json` (five final demos and both invitation routes), `qa/*.jpg`, `final-public-http.json`, `marketing-artifact-check.json`, `marketing-live-produk.html`, and `dns-cutover.png`. Earlier failed QA reports remain as diagnostics; the final merged reports supersede them.

No real booking, payment, outreach or live RSVP was submitted during testing. Provider-managed `*.vercel.app` URLs cannot be retained after project deletion; catalog links and custom demo domains use Cloudflare. This repository records the marketing URL changes, cafe static-export configuration and standalone Temura preview package. External demo repositories remain separate. Builds used verified migration snapshots; future deployments should preserve the static-export settings and use the canonical source paths above.

An automatic approval review initially rejected heuristic Novita cleanup. Recovery subsequently used the exact sandbox ID plus a matching source SHA-256, returned the artifacts and cleaned up that verified sandbox. A separate connector operation to create a protected-deployment bypass link was rejected and not performed; public marketing read-back was used instead.
