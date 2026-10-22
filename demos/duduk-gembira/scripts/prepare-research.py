import json, hashlib, urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
raw = ROOT / 'research/raw'
profile = json.loads((raw / 'profile-images.json').read_text())
profile = [x for x in profile if x['alt'] == "warkopdudukgembira's profile picture" or x['alt'].startswith('Katanya')]
(raw / 'profile-images.json').write_text(json.dumps(profile, indent=2))
# Only retain business assets, never unrelated account UI or profile images.
(raw / 'menu-images.json').write_text('[]')
carousel = json.loads((raw / 'carousel.json').read_text())
jobs = [('logo', profile[0]['src'])] + [(name, x['src']) for name, x in zip(['cumi-matah','ayam-matah','ayam-ijo'], carousel)]
jobs += [(x['id'],x['src']) for x in json.loads((raw / 'scenes.json').read_text())]
def download(job):
    name, url = job
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    data = urllib.request.urlopen(req, timeout=30).read()
    (raw / f'{name}.jpg').write_bytes(data)
    im = Image.open(raw / f'{name}.jpg').convert('RGB')
    im.thumbnail((1200,1500))
    if name == 'logo':
        im = im.crop((0,45,150,106))
    im.save(ROOT / f'public/images/{name}.webp', quality=84)
    return {'id':name,'url':url,'width':im.width,'height':im.height,'sha256':hashlib.sha256(data).hexdigest()}
with ThreadPoolExecutor(max_workers=6) as pool:
    result = list(pool.map(download,jobs))
(raw / 'downloads.json').write_text(json.dumps(result, indent=2))
sheet = Image.new('RGB',(900,990),'#faf5df')
draw = ImageDraw.Draw(sheet)
for i,x in enumerate(result):
    im = Image.open(ROOT / f"public/images/{x['id']}.webp")
    tile = ImageOps.contain(im,(280,280))
    px,py=(i%3)*300,(i//3)*330
    sheet.paste(tile,(px,py)); draw.text((px+10,py+290),x['id'],fill='#173f2b')
sheet.save(ROOT / 'research/contact-sheet.jpg')
print('Downloaded and matched',len(result),'assets')
