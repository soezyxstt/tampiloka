# PR 13 review and fixes

- GitHub runs 43176451692 and 43175940205: check annotations say jobs never started because account payments failed or spending limit needs increasing; logs unavailable. No source failure was reported.
- Vercel deployment dpl_2vXpeP3waRj2XhaBsPWcNGS2BEyC at 2d5a51b: Turbopack reports 36 font errors resolving @vercel/turbopack-next/internal/font/google/font, with “next/font/google queries have exactly one entry”. Root cause beyond the reported resolver error is not established; the PR does not change font configuration.
- Reviewed pricing calculations, scope sharing, input validation, UI and shared button diff. Restored localized page metadata, canonical and social information lost in the rewrite; removed trailing whitespace. No review threads or submitted reviews were present at inspection.
- Targeted Node pricing and integration tests: 10 passed. The pre-existing verify:pricing browser script failed on obsolete .pricing-card assertions against a server already on port 3000; it needs updating for the redesigned page. Its browser also reported an HMR WebSocket error. No local build, typecheck or full lint was run under the CPU/RAM constraint.
- Remote checks remain necessary. The existing PR description records earlier browser checks; this review did not independently repeat them. Vercel failure and GitHub billing require resolution and fresh passing checks before merge.

## Follow-up review

- At 3df900f, GitHub runs 43176864417 and 43176857289 both report: “The job was not started because recent account payments have failed or your spending limit needs to be increased.” No steps ran.
- Vercel dpl_3zKDLSdXLL9RYtz883Kh14kp1UMw failed: Next 16.3.8 Turbopack reported 42 errors, including `@vercel/turbopack-next/internal/font/google/font` resolution and `next/font/google queries have exactly one entry`. Font layouts, package manifests and pnpm lockfile have no diff from base 601aebe. This does not prove a platform root cause; no speculative build/font change was made.
- Replaced obsolete browser assertions with configurable-family pricing, comparison and scope checks, keyboard selection, optional calculator validation and sharing, exact WhatsApp payloads, viewport overflow and English route checks. `node --check` passed; targeted Node tests: 10 passed. Preview on existing port 3000 displayed the Indonesian page and default cafe prices/table; no message sent. Preview was available, so the standalone Playwright browser script was not run: launching another browser would violate the requested preview preference. Its full browser assertions remain unverified. No build, typecheck or full lint was run.

## Review fixes (URL state and shared inputs)

- Added a bounded version 1 estimate URL payload, validated against known families, plan levels, quantities, flags and options. Preserves unrelated query parameters and hash; restores on hydration and history traversal. Valid saved estimates open the calculator.
- Calculator quantities and checkboxes use shared BrandInput and BrandChoiceInput; removed page-specific control and focus styling.
- `node --test apps/tampiloka/lib/estimate-url.test.mjs` passed (round trip and invalid versions, identifiers, quantities, flags, oversized input); `node --check` and `git diff --check` passed.
- Local browser: café + commerce, shared business, 2 outlets produced Rp1.198.000 setup / Rp98.000 monthly / Rp294.000 quarterly / Rp2.374.000 first year. Reload and header ID → EN restored inputs and totals, retaining UTM and hash. Back/forward between 2 and 3 outlets restored corresponding totals. Invalid v99 fell back safely. Quantity computed radius 8px from shared control. Desktop verified; mobile and detailed keyboard/focus comparison remain unverified.
- Rendered metadata: ID canonical/OG URL `https://tampiloka.site/paket`; EN canonical/OG URL `https://tampiloka.site/en/pricing`; hreflang ID, EN and x-default point to pricing routes, with pricing-specific OG/Twitter titles and descriptions.
- No build, typecheck, full lint, or CI rerun locally as requested.
