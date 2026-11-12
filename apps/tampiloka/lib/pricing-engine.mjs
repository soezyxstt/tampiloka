import { families } from './service-pricing.mjs';
import { rates, version } from './pricing-rates-v1.mjs';

const goods = new Set(['cafe', 'commerce', 'operations']);
const quantity = (n, name) => { if (!Number.isSafeInteger(n) || n < 0 || n > 999) throw new RangeError(`Invalid ${name}`); return n; };
const id = (v, name) => { if (typeof v !== 'string' || !v.trim()) throw new RangeError(`Invalid ${name}`); return v; };
const bool = (v, name) => { if (typeof v !== 'boolean') throw new RangeError(`Invalid ${name}`); return v; };
const pairAdd = (a, b) => [a[0]+b[0], a[1]+b[1]];
export function tierCost(count, tiers) {
 quantity(count, 'quantity');
 return Array.from({length:count},(_,i)=>tiers[i<4?0:i<9?1:2]).reduce(pairAdd,[0,0]);
}

// The old calculator supplies one family and counts rather than scope identifiers.
export function normalizePricingInput(input) {
 if (!input || typeof input !== 'object' || Array.isArray(input)) throw new RangeError('Invalid input');
 const legacy = !('requirements' in input);
 let reqs;
 if (legacy) {
  const family = input.family ?? 'cafe', level = quantity(input.level ?? 0, 'level');
  const fnbLocations = quantity(input.fnbLocations ?? 1, 'fnbLocations');
  const warehouses = quantity(input.warehouses ?? 0, 'warehouses');
  const capacity = quantity(input.capacity ?? 0, 'capacity');
  if (family === 'cafe' && !fnbLocations) throw new RangeError('Invalid fnbLocations');
  for (const k of ['operations','website','sameSku','membership']) if (input[k] !== undefined) bool(input[k], k);
  const outlets = Array.from({length:fnbLocations},(_,i)=>`outlet-${i+1}`);
  reqs = [{family, minLevel:level, outlets:family === 'cafe' ? outlets : undefined,
   ...(family === 'booking' ? {providers:5+capacity} : {}), ...(family === 'school' ? {students:100+capacity} : {})}];
  if (input.operations) reqs.push({family:'operations', minLevel:0, locations:fnbLocations+warehouses, cashierOutlets:[], data:input.sameSku === false ? 'separate-stock' : 'goods'});
  if (input.sameSku === false && family === 'cafe') reqs[0].data = 'cafe-goods';
 } else reqs = input.requirements;
 if (!Array.isArray(reqs) || !reqs.length || reqs.length > 6) throw new RangeError('Invalid requirements');
 const seen = new Set();
 const requirements = reqs.map(r => {
  if (!r || typeof r !== 'object') throw new RangeError('Invalid requirement');
  const family = id(r.family,'family'), catalog = family === 'operations' ? rates.operations : families.find(f=>f.id===family)?.plans;
  if (!catalog || seen.has(family)) throw new RangeError('Invalid or duplicate family'); seen.add(family);
  const minLevel = quantity(r.minLevel ?? 0,'minLevel'); if (minLevel >= catalog.length) throw new RangeError('Invalid level');
  const scope = {organization:id(r.organization ?? 'organization','organization'), workspace:id(r.workspace ?? 'workspace','workspace'), data:id(r.data ?? (goods.has(family) ? 'goods' : family),'data'), site:id(r.site ?? 'site','site'), merchant:id(r.merchant ?? 'merchant','merchant')};
  const outlets = r.outlets ?? (family === 'cafe' ? ['outlet-1'] : []);
  const cashierOutlets = r.cashierOutlets ?? [];
  for (const [name,arr] of [['outlets',outlets],['cashierOutlets',cashierOutlets]]) if (!Array.isArray(arr) || arr.length > 999 || new Set(arr).size !== arr.length || arr.some(x=>typeof x !== 'string' || !x.trim())) throw new RangeError(`Invalid ${name}`);
  if (family === 'cafe' && !outlets.length) throw new RangeError('Cafe needs an outlet');
  const locations = quantity(r.locations ?? 3,'locations');
  if (family === 'operations' && (locations < 1 || cashierOutlets.length > locations)) throw new RangeError('Invalid locations');
  return {family,minLevel,...scope,outlets:[...outlets],cashierOutlets:[...cashierOutlets],locations,providers:quantity(r.providers ?? 5,'providers'),students:quantity(r.students ?? 100,'students')};
 });
 const attendance = quantity(input.attendance ?? 0,'attendance');
 const membership = bool(input.membership ?? false,'membership');
 const gateway = bool(input.gateway ?? false,'gateway');
 const website = input.website === true ? 'static' : input.website === false || input.website == null ? null : input.website;
 if (![null,'static','dynamic'].includes(website)) throw new RangeError('Invalid website');
 const flags = input.flags ?? [];
 const allowed = ['recipes','offline','multibrand','newConnector','externalIntegration','complexMigration','untestedCapacity','dashboard','bookingBranches','schoolBranches'];
 if (!Array.isArray(flags) || flags.some(x=>!allowed.includes(x))) throw new RangeError('Invalid flags');
 if (membership && !seen.has('commerce')) throw new RangeError('Membership requires commerce');
 if (gateway && !requirements.some(r=>['cafe','commerce','booking'].includes(r.family))) throw new RangeError('Gateway requires cafe, commerce or booking');
 return {requirements, attendance, membership, gateway, website, flags:[...new Set(flags)]};
}

const packagePrice = (family, level) => family === 'operations' ? rates.operations[level] : families.find(f=>f.id===family).plans[level].slice(4,6);
const packageCount = family => family === 'operations' ? rates.operations.length : families.find(f=>f.id===family).plans.length;
function calculateCandidate(input, selected) {
 const lines=[], unknown=new Set(input.flags), shared=new Map(); let savings=[0,0];
 const add=(id,pair,details={})=>lines.push({id,setup:pair[0],monthly:pair[1],...details});
 const allocations=(r,level)=> {
  const list=[['account',rates.account,`${r.organization}|${r.workspace}`]];
  if (goods.has(r.family)) {
   // Inventory operations allocates the common recording base even at stock-only level.
   if ((r.family==='cafe' && level>=2) || (r.family==='commerce' && level>=2) || r.family==='operations') {
    list.push(['sales',rates.sales,r.data],['stock',rates.stock,r.data]);
   } else if (r.family==='commerce' || (r.family==='cafe' && level>=1)) list.push(['catalog',rates.catalog,r.data]);
  }
  const site = r.family==='website' ? (level===0?'static':'dynamic') : ['commerce','booking','school'].includes(r.family) || (r.family==='cafe'&&level===3) ? 'dynamic' : null;
  if (site) list.push(['website',site==='dynamic'?rates.dynamicSite:rates.staticSite,r.site]);
  if ((r.family==='cafe'&&level===3)||(['commerce','booking'].includes(r.family)&&level===3)) list.push(['gateway',rates.gateway,r.merchant]);
  return list;
 };
 for (let i=0;i<input.requirements.length;i++) {
  const r=input.requirements[i], level=selected[i], price=packagePrice(r.family,level), parts=allocations(r,level);
  const allocated=parts.reduce((sum,p)=>pairAdd(sum,p[1]),[0,0]);
  if (allocated[0]>price[0] || allocated[1]>price[1]) throw new Error('Invalid package allocation');
  add('package',[price[0]-allocated[0],price[1]-allocated[1]],{family:r.family,level});
  for (const [type,value,scope] of parts) {
   const key=JSON.stringify([r.organization,r.workspace,type,scope]); const old=shared.get(key);
   if (old) savings=pairAdd(savings,[Math.min(old.value[0],value[0]),Math.min(old.value[1],value[1])]);
   shared.set(key,{type,scope,families:old ? [...old.families,r.family] : [r.family],value:old ? [Math.max(old.value[0],value[0]),Math.max(old.value[1],value[1])] : value});
  }
  if(r.family==='cafe') add('fnbLocations',tierCost(r.outlets.length-1,rates.fnbTiers));
  if(r.family==='operations') { add('stockLocations',tierCost(Math.max(0,r.locations-3),rates.stockTiers)); unknown.add('operationsReadiness'); if(r.locations>10) unknown.add('capacityReview'); }
  if(r.family==='cafe' && r.outlets.length>10) unknown.add('capacityReview');
  if(r.family==='booking' && level>=2) add('capacity',[0,Math.ceil(Math.max(0,r.providers-5)/5)*rates.providers]);
  else if(r.family==='booking' && r.providers>5) unknown.add('providerCapacity');
  if(r.family==='school' && level>=2) add('capacity',[0,Math.ceil(Math.max(0,r.students-100)/100)*rates.students]);
  else if(r.family==='school' && r.students>100) unknown.add('studentCapacity');
 }
 for(const v of shared.values()) add(`shared:${v.type}`,v.value,{scope:v.scope,families:v.families});
 const groups=new Map();
 for(const r of input.requirements.filter(r=>goods.has(r.family))) {const key=JSON.stringify([r.organization,r.workspace,r.data]); groups.set(key,(groups.get(key)||0)+1);}
 for(const n of groups.values()) if(n>1) add('connector',[rates.connector[0]*(n-1),0]);
 if(input.requirements.length>1) unknown.add('crossDomainIntegration');
 if(input.website) {
  const owner=input.requirements[0], siteKey=JSON.stringify([owner.organization,owner.workspace,'website',owner.site]), existing=shared.get(siteKey)?.value;
  const desired=input.website==='dynamic'?rates.dynamicSite:rates.staticSite;
  if(!existing) add('website',desired);
  else if(input.website==='dynamic' && existing[0]<desired[0]) add('websiteUpgrade',[desired[0]-existing[0],desired[1]-existing[1]]);
 }
 if(input.attendance) {add('attendance',[0,rates.attendance[0]+Math.ceil(Math.max(0,input.attendance-10)/10)*rates.attendance[1]]); unknown.add('attendanceReadiness');}
 if(input.membership) {add('membership',rates.membership); unknown.add('membershipEmailOtp');}
 const setup=lines.reduce((a,x)=>a+x.setup,0)*1000, monthly=lines.reduce((a,x)=>a+x.monthly,0)*1000;
 return {version,lines,savings:{setup:savings[0]*1000,monthly:savings[1]*1000},unknown:[...unknown],setup,monthly,quarterly:monthly*3,firstYear:setup+12*monthly,normalizedInput:input,selected:input.requirements.map((r,i)=>({family:r.family,level:selected[i],minLevel:r.minLevel}))};
}
export function calculatePricing(raw) {
 const input=normalizePricingInput(raw); let best;
 function enumerate(levels) {
  const i=levels.length;
  if(i<input.requirements.length) {const r=input.requirements[i]; for(let n=r.minLevel;n<packageCount(r.family);n++) enumerate([...levels,n]); return;}
  const levelOf=f=>{const i=input.requirements.findIndex(r=>r.family===f); return i<0 ? -1 : levels[i];};
  if(input.membership && levelOf('commerce')<2) return;
  if(input.gateway && !['cafe','commerce','booking'].some(f=>levelOf(f)===3)) return;
  const op=input.requirements.find(r=>r.family==='operations'), cafe=input.requirements.find(r=>r.family==='cafe');
  if(op && op.cashierOutlets.length && levelOf('operations')<1) {
   const covered=cafe && levelOf('cafe')>=2 && cafe.organization===op.organization && cafe.workspace===op.workspace ? new Set(cafe.outlets) : new Set();
   if(op.cashierOutlets.some(x=>!covered.has(x))) return;
  }
  const candidate=calculateCandidate(input,levels);
  if(!best || candidate.firstYear<best.firstYear || (candidate.firstYear===best.firstYear && candidate.monthly<best.monthly)) best=candidate;
 }
 enumerate([]); if(!best) throw new RangeError('No standard combination satisfies requirements'); return best;
}
