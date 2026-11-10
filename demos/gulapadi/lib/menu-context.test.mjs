import assert from "node:assert/strict";
import { defaultMenuCategory, paginateMenu, MENU_PAGE_SIZE } from "./menu-context.ts";
for (const [time,expected] of [
  ["2026-10-21T22:59:00Z","Semua Menu"],
  ["2026-10-21T23:00:00Z","Sarapan"],
  ["2026-10-22T03:29:00Z","Sarapan"],
  ["2026-10-22T03:30:00Z","Semua Menu"],
  ["2026-10-22T10:00:00Z","Semua Menu"],
]) assert.equal(defaultMenuCategory(new Date(time)), expected, time);
console.log("Breakfast boundary checks passed (Asia/Jakarta).");

const {readFileSync} = await import("node:fs");
const menu = JSON.parse(readFileSync(new URL("../data/menu.json",import.meta.url),"utf8"));
const pages = paginateMenu(menu,1).pages;
const all = Array.from({length:pages},(_,index)=>paginateMenu(menu,index+1));
assert.equal(menu.length,206);
assert.equal(pages,18);
assert.ok(all.every(page=>page.items.length<=MENU_PAGE_SIZE));
assert.deepEqual(all.flatMap(page=>page.items.map(item=>item.id)),menu.map(item=>item.id));
assert.equal(all.at(-1).items.length,2);
assert.equal(paginateMenu(menu,100).page,18);
assert.equal(paginateMenu(menu,0).page,1);
const donuts=menu.filter(item=>item.category==="Donat");
assert.equal(donuts.length,20);
assert.equal(paginateMenu(donuts,1).items.length,12);
assert.equal(paginateMenu(donuts,2).items.length,8);
assert.equal(paginateMenu([],1).first,0);
assert.deepEqual(paginateMenu([],1).items,[]);
console.log("12-item pagination: all206 reachable exactly once,18 pages,filtered/empty/boundary cases passed.");

const mobilePages = Array.from({length: paginateMenu(menu,1,6).pages}, (_,index)=>paginateMenu(menu,index+1,6));
assert.equal(mobilePages.length,35);
assert.ok(mobilePages.every(page=>page.items.length<=6));
assert.deepEqual(mobilePages.flatMap(page=>page.items.map(item=>item.id)),menu.map(item=>item.id));
assert.equal(mobilePages.at(-1).items.length,2);
assert.deepEqual(paginateMenu(menu,100,6),mobilePages.at(-1));
assert.equal(paginateMenu(menu,0,6).page,1);
assert.equal(paginateMenu(donuts,4,6).items.length,2);
assert.deepEqual(paginateMenu([],1,6),{page:1,pages:1,items:[],first:0,last:0});
console.log("6-item mobile pagination: all206 reachable exactly once,35 pages,filtered/empty/boundary cases passed.");
