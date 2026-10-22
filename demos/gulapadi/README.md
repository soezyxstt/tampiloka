# Gulapadi Garut — local concept

Standalone Next.js 16 demo using official Gulapadi menu artwork and Garut contact details. Noindex; no fake reservation or checkout. Local review only, no publication permission implied.

## Run

Install the explicit dependencies in this folder, then `bun run dev` (port 3021). The reviewed production build runs locally at http://127.0.0.1:3022 with `bun run start`. `bun run build`, `bun run lint`, and `bun run typecheck` are the package checks. On this Windows host, the bundled Node executable can run `node_modules/next/dist/bin/next`, `node_modules/eslint/bin/eslint.js`, and `node_modules/typescript/bin/tsc` directly when the nvm shim has no active version.

For this session, dependencies reuse a local node_modules junction after the installed Bun 1.2.21 crashed during offline installation. Source imports stay inside this package and every runtime dependency is explicit. A clean install on a separate machine has not been tested.

## Evidence and data

- `research/notes.md`: identity, all relevant bio links, coverage, omissions, price limitations, asset provenance, two layout candidates.
- `data/menu.json`: 206 period-specific entries, 20 donuts. Bandung-only cart omitted.
- `research-bundle.json`: validated source/fact/asset/page-plan snapshot.
- `research/prepare.py`: repeatable crops and menu normalization from local source archives.
- `review/check-demo.mjs`: browser checks; `DEMO_ORIGIN` can override the exact local origin. Checks the Gulapadi title before testing.
- `review/evidence/`: build/lint/browser/HTTP evidence and screenshots.
- `review/qa-report.json`: skill assessor result, separate from publication and acceptance.

Source archives are intentionally ignored. Website serves optimized local WebP directly, under 1 MB total. Photo and logo publication rights remain pending; menu prices are source snapshots and need owner confirmation before public use. Buffet unit prices, minimum participants, tax and Garut availability are not specified by the supplied documents; the visitor flow asks the Garut team.

No push, deployment, outreach, reservation, or message has been performed.
