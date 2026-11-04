import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { FormRenderer } from "./form-renderer";
import { FileUpload } from "./file-upload";
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
    schema.settings.accent = "#ffff00";
    const lightAccent = renderToStaticMarkup(<FormRenderer schema={schema} preview />);
    assert.ok(lightAccent.includes("--form-accent:#ffff00"));
    assert.ok(lightAccent.includes("--form-action-ink:#000000"));
    assert.ok(lightAccent.includes("bg-[var(--form-accent,#15803d)]"));
    assert.ok(lightAccent.includes("focus-visible:outline-[#166534]"));
    schema.settings.background = "url(https://example.com)";
    assert.ok(!renderToStaticMarkup(<FormRenderer schema={schema} preview />).includes("example.com"));
  });
  test("upload picker shows only supported configured formats and limits", () => {
    const question: Question = { id: "file", type: "file", title: "Berkas", required: false, options: [], rows: [], columns: [], validation: { allowedTypes: [".pdf", "image/png"], maxFiles: 2, maxFileSize: 5 * 1024 * 1024 } };
    const html = renderToStaticMarkup(<FileUpload question={question} items={[]} setItems={() => {}} slug="test" revisionId="revision" uploadSessionId="session" value={[]} onChange={() => {}} onUploadingChange={() => {}} id="question-file" />);
    assert.ok(html.includes('accept=".pdf,image/png"'));
    assert.ok(html.includes("PNG, PDF. Maksimum 5 MB per berkas, 2 berkas."));
    assert.ok(html.includes("Pilih berkas"));
    assert.ok(!html.includes("JPEG"));
  });

});
