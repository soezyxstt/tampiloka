import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeEstimate, encodeEstimate, estimateDefaults } from './estimate-url.mjs';
test('round trips all estimate fields', () => {
 const state={...estimateDefaults,levels:{cafe:2,commerce:1},values:{...estimateDefaults.values,outlets:'12',staff:'33'},shared:true,sku:true,membership:true,gateway:true,site:'dynamic',flags:['offline','recipes']};
 assert.deepEqual(decodeEstimate(encodeEstimate(state)),state);
});
test('rejects untrusted versions, identifiers, quantities and oversized data', () => {
 const valid=JSON.parse(encodeEstimate(estimateDefaults));
 for(const payload of [{...valid,v:2},{...valid,levels:{evil:0}},{...valid,levels:{cafe:999}},{...valid,values:{...valid.values,staff:'999999'}},{...valid,flags:['evil']},{...valid,site:'evil'},{...valid,shared:'true'}]) assert.equal(decodeEstimate(JSON.stringify(payload)),null);
 assert.equal(decodeEstimate('x'.repeat(1501)),null);
 assert.equal(decodeEstimate('{'),null);
});
