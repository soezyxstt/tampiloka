import { test } from "node:test";
import assert from "node:assert/strict";
import { validateForPublish, referencedAssets, sameCanonicalAnswers, lifecycleStatus, responseLimitReached } from "../lib/db/form-policy.ts";
import { createBlankForm, validateAnswers } from "../lib/forms/schema.ts";

test("publish rejects unfinished choices, grids and impossible bounds", () => {
  const form = createBlankForm(); form.title = " ";
  form.sections[0].questions.push({ id: "q", type: "multiple_choice", title: "", required: true, options: [], rows: [], columns: [], validation: { minSelections: 2 } });
  form.sections[0].questions.push({ id: "g", type: "checkbox_grid", title: "Grid", required: false, options: [], rows: [], columns: [], validation: {} });
  assert.ok(validateForPublish(form).length >= 5);
});
test("publish finds image references without duplicates", () => {
  const form = createBlankForm(); form.headerAssetId = "asset"; form.logoAssetId = "asset";
  assert.deepEqual(referencedAssets(form), ["asset"]);
});

test("idempotency compares canonical answers after hidden answers are discarded", () => {
  const form = createBlankForm();
  form.sections[0].questions.push({ id: "route", type: "single_choice", title: "Route", required: true, options: [{id:"skip",label:"Skip"}], rows: [], columns: [], validation: {} });
  form.sections[0].routing = { questionId: "route", choices: { skip: "last" } };
  form.sections.push({ id:"hidden", title:"", description:"", questions:[{ id:"secret", type:"short_text", title:"Hidden", required:false, options:[], rows:[], columns:[], validation:{} }] }, { id:"last", title:"", description:"", questions:[] });
  const a = validateAnswers(form, { route:"skip", secret:"ignored" });
  const b = validateAnswers(form, { route:"skip" });
  assert.equal(a.success, true); assert.equal(sameCanonicalAnswers(a.answers, b.answers), true);
  assert.equal(sameCanonicalAnswers(a.answers, { route:"different" }), false);
});

test("lifecycle rejects invalid and deleted transitions", () => {
 assert.equal(lifecycleStatus("draft", "publish", false), "published");
 assert.equal(lifecycleStatus("published", "close", true), "closed");
 assert.equal(lifecycleStatus("closed", "reopen", true), "published");
 assert.equal(lifecycleStatus("draft", "reopen", false), null);
 assert.equal(lifecycleStatus("deleted", "publish", true), null);
});


test("response cap and deadline close at their exact boundaries", () => {
 const deadline = "2026-01-01T00:00:00.000Z";
 assert.equal(responseLimitReached({ maxResponses: 2, closesAt: deadline }, 1, Date.parse(deadline) - 1), false);
 assert.equal(responseLimitReached({ maxResponses: 2 }, 2), true);
 assert.equal(responseLimitReached({ closesAt: deadline }, 0, Date.parse(deadline)), true);
});
