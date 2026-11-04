"use client";

import { useState, type ReactNode } from "react";
import { MoreHorizontal, Plus, X } from "lucide-react";
import { BrandInput, BrandTextarea, SelectField } from "@/components/ui/form-controls";
import type { Question } from "@/lib/forms/schema";
import { AdminIconButton } from "./admin-ui";
import { FormEditorImage } from "./form-editor-image";
import { FormValidationEditor } from "./form-validation-editor";
import { uid } from "./form-editor-helpers";

export function FormQuestionEditor({ question: q, formId, typeOptions, change, changeType, actions, dragHandle }: {
  question: Question; formId: string; typeOptions: { value: string; label: string }[];
  change: (update: (question: Question) => void) => void; changeType: (value: string) => void;
  actions: ReactNode; dragHandle: ReactNode;
}) {
  const [description, setDescription] = useState(false);
  const [validation, setValidation] = useState(false);
  const [bounds, setBounds] = useState(false);
  const hasBounds = Object.keys(q.validation).some(key => !["rule", "message"].includes(key));
  const choices = ["single_choice", "multiple_choice", "dropdown"].includes(q.type);
  const grid = ["multiple_choice_grid", "checkbox_grid"].includes(q.type);
  const customValidation = ["short_text", "long_text", "number", "email", "phone", "url"].includes(q.type);
  const fields: (readonly [keyof Question["validation"], string])[] = [
    ...(["short_text", "long_text", "email", "phone", "url"].includes(q.type) ? [["minLength", "Panjang minimum"], ["maxLength", "Panjang maksimum"]] as const : []),
    ...(["number", "linear_scale", "rating"].includes(q.type) ? [["min", "Nilai minimum"], ["max", "Nilai maksimum"]] as const : []),
    ...(["multiple_choice", "checkbox_grid"].includes(q.type) ? [["minSelections", "Pilihan minimum"], ["maxSelections", "Pilihan maksimum"]] as const : []),
    ...(q.type === "file" ? [["maxFileSize", "Ukuran maksimum (byte)"], ["maxFiles", "Jumlah berkas"]] as const : []),
  ];
  const image = <FormEditorImage formId={formId} label="Gambar pertanyaan" value={q.imageAssetId} onChange={asset => change(next => { if (asset) next.imageAssetId = asset; else delete next.imageAssetId; })} />;
  return <div className="form-editor__question-edit">
    <div className="form-editor__question-heading">
      <BrandTextarea rows={1} variant="inline" className="form-editor__question-title" aria-label="Judul pertanyaan" placeholder="Pertanyaan" value={q.title} maxLength={500} onChange={e => change(next => { next.title = e.target.value; })} />
      <div className="form-editor__question-type"><SelectField hideLabel id={`type-${q.id}`} label="Jenis pertanyaan" value={q.type} options={typeOptions} onChange={changeType} /></div>
      {!q.imageAssetId && image}
    </div>
    {(description || q.description) && <div className="form-editor__description-row"><BrandTextarea rows={1} variant="inline" className="form-editor__description" aria-label="Deskripsi pertanyaan" placeholder="Deskripsi (opsional)" value={q.description || ""} onChange={e => change(next => { next.description = e.target.value; })} /><AdminIconButton label="Hapus deskripsi" onClick={() => { change(next => { delete next.description; }); setDescription(false); }}><X size={16} /></AdminIconButton></div>}
    {q.imageAssetId && image}
    {(choices || grid) && <div className={grid ? "form-editor__grid-options" : "form-editor__options"}>
      {(grid ? ["rows", "columns"] as const : ["options"] as const).map(key => <fieldset key={key}>
        {grid && <legend>{key === "rows" ? "Baris" : "Kolom"}</legend>}
        {q[key].map((item, i) => <div key={item.id} className="form-editor__option">
          <span className={`form-editor__option-marker ${q.type === "multiple_choice" ? "is-square" : ""}`} aria-hidden="true">{grid ? `${i + 1}.` : ""}</span>
          <BrandInput variant="inline" aria-label={`${key === "options" ? "Pilihan" : key === "rows" ? "Baris" : "Kolom"} ${i + 1}`} value={item.label} placeholder="Pilihan" onChange={e => change(next => { const target = next[key].find(option => option.id === item.id); if (target) target.label = e.target.value; })} />
          {key === "options" && <FormEditorImage formId={formId} label={`Gambar pilihan ${i + 1}`} value={item.imageAssetId} onChange={asset => change(next => { const target = next.options.find(option => option.id === item.id); if (target) { if (asset) target.imageAssetId = asset; else delete target.imageAssetId; } })} />}
          <AdminIconButton label={`Hapus ${key === "options" ? "pilihan" : key === "rows" ? "baris" : "kolom"} ${i + 1}`} onClick={() => change(next => { next[key] = next[key].filter(option => option.id !== item.id); })}><X size={16} /></AdminIconButton>
        </div>)}
        <button className="form-editor__text-action" type="button" onClick={() => change(next => { next[key].push({ id: uid(), label: "" }); })}><Plus size={16} />Tambah {key === "options" ? "pilihan" : key === "rows" ? "baris" : "kolom"}</button>
      </fieldset>)}
      {choices && <label className="form-editor__check"><input type="checkbox" checked={q.allowOther || false} onChange={e => change(next => { next.allowOther = e.target.checked; })} />Jawaban lainnya</label>}
    </div>}
    {!choices && !grid && q.type !== "info" && <div className="form-editor__answer-hint">{({ long_text: "Jawaban panjang", file: "Unggah berkas", date: "Tanggal", time: "Waktu", datetime: "Tanggal dan waktu", linear_scale: `${q.validation.min ?? 1} — ${q.validation.max ?? 5}`, rating: `${q.validation.min ?? 1} — ${q.validation.max ?? 5}` } as Record<string, string>)[q.type] || "Jawaban singkat"}</div>}
    {(validation || q.validation.rule) && customValidation && <FormValidationEditor question={q} onRemove={() => { change(next => { delete next.validation.rule; }); setValidation(false); }} onChange={value => change(next => { next.validation = value; })} />}
    {(bounds || hasBounds || ["file", "linear_scale", "rating"].includes(q.type)) && <div className="form-editor__bounds">
      {fields.map(([key, label]) => <label key={key}><span>{label}</span><BrandInput type="number" value={String(q.validation[key] ?? "")} onChange={e => change(next => { const values = next.validation as Record<string, unknown>; if (e.target.value === "") delete values[key]; else values[key] = Number(e.target.value); })} /></label>)}
      {["date", "datetime"].includes(q.type) && (["minDate", "maxDate"] as const).map((key, i) => <label key={key}><span>{i ? "Tanggal maksimum" : "Tanggal minimum"}</span><BrandInput type={q.type === "datetime" ? "datetime-local" : "date"} value={q.validation[key] || ""} onChange={e => change(next => { if (e.target.value) next.validation[key] = e.target.value; else delete next.validation[key]; })} /></label>)}
      {q.type === "file" && <label className="form-editor__wide"><span>Jenis berkas (pisahkan dengan koma)</span><BrandInput defaultValue={(q.validation.allowedTypes || []).join(", ")} onBlur={e => change(next => { next.validation.allowedTypes = e.target.value.split(",").map(value => value.trim()).filter(Boolean); })} /></label>}
      {!(validation || q.validation.rule) && <label className="form-editor__wide"><span>Pesan kesalahan</span><BrandInput value={q.validation.message || ""} onChange={e => change(next => { next.validation.message = e.target.value; })} /></label>}
    </div>}
    <footer className="form-editor__item-footer">
      {dragHandle}
      <div className="form-editor__item-footer-actions">
        {q.type !== "info" && <label className="form-editor__check"><input type="checkbox" checked={q.required} onChange={e => change(next => { next.required = e.target.checked; })} />Wajib diisi</label>}
        {actions}
        <details className="form-editor__more"><summary aria-label="Opsi pertanyaan"><MoreHorizontal size={18} /><span className="sr-only">Opsi pertanyaan</span></summary><div>
          <button type="button" onClick={e => { setDescription(true); e.currentTarget.closest("details")?.removeAttribute("open"); }}>Tambahkan deskripsi</button>
          {customValidation && <button type="button" onClick={e => { setValidation(true); e.currentTarget.closest("details")?.removeAttribute("open"); }}>{validation || q.validation.rule ? "Validasi jawaban" : "Tampilkan validasi jawaban"}</button>}
          {q.type !== "info" && <button type="button" onClick={e => { setBounds(true); e.currentTarget.closest("details")?.removeAttribute("open"); }}>Batas jawaban</button>}
        </div></details>
      </div>
    </footer>
  </div>;
}
