import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculatePricing as quote,tierCost} from '../lib/pricing-engine.mjs';
import {families} from '../lib/service-pricing.mjs';
import {rates} from '../lib/pricing-rates-v1.mjs';
const base={family:'cafe',level:2,operations:true,fnbLocations:5,warehouses:1,attendance:0,website:false,sameSku:true,membership:false,capacity:0};
test('single packages retain published promo prices',()=>{for(const f of families) for(let i=0;i<f.plans.length;i++){const q=quote({requirements:[{family:f.id,minLevel:i}]}); assert.deepEqual([q.setup,q.monthly],f.plans[i].slice(4,6).map(n=>n*1000),`${f.id} ${i}`)}});
test('multilocation example and additions',()=>{let q=quote(base); assert.deepEqual([q.setup,q.monthly],[4823000,479000]); q=quote({...base,website:true}); assert.deepEqual([q.setup,q.monthly],[5172000,489000]); q=quote({...base,website:true,attendance:30}); assert.equal(q.monthly,568000)});
test('incremental stock and F&B tiers',()=>{assert.deepEqual(tierCost(4,rates.fnbTiers),[596,76]);assert.deepEqual(tierCost(5,rates.fnbTiers),[715,91]);assert.deepEqual(tierCost(10,rates.stockTiers),[2640,426])});
test('shared data and workspace use maximum, separate scope pays again',()=>{const requirements=[{family:'cafe',minLevel:2},{family:'operations'}]; const shared=quote({requirements}); const separate=quote({requirements:[requirements[0],{...requirements[1],data:'other'}]}); assert.deepEqual([separate.setup-shared.setup,separate.monthly-shared.monthly],[-40000,13000]); assert.ok(!separate.lines.some(x=>x.id==='connector')); const otherOrg=quote({requirements:[requirements[0],{...requirements[1],organization:'other'}]}); assert.ok(otherOrg.setup>separate.setup); assert.ok(shared.unknown.includes('crossDomainIntegration'))});
test('cashier coverage is per outlet, not warehouse or other workspace',()=>{const cafe={family:'cafe',minLevel:2,outlets:['a','b']}; const op={family:'operations',locations:3,cashierOutlets:['a','b']}; let q=quote({requirements:[cafe,op]}); assert.equal(q.selected[1].level,0); q=quote({requirements:[cafe,{...op,cashierOutlets:['a','c']}]}); assert.equal(q.selected[1].level,1); q=quote({requirements:[cafe,{...op,workspace:'other'}]}); assert.equal(q.selected[1].level,1)});
test('dependencies select cheapest eligible first year',()=>{let q=quote({requirements:[{family:'commerce'}],membership:true}); assert.equal(q.selected[0].level,2); q=quote({requirements:[{family:'cafe'},{family:'commerce'}],gateway:true}); assert.ok(q.selected.some(x=>x.level===3)); const alternatives=[quote({requirements:[{family:'cafe',minLevel:3},{family:'commerce'}]}),quote({requirements:[{family:'cafe'},{family:'commerce',minLevel:3}]})]; assert.equal(q.firstYear,Math.min(...alternatives.map(x=>x.firstYear)))});
test('capacity uses ceiling blocks and unpriced conditions remain visible',()=>{let q=quote({requirements:[{family:'booking',minLevel:2,providers:11},{family:'school',minLevel:2,students:201}],attendance:21,flags:['recipes','offline']}); assert.equal(q.lines.filter(x=>x.id==='capacity').reduce((a,x)=>a+x.monthly,0),2*29+2*49); assert.equal(q.lines.find(x=>x.id==='attendance').monthly,79); assert.ok(q.unknown.includes('recipes')); assert.ok(q.unknown.includes('offline'))});
test('invalid inputs rejected',()=>{for(const n of [-1,1.5,NaN,Infinity,1000]) assert.throws(()=>quote({...base,attendance:n}),RangeError); for(const x of [{requirements:[]},{requirements:[{family:'cafe',minLevel:4}]},{requirements:[{family:'operations',locations:1,cashierOutlets:['a','b']}]},{requirements:[{family:'cafe'}],membership:true},{requirements:[{family:'website'}],gateway:true},{requirements:[{family:'cafe'}],website:'invalid'}]) assert.throws(()=>quote(x),RangeError)});

test('shared line ownership follows exact scopes without changing totals', () => {
 const separate=quote({requirements:[{family:'cafe',organization:'a',workspace:'a'},{family:'commerce',organization:'b',workspace:'b'}]});
 const accounts=separate.lines.filter(x=>x.id==='shared:account');
 assert.deepEqual(accounts.map(x=>x.families),[['cafe'],['commerce']]);
 const together=quote({requirements:[{family:'cafe'},{family:'commerce'}]});
 assert.deepEqual(together.lines.filter(x=>x.id==='shared:account').map(x=>x.families),[['cafe','commerce']]);
 assert.equal(separate.lines.reduce((n,x)=>n+x.setup,0)*1000,separate.setup);
 assert.equal(together.lines.reduce((n,x)=>n+x.monthly,0)*1000,together.monthly);
});
