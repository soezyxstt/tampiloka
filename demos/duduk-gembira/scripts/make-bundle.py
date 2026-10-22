import json, hashlib
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
date = '2026-10-22'
def save(path, data):
    target = root / path
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
source_notes = {
 'profile': ('https://www.instagram.com/warkopdudukgembira/', 'Chrome profile: Warung Kopi Duduk Gembira; 06.30–23.00, Friday/Saturday 06.30–00.00; WhatsApp 6282286360621. Logo cream/red/green. Bio has one WhatsApp link, no Linktree or external PDF.'),
 'menu': ('https://www.instagram.com/stories/highlights/17963400506681484/', 'Chrome paused MENU highlight, one menu page, marked 43w. Text and prices manually reconciled against research/raw/menu.png. 43 base items, roti bakar four flavors. Prices supported by source, not reconfirmed by owner for today.'),
 'new-menu': ('https://www.instagram.com/warkopdudukgembira/p/DWNgbA5AYc7/', 'Chrome carousel: slide 2 Nasi Cumi Ijo, 3 Nasi Cumi Matah, 4 Nasi Ayam Matah, 5 Nasi Ayam Ijo. Caption corroborates names. No prices published on these slides.'),
 'place': ('https://www.instagram.com/infogarut/p/DAuhgAnS6ZI/', 'Chrome inspected opening carousel: slide 2 terrace, red crates, green framed sign; slide 3 interior wooden table and rattan seats. Caption address Jalan Otista 275B. Opening hours here are historical and superseded by current official profile. Photo publisher infogarut, reuse rights pending.'),
 'kelas': ('https://www.instagram.com/stories/highlights/18269290681302399/', 'Chrome Kelas Gembira highlight marked 72w: student promo 17000, four food/drink combinations. Address Jl. Otista No.275B on official creative. Current validity and terms not established; omitted active promotion.'),
 'bukber': ('https://www.instagram.com/stories/highlights/17893961820087456/', 'Chrome Bukber highlight marked 82w: 20000 packages A nasi tutug oncom, B nasi ayam cabe-cabean, C cuanki komplit, each with es teh manis. Ramadan promotion old; omitted active offer.'),
 'discovery': ('https://www.google.com/search?tbm=isch&q=Warkop+Duduk+Gembira+Garut', 'Chrome Google Images identified original infogarut carousel and exact GoFood merchant. Opened original carousel before acquisition. No search thumbnails used. GoFood merchant opened in Chrome but stopped at Safety check; no bypass, product imagery unavailable through that route. Direct post media transfer used instead of a third-party downloader; no cookies or account data exported.'),
 'maps': ('https://www.google.com/maps/search/?api=1&query=Warung+Kopi+Duduk+Gembira+Jl.+Otista+275B+Garut', 'Chrome destination resolved to Warung Kopi Duduk Gembira, coordinates -7.1980518,107.8872226, Otista No.275 Sukagalih Tarogong Kidul, phone 082286360621. Listing menu link https://drive.google.com/file/d/1SpygWnmM5OYBkdTDXT7r-NOWm4eIXiUZ/view?usp=sharing was opened in Chrome and returned Page Not Found. No new menu obtained; official Instagram menu remains the catalogue source. Public reviews not reused as testimonial claims.'),
}
sources=[]
for sid,(url,note) in source_notes.items():
    p=root/f'research/sources/{sid}.md';p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(f'# {sid}\nChecked {date} through Chrome.\n{url}\n\n{note}\n',encoding='utf-8')
    sources.append(dict(id=sid,url=url,accessedAt=date,locator=note,evidencePath=str(p.relative_to(root)).replace('\\','/'),summary=note,fingerprint=hashlib.sha256(p.read_bytes()).hexdigest()))
facts=[]
for field,value,ids in [
 ('name','Warung Kopi Duduk Gembira',['profile']),
 ('hours',{'regular':'06.30–23.00','fridaySaturday':'06.30–00.00'},['profile']),
 ('contact','6282286360621',['profile']),
 ('address','Jl. Otista No. 275 B, Tarogong Kidul, Garut',['kelas','place']),
 ('style','Krem, merah, hijau; tipografi menu sans tebal dan signage vintage.',['profile','menu','place']),
]:facts.append(dict(id=field,field=field,value=value,sourceIds=ids,checkedAt=date,status='verified',used=True,limitation='Public source checked; owner confirmation and publication permission remain pending.'))
groups={
 'Kopi': [('Kopi Item',8,'Kopi hitam pekat.'),('Kopi Susu Gembira',12,'Kopi susu dengan gula aren.'),('Kopi Susu Butter',15,'Kopi susu dengan sentuhan butter.'),('Kopi Muda - Mudi',15,'Kopi susu creamy dengan gula aren.'),('Kopi Bir',15,'Kopi soda berkaramel.'),('Kopi Lemon Jadul',15,'Kopi hitam dengan perasan lemon.')],
 'Non-kopi': [('Coklat Jadul',10,'Coklat susu manis & gurih.'),('Hijau Manis',12,'Teh hijau dengan susu.'),('Jamuan Gembira',12,'Minuman rempah.'),('Josu',8,'Extra joss susu creamy.'),('Lemon Peras',7,'Perasan lemon segar.'),('Lemon Soda',10,'Perasan lemon dengan sensasi soda.'),('Teh Manis',6,''),('Teh Sereh Lemon',8,''),('Teh Tarik',10,'Teh hitam dengan susu creamy.'),('Air Mineral',5,'')],
 'Makanan berat': [('Cuanki Biasa',12,''),('Cuanki Komplit',15,''),('Indomie Polos',8,'Indomie tanpa topping.'),('Indomie Gembira',15,''),('Mie Bangladesh',17,''),('Mie Tektek',17,''),('Sate Ayam Pedas',15,''),('Sate Jando Manis',15,''),('Nasi Ayam Cabe-cabean',15,''),('Nasi Goreng Bawang',14,''),('Nasi Goreng Kecombrang',12,''),('Nasi Kuning Gembira',12,''),('Nasi Telur Gulai',15,''),('Nasi Telur Pontianak',12,''),('Nasi Tutug Oncom',15,'')],
 'Camilan': [('Cireng Bumbu Kacang',10,''),('Gehu Cikur',6,''),('Gorengan Tempe',8,''),('Pangsit Chili Oil',15,''),('Pisang Keju Susu',15,''),('Pisang Goreng',12,''),('Piscok Goreng',15,''),('Roti Bakar',10,'Coklat, pindakas, blueberry, strawberry, atau milkcrust.'),('Ketan Eskrim',15,''),('Ketan Susu Keju',12,'')],
 'Tambahan': [('Nasi Putih',5,''),('Telur',5,'')]
}
items=[]
for category,rows in groups.items():
    for name,price,description in rows:
        pid='item-'+str(len(items)+1)
        variants=[]
        if name=='Roti Bakar':
            variants=[dict(id=f'{pid}-v{i}',name=n,price=dict(amount=10000,currency='IDR',checkedAt=date,sourceIds=['menu'])) for i,n in enumerate(['Coklat','Pindakas','Blueberry','Strawberry','Milkcrust'])]
        if category in ['Kopi','Non-kopi'] and name!='Air Mineral':
            temps=['Panas'] if name=='Kopi Susu Butter' else ['Dingin'] if name in ['Kopi Bir','Kopi Lemon Jadul','Jamuan Gembira','Josu','Lemon Soda'] else ['Panas','Dingin']
            variants=[dict(id=f'{pid}-t{i}',name=n,price=dict(amount=price*1000,currency='IDR',checkedAt=date,sourceIds=['menu'])) for i,n in enumerate(temps)]
            description=(description+' '+ ' / '.join(temps)+'.').strip()
        items.append(dict(id=pid,name=name,kind='product',category=category,description=description,sourceIds=['menu'],status='verified',price=dict(amount=price*1000,currency='IDR',checkedAt=date,sourceIds=['menu']),promo=None,variants=variants,imageId=None))
for name,aid in [('Nasi Cumi Ijo','cumi-ijo'),('Nasi Cumi Matah','cumi-matah'),('Nasi Ayam Matah','ayam-matah'),('Nasi Ayam Ijo','ayam-ijo')]:
    items.append(dict(id=aid,name=name,kind='product',category='Nasi cumi & ayam',description='',sourceIds=['new-menu'],status='verified',price=dict(amount=None,currency='IDR',checkedAt=None,sourceIds=[]),promo=None,variants=[],imageId=aid))
features={k:k in ['catalogue','categoryFilter','location'] for k in ['catalogue','categoryFilter','search','stickyToolbar','loadMore','productDialog','carousel','accordion','location']}
signature=dict(hero='brand-typographic',sequence='place-first',catalogue='compact-rows',media='alternating-scenes',narrative='destination')
assets=[]
for aid in ['logo','terrace','interior','cumi-ijo','cumi-matah','ayam-matah','ayam-ijo']:
    im=Image.open(root/f'public/images/{aid}.webp')
    sections=['hero','footer'] if aid=='logo' else ['hero','atmosphere'] if aid=='terrace' else ['atmosphere'] if aid=='interior' else ['dishes']
    assets.append(dict(id=aid,kind='logo' if aid=='logo' else 'image',subject=aid,sourceIds=['profile'] if aid=='logo' else ['place'] if aid in ['terrace','interior'] else ['new-menu'],productIds=[aid] if aid.startswith(('cumi','ayam')) else [],sectionIds=sections,authenticity='verified',rightsStatus='pending',rightsEvidence=[],attribution='Warung Kopi Duduk Gembira' if aid not in ['terrace','interior'] else 'infogarut',deliveryMethod='file',runtimePath=f'public/images/{aid}.webp',embedUrl=None,width=im.width,height=im.height))
plan=dict(prospectId='duduk-gembira-garut',primaryGoal='Help visitors explore food, find opening hours and visit or contact the cafe.',features=features,
 sections=[dict(id='hero',features=[]),dict(id='atmosphere',features=[]),dict(id='dishes',features=[]),dict(id='catalogue',features=['catalogue','categoryFilter']),dict(id='location',features=['location']),dict(id='footer',features=[])],
 media=[dict(assetId=a['id'],productId=a['productIds'][0] if a['productIds'] else None,sectionId=s) for a in assets for s in a['sectionIds']],layoutSignature=signature,
 candidates=[dict(id='a',layoutSignature=signature,rationale='Graphic brand first, terrace and food collage, place narrative then complete compact catalogue. All five axes differ from Historia.'),dict(id='b',layoutSignature=dict(hero='split-product',sequence='product-first',catalogue='open-grid',media='mosaic',narrative='curated-selection'),rationale='Rejected: complete grid implies item photography unavailable for most of the menu; place identity is more distinctive.')],selectedCandidate='a',
 brand={'colors':['#faf5df','#b6251b','#234b37'],'fontRationale':'Bold rounded sans matches menu heading hierarchy; body remains readable sans. Actual original logo retained, not recreated.'},
 desktop='Oversized red type on cream, asymmetrical terrace and product photo, green story section, four photo dishes, compact categorized menu, open visit rows.',
 mobile='Title then terrace, product photo, story, 2-column dishes and full-width compact menu; inline category select without sticky or search.',
 motion='Motion/react hero entrance and scroll reveal without hiding server content; reduced motion disables translations. Shadcn Select panel has CSS state transition.',
 componentProvenance='Local copies of shadcn Button and Select from demos/historia/components/ui, built on @base-ui/react; primitives and keyboard behavior retained. No landing composition or business assets reused.',
 featureNotes={k:'Unnecessary for a short category-at-a-time text catalogue; no simulated transactions.' for k,v in features.items() if not v},
 contentCoverage=[dict(finding='Name, hours, contact',sourceIds=['profile'],placement='hero, location, footer'),dict(finding='43 menu items + 4 named rice dishes',sourceIds=['menu','new-menu'],placement='dishes + catalogue'),dict(finding='Address and vintage setting',sourceIds=['kelas','place'],placement='atmosphere, location'),dict(finding='Kelas Gembira and Bukber promos',sourceIds=['kelas','bukber'],placement='omitted',reason='Old promotions without confirmed current terms or validity; WhatsApp contact remains available.'),dict(finding='Moment, Sobat Gembira, Nobar, Event Musik, Sahur, Sehabis Terawih',sourceIds=['profile'],placement='Instagram link in story and footer',reason='Historical social/event highlights do not establish any upcoming event schedule or bookable package. No active schedule asserted.')],
 mediaCoverage={'exactProductPhotos':4,'totalProducts':len(items),'placePhotos':2,'logo':1,'gap':'No exact photos for 43 base menu items. Render these as text rows rather than borrow photos. GoFood safety check prevented access; direct official carousel supplied rice photos. No PDF or Linktree in official bio. Original menu is a story screenshot; no downloaded PDF claimed.','contactSheet':'research/contact-sheet.jpg'},historyComparison='All five axes differ from accepted Historia baseline.')
for font in json.loads((root/'research/fonts.json').read_text()):
    p=root/f"research/sources/font-{font['id']}.md"
    p.write_text(f"Google Fonts download {date}: {font['url']}\nSIL Open Font License family; exact font binary {font['fileUrl']}\n",encoding='utf-8')
    sid='font-'+font['id']
    sources.append(dict(id=sid,url=font['url'],accessedAt=date,locator='Google Fonts CSS variable family',summary='Local variable font from Google Fonts; SIL OFL family.',evidencePath=str(p.relative_to(root)).replace('\\','/'),fingerprint=hashlib.sha256(p.read_bytes()).hexdigest()))
    assets.append(dict(id=sid,kind='font',subject=font['id'],sourceIds=[sid],productIds=[],sectionIds=['hero'],authenticity='verified',rightsStatus='licensed',rightsEvidence=[f"public/fonts/{font['id']}-OFL.txt"],attribution='Google Fonts / font authors',deliveryMethod='file',runtimePath=font['path'],embedUrl=None,width=None,height=None))
    plan['media'].append(dict(assetId=sid,productId=None,sectionId='hero'))
save('data/menu.json',[{k:item[k] for k in ['id','name','category','description','imageId','price','variants']} for item in items])
save('research-bundle.json',dict(schemaVersion=2,profile=dict(prospectId='duduk-gembira-garut',name='Warung Kopi Duduk Gembira',branch=None,sources=sources,facts=facts),offerings=dict(items=items),assets=dict(items=assets),pagePlan=plan))
save('research/quality/page-plan.json',plan)
save('run-state.json',dict(prospectId='duduk-gembira-garut',businessName='Warung Kopi Duduk Gembira',branch=None,stage='strategy',projectRoot=str(root),scope='Standalone local demo; no deploy/push/outreach',artifacts=['research-bundle.json','research/raw/menu.png','research/contact-sheet.jpg'],decisions=['Candidate a selected; full menu with category select, no search or sticky.'],openIssues=['Asset publication rights pending','Owner confirmation of prices pending'],authorization={'localBuild':'buat website demo untuk duduk gembira cafe di garut'},sourceFingerprints={s['id']:s['fingerprint'] for s in sources},lastUpdated=date))
assert len(items)==47
print('47 items, 7 authentic assets, 2 structural candidates recorded.')
