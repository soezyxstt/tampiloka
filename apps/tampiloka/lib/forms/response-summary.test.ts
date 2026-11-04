import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { summarizeQuestion, answered, answerLabel, type Submission } from "./response-summary";
import { createBlankForm, type Question } from "./schema";
const q = (type: Question["type"]): Question => ({ id: "q", title: "Question", type, required: false, options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], rows: [{ id: "r", label: "Row" }], columns: [{ id: "c", label: "Column" }, { id: "d", label: "Other column" }], validation: {} });
const row = (revisionId: string, value: unknown): Submission => ({ id: `response-${revisionId}`, createdAt: "2026-11-04T00:00:00Z", status: "active", revisionId, revisionNumber: Number(revisionId), revisionSchema: createBlankForm(), answers: { q: value } });
describe("response summaries", () => {
  it("uses respondents as denominator and separates revisions and other answers", () => {
    const summary = summarizeQuestion([row("1", ["a", "b"]), row("1", ["a", "other:Hello"]), row("1", []), row("2", ["b"])], "1", q("multiple_choice"));
    assert.equal(summary.answered, 2);
    assert.deepEqual(summary.chart, [{ label: "A", count: 2 }, { label: "B", count: 1 }, { label: "Lainnya: Hello", count: 1 }]);
  });
  it("counts grid rows separately using column ids", () => {
    const summary = summarizeQuestion([row("1", { r: ["c", "d"] }), row("1", { r: ["c"] }), row("1", {})], "1", q("checkbox_grid"));
    assert.deepEqual(summary.grid, [{ label: "Row", answered: 2, bars: [{ label: "Column", count: 2 }, { label: "Other column", count: 1 }] }]);
  });
  it("preserves zero and excludes missing or empty values", () => {
    assert.equal(answered(0), true); assert.equal(answered([]), false); assert.equal(answered({ r: [] }), false);
    assert.equal(answerLabel(0), "0");
    assert.equal(summarizeQuestion([row("1", 0), row("1", ""), row("1", undefined)], "1", q("number")).answered, 1);
  });
});
