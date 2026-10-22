"""Record completed human/browser observations and run the skill's evidence assessor separately."""
import json, shutil
from pathlib import Path
from PIL import Image
R=Path(__file__).resolve().parents[1];Q=R/'research/quality';E=Q/'evidence'
S=Path('C:/Users/adiha/.codex/skills/prospect-to-website-demo')
plan=json.loads((Q/'page-plan.json').read_text(encoding='utf-8'))
review=json.loads((S/'assets/review.template.json').read_text())
review.update(prospectId='bumi-upi-garut',reviewId='bumi-upi-local-2026-10-22',reviewedAt='2026-10-22',reviewer='GPT source reconciliation and Chrome visual/interaction review',features=plan['features'],layoutSignature=plan['layoutSignature'])
review['featureNotes']={'stickyToolbar':'Not used: catalogue toolbar is inline, with 12 items initially.','productDialog':'No detail modal needed; prices and variants inline.','carousel':'No photo carousel: static room mosaic and individually captioned images.','accordion':'No FAQ invented from absent operational evidence.'}
shutil.copyfile(R/'research/sources.md',E/'sources.md')
shutil.copyfile(R/'research/contact-sheet.jpg',E/'contact-sheet.jpg')
shutil.copyfile(R/'components/home.tsx',E/'implementation.txt')
shutil.copyfile(R/'research/raw/brand-feed.png',E/'brand-feed.png')
shutil.copyfile(R/'research/raw/reguler-full-2.png',E/'brand-menu.png')
shutil.copyfile(R.parent/'duduk-gembira/research/quality/evidence/desktop-full.png',E/'compare-duduk.png')
shutil.copyfile(R.parent/'talkie-space/research/quality/evidence/1440.png',E/'compare-talkie.png')
(E/'art-review.md').write_text('''# Source-to-web and composition review
Brand palette: official feed repeatedly uses olive grounds and cream headings; menu supplies mustard/red frame accents. Web cream reading ground is adapted from the paper menu, not inferred from the house alone. Olive full-width photo-booth section retains source dark/light contrast; partner blue campaign colors deliberately excluded.
Typography: original rounded wordmark retained as raster, not live recreation. MENU and BERBAGI source headlines are broad low-contrast bold sans; Archivo Black has broad counters/block strokes and dense width closer than the already installed Inter/Manrope interface fonts. DM Sans body is deliberately calmer; exact source font not established. No serif/italic editorial treatment added.
Composition: source uses dense poster headline/photo framing. The web split hero translates headline/photo relation into readable copy plus a mustard/olive inset photo frame; no full poster pasted into hero. Three-photo mosaic provides varied scales before catalogue. On mobile copy/action precedes framed house, then all three room photos stack. Earlier arch experiment was removed after comparing source graphic vocabulary.
Imagery: plate photos are exact official raster menu crops; source texture and dish shapes preserved, low resolution acknowledged. Warm wood/greenery and actual facade make place identity explicit. Human subjects in background remain original; unrelated family portrait was rejected. Watermarks stay intact for local review, rights pending.
Graphic language: source wallpaper's four-petal motif is cropped into kitchen-note detail, double inset frame translated to facade border, paper surface simplified to legible cream. No pills, decorative label chips or borrowed illustration.
Actual comparisons: Duduk Gembira screenshot has giant red typographic hero above paired social/product snapshots, a green narrative section and compact text-only category lists; Bumi Upi has a contained olive/red split hero framed like its menu, a three-photo room mosaic, individually imaged two-column rows, and a booth section. Both use cream/red because sources warrant it, but the foreground subject, frame, spatial hierarchy and menu density differ.
Talkie Space screenshot uses a contemporary black/white split coffee hero, a process photo section, a breakfast banner, then all categories rendered through a long compact list with wide category images. Bumi Upi uses warm retro framing, house facade and room mosaic; only12 dishes initially, real search/filter and load-more keep visit/booth reachable. The broad split relation is shared; framing, sequence, image grouping, catalogue pacing and business story differ.
Catalogue pacing: initial12 dishes occupy six desktop rows; next CTA exposes12 additional entries per click. All116 are accessible; no unique item hidden behind PDF. On mobile twelve imaged rows are longer but still a finite section before booth/visit. Search/filter can shorten it immediately. Tiny source photos are used honestly as thumbnails instead of oversized blurry cards; this is a material local visual limitation, not high-resolution food photography.
Two strategy candidates were compared in metadata: place-first framed facade/mosaic/photo rows vs typographic menu-first/compact rows/single story photo. A chosen for destination identity, B rejected for obscuring house atmosphere. This review records the built result and the actual sibling renders, not an invented pre-build approval.
''',encoding='utf-8')
(E/'browser-checks.md').write_text('''# Observed Chrome interactions, 2026-10-22
Desktop 1440x1000; initial DOM 12 dishes, total 116. Click main CTA -> #menu. Category Kopi -> six items. Search buntut -> three beef dishes and category resets to Semua menu. Search zzzx -> zero results and an empty-state reset action; reset restores 116 total / 12 visible. Load more ->24 then full sequence 24,36,48,60,72,84,96,108,116, unique116, no next button at end.
320x780: no horizontal overflow. Category inline beside magnifier. Magnifier opens same-row animated input and focus is Cari menu mobile. Search ketan -> Ketan Kinca Rp24.500 and Ketan Oncom Rp22.000. Escape closes search and final focus is Buka pencarian menu; initial timing bug fixed using AnimatePresence onExitComplete, rechecked final focused label and absence of mobile-search. Keyboard Enter opens Select; ArrowDown to Cemilan, Enter selects, category reads Cemilan, 14 choices, focus returns to Kategori menu. CSS focus-visible outline preserved.
390x844 and 768x1024: document width equals viewport, fonts loaded; hero body and CTA fit, facade retains house crop. Final room section uses three-photo mosaic at desktop and stacked scenes on mobile. Full desktop screenshot visually reviewed from hero through footer. Unrelated family portrait rejected from visit section. All original source photo watermarks retained. Product raster source low resolution constrains thumbnails; no upscale presented as high-res product photography.
Reduced motion emulated before reload: query matches true; scroll behavior auto; zero opacity-hidden headings, no overflow. Hero content server-visible, no parallax/marquee, JS MotionConfig reducedMotion=user. Search and Select remain usable; source preserves Base UI behavior.
Maps destination opened in new Chrome tab: resolved to Google Maps Bumi Upi, address Jl. Cimanuk No.312, Pataruman, Tarogong Kidul, Garut 44150; phone 0895-4120-55152, closes 23.00, matches official bio. No rating or review copied into demo. WhatsApp destination confirmed in official Linktree; no message sent. Internal targets exist, HTTP audit passes.
No browser error logs captured. Development warnings: earlier removed place-32 LCP when navigating directly to footer; Motion reduced-motion notice during intentional emulation. These are not production/hydration errors. Local build, lint and typecheck exit codes recorded separately. No external publishing, booking, payment or outreach performed.
Source review: inspected all six raster menu pages, source brand palette olive/mustard/red on cream, heavy sans titles. Fonts are licensed substitutes, not asserted original webfonts. shadcn Button/Input/Select locally copied from established registry-derived source, Base UI unchanged. Every display image/font has manifest entry. Menu schema valid, source fingerprints valid, local rights pending explicitly distinct from authenticity.
''',encoding='utf-8')
def luminance(h):
    rgb=[int(h[i:i+2],16)/255 for i in (1,3,5)];return sum(c*w for c,w in zip([v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb],[.2126,.7152,.0722]))
pairs=[('#303620','#faf4e7'),('#62634c','#faf4e7'),('#a13223','#faf4e7'),('#faf4e7','#51582d'),('#edbe50','#51582d')]
ratios=[dict(fg=a,bg=b,ratio=round((max(luminance(a),luminance(b))+.05)/(min(luminance(a),luminance(b))+.05),2)) for a,b in pairs]
assert all(x['ratio']>=4.5 for x in ratios[:-1]) and ratios[-1]['ratio']>=3
(E/'contrast.json').write_text(json.dumps(ratios,indent=2))
review['evidence']={}
def ev(id,kind,path,summary,viewport=None,full=False):
    record=dict(kind=kind,path='evidence/'+path,summary=summary)
    if kind=='screenshot':
        size=Image.open(E/path).size;record.update(viewport=viewport or dict(width=size[0],height=size[1]),deviceScaleFactor=1,captureMode='fullPage' if full else 'viewport')
    review['evidence'][id]=record
ev('desktop','screenshot','desktop.png','Final desktop hero: original logo, olive/red heavy sans hierarchy, authentic facade.',dict(width=1440,height=1000))
ev('full','screenshot','desktop-full.png','Full desktop render reviewed: entrance, three photo mosaic, compact catalogue, booth and visit.',dict(width=1440,height=1000),True)
ev('brandfeed','source','brand-feed.png','Actual official Instagram feed image crop: recurring olive, cream heavy sans, product photos and pattern.')
ev('brandmenu','source','brand-menu.png','Rendered official raster menu page: framed paper ground, plate cutouts, heavy sans categories and four-petal wallpaper.')
ev('art','review','art-review.md','Five source-to-web aspects, font rationale, actual sibling composition comparison and catalogue pacing review.')
ev('compareduduk','screenshot','compare-duduk.png','Actual built Duduk Gembira whole-page comparison: typographic collage hero, story block and long compact lists.',dict(width=1440,height=1000),True)
ev('comparetalkie','screenshot','compare-talkie.png','Actual built Talkie Space whole-page comparison: contemporary coffee hero, process/breakfast and long catalogue.',dict(width=1440,height=1000),True)
for width,name in [(320,'mobile-320'),(390,'mobile-390'),(768,'tablet-768')]:ev(str(width),'screenshot',name+'.png',f'Chrome {width}px render: readable hero and controls without horizontal overflow.')
for id,path,summary in [('search','mobile-search.png','320px active mobile search with matching Ketan dishes and inline close control.'),('mobilemenu','mobile-menu.png','320px catalogue: category beside magnifier, compact readable photo rows.'),('reduced','reduced-motion.png','Fresh reduced-motion emulation render keeps all content visible.')]:ev(id,'screenshot',path,summary)
for id,kind,path,summary in [('browser','review','browser-checks.md','Actual Chrome interactions, keyboard, media and source review observations.'),('dom','dom','dom.json','Final DOM: loaded fonts, correct links, original room photos, one h1 and noindex.'),('pagination','dom','pagination.json','Full load-more sequence reaches 116 unique records and then hides load-more.'),('viewports','dom','viewports.json','390px and 768px measurements: document widths match viewport and fonts loaded.'),('reducedjson','dom','reduced.json','Fresh reduced-motion preference active, scroll auto, headings visible.'),('source','source','sources.md','Official profile/bio and all PDF content reviewed; source limits and omissions recorded.'),('implementation','source','implementation.txt','Actual component implementation feature inventory, local official Base UI primitives.'),('contrast','log','contrast.json','Computed text/background contrast pairs for actual CSS colors; body pairs exceed 4.5; large yellow heading exceeds 3.'),('console','log','console.json','Captured Chrome console error-level entries: empty list.'),('http','log','http.json','HTTP source checks: one h1, noindex, safe links, anchor targets and served images.'),('data','log','data-check.log','116 records, source bundle parity, images and contextual price checks passed.'),('validation','log','research-validation.json','Research schema, ID mappings, sources and source fingerprints validated.'),('build','log','build.log','Next production build completed with static prerender and exit code.'),('lint','log','lint.log','ESLint checked standalone demo; exit code recorded.'),('types','log','typecheck.log','TypeScript noEmit checked standalone demo; exit code recorded.')]:ev(id,kind,path,summary)
def passcheck(group,key,observed,ids):review[group][key]=dict(status='pass',observed=observed,evidence=ids)
gates={
'identity_sources':('Official profile, bio address and WA destination reconciled; Google Maps exact address matches.',['source','browser']),
'authentic_content':('All unique official PDF dishes included, matched crops, contextual price preserved. Original place photographs retain watermark. No fictional food, review or facility.',['source','data','full']),
'explicit_design_rules':('No decorative pills or overlines. Open sections, rounded F&B images, shadcn Select/Input/Button with Base UI retained.',['full','implementation']),
'working_actions':('Menu anchors, category, search/reset/load-more and official WA/Maps targets tested. No fake booking success.',['browser','pagination','dom']),
'responsive_keyboard':('320/390/768/1440 layouts without overflow, Select keyboard and search Escape/focus tested.',['320','390','768','browser']),
'truthful_scope':('Local concept banner and noindex. No publication, rights clearance, production booking or conversion-performance claim.',['source','http','desktop']),
'layout_feasibility':('Authentic place images support three-photo mosaic; compact thumbnails respect raster-menu resolution.',['full','source'])}
for key,(obs,ids) in gates.items():passcheck('gates',key,obs,ids)
checks={
'build':('Production Next build succeeded.',['build']), 'lint':('ESLint exit zero.',['lint']),'typecheck':('TypeScript noEmit exit zero.',['types']),
'desktop_render':('1440px hero and entire page inspected.',['desktop','full']), 'mobile_320':('320px hero, catalogue, search and final page fit without horizontal overflow.',['320','mobilemenu','browser']), 'mobile_390':('390px header/CTA and facade fit.',['390','viewports']), 'tablet_768':('768px split hero and navigation fit.',['768','viewports']),
'keyboard':('Enter/ArrowDown/Enter chooses Cemilan; Escape closes mobile search and restores focus after exit.',['browser']),
'contrast':('Actual plain surfaces checked; normal text pairs exceed 4.5; yellow large-heading pair exceeds 3. Hero caption has dark gradient and retained readable source photo.',['contrast','desktop']),
'core_links':('Menu/suasana/visit anchors exist; official WA and Maps destination confirmed without sending.',['browser','http','dom']),
'images':('Original photos loaded; crop inventory reconciled against PDFs; runtime asset files and initial HTTP images verified.',['dom','validation','data','full']),
'console':('No error-level console/hydration entries. Expected development reduced-motion warning recorded.',['console','browser']),
'reduced_motion':('Preference applied before reload, scroll auto and no hidden headings, content visible.',['reduced','reducedjson']),
'disclosure_noindex':('Independent local concept banner; robots noindex nofollow.',['desktop','http']),
'reference_review':('Official profile and six PDF pages visually reviewed; source colors and hierarchy govern demo, not Historia theme.',['source','full']),
'brand_evidence':('Original raster logo, source olive/cream/red/mustard, heavy sans type substitutes documented.',['source','desktop']),
'content_sources':('Both PDF menus complete, duplicate dish merged, specials note/booth/location covered; current ambiguous promos omitted with reason.',['source','data']),
'component_provenance':('Registry-derived local shadcn Button/Input/Select, @base-ui/react primitives and explicit dependencies.',['source','implementation']),
'brand_translation':('All five visual aspects reconciled against actual feed/menu imagery; source frame/motif retained, broad block font substitute justified; original logo retained.',['brandfeed','brandmenu','desktop','art']),
'composition_comparison':('Built Bumi Upi compared visually with actual Duduk Gembira and Talkie Space screenshots, including frame, hierarchy, photo rhythm, menu pacing and mobile order.',['full','compareduduk','comparetalkie','art']),
'catalogue_pacing':('Initial12 rows keep booth and visit reachable; all116 entries are reachable through real load-more/search/filter, no PDF handoff.',['full','pagination','art']),
'feature_inventory':('DOM and actual source show catalogue/filter/search/load-more/location, no carousel/sticky/dialog/accordion.',['dom','implementation','browser']),
'catalogue_data':('116 unique offerings; prices, variants and images checked against original raster pages.',['source','data','validation']),
'category_filter':('Kopi yields 6; keyboard Cemilan yields14; reset works.',['browser']),
'search':('Kopi then buntut resets category and shows three beef dishes.',['browser']),
'search_mode_mobile':('Inline expanding input focuses on open, Escape returns focus to magnifier after exit.',['search','browser']),
'empty_reset':('zzzx zero-result state offers reset; reset shows all116 with12 initially.',['browser']),
'load_more':('24,36,48,60,72,84,96,108,116 unique entries; button absent at end.',['pagination']),
'map_target':('Maps search resolved to Bumi Upi with exact Cimanuk312 Garut address.',['browser']),
'contact_links':('WA phone62895412055152 matches official Linktree and Maps; no message sent.',['browser','dom'])}
for key,(obs,ids) in checks.items():passcheck('checks',key,obs,ids)
ratings={
'brand':(4,'Original logo and source olive/red/cream preserved; licensed heavy sans substitute accurately follows PDF hierarchy.',['source','desktop']),
'visual':(4,'Inset-framed facade gives place identity; varied room mosaic and open compact menu rows avoid repetitive cards. Raster thumbnails and source watermarks remain limits.',['full','320','390']),
'information':(4.5,'116 unique official dishes with exact images/prices, variants including contextual discrepancy, opening hours and complete address.',['source','data','full']),
'conversion':(4.5,'One dominant menu action in hero, real WA contact and confirmed Maps action at visit; no simulated reservation.',['desktop','dom','browser']),
'interaction':(4.5,'Real Base UI Select, cross-category search/reset, full pagination and mobile Escape focus restoration all exercised.',['browser','pagination','search']),
'motion':(4,'Hero entrance, viewport reveal and mobile search transition present; reduced-motion fresh render verified. No continuous movement.',['implementation','reduced','browser']),
'technical':(4.5,'Independent package, local fonts and WebP assets, static production build plus lint/types/data/HTTP checks. No deployment test claimed.',['build','lint','types','http']),
'originality':(4.5,'Split destination hero, place-first order, photo-row catalogue and three-photo mosaic differ from recent demo signatures; palette remains source-led.',['full','source'])}
for key,(rating,obs,ids) in ratings.items():review['ratings'][key]=dict(rating=rating,observation=obs,evidence=ids)
review['unresolved']=[dict(description='Original source raster food images are small; compact thumbnails used.',scope='local',severity='minor'),dict(description='Original source photos retain watermarks; written reuse permissions not confirmed.',scope='publication',severity='major'),dict(description='Prices are sourced from accessible official PDFs, not reconfirmed by owner for current sale.',scope='publication',severity='major')]
(Q/'review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding='utf-8')
print('Recorded actual observations; next run evidence assessor with current shared history.')


