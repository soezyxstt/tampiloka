import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BrandInput, BrandTextarea } from "@/components/ui/form-controls";
import type { Question } from "@/lib/forms/schema";
import { AdminConfirmProvider } from "./admin-ui";
import { FormQuestionEditor } from "./form-question-editor";

const base: Question = { id:"phone",type:"phone",title:"Nomor WhatsApp",required:true,options:[],rows:[],columns:[],validation:{} };
function render(question: Question) {
  return renderToStaticMarkup(<AdminConfirmProvider><FormQuestionEditor question={question} formId="test" typeOptions={[{value:question.type,label:"Jenis"}]} change={() => {}} changeType={() => {}} actions={null} dragHandle={null} /></AdminConfirmProvider>);
}
test("editing a simple question keeps optional panels absent and names inline controls", () => {
  const html = render(base);
  assert.ok(html.includes('aria-label="Judul pertanyaan"'));
  assert.ok(html.includes('aria-label="Jenis pertanyaan"'));
  assert.equal((html.match(/<textarea/g) || []).length, 1);
  assert.ok(!html.includes("<img"));
  assert.ok(!html.includes('aria-label="Deskripsi pertanyaan"'));
  assert.ok(!html.includes('aria-label="Pesan kesalahan validasi"'));
  assert.ok(!html.includes("Ukuran maksimum"));
});
test("existing optional content stays editable without adding empty option image panels", () => {
  const html = render({...base,type:"single_choice",description:"Pilih satu.",imageAssetId:"question-image",options:[{id:"a",label:"Klasik"},{id:"b",label:"Modern",imageAssetId:"option-image"}]});
  assert.ok(html.includes('aria-label="Deskripsi pertanyaan"'));
  assert.equal((html.match(/<img/g) || []).length, 2);
  assert.ok(html.includes('aria-label="Pilihan 1"'));
  assert.ok(html.includes('aria-label="Pilihan 2"'));
  assert.ok(!html.includes("Pilih gambar"));
});
test("saved answer rules remain visible and retain custom error text", () => {
  const html = render({...base,type:"short_text",validation:{rule:{kind:"number",operator:"gt",value:5},message:"Masukkan lebih dari lima."}});
  assert.ok(html.includes('aria-label="Angka batas"'));
  assert.ok(html.includes("Masukkan lebih dari lima."));
  assert.ok(!html.includes("Panjang minimum"));
});

test("shared inline controls keep default fields unchanged and preserve native props", () => {
  const defaults = renderToStaticMarkup(<><BrandInput /><BrandTextarea /></>);
  assert.ok(defaults.includes("rounded-md"));
  assert.ok(defaults.includes("min-h-24"));
  assert.ok(!defaults.includes("field-sizing"));
  const inline = renderToStaticMarkup(<><BrandInput variant="inline" aria-label="Pilihan" disabled /><BrandTextarea variant="inline" rows={1} aria-label="Judul" /></>);
  assert.equal((inline.match(/field-sizing:content/g) || []).length, 2);
  assert.ok(inline.includes('disabled=""'));
  assert.ok(inline.includes('aria-label="Judul"'));
  assert.ok(!inline.includes('variant="inline"'));
});
