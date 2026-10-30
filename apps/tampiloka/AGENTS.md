<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Template discovery contract

Follow the root `AGENTS.md` section **Shared Tampiloka template discovery**. `/templates` and the landing preview share a runtime catalog loader and schema validation. Do not reintroduce a hardcoded template list, family union, count, or per-template URL logic here. Derive filters and mode choices from the public feed, preserve `lang` when opening demos, and provide honest loading, empty, retry, and bounded stale states. Template examples must stay distinct from real client work. Use this app's shared select, buttons, header/footer, and motion components for the discovery UI.

# Copy Tampiloka

- Use the project-installed [copywriting-bahasa-indonesia skill](../../.agents/skills/copywriting-bahasa-indonesia/SKILL.md) for public-facing copy changes. Read the relevant references before editing.
- Use clear, concise Indonesian, with `kami` for Tampiloka and `Anda` when a direct address helps. Prefer functional headings and CTAs that match their destination.
- Keep the presentation minimal: no sparkle icons, pill-shaped controls, eyebrow titles, decorative badges, or repeated supporting copy. Keep labels needed to use forms and understand prices.
- Preserve verified prices, the 40% launch discount, package limits, payment terms, service boundaries, project names, URLs, and the distinction between concept demos and client work. Do not treat examples in the skill as Tampiloka product facts.

# Shared UI and motion

- Every marketing route, including `/paket` and its English equivalent, uses the shared layout, `SiteHeader`, `SiteFooter`, and `SiteMotion`. Keep navigation and global contact actions identical across routes. Do not fork the header or override its controls from page CSS.
- Use the components under `components/ui` and their brand-system implementations for buttons and form controls. Extend a shared primitive when a control is missing; avoid independently styled copies inside page components. Preserve native link, form, keyboard, disabled, and focus behavior.
- Header and primary CTA buttons follow the brand system's `brand` variant and `pill` sizing. Compact icon links and form controls use their corresponding shared variants; this is the exception to the general prohibition on decorative pills. Page-specific classes may control layout and spacing, but must not replace shared control colors, corners, focus rings, or interaction states.
- Scope page CSS to that page's content. Never target `.site-header`, `.header-*`, `.studio-footer`, or `.footer-*` through a page selector, including `:has(...)`. Fix global shell styling in the shared component or shared stylesheet for all routes.
- Use the existing `SiteMotion` reveal system and `data-reveal` for additional content groups. Do not disable reveal effects on an entire page or add an independent animation system. Keep no-JavaScript content readable, respect `prefers-reduced-motion`, and check direct loading as well as client-side navigation.
- Check the same shared control on a normal marketing route and the edited route, on desktop and mobile. Pricing changes must retain calculator totals, query/hash state, locale switching, and all published package terms. Update obsolete visual assertions when the requested shared design changes, while retaining behavioral assertions.

# Contact and social links

- Do not display the owner's phone number in headings, paragraphs, link text, labels, tooltips, or accessible names. Keep the destination needed for functional WhatsApp links; do not replace or invent a contact number.
- Use reusable, recognizable icons for contact/social platform actions rather than visible platform-name text. Every icon-only link needs a descriptive `aria-label`, a visible keyboard focus state, and an adequate touch target. Decorative SVGs use `aria-hidden="true"`.
- Share platform icons, link destinations, and contact-link styling rather than copying SVG paths or URLs into individual pages. Product descriptions may still name platforms where the name explains a feature.
- Integrate email and social actions with the main contact content; do not create a separate sparse section just for these links. Do not add a redundant back-to-home link to the contact page; the shared navigation already provides it.
