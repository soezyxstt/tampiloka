# Two reference previews

2026-10-05. The user narrowed the implementation to two designs for refinement. Do not create the remaining 16 until this direction is reviewed.

- `/preview/adat-sunda`: Sawala. Cormorant Garamond, ivory/forest/brown palette, framed batik cover, jasmine, arched photo, centered family details and a dark story section.
- `/preview/minimalist-eunoia`: Eunoia. Bodoni Moda, warm white/muted rose palette, left-aligned names and thin rules, one tulip, rectangular photo, asymmetrical family details and a pale story section.

These are static fictional Nara & Aruna samples, separate from the six numeric database templates. No Prisma data, real invitations, customer accounts or order/payment workflows are modified. Other IDs return not-found until implemented. Only these two catalog entries link to previews.

## Implementation contract

`lib/preview-designs.ts` resolves exact reviewed WebP variants from the runtime asset manifest on the server and passes a small serializable design object to the client. The route lives outside the marketing layout to keep invitation viewing free of marketing header/footer chrome. A restrained preview toolbar links to Desain and the other reference.

`InvitationPreview` owns shared sample interactions: cover opening and focus transfer, section links, a native greeting dialog, countdown, ICS calendar, embedded Google map plus external map link, six-photo scroll gallery and gallery dialog, local RSVP/wishes, gift disclosure/copy, and manually started music. The renderer makes no database requests. RSVP and guest count stay in memory and clear on page reload. Gift account and QRIS are explicitly examples. Six user-supplied AI pre-wedding photos are installed under public/images/prewed, each with a 720px gallery WebP and original-size WebP for enlargement; source PNGs remain unchanged in Downloads.

Design variations are scoped to `ip-sawala` and `ip-eunoia` in `app/preview/preview.css`. Keep distinct composition and typography, not merely different colors. Preserve whitespace, short copy and the reviewed asset selection. Later designs may need separate section compositions; do not force all categories into this exact arrangement.

The shared desktop view uses sticky artwork beside an invitation column. Mobile uses one full-width document. Page text remains HTML. Decorations have empty alt text and never capture pointer events. Images use the selected optimized WebP derivatives; photos use explicitly generated WebP variants. Only opening art is eagerly loaded. Native picture sources select the pre-generated WebP sizes. Motion now includes a split curtain opening after the automatic greeting, independent ornament translation and rotation driven by scroll, section reveals, and a sticky six-photo filmstrip. A passive scroll listener schedules one requestAnimationFrame and updates only scenes near the viewport. Reduced-motion mode removes transforms and displays every gallery photo vertically. Each design remounts independently; switching designs clears local sample state and stops audio.

## Checks and evidence

Scoped TypeScript and ESLint checks pass for the new route, renderer, resolver, catalog and showcase integration. Next route type generation passes. The production Webpack build compiled successfully and completed its TypeScript stage, then failed while prerendering /_global-error with the Next invariant “Expected workStore to be initialized”. This is not a successful production build; no deployment was attempted. Earlier direct full-app checks also reported legacy UploadThing/Motion typing errors; scoped preview validation passes.

Browser evidence is stored under `artifacts/temura-overhaul/previews/`. Check the two covers, opened content, desktop/mobile layout, native dialogs, in-memory RSVP with guest count, music play/pause, and local gift UI. Maps use Bandung as a sample location, not a booked venue. Calendar link contents specify the sample event in WIB.

Refinement should prioritize composition, font scale, photo treatment, ornament density, page rhythm, and motion. Once these two examples are accepted, use their asset resolver, isolated styling, accessibility and preview data boundaries as the reference for additional templates.

Browser results: 320-pixel cover checks and 390-pixel interaction checks passed for both designs. Sawala also passed a 768-pixel layout check; both desktop compositions were checked at 1440 pixels. No horizontal overflow was observed. The real Cormorant/Bodoni fonts and visible art/photo sources loaded. Greeting/gallery dialog opening and close/Escape, sample RSVP/guest count, disabled guest selection for non-attendance, music play/pause, and gift-copy confirmation were tested. The two valid routes return HTTP 200; unknown and unimplemented design IDs return HTTP 404. Reduced-motion rules were inspected in source; preference emulation was not available through the browser controls. Calendar payload and map URL were inspected, not externally submitted.

## Refinement, 2026-10-05

Reviewed all three user references in Chrome, including opened invitations and gallery/map scenes. The implementation uses its own reviewed art; competitor photos and art are not copied. Greeting opens immediately after Buka undangan. Curtain animation pauses while greeting is open. Sawala uses carved corners, woven medallion and jasmine foreground; Eunoia uses pale frames, rose and tulip layers. Maps show the sample Bandung location through a lazy iframe.

Six PNG sources total 14,882,264 bytes. Gallery WebPs total 759,976 bytes, full-size WebPs total 1,603,086 bytes. See public/images/prewed/manifest.json for dimensions, sizes and source mapping. Full-size variants preserve the supplied 1122x1402 resolution without upscaling.

Current refinement verification uses scoped TypeScript/ESLint plus browser checks. Previous production-build failure remains unresolved and no deployment is claimed. Fresh screenshots supersede the earlier quieter proof images.
Fresh refinement checks passed: scoped TypeScript and ESLint; automatic greeting and close; six local WebP gallery sources; scroll-dependent photo/ornament transforms; gallery next/close; rendered Google map; 320px Sawala and 390px mobile compositions; 1440px desktop composition. Reduced-motion alternative is source-reviewed, not browser-emulated. Gallery exports total 0.76 MB rather than 14.88 MB source PNGs. No external stock photos remain in the reference renderer.

## Distinct composition rule

2026-10-05 refinement: photo illustration captions and the closing demo paragraph are removed from the invitation. Preview identity stays in the surrounding toolbar; sample payment fields remain identified.

Sawala keeps a centered carved-frame introduction with an arched photo, stacked couple details, full-width event rows, dark text story, and a sticky horizontal gallery. Eunoia now uses a full-bleed photographic introduction with bottom-aligned type, staggered two-column photo/couple details, paired event columns, a photo-led story with large year markers, an editorial vertical gallery (full-width photos alternating with paired photos), and a left-aligned closing.

New templates must define their own composition before implementation. Choose opening mechanics, photo framing, couple structure, event arrangement, story layout, gallery interaction and closing independently. Reuse data/helpers/controls, not the exact section composition. Category or color changes alone do not meet the requirement. Keep copy short. Do not expand beyond these two until the user asks.
