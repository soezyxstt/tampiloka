"""Reproducible catalogue transcription and crops from the two official menu PDFs."""
import json, hashlib
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/raw'
OUT = ROOT / 'public/images'
items = []
def add(page, category, rows, x, ys, w=105, h=60):
    im = Image.open(RAW / f'{page.split('-')[0]}-full-{page[-1]}.png').convert('RGB').resize((1888,1334))
    for row,y in zip(rows,ys,strict=True):
        name,price,*description = row.split('|')
        ident = f'menu-{len(items)+1:03}'
        im.crop((x,y,x+w,y+h)).save(OUT/f'{ident}.webp',quality=88)
        items.append(dict(id=ident,name=name,category=category,price=int(float(price)*1000),description=description[0] if description else '',image=f'/images/{ident}.webp',source='sarapan' if page.startswith('sarapan') else 'reguler',page=int(page[-1]),crop=[x,y,w,h],variants=[]))

add('reguler-2','Cemilan',[
'Sate Aci|14|Sate vegetarian dengan bumbu kacang.', 'Pagordas|20|Pangsit goreng mini dengan chili oil.', 'Bakso Yang Ditukar|20|Bakso tusuk bakar.', 'Pisang Goreng|20|Pisang goreng dengan taburan gula palem.', 'Kentang Sosis|22|Sosis dan kentang goreng.', 'Dimsum Ekonomis|15|Dimsum ayam isi 5.', 'Dimsum Sejahtera|20|Dimsum udang isi 3.'
],110,[355,430,500,575,640,715,805])
add('reguler-2','Cemilan',[
'Pisang Kukus|17|Pisang tanduk kukus dengan cocolan gula palem.', 'Gorengan Darmaji|17|Gorengan dalam satu porsi.', 'Lumpia Vietnam|22|Lumpia sayuran.', 'Tuangeun Bocil|25|Nugget, sosis, sop, dan kentang/nasi. Tambah es coklat Rp7.000.', 'Cireng Ayah Ojak|17|Cireng dengan bumbu uyah dan rujak.', 'Tahu Cabe Rewel|22|Tahu goreng bumbu cabe garam.', 'Cireng Tahu Gejrot|18|Tahu dan cireng dengan kuah tahu gejrot.'
],490,[350,425,495,570,660,740,820])
add('reguler-2','Pepes', ['Pepes Ayam Kampung|48','Pepes Goreng Ayam Kampung|48','Pepes Ayam Bule|59'],110,[958,1035,1115])
add('reguler-2','Pepes', ['Pepes Goreng Ayam Bule|59','Pepes Ikan Mas|40'],510,[990,1075])
add('reguler-2','Mie', ['Mie Kasep|24|Mie goreng.', 'Mie Racing|25|Mie kuah gurih dan creamy.', 'Mie Ebroh|25|Mie goreng sambal ulek dengan telur ceplok.', 'Mie Ayam|25|Mie ayam dengan bakso.', 'Mie Chili Oil|24|Mie pedas dengan chili oil dan bakso/pangsit goreng sesuai stok.', 'Mie Anak Sekolah|27|Mie goreng bukan mie instan, tanpa MSG.', 'Mie Nostalgia|28|Bakmi atau yamin; tersedia cabe atau chili oil.'],1005,[180,250,320,390,460,535,610])
add('reguler-2','Nasi & lauk', ['Nasi Ayam Ajep-Ajep|24|Nasi ayam jejepangan, chicken karaage.', 'Nasi Ayam Omongan Tetangga|24|Nasi ayam dengan minyak cabe pedas.', 'Nasi Ayam Sambal Bali|25|Nasi ayam tepung dengan sambal matah.', 'Nasi Ayam Kalasan|32|Nasi ayam goreng manis, lalapan, dan sambal.', 'Nasi Kulit Serundeng|22|Kulit goreng, serundeng, lalapan, dan sambal.', 'Bebek Sambel Hejo|45|Nasi dan bebek goreng sambal hejo.'],1005,[780,847,920,988,1060,1130])
add('reguler-2','Nasi & lauk', ['Nasi Galo Bumi Upi|39|Nasi, beef, sambal bawang, dan pelengkap. Aduk sebelum disantap.', 'Nasi Paru Serundeng|25|Paru goreng, serundeng, lalapan, dan sambal.', 'Nasi Dangdutan|36|Kulit dan paru goreng, telur dadar crispy, serundeng, lalapan, sambal.', 'Nasi Buntut Rewel|45|Nasi dengan buntut sapi tumis pedas.', 'Nasi Buntut Kebakaran|40|Nasi dengan buntut bakar dan sop sayuran.', 'Nasi Ghewlaa|29|Nasi dengan sosis, bakso, dan sayur.', 'Lidah Sambel Hejo|47|Lidah sapi bersambal hejo dengan nasi.', 'Buntut Goreng Sambal Hejo|45|Buntut sapi sambal hejo dengan nasi.'],1380,[195,268,345,425,500,590,665,740])
add('reguler-2','Nasi goreng', ['Nasi Goreng Upiwan|25|Nasi goreng kecap.', 'Nasi Goreng Upiwati|26|Nasi goreng merah.', 'Nasi Goreng Cumi Upi|28|Nasi goreng cumi dengan cabe, pedas.', 'Nasi Goreng Bunda Kornet|27|Nasi goreng kornet.', 'Nasi Goreng Peda Kemangi|27|Nasi goreng dengan peda dan kemangi.'],1380,[870,935,1000,1068,1130])

# Beverage crops retain the original price markers; the adjoining label is transcribed below.
def drink(name,price,x,y,category='Minuman',variants=None):
    add('reguler-3',category,[f'{name}|{price}'],x,[y],125,150)
    if variants: items[-1]['variants']=[dict(name=k,price=v*1000) for k,v in variants]
drink('Es Cincau Jadoel',19,150,310,variants=[('M',19),('L',24)])
drink('Es Limun',20,275,310);drink('Es Soda Gembira',20,415,310);drink('Es Cincau Hijau',20,545,310)
drink('Es Jeruk',18,190,500);drink('Es Kelapa Muda',10,320,500);drink('Es Kelapa Jeruk',12,455,500)
drink('Es ABC',28,695,310,'Es-esan');drink('Es Krim Bumi Upi',22,695,495,'Es-esan')
for n,p,x,y,vs in [('Teh Tawar Jumbo',18,185,745,None),('Teh Manis Jumbo',22,350,745,None),('Teh Manis',13,510,745,None),('Teh Lemon',20,620,745,[('M',20),('L',25)]),('Teh Sereh',17,760,745,None),('Es Cokelat Malt Dinosaurus',20,180,935,[('M',20),('L',25)]),('Cokelat Malt Panas',20,315,935,None),('Es Goyobod Alun-Alun',18,450,935,None),('Teh Susu Tolak Angin',23,610,935,[('M',23),('L',25)]),('Teh Tarik',20,750,935,[('M',20),('L',25)])]: drink(n,p,x,y,'Teh & susu',vs)
for n,p,x in [('Es Beras Kencur',18,1180),('Es Kunyit Asem',18,1310),('Es Beras Kencur Jeruk',20,1460)]:drink(n,p,x,210,'Jejamuan')
for n,p,x,vs in [('Kopi Hitam',17,1030,[('M',17),('L',22)]),('Kopi Susu',22,1165,[('M',22),('L',27)]),('Kopi Susu Butter',22,1280,None),('Kopi Susu Santan',25,1410,[('M',25),('L',27)]),('Kopi Susu Kecap',22,1545,[('M',22),('L',27)]),('Kopi Krim Soda',23,1670,None)]:drink(n,p,x,490,'Kopi',vs)
for n,p,x,y in [('Jus Tomat',17,1055,790),('Jus Sirsak',18,1195,790),('Jus Semangka',20,1340,790),('Jus Mangga',23,1480,790),('Jus Alpukat',23,1620,790),('Jus Tapo',20,1055,980),('Jus Stroberi',24,1195,980),('Jus Jambu',20,1340,980)]:drink(n,p,x,y,'Jus')

for x,ys,rows in [(155,[305,465],['Roti Bakar Cokelat|18','Roti Bakar Nanas|18']),(375,[305,465],['Roti Bakar Keju|20','Roti Bakar Srikaya|18']),(575,[305,465],['Roti Bakar Gula Klasik|15','Burger Gulai Upi|30']),(145,[740,940],['Roti Bakar Telur|20','Roti Bakar Kornet Telur Keju|24']),(400,[740,940],['Roti Bakar Telur Keju|23','Roti Bakar Kornet Telur|24']),(650,[740,940],['Roti Bakar Kornet|20','Roti Bakar Kornet Keju|22']),(1040,[325],['Roti Bakar 2 Rasa|21']),(1290,[325],['Roti Bakar Mocca Nougat|21'])]:add('reguler-4','Roti & burger',rows,x,ys,185,110)
for x,ys,rows in [(1110,[600,750],['Pisang Bakar Cokelat|20','Pisang Bakar Cokelat Keju|23']),(1440,[600,750],['Pisang Bakar Keju|21','Pisang Bakar Double Cokelat|23'])]:add('reguler-4','Pisang bakar',rows,x,ys,190,110)
add('sarapan-1','Sarapan',['Tahu Cocol Kerupuk|10|Tahu kuning rebus dengan kecap dan kerupuk aci.','B5 (Bala Bala Banjur)|15|Bala-bala dengan bumbu kacang dan sayuran.'],1030,[640,710])
add('sarapan-1','Sarapan',['Nasi Goreng Omah|21|Nasi goreng kunyit.','Nasi Goreng Kecombrang|21|Nasi goreng kecombrang.'],1040,[870,945])
add('sarapan-1','Sarapan',['Nasi Kuning Langsai|20|Nasi kuning, telur dadar iris, tempe orek, abon, dan sambal kacang.','Nasi Udukwati|20|Nasi uduk dengan pelengkap.','Nasi Kuning Ningrat|25|Nasi kuning, paru, perkedel, telur gimbal, dan pelengkap.','Nasi Udukwati Ningrat|25|Nasi uduk, paru, telur gimbal, perkedel, dan pelengkap.','Lontong Cap Gomeh|23|Lontong kuah gurih dengan sambal goreng kentang.','Nasi Pecelawati|17|Nasi pecel sayuran.','Risoles|10|Risoles ragout sayuran isi 3.','Pastel|10|Pastel sayuran isi 3.','Dimsum Ekonomis|15|Dimsum ayam isi 5.','Nasi Telor Sederhana|12|Nasi dengan telur ceplok atau dadar.','Leupeut Banjur|12|Leupeut dengan bumbu oncom.','Ketan Kinca|24.5|Ketan, kelapa, dan kinca gula aren cair.','Ketan Oncom|22|Ketan dengan serundeng dan sambal oncom.'],1400,[305,370,440,515,585,650,720,785,855,925,995,1070,1140])
add('sarapan-2','Sarapan',['Burger Original|27'],630,[425],190,110)
# The official PDFs disagree on this SKU; preserve both contextual prices.
toast=next(i for i in items if i['name']=='Roti Bakar Kornet Keju')
toast['variants']=[dict(name='Reguler',price=22000),dict(name='Sarapan',price=26000)]
toast['description']='Harga sarapan Rp26.000; harga reguler Rp22.000.'
# Tighten crops where the source places adjacent drinks close together.
drink_crops={
'Es Cincau Jadoel':(156,314,250,427),'Es Limun':(278,314,370,426),
'Es Soda Gembira':(393,314,484,426),'Es Cincau Hijau':(518,314,610,426),
'Es Jeruk':(187,500,280,612),'Es Kelapa Muda':(320,500,410,612),
'Es Kelapa Jeruk':(452,500,550,612),'Es ABC':(700,316,863,422),
'Es Krim Bumi Upi':(712,480,833,601),'Kopi Hitam':(1038,500,1144,608),
'Kopi Susu':(1152,500,1250,608),'Kopi Susu Butter':(1276,500,1385,608),
'Kopi Susu Santan':(1390,495,1492,605),'Kopi Susu Kecap':(1523,495,1632,608),
'Kopi Krim Soda':(1655,495,1752,608),'Teh Susu Tolak Angin':(597,937,714,1044),
'Es Cokelat Malt Dinosaurus':(180,940,285,1045),'Teh Tarik':(760,940,850,1045),
'Teh Lemon':(620,746,720,855),'Teh Sereh':(752,746,856,855),
'Es Beras Kencur':(1180,213,1280,335),'Es Kunyit Asem':(1320,213,1420,335),
'Es Beras Kencur Jeruk':(1460,213,1565,335)}
drink_page=Image.open(RAW/'reguler-full-3.png').convert('RGB').resize((1888,1334))
for item in items:
    if item['name'] in drink_crops:
        box=drink_crops[item['name']];drink_page.crop(box).save(OUT/f"{item['id']}.webp",quality=90)
        item['crop']=[box[0],box[1],box[2]-box[0],box[3]-box[1]]
assert len({i['id'] for i in items})==len(items) and all(i['price']>0 for i in items)
(ROOT/'data/menu.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')

cover=Image.open(RAW/'reguler-full-1.png').convert('RGB').resize((1888,1334))
logo=cover.crop((823,852,1077,935)).convert('RGBA')
pixels=logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        color=pixels[x,y];pixels[x,y]=(*color[:3],255 if max(color[:3])<135 else 0)
logo.save(OUT/'logo.webp',lossless=True)
cover.crop((700,275,1180,620)).save(OUT/'table.webp',quality=90)
for id in ['17','32','16','02','11','06','07']:
    im=Image.open(RAW/f'place-{id}.jpg').convert('RGB'); im.thumbnail((1400,1400)); im.save(OUT/f'place-{id}.webp',quality=83)
sheet=Image.new('RGB',(1000,((len(items)+7)//8)*120),'#f5eddc');draw=ImageDraw.Draw(sheet)
for n,it in enumerate(items):
    im=Image.open(ROOT/'public'/it['image'].lstrip('/'));im.thumbnail((115,85));x=(n%8)*125;y=(n//8)*120;sheet.paste(im,(x,y));draw.text((x,y+88),it['id'],fill='black')
sheet.save(ROOT/'research/contact-sheet.jpg')
print(f'{len(items)} catalogue records; menu crops and seven place photos prepared.')

