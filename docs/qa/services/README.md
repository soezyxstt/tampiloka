# Services page visual evidence

The services page groups Tampiloka's offerings into eight fields, connects visitors to relevant packages and live public demos, and replaces the former industry page with localized redirects.

These unmodified PNGs were captured in remote Chromium against the Webpack development server. `desktop-hero.png` and `desktop-focus-open.png` use a 1440 × 900 viewport; `mobile-hero.png` and `mobile-menu.png` use 390 × 844. The mobile menu is from the preceding settled capture; subsequent source changes were limited to the Lainnya contact condition and desktop focus styling. Independent reviewers accepted it as representative of the unchanged mobile menu.

The final capture's 371-file source manifest matched the checkout before this evidence was added (manifest SHA-256: `ebcec1b1d6ba1923e7afcff06fc466958a2f88f49d73a41a302a9b2f0bbe494d`). Its base commit was `de8b7e7`. The final focused Chromium checks passed for the live catalog, keyboard disclosure and focus geometry, localized Lainnya contact links, settled mobile navigation, and reduced motion. Earlier focused checks covered package selection, locale/query/hash preservation, menu motion, demo links, and localized legacy redirects. Two independent Terra xhigh reviewers approved aesthetics, design-system fit, UI/UX, and customer perspective at 9.5/10 each.

These captures document development-server behavior, not a production build or deployment. Build, typecheck, and full lint were not run under the task's resource limit.
