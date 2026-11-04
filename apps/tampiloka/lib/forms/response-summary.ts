import type { FormSchema, Question } from "./schema";

export type Submission = { id: string; createdAt: string; status: string; answers: Record<string, unknown>; revisionId: string; revisionNumber: number; revisionSchema: FormSchema };
export const questions = (schema?: FormSchema): Question[] => schema?.sections.flatMap(section => section.questions).filter(q => q.type !== "info") ?? [];
export function answered(value: unknown): boolean {
  if (value == null || value === "") return false;
  if (Array.isArray(value)) return value.some(answered);
  if (typeof value === "object") return Object.values(value).some(answered);
  return true;
}
export function answerLabel(value: unknown, q?: Question): string {
  if (!answered(value)) return "Tidak dijawab";
  if (Array.isArray(value)) return value.map(v => answerLabel(v, q)).join(", ");
  if (typeof value === "object" && value !== null) return Object.entries(value).filter(([, v]) => answered(v)).map(([key, v]) => `${q?.rows.find(r => r.id === key)?.label ?? key}: ${answerLabel(v, q)}`).join("; ");
  if (typeof value === "string" && value.startsWith("other:") && q && ["single_choice", "multiple_choice", "dropdown"].includes(q.type)) return `Lainnya: ${value.slice(6)}`;
  return q?.options.find(o => o.id === value)?.label ?? q?.columns.find(o => o.id === value)?.label ?? String(value);
}
export type Bar = { label: string; count: number };
function bars(values: unknown[], choices: { id: string; label: string }[], q: Question): Bar[] {
  const counts = new Map<string, number>();
  for (const value of values) for (const item of (Array.isArray(value) ? value : [value])) {
    const key = String(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const result = choices.map(choice => ({ label: choice.label, count: counts.get(choice.id) ?? 0 }));
  for (const [key, count] of counts) if (!choices.some(choice => choice.id === key)) result.push({ label: answerLabel(key, q), count });
  return result;
}
export function summarizeQuestion(rows: Submission[], revisionId: string, q: Question) {
  const values = rows.filter(row => row.revisionId === revisionId).map(row => row.answers[q.id]).filter(answered);
  const grid = q.type === "multiple_choice_grid" || q.type === "checkbox_grid";
  const chart = ["single_choice", "multiple_choice", "dropdown", "linear_scale", "rating"].includes(q.type);
  const choices = q.type === "linear_scale" || q.type === "rating"
    ? Array.from({ length: Math.min(100, Math.max(0, (q.validation.max ?? 5) - (q.validation.min ?? 1) + 1)) }, (_, i) => ({ id: String(i + (q.validation.min ?? 1)), label: String(i + (q.validation.min ?? 1)) }))
    : q.options;
  return {
    answered: values.length,
    values,
    chart: chart ? bars(values, choices, q) : null,
    grid: grid ? q.rows.map(row => {
      const selections = values.map(value => (value as Record<string, unknown>)[row.id]).filter(answered);
      return { label: row.label, answered: selections.length, bars: bars(selections, q.columns, q) };
    }) : null,
  };
}
