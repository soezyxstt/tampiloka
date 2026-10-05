# Starter integration and QA contract

Implementation exclusively GPT 6 Luna / max, including integration changes. Parent supplies completed template list. Do not expose unfinished entries.

Own a new server-side registry apps/temura/lib/starter-previews.ts plus app/preview/[templateId]/page.tsx and lib/template-catalog.ts. Preserve existing Sawala/Eunoia renderer/config and public routes. Registry records completed IDs/names and component loaders (prefer selected dynamic import to avoid sending all template renderers to every page). Async Next params remain Promise-based. generateStaticParams/metadata include ready templates plus existing two. Unknown or unfinished IDs still 404. Mark matching catalog entries ready with their actual background WebP URLs only when both TSX/CSS present and parent says completed. Do not change prices/categories or legacy numeric DB renderer.

Expected mapping:
- adat-bali -> purnama / PurnamaPreview
- adat-jawa -> sekar-mataram / SekarMataramPreview
- adat-minang -> rangkiang / RangkiangPreview
- adat-betawi -> kembang-kelapa / KembangKelapaPreview
- game-minecraft -> dunia-balok / DuniaBalokPreview
- game-block-blast -> susun-bahagia / SusunBahagiaPreview
- game-tom-jerry -> tom-jerry / TomJerryPreview
- game-upin-ipin -> kampung-ceria / KampungCeriaPreview
- minimalist-ruang-rindu -> ruang-rindu / RuangRinduPreview
- minimalist-senja -> senja / SenjaPreview
- islamic-sakinah -> sakinah / SakinahPreview
- islamic-mawaddah -> mawaddah / MawaddahPreview
- islamic-rahmah -> rahmah / RahmahPreview
- retro-kabar-bahagia -> kabar-bahagia / KabarBahagiaPreview
- retro-layar-tancep -> layar-tancep / LayarTancepPreview
- retro-sundown-letters -> sundown-letters / SundownLettersPreview

Read user presentation rules and installed Next docs. Validate scoped TS + ESLint (new registry, route, changed catalog); report exact ready list. No template composition edits, no studio/database/deployment changes. Parent browser-QAs routes and passes findings back to original Luna authors or another Luna/max repair worker.

Browser acceptance: 320x740,390x844,1440x900; unopened viewport-height page with visible button; opening auto greeting; close/Escape; all photo sources load; six distinct gallery photos with working enlargement; Maps iframe; nav anchor destinations; visible text contrast/face clearance; distinct compositions; page/console free of compilation or hydration errors. Save each cover and relevant opened scene. RSVP/music/calendar behavior sample-test shared kit once, then per-template anchor/cover/gallery checks. Reduced motion reviewed in source when browser preference emulation unavailable.
