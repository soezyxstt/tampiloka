import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalogue = JSON.parse(await readFile(resolve(root, "data/menu.json"), "utf8"));
const source = await readFile(resolve(root, "components/menu.tsx"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
const testModule = { exports: {} };
// Import stubs keep this check focused on the actual exported data logic, without rendering React.
vm.runInNewContext(compiled, { exports: testModule.exports, module: testModule, require: () => ({}), Intl });
const { menuGroups, filterMenuItems } = testModule.exports;
const original = catalogue.items.map(item => item.id).join(",");

for (const category of catalogue.categories) {
  assert.equal(menuGroups.filter(group => group.categories.includes(category.id)).length, 1, `Each source category must belong to exactly one broad group: ${category.id}`);
}
const all = filterMenuItems(catalogue.items, "all", "all", "");
assert.equal(all.length, catalogue.items.length);
assert.equal(new Set(all.map(item => item.id)).size, catalogue.items.length);
assert.equal(new Set(all.slice(0, 12).map(item => item.category)).size, 12, "Default first 12 should offer distinct source categories");
assert.ok(all.slice(0, 12).some(item => item.category === "coffee"), "Coffee must be discoverable in the initial selection");
const coffee = filterMenuItems(catalogue.items, "coffee", "all", "");
assert.ok(coffee.length > 0 && coffee.every(item => ["coffee", "black-series"].includes(item.category)));
assert.equal(filterMenuItems(catalogue.items, "coffee", "nasi-goreng", "").length, 0);
const search = filterMenuItems(catalogue.items, "food", "nasi-goreng", " AROMA SMOKY ");
assert.ok(search.some(item => item.id === "nasi-goreng-sapi"), "Search must trim, ignore case and include descriptions");
assert.equal(filterMenuItems(catalogue.items, "all", "all", "no-such-historia-menu-item").length, 0);
assert.equal(catalogue.items.map(item => item.id).join(","), original, "Filtering must not mutate source order");
console.log(`Catalogue interaction logic passed (${catalogue.items.length} products, ${menuGroups.length} broad groups, diverse first 12).`);
