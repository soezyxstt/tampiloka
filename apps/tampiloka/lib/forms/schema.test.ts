import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { createBlankForm, formSchema, getVisibleSections, isValidSlug, normalizeSlug, validateAnswers, weddingTemplate, type Question } from "./schema";

const question = (type: Question["type"], id: string): Question => ({ id, type, title: id, required: true, options: [], rows: [], columns: [], validation: {} });

describe("form schema", () => {
  test("starter templates parse and slugs are normalized and reserved", () => {
    assert.equal(formSchema.safeParse(createBlankForm()).success, true);
    assert.equal(formSchema.safeParse(weddingTemplate()).success, true);
    assert.equal(normalizeSlug("  Pesta Café! "), "pesta-cafe");
    assert.equal(isValidSlug("admin"), false);
    assert.equal(isValidSlug("pesta-cafe"), true);
  });
  test("routing removes hidden answers and forbids unknown questions", () => {
    const form = createBlankForm();
    const q = question("single_choice", "choice"); q.options = [{ id: "yes", label: "Ya" }];
    form.sections = [{ id: "a", title: "", description: "", questions: [q], routing: { questionId: q.id, choices: { yes: "c" } } }, { id: "b", title: "", description: "", questions: [question("short_text", "hidden")] }, { id: "c", title: "", description: "", questions: [question("short_text", "visible")] }];
    assert.equal(formSchema.safeParse(form).success, true);
    assert.deepEqual(getVisibleSections(form, { choice: "yes" }).map(s => s.id), ["a", "c"]);
    assert.deepEqual(validateAnswers(form, { choice: "yes", hidden: "secret", visible: "ok" }).answers, { choice: "yes", visible: "ok" });
    assert.equal(validateAnswers(form, { choice: "yes", visible: "ok", rogue: "bad" }).success, false);
  });
  test("validates choices, grids, dates, files and bounds", () => {
    const form = createBlankForm();
    const grid = question("checkbox_grid", "grid"); grid.rows = [{ id: "row", label: "Row" }]; grid.columns = [{ id: "col", label: "Column" }];
    const date = question("date", "date"); const file = question("file", "file"); file.validation.maxFiles = 2;
    const choices = question("multiple_choice", "choices"); choices.options = [{ id: "option", label: "One" }]; choices.validation.maxSelections = 1;
    form.sections[0].questions = [grid, date, file, choices];
    assert.equal(validateAnswers(form, { grid: { row: ["col"] }, date: "2024-02-29", file: ["asset-1"], choices: ["option"] }).success, true);
    assert.equal(validateAnswers(form, { grid: { row: ["wrong"] }, date: "2023-02-29", file: ["../../bad"], choices: ["option", "option"] }).success, false);
  });
});

test("all question types accept their intended values and reject malformed input", () => {
  const examples: [Question["type"], unknown, unknown][] = [
    ["short_text", "Ada", {}], ["long_text", "Catatan", []], ["single_choice", "opt", "missing"],
    ["multiple_choice", ["opt"], ["missing"]], ["dropdown", "opt", "missing"], ["number", 3, "3"],
    ["email", "a@example.com", "bad"], ["phone", "+62 812-1234", "abc"], ["url", "https://example.com", "javascript:alert(1)"],
    ["date", "2024-02-29", "2023-02-29"], ["time", "23:59", "24:00"], ["datetime", "2024-02-29T12:30", "2024-02-30T12:30"],
    ["file", ["asset-1"], ["../bad"]], ["linear_scale", 4, 6], ["rating", 5, 2.5],
    ["multiple_choice_grid", { row: "col" }, { row: "unknown" }], ["checkbox_grid", { row: ["col"] }, { row: ["unknown"] }],
  ];
  for (const [type, good, bad] of examples) {
    const form = createBlankForm(); const q = question(type, "q");
    q.options = [{ id: "opt", label: "Option" }]; q.rows = [{ id: "row", label: "Row" }]; q.columns = [{ id: "col", label: "Column" }]; form.sections[0].questions = [q];
    assert.equal(validateAnswers(form, { q: good }).success, true, type);
    assert.equal(validateAnswers(form, { q: bad }).success, false, type);
  }
  const form = createBlankForm(); form.sections[0].questions = [question("info", "info")];
  assert.equal(validateAnswers(form, {}).success, true);
  assert.equal(validateAnswers(form, { info: "injected" }).success, false);
});

test("other choices and ID constraints are bounded", () => {
  const form = createBlankForm(); const q = question("multiple_choice", "q"); q.allowOther = true;
  q.options = [{ id: "one", label: "One" }]; form.sections[0].questions = [q];
  assert.equal(validateAnswers(form, { q: ["one", "other:Another"] }).success, true);
  assert.equal(validateAnswers(form, { q: ["other: "] }).success, false);
  assert.equal(validateAnswers(form, { q: ["other:a", "other:b"] }).success, false);
  q.id = "__proto__"; assert.equal(formSchema.safeParse(form).success, false);
});

test("checkbox grid applies selection limits to each answered row", () => {
  const form = createBlankForm(); const q = question("checkbox_grid", "grid");
  q.rows = [{ id: "row", label: "Row" }];
  q.columns = [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }];
  q.validation = { minSelections: 2, maxSelections: 2 }; form.sections[0].questions = [q];
  assert.equal(validateAnswers(form, { grid: { row: ["a", "b"] } }).success, true);
  assert.equal(validateAnswers(form, { grid: { row: ["a"] } }).success, false);
  assert.equal(validateAnswers(form, { grid: { row: ["a", "b", "c"] } }).success, false);
});

test("response limits reject invalid counts and deadlines", () => {
  const form = createBlankForm();
  assert.equal(formSchema.safeParse({ ...form, settings: { ...form.settings, maxResponses: 10, closesAt: "2026-12-01T00:00:00.000Z" } }).success, true);
  for (const settings of [{ maxResponses: 0 }, { maxResponses: 1.5 }, { closesAt: "tomorrow" }]) {
    assert.equal(formSchema.safeParse({ ...form, settings: { ...form.settings, ...settings } }).success, false);
  }
});
