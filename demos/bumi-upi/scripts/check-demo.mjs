import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const menu=JSON.parse(readFileSync(new URL('../data/menu.json',import.meta.url)));
const bundle=JSON.parse(readFileSync(new URL('../research-bundle.json',import.meta.url)));
assert.equal(menu.length,116);
assert.equal(new Set(menu.map(i=>i.name)).size,116);
assert.equal(bundle.offerings.items.length,menu.length);
for(const item of menu){assert(item.price>0);assert(existsSync(new URL('../public'+item.image,import.meta.url)));assert.equal(bundle.offerings.items.find(i=>i.id===item.id).price.amount,item.price);}
assert.deepEqual(menu.find(i=>i.name==='Roti Bakar Kornet Keju').variants.map(v=>v.price),[22000,26000]);
assert.deepEqual(menu.find(i=>i.name==='Kopi Susu').variants.map(v=>v.price),[22000,27000]);
assert.equal(menu.find(i=>i.name==='Ketan Kinca').price,24500);
console.log('PASS: 116 unique dishes, image files, bundle parity, contextual prices and size variants.');
