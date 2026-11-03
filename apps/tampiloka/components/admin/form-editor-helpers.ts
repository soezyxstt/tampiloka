import type { FormSchema, Question } from "@/lib/forms/schema";

export const copy = <T,>(value: T): T => structuredClone(value);
export const uid = () => crypto.randomUUID();
export function move<T>(list: T[], from: number, to: number) {
  if (from < 0 || to < 0 || from >= list.length || to >= list.length || from === to) return;
  list.splice(to, 0, list.splice(from, 1)[0]);
}
export function cloneQuestion(q: Question): Question {
  return { ...copy(q), id: uid(), options: q.options.map(o => ({ ...o, id: uid() })), rows: q.rows.map(o => ({ ...o, id: uid() })), columns: q.columns.map(o => ({ ...o, id: uid() })) };
}

export function routingIssues(form: FormSchema): string[] {
  return form.sections.flatMap((section, index) => {
    const route = section.routing;
    if (!route) return [];
    const question = section.questions.find(q => q.id === route.questionId && (q.type === "single_choice" || q.type === "dropdown"));
    const targets = new Set(form.sections.slice(index + 1).map(s => s.id));
    return !question || Object.keys(route.choices).some(id => !question.options.some(o => o.id === id)) || Object.values(route.choices).some(id => !targets.has(id)) || (!!route.defaultSectionId && !targets.has(route.defaultSectionId)) ? [section.id] : [];
  });
}

export function repairRouting(form: FormSchema) {
  form.sections.forEach((section, index) => {
    const route = section.routing;
    if (!route) return;
    const question = section.questions.find(q => q.id === route.questionId && (q.type === "single_choice" || q.type === "dropdown"));
    if (!question) { delete section.routing; return; }
    const options = new Set(question.options.map(o => o.id));
    const targets = new Set(form.sections.slice(index + 1).map(s => s.id));
    for (const [option, target] of Object.entries(route.choices)) if (!options.has(option) || !targets.has(target)) delete route.choices[option];
    if (route.defaultSectionId && !targets.has(route.defaultSectionId)) delete route.defaultSectionId;
  });
}
