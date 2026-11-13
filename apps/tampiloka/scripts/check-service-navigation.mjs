import assert from "node:assert/strict";
import { menuTransition } from "../../../packages/brand-system/src/layout/menu-state.mjs";
import { familyForField, familyUrl, representativeDemos, selectedFamily } from "../lib/service-selection.mjs";
import { families } from "../lib/service-pricing.mjs";

let menu = menuTransition(null, "/layanan", "enter");
assert.equal(menu.mode, "hover");
menu = menuTransition(menu, "/layanan", "click");
assert.equal(menu.mode, "pinned");
assert.equal(menuTransition(menu, "/layanan", "leave"), menu);
assert.equal(menuTransition(menu, "/layanan", "click"), null);
assert.equal(menuTransition(menuTransition(null, "/layanan", "enter"), "/layanan", "leave"), null);
assert.equal(menuTransition(null, "/layanan", "click").mode, "pinned");
for (const [field, expected] of Object.entries({ "kafe-restoran": "cafe", umkm: "website", sekolah: "school", "toko-online": "commerce", booking: "booking", portofolio: "website" })) {
  assert.equal(familyForField(field), expected);
  assert.ok(families.some(family => family.id === expected));
}
for (const field of ["multioutlet", "lainnya", "toString", "unknown"]) assert.equal(familyForField(field), null);
assert.equal(selectedFamily(undefined), "cafe");
assert.equal(selectedFamily("school"), "school");
assert.equal(selectedFamily("operations"), "operations");
assert.equal(selectedFamily(["school", "cafe"]), "cafe");
assert.equal(selectedFamily("unknown"), "cafe");
assert.equal(familyUrl("https://example.test/en/pricing?estimate=abc&family=cafe#details", "school"), "/en/pricing?estimate=abc&family=school#details");
const demos = [{ id: "a", family: "shop" }, { id: "b", family: "shop", featured: true }, { id: "c", family: "other" }, { id: "d", family: "shop" }, { id: "e", family: "shop" }];
assert.deepEqual(representativeDemos(demos, "shop").map(demo => demo.id), ["b", "a", "d"]);
assert.deepEqual(representativeDemos(demos, "missing"), []);
assert.equal(demos[0].id, "a");
const originalDemo = { id: "catalog-demo", family: "shop", url: "https://example.test/demo", imageUrl: "https://example.test/old.png" };
const updatedDemo = { ...originalDemo, imageUrl: "https://example.test/new.png" };
assert.equal(representativeDemos([originalDemo], "shop")[0].imageUrl, originalDemo.imageUrl);
assert.equal(representativeDemos([updatedDemo], "shop")[0].imageUrl, updatedDemo.imageUrl);
const cafe = families.find(family => family.id === "cafe");
assert.deepEqual(cafe.rows.find(row => row[0][0] === "Mencatat pembayaran")[1], [0, 0, 1, 1]);
assert.equal(families.find(family => family.id === "school").plans.length, 4);
console.log("Service navigation and selection assertions passed.");
