# Reference review — Historia demo

Checked 2026-10-21. Updated after opening all three references directly in the user's Chrome. This now combines the user's comparison, live visual inspection and focused interaction checks.

## Access and evidence

The earlier web-fetch and sandbox shell retrieval paths failed. That did not establish website unavailability: all three supplied domains opened successfully in Chrome. The earlier statement that the references could not be accessed was too broad and has been corrected.

Desktop hero and menu areas were inspected, then the menu-area layouts were checked at 390px. Screenshots are retained in `reference-previews/`. This is a focused comparison, not a complete functional, accessibility, animation or performance audit of the reference sites.

`apps/tampiloka/components/project-showcase.tsx` confirms these are concept projects and records their section destinations:

| Reference | Confirmed section structure | User-provided strengths | Use for Historia |
| --- | --- | --- | --- |
| Pagi & Roti | cerita, nuansa, menu, suasana, lokasi | Very good visual quality; good info discovery; complete product info; highly suitable for general UMKM | Keep menu and visit information easy to reach; use readable products and transparent prices only when sourced. |
| Tepi Sagara | suasana, menu, galeri, tentang, lokasi, kabar | Very good visual quality; very high premium impression; limited product info | Borrow atmospheric image scale and restrained editorial rhythm; do not let imagery bury menu/location. |
| Sela Rasa | menu, pilihan, acara, ruang-kumpul, tentang, lokasi | Good visuals; high premium impression; limited product info | Explain the real gathering experience with verified space photos; do not invent events, booking capabilities, or facilities. |

Reference URLs:
- https://demo-cafe-1.tampiloka.adihnursyam.com/
- https://demo-fnb-2.tampiloka.adihnursyam.com/
- https://demo-fnb-1.tampiloka.adihnursyam.com/

## Direct visual and interaction findings

### Pagi & Roti

The hero uses full-width photography with a dark overlay, expressive filled/outlined typography, a clear menu action and a secondary concept link. Below it, the warm cream and green menu combines product thumbnails, names, descriptions and category controls. Switching from Kue to Kopi & Teh changed the heading and actual product list to Latte, Kapuccino, Espreso and other drinks. At 390px, the menu becomes a readable vertical product list. The category controls are pills and sections use eyebrow labels; those treatments are explicitly excluded from Historia by the user's instruction.

This supports the user's assessment of stronger product-information utility. Historia should preserve discoverable menu categories and readable item descriptions. Product-specific thumbnails would be a useful later addition only when corresponding authentic photos are available; the current mixed-dish image must not be relabeled as an individual product.

### Tepi Sagara

The hero is dominated by atmosphere photography and a centered headline, with a narrow floating navigation bar. The menu section is a large edge-to-edge image paired with a teal text panel and an underlined action. The mobile composition stacks the panel and photograph. It presents the mood effectively, but the observed menu section contains descriptive concept copy rather than a browsable item catalogue. The navigation menu opened; choosing Menu reached `#menu` and closed it.

Two video elements declare muted looping autoplay, but both were paused in the inspected browser state. Playback and complete motion behavior were not established. Borrow the image scale, whitespace and editorial rhythm; do not claim a particular video or animation experience was verified.

### Sela Rasa

Dark green and cream surfaces, large serif typography, circular photo compositions and multiple sections emphasize gathering and events. The page also contains menu and event carousels, career content, and a simulated daily schedule. The menu introduction sells atmosphere; it is less useful for choosing an actual dish than Pagi & Roti's product list. Desktop and 390px views were inspected. A cookie panel remained visible after the observed Tolak click; this is a session-specific observation, not a general claim that the site is broken.

For Historia, retain only the relevant dining, celebration and meeting use cases from verified business sources. Keep the actual hours, address and contact visible. Do not add career, newsletter or booking simulations merely because they exist in a reference.

## Changes after comparing Historia

Historia's open sections, curated menu and direct visit information remain consistent with the user's priorities. The reference styles are inputs, not templates to copy; decorative pills and eyebrow titles remain excluded. One concrete interaction-affordance issue was corrected: the three noninteractive event rows had outward arrows that resembled links. Those arrows were removed; the working contact button remains the action for enquiries.

The standalone architecture, fonts, facts and photographs were not replaced by reference content. No external website was modified and no enquiry was sent.

## Recommended information hierarchy

1. A clear Historia identity, one authentic contextual photograph, and direct links to menu and location.
2. A concise visit-information row: address and hours only after validation; disputed hours should lead to the official account instead of claiming a definitive schedule.
3. A small real menu selection with category navigation if enough verified items exist. No fabricated prices or generic food presented as Historia products.
4. An atmosphere section using actual interior/rooftop imagery, supported by short concrete copy.
5. Location and official-contact links. No simulated reservation/payment flow.
6. A visible independent-concept notice, noindex metadata, and source/asset records outside visitor content.

One location CTA and one menu CTA are enough. Do not duplicate product paragraphs across sections, add a blog without actual content, or copy unrelated Tampiloka branding into Historia's identity.

## Stack and isolation

Live local manifests show Next.js 16.3.8, React/React DOM 19.2.8, TypeScript 5, Tailwind CSS 4, lucide-react, and Base UI/shadcn-related components. `packages/brand-system/src/motion/site-motion.tsx` currently uses IntersectionObserver and CSS transitions with reduced-motion handling; it does not import `motion/react`. Temura installs `framer-motion`, but that does not provide the requested `motion/react` package API.

Build `demos/historia` as its own package with explicit versioned dependencies, local config and styles, and no `workspace:*` imports. Root workspace patterns include `apps/*` and `packages/*`, so `demos/historia` stays outside the two app builds and can be extracted later without changing import paths. Declare `motion` explicitly and use `motion/react` for a small reusable reveal/hero treatment. Keep reduced-motion support and server-rendered meaningful content. Avoid copying Tampiloka's fixed 1.5-second logo loader into the cafe demo.

Recommended minimum scope: package.json, app/layout.tsx, app/page.tsx, app/globals.css, one client interaction/motion component, local business/menu data, public media, tsconfig, ESLint config, PostCSS config, and a concise README with independent install/dev/build instructions. No backend, dashboard, database, email, or multi-prospect engine.

## Validation required before handoff

Check actual mobile and desktop layout, keyboard/focus behavior, menu interaction if present, every outbound link, accessible image descriptions, reduced motion, image response status, noindex, and direct build/typecheck/lint inside the new app. Public deployment and outreach are separate actions. Authentic but unlicensed media must stay explicitly tracked as permission pending before a public commercial release.
