import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const bundle = JSON.parse(readFileSync(new URL('../research-bundle.json', import.meta.url)));
const menu = JSON.parse(readFileSync(new URL('../data/menu.json', import.meta.url)));
assert.equal(menu.length, 47, 'Every base-menu and rice item must be retained');
assert.equal(new Set(menu.map(x => x.id)).size, 47);
assert.deepEqual(menu, bundle.offerings.items.map(({ id, name, category, description, imageId, price, variants }) => ({ id, name, category, description, imageId, price, variants })));
assert.equal(menu.filter(x => x.price.amount === null).length, 4, 'No invented rice prices');
assert.deepEqual(menu.filter(x => x.imageId).map(x => x.id).sort(), ['ayam-ijo', 'ayam-matah', 'cumi-ijo', 'cumi-matah'], 'Each protein/sambal combination must resolve to one exact source SKU');
assert(existsSync(new URL('../public/fonts/bree-serif.ttf', import.meta.url)));
assert(existsSync(new URL('../public/fonts/bree-serif-OFL.txt', import.meta.url)));
for (const item of menu.filter(x => x.imageId)) {
  const asset = bundle.assets.items.find(x => x.id === item.imageId);
  assert(asset.productIds.includes(item.id), `Photo must match ${item.name}`);
  assert(existsSync(new URL(`../${asset.runtimePath}`, import.meta.url)));
}
assert.equal(menu.find(x => x.name === 'Kopi Item').price.amount, 8000);
assert.equal(menu.find(x => x.name === 'Mie Bangladesh').price.amount, 17000);
assert(bundle.profile.facts.find(x => x.field === 'contact').value === '6282286360621');
console.log('PASS: 47 unique source-matched items, four unknown prices retained, exact photo mappings and contact.');
