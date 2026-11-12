import { families } from './service-pricing.mjs';

export const estimateDefaults = { levels:{cafe:0}, values:{outlets:'1',stock:'3',cashiers:'0',staff:'0',providers:'5',students:'100'}, shared:false, sku:false, membership:false, gateway:false, site:'none', flags:[] };
const flagNames = ['recipes','offline','multibrand','newConnector','externalIntegration','complexMigration','untestedCapacity','dashboard','bookingBranches','schoolBranches'];
const levelsByFamily = Object.fromEntries(families.map(f => [f.id, f.plans.length]));

// One bounded, versioned parameter; reject the entire payload on any unknown or invalid value.
export function decodeEstimate(raw) {
 if (typeof raw !== 'string' || raw.length > 1500) return null;
 try {
  const s = JSON.parse(raw);
  if (!s || typeof s !== 'object' || Array.isArray(s) || s.v !== 1 || !s.levels || typeof s.levels !== 'object' || Array.isArray(s.levels) || !s.values || typeof s.values !== 'object' || Array.isArray(s.values)) return null;
  if (Object.keys(s).sort().join(',') !== 'flags,gateway,levels,membership,shared,site,sku,v,values') return null;
  if (Object.keys(s.levels).some(k => !Object.hasOwn(levelsByFamily,k) || !Number.isInteger(s.levels[k]) || s.levels[k] < 0 || s.levels[k] >= levelsByFamily[k])) return null;
  const keys = Object.keys(estimateDefaults.values);
  if (Object.keys(s.values).sort().join(',') !== [...keys].sort().join(',') || keys.some(k => typeof s.values[k] !== 'string' || !/^\d{0,3}$/.test(s.values[k]))) return null;
  if (['shared','sku','membership','gateway'].some(k => typeof s[k] !== 'boolean') || !['none','static','dynamic'].includes(s.site) || !Array.isArray(s.flags) || s.flags.length > flagNames.length || new Set(s.flags).size !== s.flags.length || s.flags.some(f => !flagNames.includes(f))) return null;
  return {levels:s.levels,values:s.values,shared:s.shared,sku:s.sku,membership:s.membership,gateway:s.gateway,site:s.site,flags:s.flags};
 } catch { return null; }
}
export function encodeEstimate(state) {
 const raw = JSON.stringify({v:1,...state});
 return decodeEstimate(raw) ? raw : null;
}
