import assert from "node:assert/strict";
import { test } from "node:test";
import { cloneQuestion, move, repairRouting, routingIssues } from "./form-editor-helpers.ts";

test("reorder retains every item and ignores invalid moves", () => {
  const items = ["a", "b", "c"];
  move(items, 0, 2);
  assert.deepEqual(items, ["b", "c", "a"]);
  move(items, -1, 1);
  assert.deepEqual(items, ["b", "c", "a"]);
});

test("duplicate allocates distinct IDs without altering the source", () => {
  const question = { id: "q", type: "multiple_choice_grid", title: "Q", required: false, options: [{ id: "o", label: "O" }], rows: [{ id: "r", label: "R" }], columns: [{ id: "c", label: "C" }], validation: {} };
  const result = cloneQuestion(question);
  const ids = [question.id, question.options[0].id, question.rows[0].id, question.columns[0].id, result.id, result.options[0].id, result.rows[0].id, result.columns[0].id];
  assert.equal(new Set(ids).size, ids.length);
  result.rows[0].label = "changed";
  assert.equal(question.rows[0].label, "R");
});


test("routing repair removes only invalid references after deletion, type change, and reorder", () => {
  const q = { id: "q", type: "single_choice", options: [{ id: "one", label: "One" }, { id: "two", label: "Two" }] };
  const form = { sections: [
    { id: "a", questions: [q], routing: { questionId: "q", choices: { one: "b", two: "c" }, defaultSectionId: "c" } },
    { id: "b", questions: [] }, { id: "c", questions: [] }
  ] };
  q.options.pop();
  form.sections.splice(1, 1);
  assert.deepEqual(routingIssues(form), ["a"]);
  repairRouting(form);
  assert.deepEqual(form.sections[0].routing, { questionId: "q", choices: {}, defaultSectionId: "c" });
  assert.deepEqual(routingIssues(form), []);
  form.sections.reverse();
  assert.deepEqual(routingIssues(form), ["a"]);
  repairRouting(form);
  assert.equal(form.sections[1].routing.defaultSectionId, undefined);
  q.type = "short_text";
  assert.deepEqual(routingIssues(form), ["a"]);
  repairRouting(form);
  assert.equal(form.sections[1].routing, undefined);
});
