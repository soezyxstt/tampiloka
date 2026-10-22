import urllib.request,re,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'public/fonts';out.mkdir(exist_ok=True)
manifest=[]
for name,family in [('display','Bricolage+Grotesque:wght@700..800'),('body','DM+Sans:wght@400..700')]:
    url=f'https://fonts.googleapis.com/css2?family={family}&display=swap'
    css=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}),timeout=30).read().decode()
    (root/f'research/{name}-font.css').write_text(css)
    fonturl=re.findall(r'url\(([^)]+)\)',css)[-1]
    data=urllib.request.urlopen(fonturl,timeout=30).read()
    (out/f'{name}.woff2').write_bytes(data)
    family_id='bricolagegrotesque' if name=='display' else 'dmsans'
    license_url=f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family_id}/OFL.txt'
    (out/f'{name}-OFL.txt').write_bytes(urllib.request.urlopen(license_url,timeout=30).read())
    manifest.append(dict(id=name,url=url,fileUrl=fonturl,path=f'public/fonts/{name}.woff2'))
(root/'research/fonts.json').write_text(json.dumps(manifest,indent=2))
print('Two Google Fonts stored locally; SIL Open Font License families.')
