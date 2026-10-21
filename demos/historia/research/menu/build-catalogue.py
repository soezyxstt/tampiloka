from pathlib import Path
import json,re
from PIL import Image
base=Path('demos/historia'); p=base/'research/menu'; out=base/'public/images/menu';out.mkdir(exist_ok=True)
# Names, prices and image associations checked against the rendered menu pages.
rows={
3:('nasi-goreng',[
('Nasi Goreng Sapi',39000,'Nasi goreng dengan daging sapi dan aroma smoky.','X13'),
('Nasi Goreng Singapore',36000,'Nasi goreng gurih dengan pilihan seafood.','X9'),
('Nasi Goreng Ayam',35000,'Nasi goreng dengan ayam dan racikan khas Historia.','X11')]),
4:('main-course',[
('Nasi Sapi Lada Hitam',38000,'Nasi dengan daging sapi dan saus lada hitam.','X13'),
('Nasi Sapi Rawit Pedas',38000,'Daging sapi dengan bumbu pedas, gurih, dan tomat segar.','X9'),
('Nasi Sapi Manis Gurih',38000,'Nasi dengan daging sapi dan saus manis gurih.','X11')]),
5:('main-course',[
('Sop Iga',63000,'Iga berempah khas Indonesia, disajikan bersama nasi.','X12'),
('Iga Bakar',66000,'Iga bakar dengan saus manis gurih, nasi, dan kuah rempah.','X8'),
('Fish and Chips',50000,'Ikan krispi, kentang goreng, salad, dan saus tartar.','X10'),
('Nasi Tongseng Sapi',45000,'Sajian sapi dengan nasi, acar, dan kerupuk.','X17')]),
6:('main-course',[
('Chicken Nanban Rice',38000,'Nasi ayam krispi ala Jepang dengan saus tartar.','X18'),
('Nasi Ayam Crispy Sauce Historia',33000,'Ayam krispi dengan saus asam manis khas Historia.','X14'),
('Nasi Ayam Sambal Dabu-Dabu',33000,'Ayam krispi dengan sambal dabu-dabu pedas segar.','X16')]),
7:('steak',[
('Wagyu Meltique',125000,'Daging sapi dengan pilihan saus, kentang, dan salad.','X11'),
('Sirloin',89000,'Sirloin dengan pilihan saus, kentang, dan salad.','X9')]),
9:('salad',[
('Beef Thai Salad',38000,'Salad dengan daging sapi dan saus ala Thailand.','X11'),
('Chicken Thai Salad',35000,'Salad dengan ayam dan saus ala Thailand.','X9')]),
10:('sushi',[
('Prawn Sushi Roll',34000,'Sushi roll dengan sayuran, rumput laut, dan udang.','X11'),
('Crabstick Sushi Roll',32000,'Sushi roll dengan sayuran, rumput laut, dan crabstick.','X9')]),
11:('spring-roll',[
('Prawn Thai Spring Roll',34000,'Sayuran dan udang dalam rice paper dengan saus Thai.','X9'),
('Chicken Thai Spring Roll',28000,'Sayuran dan ayam dalam rice paper dengan saus Thai.','X7')]),
12:('pasta',[
('Creamy Mushroom Pasta',38000,'Pasta creamy dengan ayam panggang dan jamur.','X11'),
('Garlic Chili Pasta',38000,'Pasta pedas gurih dengan bawang putih dan udang.','X9')]),
13:('mie-goreng',[
('Mie Goreng Sapi',38000,'Mie goreng kecap dengan sapi, sayuran, dan aroma smoky.','X11'),
('Mie Goreng Ayam',36000,'Mie goreng kecap dengan ayam dan sayuran.','X9')]),
15:('appetizer',[
('Sharing Platter',63000,'Sosis, chicken wings, kentang, onion ring, dan sayuran.','X13'),
('Quesadilla',38000,'Tortilla dengan ayam, paprika, dan bawang bombay.','X9'),
('Potato Cheese Bread',35000,'Tortilla berisi mashed potato dan keju mozzarella.','X11')]),
16:('appetizer',[
('Hot Chicken Wings',35000,'Sayap ayam krispi dengan pilihan fire sauce.','X12'),
('Mozzarella Stick With Dipping Hot Sauce',37000,'Mozzarella krispi dengan saus pedas pendamping.','X8'),
('Potato Sausages',27000,'Kentang goreng dan sosis dengan bumbu keju.','X10'),
('Tahu Cabe Garam',26000,'Tahu krispi dengan cabai dan bawang.','X18')]),
17:('appetizer',[
('Risol Ayam',32000,'Risol berisi ayam, wortel, kol putih, dan bawang.','X9'),
('Pisang Goreng Keju',28000,'Pisang goreng dengan keju dan susu kental manis.','X11')]),
18:('dessert',[
('Matcha Ice Cake',38000,'Es krim matcha berbentuk cake dengan es krim vanilla.','X9'),
('Waffle Ice Cream',28000,'Waffle hangat, es krim vanilla, dan selai cokelat.','X13'),
('Strawberry Cheese Cake',38000,'Cheesecake lembut dengan topping stroberi.','X15')]),
20:('coffee',[
('Es Kopi Susu Historia',26000,'Kopi susu dengan rasa creamy khas Historia.','X9'),
('Es Kopi Susu Large',33000,'Kopi susu creamy dalam pilihan ukuran large.','X9'),
('Es Kopi Harmonis',32000,'Kopi susu creamy dan manis dengan karakter kopi lebih kuat.','X14')]),
21:('coffee',[
('Americano',23000,'Espresso dengan air panas, ringan dengan karakter kopi kuat.','X11'),
('Cappuccino (Hot)',27000,'Espresso, susu, dan foam lembut yang seimbang.','X15'),
('V60 (Hot/Ice)',28000,'Manual brew dengan karakter clean dan aroma kopi.','X13')]),
22:('coffee',[
('Butterscoth Creamy',30000,'Kopi creamy dengan rasa manis buttery.','X12'),
('Creme Brulle',29000,'Kopi creamy dengan sentuhan caramel brulee.','X8'),
('Caffe Latte (Hot/Ice)',28000,'Espresso dan susu dengan rasa kopi yang lembut.','X14'),
('Caffe Latte (Extra Syrup)',32000,'Caffe latte dengan pilihan tambahan syrup.','X10')]),
24:('frappe',[
('Caramel Machiatto Frapee',34000,'Espresso, caramel syrup, es krim, dan creamy foam.','X15'),
('Chocolate Frappe',32000,'Cokelat dengan susu, es krim, dan creamy foam.','X8'),
('Matcha Frappe',32000,'Matcha, susu, es krim, dan creamy foam.','X10'),
('Lotus Biscoff Frappe',34000,'Biscoff, susu, es krim, dan creamy foam.','X17'),
('Piscok',31000,'Dark chocolate dan pisang dalam minuman creamy.','X19')]),
25:('black-series',[
('Black Peach',28000,'Americano dengan aroma peach.','X12'),
('Black Mango',28000,'Americano dengan sentuhan mangga segar.','X14'),
('Black Cranberry',28000,'Americano dengan cranberry yang asam segar.','X16')]),
26:('non-coffee',[
('Chocolate Hot',28000,'Cokelat hangat yang creamy.','X8'),
('Matcha Hot',28000,'Matcha latte hangat yang creamy.','X16'),
('Tea (Hot/Ice)',10000,'Pilihan teh klasik hangat atau dingin.','X18'),
('Air Mineral',5000,'Air mineral.','X20'),
('Artisan Tea',26000,'Teh artisan dengan aroma ringan dan menyegarkan.','X23')]),
28:('strawberry-series',[
('Strawberry Velvet',31000,'Minuman creamy dengan rasa strawberry cheesecake.','X16'),
('Matcha Berry',31000,'Matcha lembut dengan stroberi dan susu creamy.','X12'),
('Choco Berry',31000,'Cokelat creamy dengan stroberi manis-asam.','X14')]),
29:('juice',[
('Sunkist Berry',31000,'Perpaduan sunkist dan stroberi yang segar.','X18'),
('Sweet Berry',31000,'Lychee dan stroberi dengan rasa fruity yang ringan.','X8'),
('Pink Lady',29000,'Stroberi, pisang, dan buah naga.','X10'),
('Green Land',28000,'Nanas dan kale dengan rasa manis alami.','X20')]),
30:('mocktail',[
('Strawberry Breeze',26000,'Minuman stroberi dengan rasa manis-asam ringan.','X20'),
('Blue Hawaii',29000,'Tropical fruit dengan pilihan creamy atau fruity.','X13'),
('Little Sunshine',29000,'Nanas dan lemon yang creamy dengan rasa candy.','X31'),
('Mazagran',29000,'Kopi hitam manis dengan sentuhan lemon.','X11')])}
labels={'nasi-goreng':'Nasi Goreng','main-course':'Main Course','steak':'Steak','salad':'Salad','sushi':'Sushi','spring-roll':'Spring Roll','pasta':'Pasta','mie-goreng':'Mie Goreng','appetizer':'Appetizer','dessert':'Dessert','coffee':'Coffee Based','frappe':'Frappe','black-series':'Black Series','non-coffee':'Non Coffee','strawberry-series':'Strawberry Series','juice':'Fresh Juice','mocktail':'Mocktail'}
raw=json.loads((p/'raw-images.json').read_text()); bykey={(x['page'],x['name']):x for x in raw}
items=[];media=[]
for page,(cat,products) in rows.items():
 for name,price,desc,img in products:
  slug=re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')
  info=bykey[(page,img)]; source=p/info['file'];image=Image.open(source)
  if image.mode=='RGBA': image=image.crop(image.getbbox())
  image.thumbnail((1000,1000))
  dest=out/(slug+'.webp');image.save(dest,quality=92,method=6)
  item={'id':slug,'name':name,'category':cat,'description':desc,'price':price,'image':'/images/menu/'+dest.name,'page':page}
  if page==7:item['notes']='Pilihan kematangan dan saus tersedia pada menu resmi.'
  if name=='Caffe Latte (Extra Syrup)':item['notes']='Pilihan syrup pada PDF: Vanilla, Caramel, Hazelnut Soft Bread.'
  if name=='Blue Hawaii':item['variants']=[{'label':'Creamy','price':price},{'label':'Fruity','price':price}]
  items.append(item);media.append({'id':slug,'sourcePage':page,'sourceObject':img,'sourceFile':info['file'],'bbox':info['bbox'],'publicImage':item['image'],'width':image.width,'height':image.height,'alphaPreserved':image.mode=='RGBA','rightsStatus':'pending_permission','publishable':False})
source={'url':'https://drive.google.com/file/d/1wnKDZJ8krV-tRUSY0PDZiIUsckuxN5X-/view','file':'research/menu/MENU-DIGITAL-HISTORIA.pdf','checkedAt':'2026-10-21','priceNote':'Harga mengikuti PDF menu resmi yang diakses 21 Oktober 2026; dapat berubah. Konfirmasikan harga dan ketersediaan langsung ke Historia.','descriptionNote':'Deskripsi diringkas dari menu resmi; nama dan harga mengikuti PDF.'}
result={'source':source,'categories':[{'id':id,'label':label} for id,label in labels.items()],'items':items}
(base/'data').mkdir(exist_ok=True);(base/'data/menu.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(p/'product-image-manifest.json').write_text(json.dumps({'source':source,'assets':media},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
assert len({x['id'] for x in items})==len(items)
assert all(x['price']>0 and 1<=x['page']<=31 and (base/'public'/x['image'].lstrip('/')).is_file() for x in items)
print(len(items),'products',len(labels),'categories',len(media),'images; verified files and unique IDs')
