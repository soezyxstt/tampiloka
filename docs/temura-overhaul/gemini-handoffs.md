# Manual Gemini handoffs

These are user-run prompts for after the asset downloads are complete. They are written for the requested model, gemini-3.8-flash-medium. No AGY command has been run from this task. Paste the shared guardrails at the start of each handoff and then the selected task prompt.

Current intake source: `artifacts/temura-overhaul/downloaded-source/readiness.json` maps planned names to actual originals, including corrected variants and excluded files. Use that inventory for Handoff 1; source filenames alone are insufficient because the Library contained duplicates. Tom & Jerry is the current cartoon replacement. Use `tom-jerry-replacement.md`, not the historical SpongeBob prompts. Web-optimized derivatives are installed directly in `apps/temura/public/assets/templates/`. For runtime use, read that directory’s `manifest.json` and README: URLs end in `.webp`, with main/small/thumbnail variants. Do not copy the large PNG originals into runtime directories. Verify the completed derivative manifest before Handoff 2; the historical catalog PNG paths describe planned sources, not current runtime URLs.

## Shared guardrails

~~~text
Use model gemini-3.8-flash-medium.

Project: Temura monorepo at D:\Work\Tampiloka\site.
Read D:\Work\Tampiloka\site\AGENTS.md and apps\temura\AGENTS.md first. Read the relevant installed Next.js guide under node_modules\next\dist\docs before editing Next.js code. Follow the project’s current Tampiloka brand system and Base UI conventions.

Keep copy minimal, direct, and functional. Omit unnecessary headings, slogans, overlines, and repeated descriptions. Do not add decorative pills, badges, chips, or pill-shaped tabs. Use plain category tabs with an underline, modest rectangular controls, open sections, rows, tables, and dividers. Avoid card-heavy layouts; use cards only when content or interaction requires them, including equal-size template previews. Apply these rules to every delegated change.

Do not start preview implementation unless every required asset for the task exists in apps\temura\public\assets\templates and has been visually approved. If a file is missing, transparent artwork has a fake checkerboard, or an image fails QA, stop before code edits and report the exact filenames and problem.

The catalog is display-only. The current database, form actions, and public invitation renderer accept numeric templateId values 1–6. Do not change Prisma schema/migrations, persisted template IDs, auth, payment state, invitation actions, or production database data. Do not claim buyer checkout or account-backed studio persistence exists unless the inspected implementation proves it.

Every preview uses the fictional couple Nara & Aruna. Keep all text in HTML, never in generated images. Do not make Arabic calligraphy, Quran or hadith copy with an image model. Keep reduced-motion behavior, accessible controls, image alt text, and readable contrast. Game/cartoon art is unofficial and must not be presented as endorsed or licensed.

Mutation boundary: change only the exact files named in the selected task. Do not install packages, call external services, modify environment variables, or touch unrelated worktree changes. Preserve any edits you did not create.

Evidence: report the changed paths, number of catalog items/assets checked, missing or rejected assets, exact commands and exit codes for any checks run, preview URLs, tested viewport sizes, and whether visual inspection was actually completed. Do not claim checks that were not run.
~~~

## Handoff 1: Asset intake audit

Run this before preview work, after downloading the images. It is read-only with respect to the image files.

~~~text
Objective: audit the downloaded Temura asset pack against apps\temura\lib\template-catalog.ts and docs\temura-overhaul\image-prompts.md. Confirm the exact 108 files (18 portrait backgrounds, 90 ornaments), filenames, image dimensions, actual alpha transparency, and whether each image meets its prompt and cultural/style QA.

Input paths:
- apps\temura\lib\template-catalog.ts
- artifacts\temura-overhaul\downloaded-source\readiness.json
- artifacts\temura-overhaul\downloaded-source\manifest.json
- artifacts\temura-overhaul\downloaded-source\ (only originals selected in readiness.json; skip excluded and superseded files)
- docs\temura-overhaul\image-prompts.md
- docs\temura-overhaul\tom-jerry-replacement.md

Working directory: D:\Work\Tampiloka\site
Scope: read and visually inspect those inputs. You may create one QA report at docs\temura-overhaul\asset-qa.md. Do not edit image files, rename them, delete them, convert them, update application code, or mark a catalog cover as ready.

Check genuine transparent pixels rather than relying on the viewer’s checkerboard. For backgrounds, check portrait framing and a clear text-safe area. Reject clipped artwork, accidental writing, low-resolution artifacts, mixed regional motifs, fake transparency, or color/contrast that makes later HTML text difficult to read. For Islamic assets, confirm there is no AI-generated sacred text or calligraphy.

Some transparent preview renderers show false red fringe. Composite the source onto opaque light and dark surfaces before rejecting its edges. Preserve the original PNG. All 18 selected backgrounds are native opaque 1024x1536 portrait PNGs. Verify actual dimensions; do not silently label them 1200x1800. Eunoia 02 and 05 use the thin refined variants selected in readiness.json. Distinguish native source resolution, source existence, visual QA, and runtime installation. The intake audit may pass source completeness while separately listing composition/style concerns, but never label all assets approved if a concern remains unresolved.

Output format: write a concise table with filename, actual pixel size, alpha yes/no, pass/reject, and one reason. Include totals by category and an explicit missing-file list. Conclude with either ASSETS_READY_FOR_PREVIEW or ASSETS_BLOCKED. Only use ASSETS_READY_FOR_PREVIEW when all 108 assets pass; otherwise list exact replacements needed and stop.
~~~

## Handoff 2: Shared preview foundation

Run once after the asset audit returns ASSETS_READY_FOR_PREVIEW.

~~~text
Objective: create the shared static preview route and renderer contract for the 18 Temura catalog designs. The preview is for browsing the designs and must use Nara & Aruna; it must not create or update a real invitation record.

Inputs:
- apps\temura\lib\template-catalog.ts
- all 108 QA-approved files under apps\temura\public\assets\templates\
- the current route group apps\temura\app\(marketing)\
- existing invitation components under apps\temura\components\invitation\
- docs\temura-overhaul\README.md and asset-qa.md

Working directory: D:\Work\Tampiloka\site
Scope: add only:
- apps\temura\app\(marketing)\preview\[templateId]\page.tsx
- apps\temura\components\invitation\catalog-previews\types.ts
- apps\temura\components\invitation\catalog-previews\preview-shell.tsx
- apps\temura\components\invitation\catalog-previews\category-renderer.tsx
- five category module stubs under apps\temura\components\invitation\catalog-previews\categories\

Define and export one shared props type, for example CatalogPreviewProps, with the selected catalog item and a fixed Nara & Aruna sample. Define five category modules with stable exported names: AdatPreview, GameKartunPreview, MinimalistPreview, IslamicPreview, and RetroNostalgiaPreview. Each stub may show a restrained placeholder until its category handoff is complete. Build the page route from catalog IDs, not numeric Prisma templateId values. Show a clear not-found state for unknown IDs. Keep preview data static and avoid database writes.

Do not edit the landing page, catalog source data, existing six invitation renderers, Prisma, actions, auth, dashboard, studio, or package files. Do not generate, download, or alter images.

Evidence: report the new route shape, shared props contract, exact files changed, and checks/exit codes. Confirm /preview/<catalog-id> renders a Nara & Aruna sample and that an unknown ID returns not-found. The previews are not complete until the five category modules are filled in.
~~~

## Handoff 3: Adat preview module

Run after the shared preview foundation exists and all five adat backgrounds plus their six ornament files each have passed audit.

~~~text
Objective: implement the five adat preview variants in one responsive category module: Sunda, Bali, Jawa, Minang, and Betawi. Every sample names the couple Nara & Aruna.

Inputs: apps\temura\lib\template-catalog.ts; approved files bg-adat-sunda.png, bg-adat-bali.png, bg-adat-jawa.png, bg-adat-minang.png, bg-adat-betawi.png; matching orn-adat-* files; shared preview types and renderer created by Handoff 2; current Tampiloka brand styles and existing invitation section components.

Working directory: D:\Work\Tampiloka\site
Mutation boundary: edit only apps\temura\components\invitation\catalog-previews\categories\adat.tsx. Do not touch the route, shared renderer, other category files, catalog, database, studio, marketing pages, or image files.

Build a distinct art-directed page per catalog ID, with a cover, event details, venue/maps, optional gallery, RSVP/wishes, and digital gift section. Keep text as HTML. Use only each template’s named regional assets. Do not mix regions, invent ritual rules, or use sacred figures as decoration. Respect mobile safe areas and contrast; use restrained motion and honor prefers-reduced-motion.

Evidence: list the five route IDs, show a browser screenshot or browser-tested URLs at 390 px and desktop width if browser access exists, and report missing files plus check commands and exit codes. If browser access is unavailable, state that visual QA remains pending.
~~~

## Handoff 4: Game and cartoon preview module

Run after the shared preview foundation exists and all four game/cartoon backgrounds and ornament packs have passed audit.

~~~text
Objective: implement four distinct game/cartoon preview variants for Minecraft, Tom & Jerry, Block Blast, and Upin & Ipin. Every sample names the couple Nara & Aruna. Read tom-jerry-replacement.md for the replacement asset concepts; ignore retired SpongeBob/Doraemon prompts and do not use BoBoiBoy.

Inputs: apps\temura\lib\template-catalog.ts; the approved bg-game-* files and matching orn-game-* packs; shared preview types and renderer from Handoff 2; existing invitation section components.

Working directory: D:\Work\Tampiloka\site
Mutation boundary: edit only apps\temura\components\invitation\catalog-previews\categories\game-kartun.tsx. Do not touch the route, shared renderer, other category files, catalog, database, studio, marketing pages, or image files.

Use the user-provided, visually approved character/theme assets only. Do not create new AI images, copy game UI, add official logos, or suggest endorsement. Give the four themes noticeably different color, composition, and animation while keeping HTML text readable and every interaction usable on a phone. Honor prefers-reduced-motion and avoid animation that blocks access to RSVP or event details.

Evidence: list the four route IDs, show browser screenshots or browser-tested URLs at 390 px and desktop width if browser access exists, and report missing files plus check commands and exit codes. If browser access is unavailable, state that visual QA remains pending.
~~~

## Handoff 5: Minimalist preview module

Run after the shared preview foundation exists and all three minimalist backgrounds and ornament packs have passed audit.

~~~text
Objective: implement Eunoia, Ruang Rindu, and Senja as three distinct minimalist previews. Every sample names the couple Nara & Aruna.

Inputs: apps\temura\lib\template-catalog.ts; the approved bg-minimalist-* files and matching orn-minimalist-* packs; approved shared romance ornaments; shared preview types and renderer from Handoff 2; existing invitation section components.

Working directory: D:\Work\Tampiloka\site
Mutation boundary: edit only apps\temura\components\invitation\catalog-previews\categories\minimalist.tsx. Do not touch the route, shared renderer, other category files, catalog, database, studio, marketing pages, or image files.

Match Temura’s restrained website style. Give each design an identifiable font pairing and a small, unusual ornament, but preserve generous white space, romantic wording, strong readability, and smooth subtle movement. Honor prefers-reduced-motion; the page must still feel complete with motion disabled. Avoid cards within the invitation itself unless the information needs a boundary.

Evidence: list the three route IDs, show browser screenshots or browser-tested URLs at 390 px and desktop width if browser access exists, and report missing files plus check commands and exit codes. If browser access is unavailable, state that visual QA remains pending.
~~~

## Handoff 6: Islamic preview module

Run after the shared preview foundation exists and all three Islamic backgrounds, all six Islamic ornaments, and shared assets pass audit.

~~~text
Objective: implement Sakinah, Mawaddah, and Rahmah as respectful Islamic invitation previews. Every sample names the couple Nara & Aruna.

Inputs: apps\temura\lib\template-catalog.ts; approved bg-islamic-* files, orn-islamic-01.png through orn-islamic-06.png, and shared romance ornaments; shared preview types and renderer from Handoff 2; existing invitation section components.

Working directory: D:\Work\Tampiloka\site
Mutation boundary: edit only apps\temura\components\invitation\catalog-previews\categories\islamic.tsx. Do not touch the route, shared renderer, other category files, catalog, database, studio, marketing pages, or image files.

Keep forms contemporary and calm, and differentiate the three palettes through geometry, plant details, and spacing. Do not add AI-generated Arabic, Quran, hadith, dua, or calligraphy. Any religious text must be supplied as editable HTML from an approved, human-verified source; if no verified text exists, omit it. Honor prefers-reduced-motion and maintain contrast.

Evidence: list the three route IDs, show browser screenshots or browser-tested URLs at 390 px and desktop width if browser access exists, and report missing files plus check commands and exit codes. If browser access is unavailable, state that visual QA remains pending.
~~~

## Handoff 7: Retro preview module

Run after the shared preview foundation exists and all three retro backgrounds plus the six retro ornaments pass audit.

~~~text
Objective: implement Kabar Bahagia, Layar Tancep, and Sundown Letters as three distinct retro/nostalgia previews. Every sample names the couple Nara & Aruna.

Inputs: apps\temura\lib\template-catalog.ts; approved bg-retro-* files, orn-retro-01.png through orn-retro-06.png, and shared romance ornaments; shared preview types and renderer from Handoff 2; existing invitation section components.

Working directory: D:\Work\Tampiloka\site
Mutation boundary: edit only apps\temura\components\invitation\catalog-previews\categories\retro-nostalgia.tsx. Do not touch the route, shared renderer, other category files, catalog, database, studio, marketing pages, or image files.

Give Kabar Bahagia an Indonesian old-postcard feeling, Layar Tancep a mobile-cinema mood, and Sundown Letters a western vintage stationery style. Keep all text editable in HTML; paper and tickets must remain blank art assets. Preserve legibility and reduced-motion behavior.

Evidence: list the three route IDs, show browser screenshots or browser-tested URLs at 390 px and desktop width if browser access exists, and report missing files plus check commands and exit codes. If browser access is unavailable, state that visual QA remains pending.
~~~

## Handoff 8: Final integration and visual QA

Run after all five category modules are complete.

~~~text
Objective: review and verify all 18 static Temura design preview routes and the asset manifest without expanding scope.

Inputs: the catalog and manifest; all approved assets; the shared route and renderer; all five completed category modules; docs\temura-overhaul\README.md and asset-qa.md.

Working directory: D:\Work\Tampiloka\site
Scope: read the complete route and module set, fix only integration defects in the preview foundation files from Handoff 2, and write a QA report to docs\temura-overhaul\preview-qa.md. Do not redesign category art direction or change backend, schema, auth, studio, pricing, or marketing layout.

Visit each of the 18 IDs in the catalog. Confirm each shows Nara & Aruna and its own category styling; no page has broken/missing assets, overflows horizontally, or loses text contrast. Check at 360 px, 390 px, 768 px, and 1440 px. Check reduced-motion preference and keyboard access for links/buttons. Confirm the page uses optimized responsive assets or identify the needed optimization work.

Run only proportionate project checks after reviewing apps\temura\AGENTS.md, and report exact commands and exit codes. Include the 18 route IDs, viewport matrix, reduced-motion outcome, failed items, fixes, and any browser limitations. Do not mark the overhaul production-ready while real customer order/payment and dashboard workflows remain unimplemented.
~~~

## Execution order

1. Asset intake audit.
2. Shared preview foundation.
3. Run the five category handoffs. They touch separate files and can proceed independently after the foundation exists.
4. Final integration and visual QA.

If a task fails its input gate, stop at that gate and report it. These prompts do not authorize work before asset download or before the specified earlier handoff is complete.
