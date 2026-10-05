# Temura overhaul plan

This folder records the product direction, asset inventory, generation prompts, and later Gemini work. The work follows the requested gate: finish the site structure and product surfaces first; download and visually approve the AI assets; build the 18 invitation previews only after that approval.

Current download evidence and remaining work: [download-report.md](download-report.md). The machine-readable source inventory is `artifacts/temura-overhaul/downloaded-source/readiness.json`; raw file counts do not indicate asset approval. Tom & Jerry replaces SpongeBob; BoBoiBoy is excluded. All 108 planned source assets are downloaded and visually reviewed; WebP derivatives are installed in apps/temura/public/assets/templates with a measured runtime manifest; invitation previews have not started.

Two reference previews are implemented for refinement: `/preview/adat-sunda` (Sawala) and `/preview/minimalist-eunoia` (Eunoia). The other 16 remain paused at the user’s request. See [reference-templates.md](reference-templates.md) for the renderer contract, checks, and known build limitation. The catalog only displays implemented previews.

## Product shape

The landing page order is:

1. Hero.
2. Template showcase with five horizontal category tabs: Adat, Game & kartun, Minimalist, Islamic, and Retro & nostalgia. Keep the cards the same size and use the existing Tampiloka style of gentle automatic scrolling.
3. Portfolio, only when the portfolio list has at least one real item.
4. Studio preview screenshots.
5. Buyer dashboard preview.

The landing links to a separate design/features page. It explains the invitation sections customers can request: date and countdown, maps, opening words shown in a dialog, music, wishes, RSVP, gallery, and digital gifts with a greeting by bank transfer or QRIS. Login and contact stay easy to find. The studio and buyer dashboard should use the current Temura/Tampiloka visual system.

Keep page copy short and leave the product imagery room to speak. Use real UI captures for studio and dashboard previews. Do not add testimonial counts, customer logos, or portfolio entries without real source material.

## Current baseline and boundaries

| Area | In the repo today | Still required for this redesign |
| --- | --- | --- |
| Marketing | Landing, /desain, /fitur, and /harga now use five category tabs, equal-size concept tiles, conditional portfolio, real product screenshots, and introductory prices. | Replace concept tiles with approved previews after the asset gate. |
| Templates | Six invitation renderers; public invitation route and database/actions accept numeric templateId values 1–6. | Eighteen named catalog entries are planning/display data only. Renderer variants, preview route, and any migration from numeric IDs need separate implementation work. |
| Studio | /studio is an interactive local prototype with draggable text/basic shapes, manual image upload, undo/redo, localStorage, and JSON import/export. It does not publish invitations or save an account-backed project. | Curated Temura asset library, polished canvas/tool behavior, responsive screenshots, and a decision on project persistence. |
| Dashboard | /dashboard is an interactive local demo for invitation details, guests/CSV, simulated RSVP/wishes, welcome dialog, gallery/music URLs, and gift-method setup. Existing /admin auth remains separate. | Customer accounts, real invitation persistence, onboarding, order status, and payment state. |
| Invitation features | Public invitations already have event details, maps, gallery, music, RSVP/wishes, bank details or QRIS, timeline, and related components. | Confirm which items belong in each priced offer; distinguish guest-to-couple gifts from customers paying Temura. |
| Payments | A couple may show their own bank details or QRIS to wedding guests. | No buyer checkout/order payment integration is defined by the current product data model. Choose a provider and add an audited order/payment workflow before claiming online checkout. |
| AI media | All 108 planned source assets are downloaded and visually reviewed in artifacts/temura-overhaul/downloaded-source; the ZIP contains 18 backgrounds and 90 ornaments. Eight unrelated or superseded files are excluded. | Use the installed WebP variants and runtime manifest; source PNG paths are historical planning data. Audit the preview composition separately. |

Read the existing implementation notes in [the Temura app README](../../apps/temura/README.md) and the current [Prisma schema](../../apps/temura/prisma/schema.prisma) before changing auth, invitation persistence, or prices. The new catalog uses string IDs but does not replace the existing numeric database IDs.

## Starter catalog and introductory pricing

The catalog has 18 styles: five adat, four game/cartoon, three minimalist, three Islamic, and three retro. Every public sample uses the same fictional names, Nara & Aruna. The current source of truth is [template-catalog.ts](../../apps/temura/lib/template-catalog.ts). It contains no finished cover images; coverImage remains null until downloaded assets are approved and template previews exist.

| Price band | Scope | Planned prices |
| --- | --- | --- |
| Essential | Minimalist and simple Islamic designs | Rp79.000–Rp149.000 |
| Standard | Adat and retro designs | Rp159.000–Rp189.000 |
| Studio | Game/cartoon themes and heavier visual customization | Rp289.000–Rp449.000 |

These are proposed launch prices for discussion in the product UI. They do not yet define payments, fulfillment capacity, revision limits, hosting duration, or a backend order record.

## Ordered workflow

1. Restructure the landing page and create the design/features page using the existing style system. Keep an empty portfolio section hidden.
2. Create honest studio and buyer-dashboard previews from the real current product surface. Label the current /studio as a local demo until it can save a customer project.
3. Define dashboard states and service fulfillment boundaries. In particular, specify when a buyer supplies event copy, photos, bank/QRIS details, guest list, and approvals.
4. Improve the studio asset picker and canvas interaction. Prepare distinct product screenshots for desktop and mobile.
5. Finalize the 18 catalog entries, asset names, and template-to-asset mapping in this folder.
6. Run the 18 image-generation batches in [image-prompts.md](image-prompts.md), then download outputs to the paths in TEMPLATE_ASSET_MANIFEST.
7. Inspect all downloads visually and mark rejected files for regeneration. Do not implement new template previews while required assets are missing or fail QA.
8. After all required assets pass, use the manual prompts in [gemini-handoffs.md](gemini-handoffs.md) to build the shared preview foundation, implement each category, and verify desktop/mobile and reduced-motion behavior.
9. Only after preview work is reviewed should a separate migration plan decide whether the new catalog IDs become selectable for persisted invitations.

## Asset production and QA

The manifest plans 108 outputs: 90 isolated transparent ornaments and 18 opaque portrait backgrounds. The backgrounds are art layers, not finished invitation screenshots. HTML adds names, dates, buttons, and invitation copy. Keep each AI output as an independent image file.

Use the criteria in image-prompts.md when accepting files. In particular:

- Ornament files are PNG with genuine alpha; background files are opaque portrait PNG.
- Keep central text safe areas open. Do not bake names, dates, labels, or calligraphy into images.
- For Islamic designs, only add religious text after human review against a trusted source. Never use AI-generated Quran, hadith, prayer, or Arabic calligraphy as finished copy.
- For adat designs, check each regional reference on its own. Reject mixed or misleading details.
- Game/cartoon artwork is an unofficial concept. Do not imply endorsement or licensing. Confirm commercial rights or replace a protected character with an original alternative before launch.
- Inspect full size and as a small mobile card. Check clipping, halos, accidental lettering, actual transparency, contrast, and cultural appropriateness.
- Keep original approved PNGs as source files. Optimize derivatives for the web only after visual QA; use responsive delivery and lazy-load below-fold imagery.
- Use smooth, modest transitions and honor prefers-reduced-motion. Never rely on animation for legibility or navigation.

## Benchmark notes

- [OurWedding Alin & Aldi](https://our-wedding.link/portofolio/preview/FRl8_alin-aldi) uses a strong split hero with a couple photo and fantasy setting, section navigation, gallery, countdown, maps, RSVP, gifts, and wishes. Temura can use its clarity and show a complete journey without copying its art direction.
- [OurWedding Zahra & Recky](https://our-wedding.link/portofolio/preview/Jz6Z_zahra-recky) is on the review list. The text-only web reader returned no page body, so make no claims about its detailed visuals until a person inspects it in a browser.
- [Viding theme 194](https://studio.viding.co/theme/preview/194) shows a layered watercolor world with separate architecture, trees, flowers, clouds, curtains, and frames. Its desktop editor pairs a static work area with a narrow live preview. Reuse the layering idea as a reference for reusable assets, while keeping Temura's editing surface simpler and mobile-ready.
- The provided OwLink Studio screenshot shows a central phone canvas surrounded by an asset picker, properties/layers, and version history. It is a useful reference for the later studio preview, not a requirement to reproduce every panel.

Improve on these references with equal-card sizing, readable text over art, a clear mobile path, keyboard-accessible controls, responsive image sizes, and reduced-motion behavior. Keep the landing restrained and avoid decorative labels, extra card stacks, or fake editing controls.

## Status

- Catalog: planned and available in code.
- Generated images: in progress; see [generation-status.md](generation-status.md). Downloads and complete QA are pending.
- New invitation previews: intentionally not started.
- Database migration for 18 catalog designs: not planned or run.
- Buyer checkout and buyer dashboard backend: still needs product and payment design.
