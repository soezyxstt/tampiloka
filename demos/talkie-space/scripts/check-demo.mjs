import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const items=JSON.parse(readFileSync(new URL('../data/menu.json',import.meta.url)));
assert.equal(items.length,94);
assert.equal(new Set(items.map(p=>p.id)).size,94);
for(const p of items){assert(p.sourceIds.length);assert(p.price.amount===null||p.price.amount>=10000);if(p.imageId)assert(existsSync(new URL(`../public/images/${p.imageId}.webp`,import.meta.url)));}
assert.equal(items.find(p=>p.name==='Import').price.amount,null);
assert.deepEqual(items.find(p=>p.name==='Mineral Water').variants.map(v=>v.price.amount),[10000,15000]);
console.log('94 unique sourced products; media references, unknown price and variants verified.');
