# Historia redesign audit

21 October 2026. Source and screenshot audit only; no source application files changed by this audit. Reviewed `app/page.tsx`, `components/menu.tsx`, `components/motion.tsx`, business/asset evidence, strategy/reference review, the current desktop preview, the three reference menu screenshots and the media contact sheet.

## Finding

The user's criticism is supported by the current implementation. This is a serviceable information page, but it does not yet deliver the visual or product-discovery experience promised by the reference brief. Removing decorative arrows did not address the substantial gap. A composition and catalogue redesign is needed, not another small polish pass.

| Priority | Current evidence | Required change |
| --- | --- | --- |
| P0 | Green/cream/terracotta is documented as inferred from interior photographs. No official palette or logo source was established. The header renders a new lowercase Georgia wordmark. | Inspect the official PDF cover, typography, logo, cup branding and current social identity. Extract the genuine logo if available, and record the source. Establish a source-led palette before restyling. Do not describe sampled interior colors as verified brand colors. |
| P0 | The menu is seven hard-coded items from Instagram captions. No price is verified; every product uses the same text-row treatment and two detached images illustrate the whole section. | Read the actual official PDF, extract its product photographs, and map each selected image to the exact item/page. Build the catalogue from that source rather than treating a PDF link as sufficient product information. |
| P1 | Hero, intro, menu, gallery and visit follow repeated text-plus-rectangle compositions. The neutral palette and uniform typography flatten the page's rhythm. | Recompose the page around a distinct branded hero, image-led menu, spatial atmosphere moment and visible location map. Use varied scale and crop, considered overlap, open layouts and strong section transitions. Do not add decorative cards, pills or eyebrow labels. |
| P1 | Motion consists of the same 18px/opacity reveal everywhere and a short category fade. | Create a few signature motions tied to content: composed hero entrance, gentle image depth/scroll treatment, product-image hover, and a controllable atmosphere gallery. Respect reduced motion, keyboard and touch use. More effect must mean more intentional moments, not stronger motion on every paragraph. |
| P1 | The location section contains accurate address/hours and a sign photograph with an outbound Maps link. It technically exists, but does not show where Historia is. | Make location unmistakable: real map/precise place, visible business pin, address and landmark together, clear directions action and facade/arrival photograph. Keep the textual information usable if the embed is unavailable. |

## Recommended visual direction

Use the official PDF and social branding to settle the identity. The downloaded Instagram media repeatedly uses warm orange/red brand text and accents; the cups carry a warm wordmark. These are stronger identity candidates than the interior's mint wall, but they still require direct visual confirmation from the PDF/logo. Until that happens, warm ivory, orange/red and deep coffee/ink are a working direction, not a claimed official token set. The green interior can remain in authentic photographs without controlling the whole interface.

Retain minimalist copy, but let composition carry personality. The reference screenshots demonstrate three useful differences from the present page: Pagi & Roti gives each product a photograph and readable identity; Tepi Sagara gives photography the scale to establish mood; Sela Rasa creates recognizable visual character with contrasting typography and nonrectangular image compositions. Historia should combine those purposes using its own identity and assets. It does not need their career sections, mock forms, pills, eyebrow headings or newsletter.

Suggested flow:

1. A distinctive hero composed from actual Historia branding, one strong venue photograph and one clean product cutout/crop from the PDF. Keep the menu action and visit essentials legible in the first screen. Avoid covering the page with an intro loader.
2. A photo-led product section immediately after the hero. Use actual source category names. A few featured items can lead, but all intended source items must remain reachable through the catalogue; do not stop at seven hand-picked names.
3. An atmosphere sequence with a wider room photograph and contrasting close-up/portrait frames. A horizontal gallery may be used if it remains controllable with arrows, touch and keyboard. Do not force horizontal page scroll.
4. A short occasions section supported by an actual venue/occasion photograph where available, with the one real contact action. Avoid invented packages, capacities or booking availability.
5. A large, named location section with the real map, arrival context, address, hours and directions. It must read as a destination, not another mood photograph.

## Catalogue requirements

- Keep a structured source record per item: exact name, category, price/variant if legible, PDF page, image asset, extraction method and verification status. Preserve the source PDF and rendered page proof outside `public/`.
- Prefer original embedded product images. If an image spans a flattened page, crop the rendered page at a suitable resolution and visually check it against the full page. Do not crop a collage and assign the wrong dish name. Preserve any relevant creator mark; do not use AI regeneration to invent cleaner food photos.
- Use consistent product photography sizing while retaining the whole plated product where possible. Product image, name, short source-grounded description and price belong together. Existing generic descriptions such as "untuk menemani obrolan" are atmosphere copy, not useful product detail.
- Label prices as from the inspected menu version/date; a PDF downloaded today may still contain old prices. Display variants accurately and say when a value is unreadable rather than estimating. Do not silently preserve the current script's blanket ban on all prices once the PDF provides evidence.
- Use underlined category navigation, not pill filters. Add search only if the resulting menu is large enough to benefit; it is not a substitute for categories. Keep selection/count accessible and avoid layout jumps on every category switch.
- Use an item detail dialog only if it exposes actual variants, ingredients or a useful larger photograph. It must support focus return, Escape and a visible close control. Do not add an empty modal just to create another effect.
- The official PDF link remains a useful secondary escape route, not the primary catalogue experience.

## Location requirements

The actual address evidence is No. 305, with the official landmark beside Dealer Toyota Garut. Get the precise map target from the official location link, not from guessed coordinates or an illustrative city map. A public Maps iframe is sufficient for this static demo; no new maps dependency or backend is needed. Give the iframe a descriptive title and lazy loading. Keep address, hours and external directions outside the iframe so they remain available if it cannot load. Verify that the selected pin is the same Historia business and that the directions action opens that place.

## Implementation reach

The redesign reaches `app/page.tsx`, `app/globals.css`, `components/menu.tsx`, `components/motion.tsx`, new structured menu data/assets as needed, `research/business.json`, `assets.json`, `strategy.json`, `selected-assets.json`, QA records and screenshots. Change layout/fonts only if the verified identity requires it. Avoid sibling workspace imports and new dependencies. `scripts/check-demo.mjs` currently matches menu names against the seven `business.menuCandidates` and rejects every price; migrate those checks to source-backed PDF records rather than weakening provenance checks. Retain disclosure, noindex, external-link safety, accurate alt text, reduced motion and the independent package.

## Acceptance criteria for the revised demo

- Side-by-side before/after screenshots show an immediately different composition, product presentation and branded color treatment, not merely changed spacing or arrows.
- The chosen palette and logo have a recorded primary source. Any inferred token is explicitly described as a design interpretation, not official brand guidance.
- Each displayed product photograph matches the item and source PDF page. At least the main categories have genuine product imagery, and the catalogue scope reflects the inspected document rather than the old caption shortlist.
- Names, categories and any prices/variants are checked against complete rendered PDF pages. No fabricated product description or false current-price claim remains.
- At least three distinct purposeful motion/interaction treatments are visible during normal browsing; reduced-motion mode remains fully usable and shows all meaningful content.
- Location includes a usable map/precise place and readable visit details. Directions resolve to Historia; no invented coordinates, illustrated city proxy or sign-only substitute.
- Desktop, tablet and 390px/320px layouts have no horizontal overflow. Product filters, any search/dialog/gallery, mobile navigation and map/directions are exercised with keyboard/touch-appropriate controls.
- Source-boundary tests, lint, typecheck/build and browser console checks pass. Screenshots are captured after assets and animations settle. Local quality, asset permission and public deployment remain separate claims.

## Limits

This audit did not acquire or inspect the official PDF, measure brand colors, run the revised site, or re-open the references in a browser. Parent owns those lanes. Existing photographs remain permission-pending; extracting them from the official PDF does not establish publication permission. The current source evidence supports address, hours, contact and certain occasion types, but not precise venue capacity, parking, accessibility facilities or availability.
