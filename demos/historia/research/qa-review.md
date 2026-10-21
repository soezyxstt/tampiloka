# Demo QA review

Checked 2026-10-21 against app/page.tsx, app/globals.css, components/menu.tsx, components/motion.tsx, app/layout.tsx, package/config files, business.json, and assets.json. This is a source audit, not a browser visual audit.

## Findings sent to the integrating agent

- The footer initially used `Dari rasa jadi cerita.` as branding while the research marked the tagline unconfirmed from a Canva index. Remove it or record direct primary verification before treating it as official.
- The food photograph initially described pasta in its alt text, while the source manifest describes salad, spring rolls and quesadilla. Verify the photograph visually and use an accurate alt description.
- The mobile native details navigation remains expanded after an anchor is selected, covering the destination's upper content. Close on link selection, with ordinary links preserved.

These findings are recorded at review time; the parent owns any subsequent implementation fixes.

## Checks passed

- Exactly one page h1 and meaningful section heading structure.
- Independent-demo disclosure in visitor-visible content and noindex/nofollow in metadata.
- No reservation/order/contact form collecting information on behalf of the prospect.
- Official WhatsApp number matches primary-verified business evidence.
- Every curated menu name has a primary-verified research entry; no invented current prices appear.
- Local image paths exist and contain data (six images at check time).
- Asset provenance includes source, attribution, rights status; pending-permission media remain nonpublishable in the manifest.
- Menu buttons expose pressed state and a live result-count status, with normal keyboard button behavior.
- Motion and CSS provide reduced-motion handling; focus-visible styling exists.
- No decorative pill tabs, chips, badges, or overlines found. Category controls use underlines and plain text.
- Standalone runtime dependencies are explicit; source does not import sibling app/shared workspace packages.

## Reusable boundary self-check

Run `node scripts/check-demo.mjs` inside demos/historia. Optional `node scripts/check-demo.mjs http://localhost:3004` also verifies HTTP 200, server-rendered noindex/disclosure, and local image responses. Network checks accept loopback origins only and never submit forms or contact the business.

Executed with the bundled Node runtime: `Demo boundary checks passed (6 local images, static only).`

## Verification limits

No browser audit, responsive measurement, contrast measurement, menu click test, external-link access test, typecheck, lint, or production build was performed by this reviewer. The parent performs integration validation separately. Asset-use permission remains pending; noindex does not make a publicly deployed preview private.

## Integration follow-up

The parent confirmed the tagline directly in the official Instagram bio and Linktree heading. This resolves the initial tagline concern once business.json records the updated source/status. The parent visually inspected the food image and confirmed Garlic Chili Prawn Pasta is present; no alt correction is needed for pasta. The room image alt was corrected to the actual artwork wall. A separate MobileNav component now closes the details panel on link activation and Escape; source review confirms that fix, including focus return to the summary on Escape.

The optional HTTP self-check was attempted against localhost:3004 but this worker host denied loopback socket access with EACCES on both IPv4 and IPv6. That is an environment limitation, not an observed application failure; the static assertions passed before fetch.
