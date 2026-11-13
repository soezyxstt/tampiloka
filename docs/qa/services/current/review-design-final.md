# Independent design review — b82d372

**Aesthetics: 9.5/10 — APPROVE.** The services page maintains a clear type hierarchy, readable open sections, consistent dividers and restrained use of color. Desktop and mobile hero, field directory, demos and process sections hold together visually; the visible hero demo action and the restored list markers help the presentation. The final cafe and process CTAs have the intended capsule shape. No material visual defect was established in the reviewed scope.

**Design-system fit: 9.6/10 — APPROVE.** The page uses the shared header, brand CTA variant and type utilities, with native text links and open content sections. Its treatment is consistent with the supplied homepage capture. The latest source change wraps the existing shared pill variants in `cn` at the field and process CTAs, and the final captures show the resulting shape. No material system-fit issue was established in the reviewed scope.

## Evidence and limits

- I directly opened each of the 42 images listed below, individually. Actual image sizes are desktop 1280×800, tablet 1024×768 and mobile 390×844. This review is of the captured viewports, not the entire range of devices.
- The three `pill-final` PNGs are from b82d372; the capture manifest reports parent-verified READY preview deployment identity at that SHA. I did not independently query the deployment. The recorded measurements report a roughly 44px CTA, capsule radius and 72px mobile process-to-FAQ gap.
- The six `native-fields-final` images are from d945946. Their rectangular field contact buttons are superseded by the three b82d372 images. Source diff confirms the later change is the two pill-class merges.
- Four `hero-action` images are from d824a6a, four `css-refinement` images from 4793368, and 25 broad images from f08bb. The later source diffs establish the limited changes between those states: list markers/FAQ spacing, visible hero action, native-link conversion, and final pill merges. Old missing markers, wider FAQ spacing and missing hero action are superseded by later evidence.
- The black floating preview overlay is reported as Vercel live feedback, not an app element; it obscures a small part of some captures and limits visual evidence at those points.
- The supplied records describe earlier bounded DOM and keyboard checks; I did not run a browser or independently repeat interactions. Runtime catalog image mutation, outage/stale/retry, reduced motion, full console monitoring, English internal package activation and production acceptance were not checked in this review. No build, lint, typecheck or jobs were run. This is scoped design approval, not production certification.

## PNGs opened individually (42)

Paths below are relative to `D:\Documents\Codex\2026-11-13\`.

- `tampiloka-services-pill-final`: desktop-cafe-cta.png, mobile-cafe-cta.png, mobile-process-faq.png.
- `tampiloka-services-native-fields-final`: desktop-hero.png, desktop-cafe-links.png, desktop-en-cafe-links.png, mobile-hero.png, mobile-cafe-links.png, mobile-cafe-demos.png.
- `tampiloka-services-hero-action`: desktop-hero-id.png, desktop-hero-en.png, mobile-hero-id.png, mobile-hero-en.png.
- `tampiloka-services-css-refinement`: desktop-cafe-list.png, mobile-cafe-list.png, desktop-start-faq.png, mobile-start-faq.png.
- `tampiloka-services-shared-preview-current`: desktop-home.png, desktop-services-hero-directory.png, desktop-menu-open.png, desktop-menu-focus-closed.png, desktop-menu-focus-open.png, desktop-cafe.png, desktop-cafe-expanded.png, desktop-multioutlet.png, desktop-school.png, desktop-commerce.png, desktop-lainnya.png, desktop-start-support.png, desktop-end.png, tablet-menu-expanded.png, mobile-hero.png, mobile-directory.png, mobile-menu-open.png, mobile-menu-expanded.png, mobile-cafe.png, mobile-cafe-demo.png, mobile-lainnya-heading.png, mobile-lainnya-cta.png, mobile-start-support.png, mobile-end.png, mobile-english-hero.png.

PR https://github.com/soezyxstt/tampiloka/pull/16, head b82d372c4da320972adbbbe7dead7514dbd2ad6c, checks and reviews scoped design APPROVE; checks not run
