import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePricing } from '../lib/pricing-engine.mjs';
import { integrationCopyState } from '../lib/pricing-integration-copy.mjs';
test('priced connector narrows only the cross-service reason', () => {
 const standard = calculatePricing({requirements:[{family:'cafe'},{family:'operations'}], flags:['newConnector']});
 assert.deepEqual(integrationCopyState(standard), {hasConnector:true,unknown:['newConnector','operationsReadiness','otherCrossDomainIntegration']});
 const separate = calculatePricing({requirements:[{family:'cafe',data:'cafe'},{family:'commerce',data:'shop'}],flags:['externalIntegration']});
 assert.deepEqual(integrationCopyState(separate), {hasConnector:false,unknown:['externalIntegration','crossDomainIntegration']});
 assert.equal(integrationCopyState(calculatePricing({requirements:[{family:'cafe'}]})).hasConnector,false);
});
