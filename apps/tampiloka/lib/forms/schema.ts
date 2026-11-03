import { z } from "zod";

export const questionTypes = ["short_text", "long_text", "single_choice", "multiple_choice", "dropdown", "number", "email", "phone", "url", "date", "time", "datetime", "file", "linear_scale", "rating", "multiple_choice_grid", "checkbox_grid", "info"] as const;
const id = z.string().min(1).max(100).regex(/^[A-Za-z0-9_-]+$/).refine(value => !["__proto__", "prototype", "constructor"].includes(value));
const text = z.string().max(10000);
const option = z.object({ id, label: z.string().max(500), imageAssetId: id.optional() }).strict();
const validation = z.object({
  minLength: z.number().int().min(0).max(10000).optional(), maxLength: z.number().int().min(0).max(10000).optional(),
  min: z.number().finite().optional(), max: z.number().finite().optional(),
  minSelections: z.number().int().min(0).max(100).optional(), maxSelections: z.number().int().min(0).max(100).optional(),
  minDate: z.string().max(30).optional(), maxDate: z.string().max(30).optional(),
  allowedTypes: z.array(z.string().min(1).max(100)).max(50).optional(), maxFileSize: z.number().int().positive().max(100_000_000).optional(), maxFiles: z.number().int().positive().max(20).optional(),
  message: z.string().max(500).optional(),
}).strict().default({});
const questionSchema = z.object({
  id, type: z.enum(questionTypes), title: z.string().max(500), description: text.optional(), required: z.boolean().default(false),
  options: z.array(option).max(100).default([]), rows: z.array(option).max(100).default([]), columns: z.array(option).max(100).default([]),
  validation, imageAssetId: id.optional(), allowOther: z.boolean().optional(),
}).strict();
const sectionSchema = z.object({
  id, title: z.string().max(500), description: text.default(""), questions: z.array(questionSchema).max(100),
  routing: z.object({ questionId: id, choices: z.record(z.string(), id), defaultSectionId: id.optional() }).strict().optional(),
}).strict();
const baseFormSchema = z.object({
  title: z.string().max(500), description: text.default(""), welcomeText: text.default(""), headerAssetId: id.optional(), logoAssetId: id.optional(),
  sections: z.array(sectionSchema).min(1).max(50),
  settings: z.object({ confirmationMessage: text.default("Terima kasih, jawaban Anda telah diterima."), accent: z.string().max(100).default("default"), background: z.string().max(100).default("default"), maxResponses: z.number().int().positive().max(1_000_000).optional(), closesAt: z.string().datetime().optional() }).strict(),
}).strict();
export type Question = z.output<typeof questionSchema>;
export type Section = z.output<typeof sectionSchema>;
export type FormSchema = z.output<typeof baseFormSchema>;
export type AnswerValue = string | number | string[] | Record<string, string | string[]>;
export type AnswerMap = Record<string, AnswerValue>;

export const formSchema = baseFormSchema.superRefine((form, ctx) => {
  const ids = new Set<string>();
  const add = (value: string, path: (string | number)[]) => { if (ids.has(value)) ctx.addIssue({ code: "custom", path, message: "ID harus unik." }); ids.add(value); };
  form.sections.forEach((section, si) => {
    add(section.id, ["sections", si, "id"]);
    section.questions.forEach((q, qi) => {
      const path = ["sections", si, "questions", qi] as (string | number)[];
      add(q.id, [...path, "id"]);
      for (const key of ["options", "rows", "columns"] as const) q[key].forEach((item, i) => add(item.id, [...path, key, i, "id"]));
      const v = q.validation;
      for (const [min, max] of [[v.min, v.max], [v.minLength, v.maxLength], [v.minSelections, v.maxSelections]]) {
        if (min !== undefined && max !== undefined && min > max) ctx.addIssue({ code: "custom", path: [...path, "validation"], message: "Batas minimum melebihi maksimum." });
      }
    });
    if (section.routing) {
      const route = section.routing;
      const question = section.questions.find(q => q.id === route.questionId && (q.type === "single_choice" || q.type === "dropdown"));
      const targets = [...Object.values(route.choices), ...(route.defaultSectionId ? [route.defaultSectionId] : [])];
      if (!question || Object.keys(route.choices).some(key => !question.options.some(o => o.id === key)) || targets.some(target => !form.sections.slice(si + 1).some(s => s.id === target))) {
        ctx.addIssue({ code: "custom", path: ["sections", si, "routing"], message: "Aturan percabangan tidak valid." });
      }
    }
  });
});

export function getVisibleSections(schema: FormSchema, answers: AnswerMap): Section[] {
  const visible: Section[] = [];
  let index = 0;
  while (index < schema.sections.length) {
    const section = schema.sections[index]; visible.push(section);
    const route = section.routing;
    const answer = route && answers[route.questionId];
    const target = route && ((typeof answer === "string" && Object.hasOwn(route.choices, answer) ? route.choices[answer] : undefined) || route.defaultSectionId);
    const next = target ? schema.sections.findIndex((s, i) => i > index && s.id === target) : -1;
    index = next >= 0 ? next : index + 1;
  }
  return visible;
}

export function createBlankForm(): FormSchema {
  return { title: "Formulir baru", description: "", welcomeText: "", sections: [{ id: crypto.randomUUID(), title: "", description: "", questions: [] }], settings: { confirmationMessage: "Terima kasih, jawaban Anda telah diterima.", accent: "default", background: "default" } };
}
export function weddingTemplate(): FormSchema {
  const form = createBlankForm(); form.title = "Data undangan pernikahan";
  const questions: [Question["type"], string, boolean][] = [["short_text", "Nama mempelai pertama", true], ["short_text", "Nama mempelai kedua", true], ["datetime", "Tanggal dan waktu acara", true], ["long_text", "Lokasi acara", true], ["long_text", "Ucapan dan catatan", false], ["file", "Foto untuk undangan", false], ["file", "Berkas pendukung", false]];
  form.sections[0].questions = questions.map(([type, title, required]) => ({ id: crypto.randomUUID(), type, title, required, options: [], rows: [], columns: [], validation: {} }));
  form.sections[0].questions[5].validation = { maxFiles: 10, allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"] };
  form.sections[0].questions[6].validation = { maxFiles: 5, allowedTypes: ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/gif"] };
  return form;
}

export function normalizeSlug(value: string): string { return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
const reservedSlugs = new Set(["admin", "api", "new", "edit", "settings", "responses", "login", "logout", "null", "undefined"]);
export function isValidSlug(value: string): boolean { return value.length >= 3 && value.length <= 80 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && !reservedSlugs.has(value); }

/** Returns only visible, validated answers; file IDs still require storage ownership checks. */
export function validateAnswers(schema: FormSchema, input: unknown): { success: boolean; answers: AnswerMap; fieldErrors: Record<string, string> } {
  const answers: AnswerMap = {};
  const fieldErrors: Record<string, string> = {};
  if (!input || typeof input !== "object" || Array.isArray(input)) return { success: false, answers, fieldErrors: { _form: "Jawaban tidak valid." } };
  const raw = input as Record<string, unknown>;
  const sections = getVisibleSections(schema, raw as AnswerMap);
  const allQuestions = new Map(schema.sections.flatMap(s => s.questions).map(q => [q.id, q]));
  if (Object.keys(raw).length > allQuestions.size || Object.keys(raw).some(key => !allQuestions.has(key))) fieldErrors._form = "Jawaban tidak dikenal.";
  const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value + "T00:00:00Z")) && new Date(value + "T00:00:00Z").toISOString().slice(0, 10) === value;
  const validTime = (value: string) => /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value);
  for (const q of sections.flatMap(s => s.questions)) {
    const value = Object.hasOwn(raw, q.id) ? raw[q.id] : undefined;
    if (q.type === "info") { if (value !== undefined) fieldErrors[q.id] = "Blok informasi tidak menerima jawaban."; continue; }
    const empty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
    if (empty) { if (q.required) fieldErrors[q.id] = q.validation.message || "Pertanyaan ini wajib diisi."; continue; }
    let valid = false;
    const v = q.validation;
    const ids = q.options.map(o => o.id);
    const choice = (item: unknown) => typeof item === "string" && (ids.includes(item) || (q.allowOther === true && item.startsWith("other:") && item.slice(6).trim().length > 0 && item.length <= 506));
    const list = (item: unknown, allowed: string[]) => Array.isArray(item) && item.length <= 100 && item.every(x => typeof x === "string" && allowed.includes(x)) && new Set(item).size === item.length;
    if (["short_text", "long_text", "email", "phone", "url", "date", "time", "datetime"].includes(q.type) && typeof value === "string") {
      valid = value.length <= 10000 && value.trim().length > 0 && value.length >= (v.minLength ?? 0) && value.length <= (v.maxLength ?? 10000);
      if (q.type === "email") valid &&= z.string().email().max(320).safeParse(value).success;
      if (q.type === "phone") valid &&= /^[+\d() .-]{3,40}$/.test(value);
      if (q.type === "url") { try { const url = new URL(value); valid &&= ["http:", "https:"].includes(url.protocol); } catch { valid = false; } }
      if (q.type === "date") valid &&= validDate(value);
      if (q.type === "time") valid &&= validTime(value);
      if (q.type === "datetime") { const parts = value.split("T"); valid &&= parts.length === 2 && validDate(parts[0]) && validTime(parts[1]); }
      if (["date", "datetime"].includes(q.type)) valid &&= (!v.minDate || value >= v.minDate) && (!v.maxDate || value <= v.maxDate);
    } else if (["number", "linear_scale", "rating"].includes(q.type)) {
      valid = typeof value === "number" && Number.isFinite(value) && (v.min === undefined || value >= v.min) && (v.max === undefined || value <= v.max);
      if (q.type !== "number") valid &&= Number.isInteger(value) && (value as number) >= (v.min ?? 1) && (value as number) <= (v.max ?? 5);
    } else if (q.type === "single_choice" || q.type === "dropdown") valid = choice(value);
    else if (q.type === "multiple_choice") valid = Array.isArray(value) && value.length <= 100 && value.every(choice) && new Set(value).size === value.length && value.filter(x => typeof x === "string" && x.startsWith("other:")).length <= 1 && value.length >= (v.minSelections ?? 0) && value.length <= (v.maxSelections ?? 100);
    else if (q.type === "file") valid = Array.isArray(value) && value.length <= (v.maxFiles ?? 1) && value.every(x => typeof x === "string" && id.safeParse(x).success) && new Set(value).size === value.length;
    else if (q.type === "multiple_choice_grid" || q.type === "checkbox_grid") {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const grid = value as Record<string, unknown>;
        const rows = q.rows.map(r => r.id), columns = q.columns.map(c => c.id);
        valid = Object.keys(grid).length <= rows.length && Object.entries(grid).every(([row, selection]) => rows.includes(row) && (q.type === "multiple_choice_grid" ? typeof selection === "string" && columns.includes(selection) : list(selection, columns) && (selection as string[]).length > 0));
        if (q.type === "checkbox_grid") valid &&= Object.values(grid).every(selection => Array.isArray(selection) && selection.length >= (v.minSelections ?? 0) && selection.length <= (v.maxSelections ?? columns.length));
        if (q.required) valid &&= rows.length > 0 && rows.every(row => Object.hasOwn(grid, row));
      }
    }
    if (valid) answers[q.id] = value as AnswerValue;
    else fieldErrors[q.id] = v.message || "Jawaban tidak valid.";
  }
  return { success: Object.keys(fieldErrors).length === 0, answers, fieldErrors };
}
