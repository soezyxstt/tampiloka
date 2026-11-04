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

test("custom rules validate answers while preserving old definitions", () => {
  const form = createBlankForm(); const q = question("short_text", "q"); form.sections[0].questions = [q];
  assert.equal(formSchema.safeParse(form).success, true);
  const cases: [NonNullable<Question["validation"]["rule"]>, string, string][] = [
    [{ kind: "number", operator: "gt", value: 5 }, "6", "5"],
    [{ kind: "number", operator: "gte", value: 5 }, "5", "4"],
    [{ kind: "number", operator: "lt", value: 5 }, "4", "5"],
    [{ kind: "number", operator: "lte", value: 5 }, "5", "6"],
    [{ kind: "number", operator: "eq", value: 5 }, "5", "6"],
    [{ kind: "number", operator: "neq", value: 5 }, "6", "5"],
    [{ kind: "number", operator: "between", value: 1, secondValue: 3 }, "3", "4"],
    [{ kind: "number", operator: "not_between", value: 1, secondValue: 3 }, "4", "3"],
    [{ kind: "number", operator: "whole" }, "-2", "2.5"],
    [{ kind: "number", operator: "is_number" }, "2.5", "word"],
    [{ kind: "length", operator: "min", value: 3 }, "abc", "ab"],
    [{ kind: "length", operator: "max", value: 3 }, "abc", "abcd"],
    [{ kind: "text", operator: "contains", value: "abc" }, "abcd", "xyz"],
    [{ kind: "text", operator: "not_contains", value: "abc" }, "xyz", "abcd"],
    [{ kind: "text", operator: "email" }, "a@example.com", "wrong"],
    [{ kind: "text", operator: "url" }, "https://example.com", "javascript:alert(1)"],
    [{ kind: "regex", operator: "matches", value: "^[0-9]+$" }, "123", "abc"],
    [{ kind: "regex", operator: "not_matches", value: "^[0-9]+$" }, "abc", "123"],
  ];
  for (const [rule, good, bad] of cases) {
    q.validation = { rule, message: "Coba lagi" };
    assert.equal(formSchema.safeParse(form).success, true, JSON.stringify(rule));
    assert.equal(validateAnswers(form, { q: good }).success, true, JSON.stringify(rule));
    assert.equal(validateAnswers(form, { q: bad }).fieldErrors.q, "Coba lagi", JSON.stringify(rule));
  }
  q.required = false;
  assert.equal(validateAnswers(form, {}).success, true);
  q.validation = { rule: { kind: "regex", operator: "matches", value: "^a+$" } };
  assert.equal(validateAnswers(form, { q: "a".repeat(1001) }).success, false);
  q.type = "number"; q.validation = { rule: { kind: "number", operator: "gte", value: 5 } };
  assert.equal(validateAnswers(form, { q: 5 }).success, true);
  assert.equal(validateAnswers(form, { q: 4 }).success, false);
});

test("invalid and unsafe rules are rejected before saving", () => {
  const form = createBlankForm(); const q = question("short_text", "q"); form.sections[0].questions = [q];
  for (const rule of [
    { kind: "number", operator: "between", value: 5, secondValue: 1 },
    { kind: "number", operator: "gt" },
    { kind: "text", operator: "contains", value: "" },
    { kind: "regex", operator: "matches", value: "(a+)+$" },
    { kind: "regex", operator: "matches", value: "a*a*" },
    { kind: "regex", operator: "matches", value: "[" },
  ]) {
    assert.equal(formSchema.safeParse({ ...form, sections: [{ ...form.sections[0], questions: [{ ...q, validation: { rule } }] }] }).success, false, JSON.stringify(rule));
  }
  q.type = "single_choice"; q.validation = { rule: { kind: "number", operator: "whole" } };
  assert.equal(formSchema.safeParse(form).success, false);
});
