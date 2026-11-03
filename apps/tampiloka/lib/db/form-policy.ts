import type { FormSchema } from "../forms/schema";

export function validateForPublish(schema: FormSchema): string[] {
  const errors: string[] = [];
  if (!schema.title.trim()) errors.push("Form title is required");
  for (const section of schema.sections) for (const q of section.questions) {
    if (!q.title.trim()) errors.push(`Question ${q.id} needs a title`);
    const choices = ["single_choice", "multiple_choice", "dropdown"].includes(q.type);
    const grid = ["multiple_choice_grid", "checkbox_grid"].includes(q.type);
    if (choices && (!q.options.length || q.options.some(o => !o.label.trim()))) errors.push(`Question ${q.id} needs labeled choices`);
    if (grid && (!q.rows.length || !q.columns.length || [...q.rows, ...q.columns].some(o => !o.label.trim()))) errors.push(`Question ${q.id} needs labeled rows and columns`);
    const v = q.validation;
    if (choices && (v.minSelections !== undefined && v.minSelections > q.options.length + (q.allowOther ? 1 : 0) || v.maxSelections !== undefined && v.maxSelections < (q.required ? 1 : 0))) errors.push(`Question ${q.id} has unusable selection limits`);
    if (["rating", "linear_scale"].includes(q.type) && (!Number.isInteger(v.min ?? 1) || !Number.isInteger(v.max ?? 5) || (v.min ?? 1) > (v.max ?? 5) || (v.max ?? 5) - (v.min ?? 1) > 100)) errors.push(`Question ${q.id} has unusable scale limits`);
    if (v.minDate && v.maxDate && v.minDate > v.maxDate) errors.push(`Question ${q.id} has unusable date limits`);
    if (v.maxLength === 0 && q.required) errors.push(`Question ${q.id} has an unusable length limit`);
  }
  return errors;
}
export function referencedAssets(schema: FormSchema): string[] {
  return [...new Set([schema.headerAssetId, schema.logoAssetId, ...schema.sections.flatMap(s => s.questions.flatMap(q => [q.imageAssetId, ...q.options.map(o => o.imageAssetId)]))].filter((x): x is string => !!x))];
}

export function sameCanonicalAnswers(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((item, i) => sameCanonicalAnswers(item, b[i]));
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
  const left = a as Record<string, unknown>, right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  return keys.length === Object.keys(right).length && keys.every(key => Object.hasOwn(right, key) && sameCanonicalAnswers(left[key], right[key]));
}
export function lifecycleStatus(status: string, action: string, hasRevision: boolean): string | null {
  if (status === "deleted") return null;
  if (action === "publish") return "published";
  if (action === "close" && status === "published") return "closed";
  if (action === "reopen" && status === "closed" && hasRevision) return "published";
  if (action === "archive") return "archived";
  if (action === "delete") return "deleted";
  return null;
}

export function responseLimitReached(settings: { maxResponses?: number; closesAt?: string }, count: number, now = Date.now()): boolean {
  return (settings.maxResponses !== undefined && count >= settings.maxResponses) || (settings.closesAt !== undefined && Date.parse(settings.closesAt) <= now);
}
