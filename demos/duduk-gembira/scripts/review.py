import json, shutil, math
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root=Path(__file__).resolve().parents[1]
quality=root/'research/quality'
evidence=quality/'evidence'
skill=Path('C:/Users/adiha/.codex/skills/prospect-to-website-demo')
bundle=json.loads((root/'research-bundle.json').read_text(encoding='utf-8'))
review=json.loads((skill/'assets/review.template.json').read_text())
review.update(prospectId='duduk-gembira-garut',reviewId='local-2026-10-22',reviewedAt='2026-10-22',reviewer='GPT direct implementation and browser review',scope='local',features=bundle['pagePlan']['features'],featureNotes=bundle['pagePlan']['featureNotes'],layoutSignature=bundle['pagePlan']['layoutSignature'])
shutil.copy(root/'research/raw/menu.png',evidence/'menu-source.png')
source_text='\n\n'.join(p.read_text(encoding='utf-8') for p in (root/'research/sources').glob('*.md'))
(evidence/'sources.md').write_text(source_text,encoding='utf-8')
(evidence/'implementation.md').write_text('''Reviewed components/cafe.tsx and copied shadcn Button/Select + Base UI source. Only catalogue, categoryFilter and location are enabled. Six source-based categories. No native select, fake checkout, carousel, search, sticky toolbar, load more, dialog or accordion. Button and Select are local copies, no cross-demo imports. Motion/react entrance and viewport keyframes, initial=false; reducedMotion=user; CSS reduced motion disables transitions and smooth scrolling. Body 16px, compact menu labels 14/15px, secondary descriptions 12/13px. Images use local WebP, Next Image dimensions/sizes and below-fold lazy loading. Banner concept and robots noindex. Sources and research kept out of visitor copy and client data module.

Visual review: all sections inspected in desktop-full and tablet-768-full plus the mobile-review contact sheet from unmodified 320px full-page screenshot. Correct terrace sign, interior crop, four rice photo labels match dishes, no missing images or clipped CTAs. 320px header deliberately two rows; 390px header one row. Main hero/section copy remains readable. Original logo is low-resolution 150px source, retained at its native size. No stock or AI business imagery.

Two candidates reconciled in page plan: brand typographic/place-first/compact rows/alternating scenes/destination selected; split-product/grid alternative rejected because exact photography for 43 base items was not available. Compared with the accepted Historia baseline, all five layout axes differ. No claim of owner acceptance or conversion performance.
''',encoding='utf-8')
def luminance(hex):
    nums=[int(hex[i:i+2],16)/255 for i in (1,3,5)]
    nums=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in nums]
    return sum(a*b for a,b in zip(nums,[.2126,.7152,.0722]))
pairs=[('ink / cream','#273e30','#faf5e6'),('red / cream','#ad251b','#faf5e6'),('red / menu','#ad251b','#f0ead8'),('secondary / menu','#536052','#f0ead8'),('story text / green','#e0e6d6','#234b37'),('accent / green','#e5c584','#234b37'),('control border / cream','#61715f','#faf5e6')]
contrast=[]
for label,fg,bg in pairs:
    l=sorted([luminance(fg),luminance(bg)])
    ratio=(l[1]+.05)/(l[0]+.05)
    contrast.append(dict(pair=label,ratio=round(ratio,2)))
    assert ratio>=4.5,(label,ratio)
(evidence/'contrast.json').write_text(json.dumps(contrast,indent=2))
files={
 'build':('log','build.log','Next production Webpack build exit 0; static route generated.'),
 'lint':('log','lint.log','ESLint exit 0.'),
 'types':('log','typecheck.log','TypeScript noEmit exit 0.'),
 'data':('log','data-check.log','47 items, four unknown prices and exact photo mapping assertions passed.'),
 'sources':('source','sources.md','Official profile/menu/carousel plus place, Maps and inaccessible-link observations.'),
 'implementation':('review','implementation.md','Source, component provenance, feature inventory and visual review.'),
 'mobile-dom':('dom','mobile-dom.json','320/390px, fonts loaded, 47 menu items, no horizontal overflow.'),
 'wide-dom':('dom','desktop-tablet-dom.json','768/1440px, fonts loaded, links and images, no overflow.'),
 'interaction':('dom','filter-and-links.json','All six category counts, Escape focus return and anchors passed in Chrome.'),
 'mobile-interaction':('dom','interactions.json','Mobile coffee filtering and reset verified.'),
 'contrast':('review','contrast.json','Computed contrast for seven actual text/control pairs; not an accessibility certification.'),
 'console':('log','console.json','No browser errors or hydration errors observed.'),
 'reduced':('dom','reduced-motion.json','Fresh reduced-motion render: media true, auto scroll, content visible.'),
 'normal':('dom','normal-motion.json','Normal media false, smooth scroll and loaded fonts; source-reviewed motion keyframes.'),
 'http':('log','http.json','Read-only HTTP audit: HTML 200, one h1, noindex, anchors, safe links, seven served images.'),
 'research':('log','research-validation.json','Research structure and relationships valid, photo rights pending separately.')}
review['evidence']={key:dict(kind=kind,path='evidence/'+file,summary=summary) for key,(kind,file,summary) in files.items()}
for key,file,w,h in [('desktop','desktop.png',1440,900),('mobile-320','mobile-320.png',320,844),('mobile-390','mobile-390.png',390,844),('tablet','tablet-768.png',768,1024),('desktop-full','desktop-full.png',1440,900),('mobile-full','mobile-320-full.png',320,844),('tablet-full','tablet-768-full.png',768,1024)]:
    review['evidence'][key]=dict(kind='screenshot',path='evidence/'+file,summary='Actual Chrome local render; reviewed for layout, crop, text and actions.',viewport=dict(width=w,height=h),captureMode='fullPage' if 'full' in key else 'viewport',deviceScaleFactor=1)
def pass_check(section,key,observed,ids):review[section][key]=dict(status='pass',observed=observed,evidence=ids)
for key,obs,ids in [
 ('identity_sources','Official profile name/contact/hours match the source notes; address also on official promo creative and correct Maps listing.',['sources','research']),
 ('authentic_content','43 base items plus four rice dishes, four exact product photos; no invented prices, reviews or current promo claims.',['sources','data','desktop-full']),
 ('explicit_design_rules','Cream/red/green, original logo, sans hierarchy, soft corners, open sections, no decorative pills/eyebrows; genuine shadcn Base UI components.',['implementation','desktop-full','mobile-full']),
 ('working_actions','All category counts, reset, anchors and Escape focus tested; WhatsApp exact official number and Maps destination resolved.',['interaction','mobile-interaction','sources']),
 ('responsive_keyboard','320/390/768/1440px measured without overflow; mobile reset, desktop all-category selection and keyboard Escape passed.',['mobile-dom','wide-dom','interaction','mobile-interaction']),
 ('truthful_scope','Local independent concept with noindex, no fake booking/payment; asset rights and owner confirmation remain pending.',['http','sources','implementation']),
 ('layout_feasibility','Composition uses two real place photos and four product photos; text rows handle 43 products without exact photos.',['implementation','desktop-full','mobile-full'])]:pass_check('gates',key,obs,ids)
checks={
 'build':('Production build exit 0.',['build']), 'lint':('ESLint passed.',['lint']), 'typecheck':('TypeScript passed.',['types']),
 'desktop_render':('1440x900 and full page visually reviewed; typography, original logo and all sections render.',['desktop','desktop-full','wide-dom']),
 'mobile_320':('320x844 inspected; two-row header, no clipped controls or overflow.',['mobile-320','mobile-full','mobile-dom']),
 'mobile_390':('390x844 inspected; single-row header and readable catalogue.',['mobile-390','mobile-dom']),
 'tablet_768':('768x1024 and full page inspected, no overflow.',['tablet','tablet-full','wide-dom']),
 'keyboard':('Select responds to ArrowDown; Escape closes and returns focus to trigger; reset Button accessible.',['interaction','mobile-interaction']),
 'contrast':('Seven actual text/control pairs meet >=4.5:1; original logo/photo imagery reviewed visually.',['contrast','desktop-full']),
 'core_links':('Suasana/menu/mampir anchors exercised, Maps resolved to matching cafe, exact WhatsApp number checked without sending.',['interaction','http','sources']),
 'images':('All seven runtime images HTTP 200, source-matched, dimensions stable, local WebP; rendered dishes match names.',['http','wide-dom','desktop-full','sources']),
 'console':('No browser errors observed.',['console']),
 'reduced_motion':('Fresh reduced-motion media matches, content visible, smooth scroll disabled; normal state checked separately.',['reduced','normal','implementation']),
 'disclosure_noindex':('Concept banner present and robots noindex verified in HTML.',['http','desktop']),
 'reference_review':('Actual Instagram profile, source menu and carousel screenshots reviewed; candidate comparison recorded; no external website reference supplied.',['sources','implementation']),
 'brand_evidence':('Original red/green/cream signage and menu sans hierarchy retained; original logo image used; two font OFLs stored locally.',['sources','implementation','desktop']),
 'content_sources':('Profile bio, complete readable menu, rice carousel, student/seasonal offers, Maps menu link and GoFood path reconciled; old promos excluded with reasons.',['sources','research','data']),
 'component_provenance':('Shadcn Button/Select copied locally with Base UI behavior; no cross-demo composition import.',['implementation','interaction']),
 'feature_inventory':('Source and DOM inspected: catalogue, one category filter, location only; feature flags match actual UI.',['implementation','interaction','wide-dom']),
 'catalogue_data':('47 unique products, variants, source prices and four price-null entries preserved.',['data','research','sources']),
 'category_filter':('6/10/15/10/2/4 counts verified, single classification, reset47.',['interaction','mobile-interaction']),
 'map_target':('Google Maps query opened actual Warung Kopi Duduk Gembira at Otista No.275, matching phone.',['sources']),
 'contact_links':('WhatsApp 6282286360621 and Instagram profile destinations match official bio; no messages sent.',['sources','wide-dom'])}
for key,(obs,ids) in checks.items():pass_check('checks',key,obs,ids)
ratings={
 'brand':(4.5,'Original logo and authentic cream/red/green signage, rounded bold sans menu hierarchy; original logo source limited to 150px.',['sources','desktop','implementation']),
 'visual':(4.5,'Oversized brand typography, asymmetrical two-photo hero, green scene transition and open menu rows create distinct density; 320px layout reviewed and corrected.',['desktop-full','mobile-full','tablet-full']),
 'information':(4,'47 items and source prices/variants, current-profile hours/contact; four rice prices absent in source and clearly left for enquiry; exact photos unavailable for 43 text rows.',['data','sources','desktop-full']),
 'conversion':(4.5,'Menu is the single primary hero action; visit section has direct correct Maps route and official WhatsApp; no simulated transaction.',['desktop','interaction','sources']),
 'interaction':(4.5,'Base UI category Select tested across every category; mobile reset and Escape focus verified; four widths clear, contrast checks passed.',['interaction','mobile-interaction','contrast','mobile-dom','wide-dom']),
 'motion':(4,'Motion/react hero/section keyframes and CSS Select transitions; normal/reduced preferences exercised with visible content and clean console. Restrained motion, no elaborate carousel or parallax.',['normal','reduced','implementation','console']),
 'technical':(4.5,'Build/lint/types and data validation passed; standalone explicit dependencies, local licensed fonts and WebP, noindex and HTTP checks pass. Owner rights confirmation remains separate.',['build','lint','types','data','http']),
 'originality':(4.5,'Five-axis structural distance from the single accepted Historia baseline; two distinct candidates documented. Limited history does not establish universal originality.',['implementation','desktop-full'])}
for key,(rating,observation,ids) in ratings.items():review['ratings'][key]=dict(rating=rating,observation=observation,evidence=ids)
review['unresolved']=[dict(scope='publication',severity='warning',description='Business photo/logo publication rights and current owner price confirmation pending. No deployment or outreach authorized/performed.')]
(quality/'review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding='utf-8')
# Rebuild the contact sheet from the seven exact runtime images after final mapping.
ids=['logo','terrace','interior','cumi-ijo','cumi-matah','ayam-matah','ayam-ijo']
sheet=Image.new('RGB',(900,990),'#faf5e6');draw=ImageDraw.Draw(sheet)
for i,aid in enumerate(ids):
    tile=ImageOps.contain(Image.open(root/f'public/images/{aid}.webp'),(280,280))
    x,y=(i%3)*300,(i//3)*330;sheet.paste(tile,(x,y));draw.text((x+8,y+288),aid,fill='#234b37')
sheet.save(root/'research/contact-sheet.jpg')
print('Evidence-based review written; contrast:',contrast)
