# Remaining template implementation brief

User authorized all 16 on 2026-10-05. Implementation exclusively GPT 6 Luna, reasoning max. Parent coordinates/reviews only. Read apps/temura/AGENTS.md, .agents/skills/frontend-design/SKILL.md and relevant installed Next docs.

Each worker writes only assigned kebab-case .tsx/.css under apps/temura/components/invitation/starter-previews/. Export the assigned PascalCase component with no props, importing its own CSS. Do not edit route/catalog/kit/other templates. Kit owner alone writes preview-kit.tsx, preview-kit.css, runtime-assets.ts. Do not alter PNGs, branding, database, auth, studio, marketing, Sawala or Eunoia.

## Exact shared API

Import from ./preview-kit:
- InvitationFrame({templateId:string,name:string,className?:string,cover:ReactNode,children:ReactNode}): toolbar52px, closed cover exactly viewport minus52; OpenButton opens children and automatic greeting. Owns manual music, six-photo lightbox, reveal/scroll behavior.
- OpenButton({className?:string,children?:ReactNode}), default Buka undangan.
- Decoration({id:string,className?:string,eager?:boolean}): exact manifest WebP, empty alt, responsive derivatives.
- Photo({index:number,className?:string,alt?:string,full?:boolean}): index1..6, normal720x900, full1122x1402.
- PhotoButton({index:number,className?:string}): displays Photo and opens lightbox.
- Countdown({className?:string}), EventMap({className?:string}), Rsvp({className?:string}), Gift({className?:string}).
- CalendarLink({className?:string}): working ICS download.

Motion: data-reveal one-time reveal; data-scene gets --tk-drift/--tk-counter in px, --tk-turn in deg and --tk-progress 0..1 via passive scroll+rAF only near viewport. Frame uses .tk-opened/.tk-closed, .tk-toolbar/.tk-cover/.tk-content/.tk-controls; bottom controls fixed, content bottom padding >=64px. Shared helpers provide behavior, NOT section composition.

## Measurable acceptance

1. Own CSS namespace per template, no leaking selectors.
2. At390x844 and1440x900 unopened scrollHeight equals viewport height, opening button visible. At320x740 no horizontal overflow or clipped primary action.
3. Names Nara Pradipta/Aruna Kirana; date Minggu12Desember2027; Bandung/JawaBarat; akad08.00-10.00,resepsi11.00-14.00 WIB; same sample parents as references. No invented customers/bookings/testimonials.
4. Include cover, automatic greeting, couple, events+countdown+calendar, embedded map, short story <=3items, SIX distinct supplied photos, RSVP/local wishes, gift/closing, manual music.
5. Body>=14px, control touch targets>=44px, visible focus, accessible forms/dialogs, readable text. No decorative pills/chips, long copy, fake controls.
6. At least3 distinct composition treatments from paired sibling: opening, couple, events, gallery, story, closing. Honor assigned blueprint; never clone Sawala/Eunoia section markup.
7. Use assigned background and all relevant ornament pack assets deliberately across sections, not a pile in one screen. Islamic/retro use assigned pair plus relevant romance assets. Visually inspect actual art before placement.
8. Never obscure photo faces: ornaments behind gallery images, pointer-events:none; preserve both faces in cropping. Textures must preserve contrast.
9. Observable scroll motion on>=2 scene elements, independent depth/direction; reduced-motion alternative. No continuous animation >5seconds without user initiation, heavy libraries or new generated media.
10. No visible Foto ilustrasi/Contoh desain/demo captions/implementation copy in invitation. Payment placeholders must still not imply real transfer targets; no invented bank accounts/QRIS.
11. Run scoped TypeScript and ESLint; if kit incomplete report dependency and retry after it arrives. Verify every asset ID/URL against manifest and all6photo references. Parent owns browser QA to avoid contention.
12. Report files, distinct composition, used asset IDs, checks and limitations. No push/deploy.
13. No redundant decorative kickers such as Momen bersama above Galeri, or repeated names above a story heading. Use functional headings Galeri, Cerita kami, Acara; date/place labels are meaningful data. Do not explain the design inside the invitation.

## Sources

apps/temura/public/assets/templates/manifest.json is authoritative WebP runtime source. apps/temura/lib/template-catalog.ts supplies names/IDs/assigned ornament concepts. apps/temura/public/images/prewed/manifest.json supplies six photos. Existing catalog-previews/invitation-preview.tsx is functional/data reference only. Old planned PNG paths are not runtime URLs.
