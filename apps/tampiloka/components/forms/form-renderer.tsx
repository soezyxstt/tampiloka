"use client";

import { useRef, useState, type CSSProperties } from "react";
import "./respondent-form.css";
import { FileUpload, type UploadItem } from "@/components/forms/file-upload";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandInput, BrandTextarea, BrandChoiceInput } from "@/components/ui/form-controls";
import { getVisibleSections, validateAnswers, type AnswerMap, type AnswerValue, type FormSchema, type Question } from "@/lib/forms/schema";

type Props = { schema: FormSchema; slug?: string; revisionId?: string; preview?: boolean };
type Payload = { revisionId: string; answers: AnswerMap; idempotencyKey: string; uploadSessionId: string; honeypot: string };

function QuestionControl({ question: q, value, set, error, slug, revisionId, uploadSessionId, preview, onUploadingChange, items, setItems }: { question: Question; value: AnswerValue | undefined; set: (value: AnswerValue) => void; error?: string; slug?: string; revisionId?: string; uploadSessionId: string; preview: boolean; onUploadingChange: (value: boolean) => void; items: UploadItem[]; setItems: React.Dispatch<React.SetStateAction<UploadItem[]>> }) {
  const id = `question-${q.id}`;
  const described = [q.description && `${id}-description`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const common = { id, "aria-describedby": described, "aria-invalid": !!error, "aria-required": q.required };
  const textValue = typeof value === "string" ? value : "";
  const list = Array.isArray(value) ? value : [];
  const other = q.type === "multiple_choice" ? list.find(item => item.startsWith("other:")) : textValue.startsWith("other:") ? textValue : undefined;
  const setOther = (text: string) => set(q.type === "multiple_choice" ? [...list.filter(item => !item.startsWith("other:")), `other:${text}`] : `other:${text}`);
  const grid = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const updateList = (current: string[], option: string, checked: boolean) => checked ? [...current, option] : current.filter(item => item !== option);
  const optionImage = (assetId?: string) => assetId ? <img src={`/api/forms/assets/${encodeURIComponent(assetId)}`} alt="" className="max-h-32 max-w-full object-contain" /> : null;
  return <section className="respondent-question space-y-3" data-invalid={!!error} id={`${id}-container`}>
    {q.type === "info" ? <h3 className="type-heading-4">{q.title}</h3> : <label htmlFor={id} className="type-label-lg block">{q.title}{q.required && <span className="respondent-required" aria-label=" wajib diisi"> *</span>}</label>}
    {q.description && <p id={`${id}-description`} className="type-body text-muted-foreground whitespace-pre-wrap">{q.description}</p>}
    {q.imageAssetId && optionImage(q.imageAssetId)}
    {q.type === "long_text" && <BrandTextarea {...common} value={textValue} onChange={e => set(e.target.value)} />}
    {["short_text", "number", "email", "phone", "url", "date", "time", "datetime"].includes(q.type) && <BrandInput {...common} type={({ short_text: "text", phone: "tel", datetime: "datetime-local" } as Record<string, string>)[q.type] ?? q.type} value={typeof value === "number" ? value : textValue} min={q.validation.minDate ?? q.validation.min} max={q.validation.maxDate ?? q.validation.max} minLength={q.validation.minLength} maxLength={q.validation.maxLength} onChange={e => set(q.type === "number" && e.target.value !== "" ? Number(e.target.value) : e.target.value)} />}
    {q.type === "dropdown" && <Select value={other !== undefined ? "__other" : textValue || null} onValueChange={v => { if (v === "__other") setOther(""); else if (v) set(v); }}><SelectTrigger {...common} className="min-h-11 w-full"><SelectValue placeholder="Pilih jawaban" /></SelectTrigger><SelectContent>{q.options.map(o => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}{q.allowOther && <SelectItem value="__other">Lainnya</SelectItem>}</SelectContent></Select>}
    {(q.type === "single_choice" || q.type === "multiple_choice") && <fieldset aria-label={q.title} aria-describedby={described} className="space-y-3">{q.options.map((o, i) => <label key={o.id} className="flex items-center gap-3"><BrandChoiceInput id={i === 0 ? id : undefined} type={q.type === "single_choice" ? "radio" : "checkbox"} name={q.id} value={o.id} checked={q.type === "single_choice" ? value === o.id : list.includes(o.id)} onChange={e => set(q.type === "single_choice" ? o.id : updateList(list, o.id, e.target.checked))} />{optionImage(o.imageAssetId)}<span>{o.label}</span></label>)}{q.allowOther && <label className="flex items-center gap-3"><BrandChoiceInput type={q.type === "single_choice" ? "radio" : "checkbox"} name={q.id} checked={other !== undefined} onChange={e => e.target.checked ? setOther("") : set(list.filter(item => !item.startsWith("other:")))} />Lainnya</label>}</fieldset>}
    {q.allowOther && other !== undefined && ["single_choice", "multiple_choice", "dropdown"].includes(q.type) && <BrandInput aria-label="Jawaban lainnya" maxLength={500} value={other.slice(6)} onChange={e => setOther(e.target.value)} />}
    {(q.type === "linear_scale" || q.type === "rating") && <fieldset aria-label={q.title} aria-describedby={described} className="flex flex-wrap gap-4">{Array.from({ length: Math.min(100, Math.max(0, (q.validation.max ?? 5) - (q.validation.min ?? 1) + 1)) }, (_, i) => i + (q.validation.min ?? 1)).map((n, i) => <label key={n} className="flex items-center gap-2"><BrandChoiceInput id={i === 0 ? id : undefined} type="radio" name={q.id} checked={value === n} onChange={() => set(n)} />{n}</label>)}</fieldset>}
    {(q.type === "multiple_choice_grid" || q.type === "checkbox_grid") && <div className="space-y-4">{q.rows.map((row, rowIndex) => <fieldset key={row.id} className="space-y-2" aria-describedby={described}><legend className="type-label">{row.label}</legend><div className="flex flex-wrap gap-4">{q.columns.map((column, i) => <label key={column.id} className="flex items-center gap-2"><BrandChoiceInput id={rowIndex === 0 && i === 0 ? id : undefined} type={q.type === "multiple_choice_grid" ? "radio" : "checkbox"} name={`${q.id}-${row.id}`} checked={q.type === "multiple_choice_grid" ? grid[row.id] === column.id : Array.isArray(grid[row.id]) && (grid[row.id] as string[]).includes(column.id)} onChange={e => { const next = { ...grid }; if (q.type === "multiple_choice_grid") next[row.id] = column.id; else { const values = updateList(Array.isArray(grid[row.id]) ? grid[row.id] as string[] : [], column.id, e.target.checked); if (values.length) next[row.id] = values; else delete next[row.id]; } set(next); }} />{column.label}</label>)}</div></fieldset>)}</div>}
    {q.type === "file" && (slug && revisionId && uploadSessionId && !preview ? <FileUpload items={items} setItems={setItems} question={q} slug={slug} revisionId={revisionId} uploadSessionId={uploadSessionId} value={list} onChange={set} onUploadingChange={onUploadingChange} id={id} aria-describedby={described} aria-invalid={!!error} aria-required={q.required} /> : <p id={id} tabIndex={-1}>Unggah berkas tersedia pada formulir yang diterbitkan.</p>)}
    {error && <p id={`${id}-error`} role="alert" className="type-body-sm text-destructive">{error}</p>}
  </section>;
}

export function FormRenderer({ schema, slug, revisionId, preview = false }: Props) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [sectionId, setSectionId] = useState(schema.sections[0]?.id);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const [pending, setPending] = useState<Payload | null>(null);
  const [session] = useState(() => crypto.randomUUID());
  const [files, setFiles] = useState<Record<string, UploadItem[]>>({});
  const uploadRef = useRef<Record<string, boolean>>({});
  const [honeypot, setHoneypot] = useState("");
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const previewStructure = preview ? JSON.stringify(schema.sections.map(section => [section.id, ...section.questions.map(q => [q.id, q.type, q.options.map(o => o.id), q.rows.map(r => r.id), q.columns.map(c => c.id)])])) : "";
  const [previousStructure, setPreviousStructure] = useState(previewStructure);
  if (previewStructure !== previousStructure) {
    setPreviousStructure(previewStructure);
    setAnswers({});
    setErrors({});
    setMessage("");
  }
  const hasUpload = Object.values(uploading).some(Boolean);
  const questionIds = new Set(schema.sections.flatMap(section => section.questions.map(question => question.id)));
  const currentAnswers = preview ? Object.fromEntries(Object.entries(answers).filter(([id]) => questionIds.has(id))) : answers;
  const sections = getVisibleSections(schema, currentAnswers);
  const index = Math.max(0, sections.findIndex(section => section.id === sectionId));
  const section = sections[index];
  const focusError = (fields: Record<string, string>) => {
    const first = sections.flatMap(s => s.questions.map(q => ({ section: s, question: q }))).find(({ question }) => fields[question.id]);
    if (first) { setSectionId(first.section.id); setTimeout(() => document.getElementById(`question-${first.question.id}`)?.focus(), 0); }
  };
  const send = async (payload: Payload) => {
    setBusy(true); setMessage("");
    try {
      const response = await fetch(`/api/forms/${encodeURIComponent(slug!)}/submissions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (response.ok) { setPending(null); setComplete(true); return; }
      if (response.status === 429 || response.status >= 500) { setMessage("Pengiriman belum dapat dipastikan. Coba kirim lagi dengan jawaban yang sama."); return; }
      setPending(null); setErrors(result.fieldErrors ?? {}); focusError(result.fieldErrors ?? {});
      setMessage(response.status === 409 ? "Formulir telah berubah. Salin jawaban Anda sebelum memuat ulang halaman." : "Jawaban belum terkirim. Periksa isian dan coba lagi.");
    } catch { setMessage("Koneksi terputus. Pengiriman belum dapat dipastikan; coba kirim lagi dengan jawaban yang sama."); }
    finally { setBusy(false); }
  };
  const next = () => {
    if (Object.values(uploadRef.current).some(Boolean)) return;
    const result = validateAnswers(schema, currentAnswers);
    const currentErrors = Object.fromEntries(Object.entries(result.fieldErrors).filter(([key]) => key === "_form" || section.questions.some(q => q.id === key)));
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length) { focusError(currentErrors); return; }
    setSectionId(sections[index + 1].id); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const submit = () => {
    if (Object.values(uploadRef.current).some(Boolean)) return;
    if (preview) { setMessage("Ini pratinjau. Jawaban tidak dikirim."); return; }
    if (!slug || !revisionId) { setMessage("Formulir belum siap dikirim."); return; }
    const result = validateAnswers(schema, currentAnswers); setErrors(result.fieldErrors);
    if (!result.success) { focusError(result.fieldErrors); return; }
    const payload = { revisionId, answers: result.answers, idempotencyKey: crypto.randomUUID(), uploadSessionId: session, honeypot };
    setPending(payload); void send(payload);
  };
  const validColor = (value: string) => /^#[0-9a-f]{6}$/i.test(value) ? value : undefined;
  const background = validColor(schema.settings.background);
  const rgb = background ? [1, 3, 5].map(index => parseInt(background.slice(index, index + 2), 16) / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4) : [];
  const luminance = rgb.length ? 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] : 1;
  const accent = validColor(schema.settings.accent);
  const accentRgb = accent ? [1, 3, 5].map(index => parseInt(accent.slice(index, index + 2), 16) / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4) : [];
  const accentLuminance = accentRgb.length ? 0.2126 * accentRgb[0] + 0.7152 * accentRgb[1] + 0.0722 * accentRgb[2] : 0;
  const style = { backgroundColor: background, color: background ? (luminance > 0.179 ? "#000000" : "#ffffff") : undefined, accentColor: accent, "--form-accent": accent, "--form-action-ink": accentLuminance > 0.179 ? "#000000" : "#ffffff" } as CSSProperties;
  if (complete) return <main style={style} className="respondent-page"><div className="respondent-column"><div className="respondent-header respondent-confirmation"><h1 className="type-heading-3">Jawaban terkirim</h1><p className="mt-4 whitespace-pre-wrap">{schema.settings.confirmationMessage}</p></div></div></main>;
  if (!section) return <main className="respondent-page"><div className="respondent-column"><div className="respondent-header">Formulir belum tersedia.</div></div></main>;
  return <main style={style} className="respondent-page"><div className="respondent-column"><header className="respondent-header space-y-4">{schema.headerAssetId && <img src={`/api/forms/assets/${encodeURIComponent(schema.headerAssetId)}`} alt="" className="max-h-64 w-full object-cover" />}{schema.logoAssetId && <img src={`/api/forms/assets/${encodeURIComponent(schema.logoAssetId)}`} alt="Logo" className="max-h-24 max-w-48 object-contain" />}<h1 className="type-heading-3">{schema.title}</h1>{schema.description && <p className="whitespace-pre-wrap">{schema.description}</p>}{schema.welcomeText && <p className="whitespace-pre-wrap">{schema.welcomeText}</p>}{sections.length > 1 && <div className="respondent-progress"><p className="type-body-sm" aria-live="polite">Bagian {index + 1} dari {sections.length}</p><progress value={index + 1} max={sections.length} aria-label="Kemajuan bagian" /></div>}</header>
    <form noValidate onSubmit={e => { e.preventDefault(); if (Object.values(uploadRef.current).some(Boolean) || busy) return; if (pending) void send(pending); else if (index < sections.length - 1) next(); else submit(); }}><div className="sr-only" aria-hidden="true"><label htmlFor="form-website">Website</label><input id="form-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></div><fieldset disabled={busy || !!pending} className="respondent-section"><legend className="sr-only">{section.title}</legend><div className="respondent-section-heading"><h2 className="type-heading-4">{section.title}</h2>{section.description && <p className="mt-2 whitespace-pre-wrap">{section.description}</p>}</div>{section.questions.map(q => <QuestionControl key={q.id} question={q} value={answers[q.id]} error={errors[q.id]} slug={slug} revisionId={revisionId} uploadSessionId={session} preview={preview} items={files[q.id] ?? []} setItems={action => setFiles(current => ({ ...current, [q.id]: typeof action === "function" ? action(current[q.id] ?? []) : action }))} onUploadingChange={value => { uploadRef.current[q.id] = value; setUploading(current => ({ ...current, [q.id]: value })); }} set={value => { setAnswers(current => ({ ...current, [q.id]: value })); setErrors(current => { const next = { ...current }; delete next[q.id]; return next; }); }} />)}</fieldset>
    {message && <p role="alert" className="respondent-message">{message}</p>}<div className="respondent-actions">{index > 0 && !pending && <Button type="button" variant="outline" disabled={hasUpload} onClick={() => setSectionId(sections[index - 1].id)}>Kembali</Button>}<Button type="submit" variant="form" size="pill" disabled={busy || hasUpload}>{busy ? "Mengirim..." : pending ? "Coba kirim lagi" : index < sections.length - 1 ? "Lanjut" : preview ? "Selesai pratinjau" : "Kirim jawaban"}</Button></div></form>
  </div></main>;
}
