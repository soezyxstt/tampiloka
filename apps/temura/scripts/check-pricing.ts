import assert from "node:assert/strict";
import { TEMPLATE_CATALOG, TEMPLATE_TIERS } from "../lib/template-catalog";

assert.deepEqual(Object.values(TEMPLATE_TIERS).map(({ priceIdr, originalPriceIdr }) => [priceIdr, originalPriceIdr]), [
  [125_000, 175_000], [149_000, 199_000], [249_000, 349_000],
]);
for (const item of TEMPLATE_CATALOG) {
  const tier = ["islamic", "minimalist"].includes(item.categoryId) ? "essential" : "standard";
  assert.equal(item.tier, tier, item.id);
  assert.equal(item.priceIdr, TEMPLATE_TIERS[tier].priceIdr, item.id);
}
console.log(`Verified three price pairs and ${TEMPLATE_CATALOG.length} design prices.`);
