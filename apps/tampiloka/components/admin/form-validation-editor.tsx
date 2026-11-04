"use client";

import { BrandInput, SelectField } from "@/components/ui/form-controls";
import type { Question } from "@/lib/forms/schema";

type Rule = NonNullable<Question["validation"]["rule"]>;
const options: Record<Rule["kind"], { value: string; label: string }[]> = {
  number: [["gt", "Lebih dari"], ["gte", "Minimal"], ["lt", "Kurang dari"], ["lte", "Maksimal"], ["eq", "Sama dengan"], ["neq", "Tidak sama dengan"], ["between", "Di antara"], ["not_between", "Di luar rentang"], ["is_number", "Angka"], ["whole", "Bilangan bulat"]].map(([value, label]) => ({ value, label })),
  length: [{ value: "min", label: "Panjang minimal" }, { value: "max", label: "Panjang maksimal" }],
  text: [{ value: "contains", label: "Mengandung" }, { value: "not_contains", label: "Tidak mengandung" }, { value: "email", label: "Email" }, { value: "url", label: "URL" }],
  regex: [{ value: "matches", label: "Cocok dengan pola" }, { value: "not_matches", label: "Tidak cocok dengan pola" }],
};
const defaults: Record<Rule["kind"], Rule> = {
  number: { kind: "number", operator: "gt", value: 0 },
  length: { kind: "length", operator: "min", value: 0 },
  text: { kind: "text", operator: "email" },
  regex: { kind: "regex", operator: "matches", value: "^.$" },
};

export function FormValidationEditor({ question, onChange }: { question: Question; onChange: (validation: Question["validation"]) => void }) {
  const rule = question.validation.rule;
  const setRule = (next?: Rule) => onChange({ ...question.validation, rule: next });
  const prefix = `validation-${question.id}`;
  return <fieldset>
    <legend>Validasi jawaban</legend>
    <SelectField id={`${prefix}-kind`} label="Jenis validasi" value={rule?.kind ?? "none"} options={[
      { value: "none", label: "Tidak ada" }, { value: "number", label: "Angka" },
      ...(question.type === "number" ? [] : [{ value: "length", label: "Panjang teks" }, { value: "text", label: "Teks" }, { value: "regex", label: "Pola regex" }]),
    ]} onChange={value => setRule(value === "none" ? undefined : defaults[value as Rule["kind"]])} />
    {rule && <>
      <SelectField id={`${prefix}-operator`} label="Ketentuan" value={rule.operator} options={options[rule.kind]} onChange={operator => {
        if (rule.kind === "number") setRule({ ...rule, operator: operator as typeof rule.operator, value: rule.value ?? 0, secondValue: Math.max(rule.secondValue ?? rule.value ?? 0, rule.value ?? 0) });
        else if (rule.kind === "length") setRule({ ...rule, operator: operator as typeof rule.operator });
        else if (rule.kind === "text") setRule({ ...rule, operator: operator as typeof rule.operator, value: rule.value || "teks" });
        else setRule({ ...rule, operator: operator as typeof rule.operator });
      }} />
      {rule.kind === "number" && !["is_number", "whole"].includes(rule.operator) && <label>Angka batas<BrandInput type="number" value={rule.value ?? ""} onChange={e => setRule({ ...rule, value: e.target.value === "" ? undefined : Number(e.target.value) })} /></label>}
      {rule.kind === "number" && ["between", "not_between"].includes(rule.operator) && <label>Batas atas<BrandInput type="number" value={rule.secondValue ?? ""} onChange={e => setRule({ ...rule, secondValue: e.target.value === "" ? undefined : Number(e.target.value) })} /></label>}
      {rule.kind === "length" && <label>Jumlah karakter<BrandInput type="number" min={0} max={10000} value={rule.value} onChange={e => setRule({ ...rule, value: Number(e.target.value) })} /></label>}
      {rule.kind === "text" && ["contains", "not_contains"].includes(rule.operator) && <label>Teks<BrandInput value={rule.value ?? ""} maxLength={500} onChange={e => setRule({ ...rule, value: e.target.value })} /></label>}
      {rule.kind === "regex" && <><label>Pola regex<BrandInput value={rule.value} maxLength={100} onChange={e => setRule({ ...rule, value: e.target.value })} /></label><p className="type-caption">Gunakan pola sederhana tanpa grup atau alternatif, dengan paling banyak satu pengulangan (*, +, atau ?). Jawaban dibatasi 1.000 karakter.</p></>}
      <label>Pesan kesalahan<BrandInput value={question.validation.message ?? ""} maxLength={500} onChange={e => onChange({ ...question.validation, message: e.target.value })} /></label>
    </>}
  </fieldset>;
}
