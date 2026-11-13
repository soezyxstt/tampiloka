# Services page QA evidence

The reviewed application commit is `b82d372c4da320972adbbbe7dead7514dbd2ad6c`. The implementation replaces the industry page with localized redirects and a services page organized around eight fields, linking to canonical packages, public demos, contact, and the runtime template catalog. It uses localized native links and the shared navigation and brand controls.

## Independent reviews

Two independent Terra xhigh reviewers each opened 42 PNGs individually and inspected source continuity. Their approvals are scoped agent reviews, not formal GitHub approvals or production acceptance.

| Review category | Score | Report |
| --- | --- | --- |
| Aesthetics | 9.5/10 | [Design](current/review-design-final.md) |
| Design-system fit | 9.6/10 | [Design](current/review-design-final.md) |
| UI/UX | 9.5/10 | [UI/UX and customer](current/review-ux-final.md) |
| Customer perspective | 9.5/10 | [UI/UX and customer](current/review-ux-final.md) |

The reports list all 42 images from the local review archive. Only the nine representative, unmodified images below are committed here; the reports' archive filenames are not a claim that all 42 are in this repository. Desktop captures are 1280 x 800, tablet 1024 x 768, and mobile 390 x 844.

## Selected capture manifest

Each image was copied without modification; the SHA-256 below was checked against the corresponding archive source. The commit identifies the captured application, not this documentation commit.

| File | Captured application commit | Pixels | SHA-256 |
| --- | --- | --- | --- |
| [desktop-cafe-cta.png](current/desktop-cafe-cta.png) | `b82d372c4da320972adbbbe7dead7514dbd2ad6c` | 1280 x 800 | `1f8729d487d5b910c9b942c5ab56c4c695cf270c01a1f9cc264a2e08ea87d587` |
| [mobile-cafe-cta.png](current/mobile-cafe-cta.png) | `b82d372c4da320972adbbbe7dead7514dbd2ad6c` | 390 x 844 | `49fc927533b2f678f0e80cb809e0619d7a8a752051be9cb2e9f5d1c664851fdf` |
| [mobile-process-faq.png](current/mobile-process-faq.png) | `b82d372c4da320972adbbbe7dead7514dbd2ad6c` | 390 x 844 | `70901936de8a2325b6797d93d718eee611710abcbef85d7918b8112ba522a80e` |
| [desktop-hero.png](current/desktop-hero.png) | `d945946350f88ec0658fc25506026017fec4439e` | 1280 x 800 | `95f7ad7d2250f7e8a3a3333b86d27b5f96d6f6b9e10c36e7195847a13f37b4f8` |
| [mobile-hero.png](current/mobile-hero.png) | `d945946350f88ec0658fc25506026017fec4439e` | 390 x 844 | `220aa2c8a5c0d98b6db661d07cdd917e66ad264c24e37eefacb29dd299ef58f7` |
| [desktop-menu-focus-open.png](current/desktop-menu-focus-open.png) | `f08bb4848f9f9276a148d5789807b0628cf924fb` | 1280 x 800 | `b279087f9f4892717e53811f138d251b3c8654fb9968704d7af0aff291765cd3` |
| [tablet-menu-expanded.png](current/tablet-menu-expanded.png) | `f08bb4848f9f9276a148d5789807b0628cf924fb` | 1024 x 768 | `882437050250f900ec8aa7d917e92551caa054a999cede71d3f51c7a7ff9cb1b` |
| [mobile-menu-expanded.png](current/mobile-menu-expanded.png) | `f08bb4848f9f9276a148d5789807b0628cf924fb` | 390 x 844 | `4bf81c7859ce260b43f2eec3577ed2cdf0766ee0a345f5b40aaf86f4861eca96` |
| [mobile-hero-en.png](current/mobile-hero-en.png) | `d824a6aef6e61e5d68f0ddd71f997df67fb10064` | 390 x 844 | `bce4eeefed37f401039bd1343eb4001264b8fb1aadef13ee220dad4fe2fb0e6b` |

The three `b82d372` captures show the final contact CTAs and mobile process/FAQ spacing. The `d945946` hero predates only two pill-class merges in `service-fields.tsx`; the source diff establishes its continuity. The `f08bb` shared-navigation captures predate subsequent services-page changes; the shared header and brand-system files are unchanged in the source diff. The English hero from `d824a6a` records the visible localized action; the later native-link conversion retains its variant styling. Earlier images are not relabeled as final-commit captures.

## Focused observations and limits

- [Final pill results](current/pill-results.json): the parent verified a READY preview for the exact `b82d372` application, with a null deployment target. The capture executor did not independently query deployment metadata. In each locale, all 97 document anchors included zero `a[role=button]`. Field and process contact CTAs were native links to `/contact` and `/en/contact`, approximately 44 px high, with `rounded-full` and without `rounded-lg`. The mobile process-to-FAQ gap measured 72 px. This focused lane did not activate links.
- [Native-field results](current/native-fields-results.json), captured at `d945946`: 49 main-content anchors per locale, with representative accessibility trees showing links. ID keyboard Tab+Enter opened the cafe package with the correct selection; EN keyboard Enter opened the localized cafe demo in a new tab. The choose-field hash target was visible. This 49-anchor main-content count differs in scope from the final 97-anchor document count. The catalog response sample was 200.
- Earlier `ac0384a` hero evidence recorded ID keyboard Tab+Enter opening the ID demo. The reviewers inspected the broader visual set; they did not independently repeat browser interactions.
- Temporary preview sharing was revoked and all task capture tabs and popups were closed, as verified by the parent after capture. The unmodified native-field results preserve the child's earlier popup-open cleanup status; that status was subsequently resolved by the parent.
- The floating black overlay in some preview captures was identified as Vercel live feedback (`vercel.live/_next-live/feedback/feedback.js`), not an application element. It was not hidden and obscures portions of those captures.

Runtime catalog `imageUrl` mutation, outage/stale/retry, reduced motion, complete console monitoring, EN package Enter, individual full accessibility-tree observations for Temura and the final contact, and production acceptance were not verified in this current preview evidence. No new browser, server, build, typecheck, lint, or broad tests were run for this documentation update. The preview evidence is not a production certification.

## Historical captures

The four PNGs in this directory's root are earlier development-server evidence from the `de8b7e7` era. They are retained for history and superseded by the reviewed evidence above; they do not represent the current application commit or current scores.
