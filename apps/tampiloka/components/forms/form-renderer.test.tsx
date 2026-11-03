import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { FormRenderer } from "./form-renderer";
import { createBlankForm, type Question } from "@/lib/forms/schema";

describe("public form renderer", () => {
  test("labels required questions and keeps preview from offering a real submit", () => {
    const schema = createBlankForm();
    schema.sections[0].questions.push({ id: "name", type: "short_text", title: "Nama", required: true, options: [], rows: [], columns: [], validation: {} });
    const html = renderToStaticMarkup(<FormRenderer schema={schema} preview />);
    assert.ok(html.includes('for="question-name"'));
    assert.ok(html.includes('aria-required="true"'));
    assert.ok(html.includes("Selesai pratinjau"));
    assert.ok(!html.includes("Kirim jawaban"));
  });
  test("renders each question type with its prompt", () => {
    const schema = createBlankForm();
    const types: Question["type"][] = ["short_text", "long_text", "single_choice", "multiple_choice", "dropdown", "number", "email", "phone", "url", "date", "time", "datetime", "file", "linear_scale", "rating", "multiple_choice_grid", "checkbox_grid", "info"];
    schema.sections[0].questions = types.map((type, i) => ({ id: `q${i}`, type, title: `Pertanyaan ${i}`, required: false, options: [{ id: `o${i}`, label: "Pilihan" }], rows: [{ id: `r${i}`, label: "Baris" }], columns: [{ id: `c${i}`, label: "Kolom" }], validation: {} }));
    const html = renderToStaticMarkup(<FormRenderer schema={schema} preview />);
    for (let i = 0; i < types.length; i++) assert.ok(html.includes(`Pertanyaan ${i}`));
    assert.ok(html.includes('type="datetime-local"'));
    assert.ok(html.includes("Baris"));
  });
  test("renders safe color settings and a bot trap", () => {
    const schema = createBlankForm();
    schema.settings.accent = "#112233";
    schema.settings.background = "#000000";
    const html = renderToStaticMarkup(<FormRenderer schema={schema} preview />);
    assert.ok(html.includes("background-color:#000000"));
    assert.ok(html.includes("color:#ffffff"));
    assert.ok(html.includes('name="website"'));
    schema.settings.background = "url(https://example.com)";
    assert.ok(!renderToStaticMarkup(<FormRenderer schema={schema} preview />).includes("example.com"));
  });
});
