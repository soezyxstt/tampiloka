import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import {
  CATALOG_CACHE_MAX_AGE, demoUrl, featuredTemplates, fetchTemplateCatalog,
  filterTemplates, parseTemplateCatalog, readCatalogCache, writeCatalogCache,
} from "../lib/template-catalog.ts";

const label = value => ({ id: value, en: value });
function fixture() {
  return {
    schemaVersion: 1,
    updatedAt: "2026-10-30T00:00:00.000Z",
    families: [{ id: "shop", name: label("Shop"), modes: [{ id: "full", name: label("Full") }], defaultMode: "full" }],
    entries: [{
      id: "editorial", family: "shop", name: label("Editorial"), description: label("Products"),
      url: "https://demo.example.test/?preset=editorial#products",
      imageUrl: "https://images.example.test/editorial.webp",
      modeUrls: { full: "https://demo.example.test/?preset=editorial&level=advanced#products" },
      visibility: "public", featured: true,
    }],
  };
}
function memoryStorage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test("public projection drops prospect entries and unneeded source fields", () => {
  const input = fixture();
  input.entries[0].internalNotes = "private notes";
  input.entries.push({ id: "prospect-secret", visibility: "private", url: "https://private.example.test" });
  const result = parseTemplateCatalog(input);
  assert.equal(result.entries.length, 1);
  assert.equal(JSON.stringify(result).includes("private"), false);
  assert.equal(JSON.stringify(result).includes("internalNotes"), false);
});

test("new families, images, and modes need no consumer code change", () => {
  const input = fixture();
  input.families.push({ id: "hotel", name: label("Hotel"), modes: [{ id: "booking", name: label("Booking") }], defaultMode: "booking" });
  input.entries.push({ ...input.entries[0], id: "stay", family: "hotel", name: label("Stay"), modeUrls: { booking: "https://stay.example.test/booking" }, imageUrl: "https://images.example.test/stay.webp" });
  const catalog = parseTemplateCatalog(input);
  assert.equal(filterTemplates(catalog, "hotel", "stay", "en").length, 1);
  assert.deepEqual(featuredTemplates(catalog).map(entry => entry.family), ["shop", "hotel"]);
});

test("reject unsupported schema, bad dates and duplicate IDs", () => {
  for (const mutate of [
    data => { data.schemaVersion = 2; },
    data => { data.updatedAt = "invalid"; },
    data => { data.families.push(data.families[0]); },
    data => { data.entries.push(data.entries[0]); },
    data => { data.families[0].modes.push(data.families[0].modes[0]); },
  ]) {
    const input = fixture(); mutate(input);
    assert.throws(() => parseTemplateCatalog(input));
  }
});

test("entry IDs stay unique across families", () => {
  const input = fixture();
  input.families.push({ id: "hotel", name: label("Hotel") });
  input.entries.push({ ...input.entries[0], family: "hotel", modeUrls: undefined });
  assert.throws(() => parseTemplateCatalog(input), /Duplicate catalog entry/);
});

test("reject unknown family, unknown mode and missing localized names", () => {
  for (const mutate of [
    data => { data.entries[0].family = "missing"; },
    data => { data.entries[0].modeUrls = { missing: "https://demo.example.test" }; },
    data => { data.families[0].defaultMode = "missing"; },
    data => { data.entries[0].name = { id: "Nama" }; },
  ]) {
    const input = fixture(); mutate(input);
    assert.throws(() => parseTemplateCatalog(input));
  }
});

test("each offered mode must have a complete entry URL", () => {
  for (const modeUrls of [undefined, {}]) {
    const input = fixture(); input.entries[0].modeUrls = modeUrls;
    assert.throws(() => parseTemplateCatalog(input), /Missing entry mode URL/);
  }
  const input = fixture();
  input.families[0].modes.push({ id: "catalog", name: label("Catalog") });
  assert.throws(() => parseTemplateCatalog(input), /Missing entry mode URL/);
});

test("reject unsafe demo, image, mode and catalog URL protocols or credentials", async () => {
  for (const url of ["javascript:alert(1)", "data:text/html,unsafe", "http://example.test", "https://user:password@example.test"]) {
    for (const field of ["url", "imageUrl"]) {
      const input = fixture(); input.entries[0][field] = url;
      assert.throws(() => parseTemplateCatalog(input));
    }
    const input = fixture(); input.entries[0].modeUrls.full = url;
    assert.throws(() => parseTemplateCatalog(input));
    await assert.rejects(fetchTemplateCatalog(url, async () => { throw new Error("Must not fetch"); }));
  }
});

test("mode and locale links preserve existing query state and anchors", () => {
  const entry = parseTemplateCatalog(fixture()).entries[0];
  const url = new URL(demoUrl(entry, "full", "en"));
  assert.equal(url.searchParams.get("preset"), "editorial");
  assert.equal(url.searchParams.get("level"), "advanced");
  assert.equal(url.searchParams.get("lang"), "en");
  assert.equal(url.hash, "#products");
  assert.equal(new URL(demoUrl(entry, undefined, "id")).searchParams.get("level"), null);
});

test("each request reads a fresh manifest without a build snapshot", async () => {
  const requests = [];
  let current = fixture();
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    return Response.json(current);
  };
  const first = await fetchTemplateCatalog("https://registry.example.test/catalog.json", fetcher);
  current = fixture();
  current.entries.push({ ...current.entries[0], id: "new-demo" });
  const next = await fetchTemplateCatalog("https://registry.example.test/catalog.json", fetcher);
  assert.equal(first.entries.length, 1);
  assert.equal(next.entries.length, 2);
  assert.equal(requests.length, 2);
  for (const { options } of requests) {
    assert.equal(options.cache, "no-store");
    assert.equal(options.redirect, "error");
    assert.ok(options.signal instanceof AbortSignal);
  }
});

test("loader rejects failed, malformed and oversized upstream responses", async () => {
  for (const response of [
    new Response("unavailable", { status: 503 }),
    new Response("{"),
    new Response("{}", { headers: { "Content-Length": "1000001" } }),
    new Response(" ".repeat(1000001)),
  ]) {
    await assert.rejects(fetchTemplateCatalog("https://registry.example.test/catalog.json", async () => response));
  }
});

test("last good catalog survives an outage, expires after 24 hours and can recover", async () => {
  const storage = memoryStorage();
  const first = parseTemplateCatalog(fixture());
  assert.equal(writeCatalogCache(storage, first, 1000), true);
  await assert.rejects(fetchTemplateCatalog("https://registry.example.test/catalog.json", async () => new Response("", { status: 503 })));
  assert.deepEqual(readCatalogCache(storage, 2000), first);
  assert.equal(readCatalogCache(storage, 1000 + CATALOG_CACHE_MAX_AGE + 1), null);
  const updated = fixture(); updated.entries[0].name = label("Updated");
  const recovered = await fetchTemplateCatalog("https://registry.example.test/catalog.json", async () => Response.json(updated));
  writeCatalogCache(storage, recovered, 3000);
  assert.equal(readCatalogCache(storage, 3001).entries[0].name.en, "Updated");
  assert.equal(readCatalogCache(storage, 2999), null);
});

test("corrupt or blocked browser storage never becomes trusted catalog data", () => {
  const bad = { getItem: () => "{", setItem: () => { throw new Error("Storage blocked"); } };
  assert.equal(readCatalogCache(bad), null);
  assert.equal(writeCatalogCache(bad, parseTemplateCatalog(fixture())), false);
});

test("the generated producer document passes the consumer contract unchanged", {
  skip: !process.env.TEMPLATE_CATALOG_CONTRACT_FILE,
}, async () => {
  const source = JSON.parse(await readFile(process.env.TEMPLATE_CATALOG_CONTRACT_FILE, "utf8"));
  const catalog = await fetchTemplateCatalog("https://catalog.tampiloka.site/catalog.v1.json", async () => Response.json(source));
  assert.deepEqual(catalog, source);
  assert.ok(catalog.entries.length > 0);
  for (const entry of catalog.entries) {
    for (const locale of ["id", "en"]) {
      for (const [mode, expected] of Object.entries(entry.modeUrls || {})) {
        const original = new URL(expected);
        original.searchParams.set("lang", locale);
        assert.equal(demoUrl(entry, mode, locale), original.href);
      }
      const original = new URL(entry.url);
      original.searchParams.set("lang", locale);
      assert.equal(demoUrl(entry, undefined, locale), original.href);
    }
  }
});
