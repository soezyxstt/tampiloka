# Tampiloka landing repair, 10 November 2026

Base revision: `a3ccfcd50d52c25a66467d4bc248162dd4e5b6c3`; implementation is the working-tree diff. No deployment or new dependencies in the application.

## Scope and preservation

Visitors need to identify a web design/development studio, understand concrete uses, and choose a conversation or a template. Repair `/` and `/en`, plus the detached CTA on `/tentang` and `/en/about`. Retain the established green identity, Inter/Manrope, logo, header/footer, portfolio, existing services, prices, contact destinations, and runtime template catalog. No catalog entries, private demos, Temura behavior, or production data changed.

Affected code: home route, shared primary copy, hero illustration, new solution section and scoped CSS; about CTA; existing industry-preview contrast and language-switcher accessible names; marketing and template test selectors, plus a focused browser regression script. Existing shared controls and SiteMotion remain the interaction/reveal engine. No new animation dependency, client state machine, WebGL, or scroll event loop.

## Reference exploration

Profile and compact retrieval results are in `profile.json` and `discovery.json`. Inspected WF-34 entry and actual desktop export, MOTION-09 implementation guidance, expressive showcase source/assets and Arah Teknik desktop reference. Reviewed the shared frontend, brand identity, completion, expressive design, motion, and quality-review guides; Indonesian voice and channel references.

- **WF-34, product workflow tour:** transfer the relationship between a recognizable interface and a concrete job. Adapt to three service examples rather than a simulated app or invented product workflow.
- **MOTION-09, sticky story:** retain an introduction beside successive examples on desktop; normal document order on mobile and reduced motion. No scroll trapping, minimum scroll quotas, or disappearing content.
- **Expressive object-stage proposals:** use an existing catalog interface illustration and CSS perspective with one green sphere. Keep brand identity; do not import proposal colors or Figma screenshots into the website.
- Rejected a full immersive poster/collage: it would repeat the original problem of unclear offer and competing layers. Rejected a full WF-34 task switcher because this is a studio, not a single software product. This is a repair of the accepted site direction, not a new site composition.

The reference search covered task, compact density, interface media and scroll behavior; remaining motion differences between browser engines are explicitly untested. No claims of Figma pixel fidelity or originality across unrelated projects.

## Section and action map

| Section | Job and action | Mobile behavior |
| --- | --- | --- |
| Hero | “Studio web untuk bisnis Anda.”, concrete offer, primary contact and secondary templates | Copy and actions first; illustrated interface below |
| Solutions | Business presence, ordering, team workflows; accessible feature disclosures; services link | Each complete example reads inline; no sticky intro |
| Template discovery | Existing validated runtime feed, public demos and honest error/retry state | Existing responsive behavior retained |
| Work, services, about, process, industry, FAQ, footer | Existing content and real destinations retained | Existing behavior retained |
| About process | Contact button belongs directly under process explanation | Text, button, then image |

Illustrations reuse `IndustryPreview` and existing project-owned assets, not client evidence or newly published template catalog entries. The later user-requested copy pass removes illustration captions from the hero and solution section; illustrative work remains outside the real-work portfolio. Feature lists are examples subject to agreed scope; no claims of automatic payment, revenue results, or guaranteed integrations. The new sphere is CSS geometry, not a recreated logo.

## Verification and limits

- Production `next build --webpack` passed; TypeScript passed. Lint has zero errors and nine existing warnings in admin/form code.
- `verify-marketing.mjs` passed: bilingual routes, direct loads, 404 behavior, metadata, sitemap, navigation, FAQ and public assets.
- `verify-landing-browser.mjs` exercises ID/EN at 390/768/1440: disclosures using Enter/Space, focus, CTA destinations, navigation and reload, scroll-transform changes, reduced motion, overflow, runtime errors and server-rendered no-JS summaries. Screenshots are local under `evidence/interactions/`.
- Kit capture ran at 390/1440, normal and reduced motion; fonts ready, no document overflow, broken visible images, or page exceptions. UI-rule candidates are existing numbered process steps (actual sequence), shared CTA pills explicitly required by AGENTS.md, language controls, and underlined links whose transparent shared button geometry triggers a candidate. No new decorative eyebrow/badge.
- Initial axe violations in illustration contrast and language names were fixed at their shared source. Final scan has zero violations; manual-review entries remain for gradient contrast and an existing footer-social `div` aria-label. This is not a complete accessibility certification.
- `check:brand` fails on the existing SVG hash because Windows checkout uses CRLF. Normalizing the first failing SVG to LF yields the manifest hash exactly. Assets and manifest were not rewritten.
- Built locally without a deployment origin environment override; Next emits its metadataBase warning for some routes. No production metadata/deployment claim.
- T3 preview snapshots timed out twice; Chromium 153 through Playwright was used for visual inspection. No Safari/Firefox, real device, payment, contact submission, or full production verification. Impeccable/source originality scoring and the full-kit acceptance gate were not run.

## Reproduce

From `apps/tampiloka`: `bun run typecheck`, `bun run lint`, `node node_modules/next/dist/bin/next build --webpack`, then `node node_modules/next/dist/bin/next start --port 3015`.

Run `bun run verify:marketing http://localhost:3015` and `bun run verify:landing-browser http://localhost:3015 ../../design-runs/2026-11-10-landing/evidence/interactions`.

History: user-provided before screenshots showed a short split hero with washed-out background, no service-use teasers, and a detached About CTA. Inspected after screenshots show independent copy/media, a bounded hero, inline solution descriptions and an attached About CTA. Local artifacts are intentionally ignored by Git; this record and the reproducible checks are retained.


## Follow-up: concise copy and shorter mobile landing

User explicitly requested removal of explanatory illustration/demo captions and unnecessary descriptions. This overrides the earlier presentation choice, without reclassifying concepts as client work. Hero, solution, template and studio-image captions are removed; portfolio categories use the short labels Website / Konsep (Concept). Solution headings name the service directly; one short functional sentence remains, with details behind the existing accordion. Indonesian and English are kept in sync.

Below 768px, the landing keeps two template previews and two projects with links to the full collections. Large solution illustrations, repeated service/industry sections, the studio photo and process descriptions are omitted. Hero art and section spacing are smaller. All these rules are scoped to the landing wrapper; inner pages and shared shell are preserved. Desktop retains the full selection. The catalog is still runtime-driven, with no hardcoded family list.

Observed 390px capture height: 5,797px (previous capture: 12,071px). Capture paths: `evidence/compact/` and `evidence/compact-interactions/`. One footer watermark was still lazy-loading during the mobile fact capture; the same asset loaded on desktop. No new image paths were introduced. Build, TypeScript, changed-file ESLint and marketing route checks passed. The focused browser check now asserts mobile section reduction and absence of removed captions. Safari/Firefox and production remain untested.

### Production deployment � 2026-11-10

- Deployed the current local revision through Vercel CLI to project `tampiloka` (production), without committing or pushing the worktree.
- Deployment: `dpl_9ECzS9KQRmotad3HqJEEY8nDqDnD`; Vercel reported `READY` and assigned `https://tampiloka.site` without alias errors.
- Production HTTP checks confirmed the latest hero copy, landing wrapper, compact mobile stylesheet, and template catalog (HTTP 200).
- Marketing verification passed localized routes, metadata, sitemap, navigation, FAQ, and public assets against the production domain.
- Added deployment exclusions for local skill folders, design evidence, artifacts, and build caches.
- Production visual/browser checks were not repeated; desktop/mobile interaction checks were completed locally before deployment. Changes remain uncommitted and can be superseded by a later Git-based deployment.
