"""Search metadata first; render only a bounded shortlist. Requires Pillow for sheets."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'assets' / 'reference-library'

def select(records, section='', query='', exclude=()):
    words = query.casefold().split()
    return [r for r in records if r['id'] not in exclude
            and (not section or any(section.casefold() in f.casefold() for f in r['folders']))
            and all(w in ' '.join(str(r.get(k, '')) for k in
                    ('reference_name', 'caption', 'visual_notes', 'section_tags')).casefold() for w in words)]

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--section', default='', help='Folder prefix, e.g. 01 or 03')
    p.add_argument('--query', default='')
    p.add_argument('--exclude', nargs='*', default=[])
    p.add_argument('--ids', nargs='+')
    p.add_argument('--limit', type=int, default=8)
    p.add_argument('--sheet', type=Path)
    a = p.parse_args()
    if not 1 <= a.limit <= 12:
        p.error('--limit must be 1..12; narrow the query instead of dumping the library')
    records = json.loads((ROOT / 'MANIFEST_GAMBAR.json').read_text(encoding='utf-8'))['images']
    if a.ids:
        lookup = {r['id']: r for r in records}
        if len(a.ids) > 12 or len(a.ids) != len(set(a.ids)) or any(i not in lookup for i in a.ids):
            p.error('--ids requires 1..12 unique known IDs')
        chosen = [lookup[i] for i in a.ids]
    else:
        chosen = select(records, a.section, a.query, a.exclude)
        print(f'{len(chosen)} matches; showing {min(len(chosen), a.limit)}. Metadata order is not a quality ranking.')
        chosen = chosen[:a.limit]
    for r in chosen:
        print(json.dumps({k: r[k] for k in ('id', 'reference_name', 'folders', 'caption', 'visual_notes', 'asset_kind', 'files', 'source_page_url')}, ensure_ascii=False))
    if a.sheet:
        if not chosen:
            p.error('No matches; no sheet created')
        from PIL import Image, ImageDraw, ImageOps
        columns = min(3, len(chosen))
        board = Image.new('RGB', (columns * 420, ((len(chosen)+columns-1)//columns)*320), 'white')
        draw = ImageDraw.Draw(board)
        for n, r in enumerate(chosen):
            x, y = n % columns * 420, n // columns * 320
            with Image.open(ROOT / r['files'][0]) as im:
                tile = ImageOps.contain(im.convert('RGB'), (400, 275))
                board.paste(tile, (x+(420-tile.width)//2, y))
            draw.text((x+8, y+280), r['id'], fill='black')
        a.sheet.parent.mkdir(parents=True, exist_ok=True)
        board.save(a.sheet)
        print(f'Sheet: {a.sheet.resolve()}')

if __name__ == '__main__':
    main()
