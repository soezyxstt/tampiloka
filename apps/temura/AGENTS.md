<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Temura UI and copy

- Follow the existing Tampiloka website style system: restrained typography, generous space, large previews, and direct navigation.
- Keep copy minimal and concrete. Use short functional titles such as Desain, Studio, Dashboard, and Harga. Omit unnecessary headings, overlines, slogans, poetic phrases, and descriptions that repeat the interface.
- Do not add decorative pills, badges, chips, or pill-shaped category tabs. Use plain text tabs with an underline or another restrained active state. Primary CTA and header action buttons follow Tampiloka's reusable brand system (`size="pill"` / `rounded-full`).
- Avoid card-heavy layouts. Use simple sections, rows, lists, tables, and dividers. Cards are appropriate only when the content or interaction needs them, including the requested equal-size template previews.
- Dashboard and studio should feel like working tools. Keep labels, errors, accessibility text, and essential help; do not turn their workflows into marketing copy.
- State demo/local-only behavior clearly once in the relevant context. Avoid repeating the same limitation across badges, titles, descriptions, and helper paragraphs.
- Preserve exported brand logos and the established Inter/Manrope typography and color tokens.
- Do not implement new invitation template previews until their AI assets have been downloaded and visually checked.
- Invitation previews use their own theme identity. The restrained marketing rules do not require quiet invitation animation: use layered ornaments, opening transitions, scroll-driven movement, real embedded maps, and multi-photo galleries when requested. Respect reduced-motion preferences. Keep only Sawala and Eunoia in the refinement scope until the user approves expanding it.
- Every invitation template must have a distinct composition, not a reskin of shared section markup. Differentiate opening/photo treatment, couple layout, event layout, gallery behavior, story composition and closing. Shared data and functional controls are allowed; shared layouts with swapped colors/ornaments are not. Do not add visible illustration/demo captions to photos or the invitation closing. The surrounding preview UI identifies the sample; payment destinations must still be truthful.
- The user authorized the remaining 16 templates on 2026-10-05. Their implementation, including shared support for them, must be delegated exclusively to GPT 6 Luna with reasoning max. The parent handles coordination, integration review and QA; do not route template implementation to Sol, AGY or another model.

# Immersive invitation revisions

- Follow the current composition v2 contract in `docs/temura-overhaul/immersive-revision-contract.md`. It supersedes previous motion quotas and sticky-gallery blueprints. Use distinct section and photo layouts, natural content heights, static ornament placement behind content, and restrained animations. Do not use vertical-scroll-driven horizontal galleries or forced travelling ornaments.
