# Scroll motion on the six café demos

Following the user's reference at https://tampiloka.site, main headings, copy groups and photographs now reveal on scroll with a 32px rise and opacity transition over 750ms, cubic-bezier(0.19,1,0.22,1), approximately 80ms stagger and 12% intersection threshold. Each demo keeps its existing composition and menu data. Existing interactive catalogue and photo transitions remain.

This is progressive enhancement using `motion/react`: server-rendered content and the initial viewport remain visible. Below-fold targets reveal once. Keyboard focus reveals a pending group immediately. Runtime changes to reduced motion stop animations and show all content; switching back does not conceal it again. Catalogue controls, sticky containers and embedded maps are excluded.

Validation: ESLint, TypeScript and static production builds for all six demos; independent Chromium checks at 1440px and 390px measure intermediate animated frames, completed reveals, focus visibility, runtime reduced-motion preference changes, no-JavaScript visibility, console errors and overflow. Catalogue empty-state and last-product searches pass for every demo. Evidence is retained locally in `artifacts/prospect-motion-2026-10-23/`.

Builds run in the Codex cloud workspace under the user's explicit override of the skill's Novita requirement. The user previously authorized pushing and deploying to the existing Cloudflare projects and unchanged domains. Earlier research/source-rights limitations are unchanged; successful motion QA is not a new factual or rights clearance.
