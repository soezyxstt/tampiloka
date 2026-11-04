"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandInput, BrandTextarea, SelectField } from "@/components/ui/form-controls";
import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Link as LinkIcon, Plus, Redo2, Trash2, Undo2, Layers, Type, GripVertical, ImagePlus } from "lucide-react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { AdminIconButton, AdminSkeleton, useAdminConfirm } from "./admin-ui";
import { FormValidationEditor } from "./form-validation-editor";
import { FormRenderer } from "@/components/forms/form-renderer";
import type { FormSchema, Question, Section } from "@/lib/forms/schema";
import { cloneQuestion, copy, move, repairRouting, routingIssues, uid } from "./form-editor-helpers";
import { FormEditorImage } from "./form-editor-image";
import { FormNavigation, FormWorkspacePanels, useFormTab } from "./form-navigation";
import "./form-editor.css";

type FormRecord = { id: string; title: string; slug: string; status: string; draft: FormSchema; draftVersion: number; publishedRevisionId: string | null };
type Selection = { section: string; question?: string } | null;
type Recovery = { draft: FormSchema; version: number };
const types = [
  ["short_text", "Jawaban singkat"], ["long_text", "Paragraf"], ["single_choice", "Pilihan tunggal"],
  ["multiple_choice", "Pilihan ganda"], ["dropdown", "Daftar pilihan"], ["number", "Angka"],
  ["email", "Email"], ["phone", "Telepon"], ["url", "URL"], ["date", "Tanggal"], ["time", "Waktu"],
  ["datetime", "Tanggal dan waktu"], ["file", "Unggah berkas"], ["linear_scale", "Skala linear"],
  ["rating", "Rating"], ["multiple_choice_grid", "Grid pilihan tunggal"], ["checkbox_grid", "Grid pilihan ganda"], ["info", "Informasi"],
] as const;
const choiceTypes = ["single_choice", "multiple_choice", "dropdown"];
const gridTypes = ["multiple_choice_grid", "checkbox_grid"];
const newQuestion = (type: Question["type"]): Question => ({
  id: uid(), type, title: "Pertanyaan baru", description: "", required: false,
  options: choiceTypes.includes(type) ? [{ id: uid(), label: "Pilihan 1" }] : [],
  rows: gridTypes.includes(type) ? [{ id: uid(), label: "Baris 1" }] : [],
  columns: gridTypes.includes(type) ? [{ id: uid(), label: "Kolom 1" }] : [], validation: {},
} as Question);
const newSection = (): Section => ({ id: uid(), title: "Bagian baru", description: "", questions: [] } as Section);

function SortableItem({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? .55 : undefined }} className="form-editor__sortable">
    <button ref={setActivatorNodeRef} type="button" className="form-editor__drag" aria-label={label} {...attributes} {...listeners}><GripVertical size={18} aria-hidden="true" /></button>{children}
  </div>;
}

export function FormEditor({ id }: { id: string }) {
  const confirm = useAdminConfirm();
  const activeTab = useFormTab();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const [form, setForm] = useState<FormRecord | null>(null);
  const [draft, setDraft] = useState<FormSchema | null>(null);
  const [selection, setSelection] = useState<Selection>(null);
  const [status, setStatus] = useState("Memuat formulir…");
  const [error, setError] = useState("");
  const [conflict, setConflict] = useState(false);
  const [recovery, setRecovery] = useState<Recovery | null>(null);
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop");
  const [panel, setPanel] = useState<"outline" | "canvas" | "properties">("canvas");
  const [showPreview, setShowPreview] = useState(false);
  const [slug, setSlug] = useState("");
  const [history, setHistory] = useState<FormSchema[]>([]);
  const [future, setFuture] = useState<FormSchema[]>([]);
  const [saveTick, setSaveTick] = useState(0);
  const version = useRef(0);
  const latest = useRef<FormSchema | null>(null);
  const saved = useRef("");
  const saving = useRef(false);
  const blocked = useRef(false);
  const mounted = useRef(true);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const focusProperties = useRef(false);
  const recoveryKey = `tampiloka-form-draft:${id}`;

  useLayoutEffect(() => {
    if (!focusProperties.current) return;
    focusProperties.current = false;
    propertiesRef.current?.querySelector<HTMLElement>('input:not([type="hidden"]), textarea, [role="combobox"], button:not(:disabled)')?.focus();
  }, [panel, selection]);

  useEffect(() => {
    mounted.current = true;
    const controller = new AbortController();
    fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { signal: controller.signal, cache: "no-store" })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error || "Formulir tidak dapat dimuat."); return data.form as FormRecord; })
      .then(value => {
        if (!mounted.current) return;
        setForm(value); setSlug(value.slug); setDraft(value.draft); latest.current = value.draft; saved.current = JSON.stringify(value.draft); version.current = value.draftVersion;
        setStatus("Tersimpan");
        try { const stored = localStorage.getItem(recoveryKey); if (stored) { const parsed = JSON.parse(stored) as Recovery; if (JSON.stringify(parsed.draft) !== saved.current) setRecovery(parsed); else localStorage.removeItem(recoveryKey); } } catch { /* Storage can be unavailable. */ }
      }).catch(e => { if (e.name !== "AbortError") { setError(e.message); setStatus("Gagal memuat"); } });
    return () => { mounted.current = false; controller.abort(); };
  }, [id, recoveryKey]);

  const edit = useCallback((change: (next: FormSchema) => void) => {
    if (!latest.current || recovery) return;
    const previous = latest.current;
    const next = copy(previous); change(next);
    setHistory(h => [...h.slice(-49), previous]); setFuture([]);
    latest.current = next; setDraft(next); setStatus("Belum tersimpan");
    try { localStorage.setItem(recoveryKey, JSON.stringify({ draft: next, version: version.current })); } catch { setError("Cadangan lokal tidak tersedia. Jangan tutup halaman sebelum tersimpan."); }
  }, [recoveryKey, recovery]);

  const save = useCallback(async () => {
    if (saving.current || blocked.current || recovery || !latest.current || routingIssues(latest.current).length || JSON.stringify(latest.current) === saved.current) return;
    const snapshot = copy(latest.current); const serial = JSON.stringify(snapshot);
    saving.current = true; setStatus("Menyimpan…"); setError(""); toast.loading("Menyimpan draf...", { id: "form-save" });
    try {
      const response = await fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ draft: snapshot, expectedVersion: version.current }) });
      const data = await response.json();
      if (response.status === 409) { blocked.current = true; setConflict(true); throw new Error("Draf berubah di tempat lain. Muat ulang untuk membandingkan sebelum menyimpan kembali."); }
      if (!response.ok) throw new Error(data.error || "Draf gagal disimpan.");
      version.current = data.form.draftVersion; saved.current = serial; setForm(data.form);
      if (JSON.stringify(latest.current) === serial) { try { localStorage.removeItem(recoveryKey); } catch { /* Storage can be unavailable. */ } setStatus("Tersimpan"); }
      else { try { localStorage.setItem(recoveryKey, JSON.stringify({ draft: latest.current, version: version.current })); } catch { setError("Cadangan lokal tidak tersedia. Jangan tutup halaman sebelum tersimpan."); } setStatus("Belum tersimpan"); setSaveTick(t => t + 1); }
    } catch (e) { setError(e instanceof Error ? e.message : "Draf gagal disimpan."); setStatus("Gagal menyimpan"); }
    finally { saving.current = false; toast.dismiss("form-save"); }
  }, [id, recoveryKey, recovery]);

  useEffect(() => { if (!draft || conflict || status !== "Belum tersimpan") return; const timer = window.setTimeout(save, 1000); return () => window.clearTimeout(timer); }, [draft, conflict, save, status, saveTick]);
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (recovery || (latest.current && JSON.stringify(latest.current) !== saved.current)) event.preventDefault(); }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [recovery]);

  useEffect(() => {
    const guard = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target || link.origin !== location.origin || link.pathname === location.pathname) return;
      if (recovery || (latest.current && JSON.stringify(latest.current) !== saved.current)) {
        event.preventDefault(); event.stopPropagation();
        void confirm({ title: "Keluar dari editor?", description: "Ada perubahan yang belum tersimpan.", confirmLabel: "Keluar" }).then(ok => { if (ok) window.location.assign(link.href); });
      }
    };
    document.addEventListener("click", guard, true);
    return () => document.removeEventListener("click", guard, true);
  }, [recovery, confirm]);

  const restoreHistory = (direction: "undo" | "redo") => {
    if (recovery) return;
    const source = direction === "undo" ? history : future;
    const next = source[source.length - 1]; if (!next || !latest.current) return;
    if (direction === "undo") { setHistory(source.slice(0, -1)); setFuture(f => [...f, latest.current!]); }
    else { setFuture(source.slice(0, -1)); setHistory(h => [...h, latest.current!]); }
    latest.current = next; setDraft(next); setStatus("Belum tersimpan");
    try { localStorage.setItem(recoveryKey, JSON.stringify({ draft: next, version: version.current })); } catch { setError("Cadangan lokal tidak tersedia."); }
  };
  const action = async (name: "publish" | "close" | "reopen") => {
    if (!form || recovery || blocked.current || saving.current || JSON.stringify(latest.current) !== saved.current) { setError("Simpan semua perubahan sebelum melanjutkan."); return; }
    if (!await confirm({ title: name === "publish" ? "Terbitkan versi draf saat ini?" : name === "close" ? "Tutup formulir untuk respons baru?" : "Buka kembali formulir?", confirmLabel: "Lanjutkan" })) return;
    const toastId = toast.loading("Memperbarui status formulir...");
    try { const response = await fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: name }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Tindakan gagal."); setForm(data.form); setError(""); toast.success("Status formulir diperbarui."); } catch (e) { setError(e instanceof Error ? e.message : "Tindakan gagal."); toast.error(e instanceof Error ? e.message : "Tindakan gagal."); } finally { toast.dismiss(toastId); }
  };
  const saveSlug = async () => {
    if (!form || slug === form.slug) return;
    if (recovery || saving.current || blocked.current || JSON.stringify(latest.current) !== saved.current) { setError("Simpan draf terlebih dahulu sebelum mengubah tautan."); return; }
    saving.current = true; setStatus("Menyimpan tautan…");
    toast.loading("Menyimpan tautan...", { id: "form-slug" });
    try {
      const response = await fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, expectedVersion: version.current }) });
      const data = await response.json();
      if (response.status === 409 && data.error === "Draft version conflict") { blocked.current = true; setConflict(true); throw new Error("Draf berubah di tempat lain. Muat ulang untuk memeriksa versi terbaru."); }
      if (!response.ok) throw new Error(data.error || "Tautan gagal disimpan.");
      version.current = data.form.draftVersion; setForm(data.form); setSlug(data.form.slug); setError("");
      if (JSON.stringify(latest.current) === saved.current) setStatus("Tersimpan");
      else { setStatus("Belum tersimpan"); setSaveTick(t => t + 1); }
    } catch (e) { setError(e instanceof Error ? e.message : "Tautan gagal disimpan."); setStatus("Gagal menyimpan tautan"); }
    finally { saving.current = false; toast.dismiss("form-slug"); }
  };
  const issues = draft ? routingIssues(draft) : [];
  const section = draft?.sections.find(s => s.id === selection?.section);
  const question = section?.questions.find(q => q.id === selection?.question);
  const updateSection = (fn: (s: Section) => void) => edit(d => { const s = d.sections.find(item => item.id === selection?.section); if (s) fn(s); });
  const updateQuestion = (fn: (q: Question) => void) => updateSection(s => { const q = s.questions.find(item => item.id === selection?.question); if (q) fn(q); });
  const reorderSection = (from: number, to: number) => edit(d => move(d.sections, from, to));
  const reorderQuestion = (sid: string, from: number, to: number) => edit(d => { const s = d.sections.find(item => item.id === sid); if (s) move(s.questions, from, to); });
  const setSelectionAndPanel = (s: Selection) => { focusProperties.current = true; setSelection(s); setPanel("canvas"); setShowPreview(false); };
  if (!form || !draft) return <main className="form-editor">{error ? <p role="alert">{error}</p> : <AdminSkeleton variant="editor" />}</main>;

  const properties = <div ref={propertiesRef} className="form-editor__properties" aria-label="Pengaturan pilihan">
        {question && section ? <><h2>Pertanyaan</h2><SelectField id="editor-question-type" label="Jenis" value={question.type} options={types.map(([value, label]) => ({ value, label }))} onChange={async value => { if (value === question.type) return; if (!await confirm({ title: "Ubah jenis pertanyaan?", description: "Pilihan dan validasi saat ini akan diganti.", confirmLabel: "Ubah" })) return; updateQuestion(q => { const replacement = newQuestion(value as Question["type"]); q.type = replacement.type; q.options = replacement.options; q.rows = replacement.rows; q.columns = replacement.columns; q.validation = replacement.validation; }); }} /><label>Judul<BrandInput value={question.title} onChange={e => updateQuestion(q => { q.title = e.target.value; })} /></label><label>Penjelasan<BrandTextarea value={question.description || ""} onChange={e => updateQuestion(q => { q.description = e.target.value; })} /></label><label className="form-editor__check"><input type="checkbox" checked={question.required} onChange={e => updateQuestion(q => { q.required = e.target.checked; })} /> Wajib diisi</label>
          <FormEditorImage key={question.id} formId={id} label="Gambar pertanyaan" value={question.imageAssetId} onChange={asset => updateQuestion(q => { if (asset) q.imageAssetId = asset; else delete q.imageAssetId; })} />
          {(choiceTypes.includes(question.type) || gridTypes.includes(question.type)) && (gridTypes.includes(question.type) ? (["rows", "columns"] as const) : (["options"] as const)).map(key => <fieldset key={key}><legend>{key === "options" ? "Pilihan" : key === "rows" ? "Baris" : "Kolom"}</legend>{question[key].map((item, i) => <div key={item.id}><div className="form-editor__row"><BrandInput aria-label={`${key} ${i + 1}`} value={item.label} onChange={e => updateQuestion(q => { const target = q[key].find(o => o.id === item.id); if (target) target.label = e.target.value; })} /><button type="button" aria-label={`Hapus ${item.label}`} onClick={() => updateQuestion(q => { q[key] = q[key].filter(o => o.id !== item.id); })}>Hapus</button></div>{key === "options" && <FormEditorImage formId={id} label={`Gambar untuk ${item.label || "pilihan"}`} value={item.imageAssetId} onChange={asset => updateQuestion(q => { const option = q.options.find(o => o.id === item.id); if (option) { if (asset) option.imageAssetId = asset; else delete option.imageAssetId; } })} />}</div>)}<button type="button" onClick={() => updateQuestion(q => { q[key].push({ id: uid(), label: "" }); })}>Tambah</button></fieldset>)}
          {choiceTypes.includes(question.type) && <label className="form-editor__check"><input type="checkbox" checked={question.allowOther || false} onChange={e => updateQuestion(q => { q.allowOther = e.target.checked; })} /> Izinkan jawaban lain</label>}
          {["short_text", "long_text", "number", "email", "phone", "url"].includes(question.type) && <FormValidationEditor question={question} onChange={validation => updateQuestion(q => { q.validation = validation; })} />}<fieldset><legend>Validasi lainnya</legend>{([
            ...(["short_text", "long_text"].includes(question.type) ? [["minLength", "Panjang minimum"], ["maxLength", "Panjang maksimum"]] : []),
            ...(["number", "linear_scale", "rating"].includes(question.type) ? [["min", "Nilai minimum"], ["max", "Nilai maksimum"]] : []),
            ...(question.type === "multiple_choice" ? [["minSelections", "Pilihan minimum"], ["maxSelections", "Pilihan maksimum"]] : []),
            ...(question.type === "file" ? [["maxFileSize", "Ukuran maksimum per berkas (byte)"], ["maxFiles", "Jumlah maksimum berkas"]] : []),
          ] as [keyof Question["validation"], string][]).map(([key, label]) => <label key={key}>{label}<BrandInput type="number" value={String(question.validation[key] ?? "")} onChange={e => updateQuestion(q => { const v = q.validation as Record<string, unknown>; if (e.target.value === "") delete v[key]; else v[key] = Number(e.target.value); })} /></label>)}
          {["date", "datetime"].includes(question.type) && (["minDate", "maxDate"] as const).map((key, i) => <label key={key}>{i ? "Tanggal maksimum" : "Tanggal minimum"}<BrandInput type={question.type === "datetime" ? "datetime-local" : "date"} value={question.validation[key] || ""} onChange={e => updateQuestion(q => { if (e.target.value) q.validation[key] = e.target.value; else delete q.validation[key]; })} /></label>)}
          {question.type === "file" && <label>Jenis berkas yang diizinkan (pisahkan dengan koma)<BrandInput key={question.id} defaultValue={(question.validation.allowedTypes || []).join(", ")} onBlur={e => updateQuestion(q => { q.validation.allowedTypes = e.target.value.split(",").map(x => x.trim()).filter(Boolean); })} /></label>}
          <label>Pesan kesalahan<BrandInput value={question.validation.message || ""} onChange={e => updateQuestion(q => { q.validation.message = e.target.value; })} /></label></fieldset>
          <div className="form-editor__actions"><Button type="button" variant="outline" onClick={() => { const cloned = cloneQuestion(question); updateSection(s => { const index = s.questions.findIndex(q => q.id === question.id); s.questions.splice(index + 1, 0, cloned); }); setSelection({ section: section.id, question: cloned.id }); }}>Duplikat</Button><Button type="button" variant="outline" onClick={async () => { if (await confirm({ title: "Hapus pertanyaan ini?", confirmLabel: "Hapus", destructive: true })) { updateSection(s => { s.questions = s.questions.filter(q => q.id !== question.id); }); setSelection({ section: section.id }); } }}>Hapus</Button></div>
        </> : section ? <><h2>Bagian</h2><label>Judul<BrandInput value={section.title} onChange={e => updateSection(s => { s.title = e.target.value; })} /></label><label>Penjelasan<BrandTextarea value={section.description || ""} onChange={e => updateSection(s => { s.description = e.target.value; })} /></label>
          <fieldset><legend>Percabangan</legend><SelectField id="route-question" label="Pertanyaan penentu" value={section.routing?.questionId || ""} options={[{ value: "", label: "Lanjut sesuai urutan" }, ...section.questions.filter(q => ["single_choice", "dropdown"].includes(q.type)).map(q => ({ value: q.id, label: q.title || "Pertanyaan tanpa judul" }))]} onChange={async value => { if (section.routing && value !== section.routing.questionId && !await confirm({ title: "Ganti pertanyaan penentu?", description: "Aturan percabangan bagian ini akan dihapus.", confirmLabel: "Ganti" })) return; updateSection(s => { if (value) s.routing = { questionId: value, choices: {} }; else delete s.routing; }); }} />{section.routing && <>{section.questions.find(q => q.id === section.routing?.questionId)?.options.map(option => <SelectField key={option.id} id={`route-${option.id}`} label={option.label || "Pilihan tanpa judul"} value={section.routing?.choices[option.id] || ""} options={[{ value: "", label: "Lanjut sesuai urutan" }, ...draft.sections.slice(draft.sections.indexOf(section) + 1).map(s => ({ value: s.id, label: s.title || "Bagian tanpa judul" }))]} onChange={value => updateSection(s => { if (!s.routing) return; if (value) s.routing.choices[option.id] = value; else delete s.routing.choices[option.id]; })} />)}<SelectField id="route-default" label="Jika tidak ada pilihan yang cocok" value={section.routing.defaultSectionId || ""} options={[{ value: "", label: "Lanjut sesuai urutan" }, ...draft.sections.slice(draft.sections.indexOf(section) + 1).map(s => ({ value: s.id, label: s.title || "Bagian tanpa judul" }))]} onChange={value => updateSection(s => { if (!s.routing) return; if (value) s.routing.defaultSectionId = value; else delete s.routing.defaultSectionId; })} /></>}</fieldset>
          <div className="form-editor__actions"><Button type="button" variant="outline" onClick={() => { const cloned = copy(section); cloned.id = uid(); cloned.questions = cloned.questions.map(cloneQuestion); delete cloned.routing; edit(d => { const index = d.sections.findIndex(s => s.id === section.id); d.sections.splice(index + 1, 0, cloned); }); setSelection({ section: cloned.id }); }}>Duplikat</Button><Button type="button" variant="outline" disabled={draft.sections.length <= 1} onClick={async () => { if (await confirm({ title: "Hapus bagian dan seluruh pertanyaannya?", confirmLabel: "Hapus", destructive: true })) { edit(d => { d.sections = d.sections.filter(s => s.id !== section.id); }); setSelection(null); } }}>Hapus</Button></div></> : <><h2>Formulir</h2><label>Petunjuk awal<BrandTextarea value={draft.welcomeText || ""} onChange={e => edit(d => { d.welcomeText = e.target.value; })} /></label></>}
      </div>;

  return <main className="form-editor">
    <header className="form-editor__top"><div><nav aria-label="Breadcrumb"><Link href="/admin">Formulir</Link> / <span aria-current="page">{draft.title || "Formulir tanpa judul"}</span></nav><h1>{draft.title || "Formulir tanpa judul"}</h1><p role="status">{status} · {form.status}</p></div><div className="form-editor__actions">
      <AdminIconButton label="Urungkan" disabled={!!recovery || !history.length} onClick={() => restoreHistory("undo")}><Undo2 size={18} /></AdminIconButton><AdminIconButton label="Ulangi" disabled={!!recovery || !future.length} onClick={() => restoreHistory("redo")}><Redo2 size={18} /></AdminIconButton>
      <AdminIconButton label={showPreview ? "Kembali mengedit" : "Pratinjau"} onClick={() => { setPanel("canvas"); setShowPreview(value => !value); }}>{showPreview ? <EyeOff size={18} /> : <Eye size={18} />}</AdminIconButton>
      <AdminIconButton label="Salin tautan" disabled={!form.publishedRevisionId} onClick={async () => { try { await navigator.clipboard.writeText(new URL(`/f/${form.slug}`, window.location.origin).href); toast.success("Tautan disalin."); } catch { setError("Tautan tidak dapat disalin."); } }}><LinkIcon size={18} /></AdminIconButton>
      <Button type="button" variant="brand" size="pill" onClick={() => action("publish")}>Terbitkan</Button>{form.status === "published" && <Button type="button" variant="outline" onClick={() => action("close")}>Tutup</Button>}{form.status === "closed" && <Button type="button" variant="outline" onClick={() => action("reopen")}>Buka kembali</Button>}
    </div></header>
    <FormNavigation id={id} active={activeTab} />
    {error && <div className="form-editor__notice" role="alert">{error} {!conflict && <button type="button" onClick={save}>Coba simpan lagi</button>}</div>}
    {conflict && <div className="form-editor__notice">Cadangan perubahan tersedia di perangkat ini. <button type="button" onClick={() => window.location.reload()}>Muat versi terbaru</button></div>}
    {issues.length > 0 && <div className="form-editor__notice" role="alert">Percabangan pada {issues.length} bagian perlu diperbaiki sebelum menyimpan. Aturan yang tidak lagi memiliki pertanyaan, pilihan, atau tujuan yang valid akan dihapus; alur berlanjut sesuai urutan. <button type="button" onClick={async () => { if (await confirm({ title: "Perbaiki aturan percabangan?", description: "Hanya aturan yang tidak valid akan dihapus. Perubahan dapat diurungkan.", confirmLabel: "Perbaiki" })) edit(repairRouting); }}>Perbaiki aturan</button> <button type="button" onClick={() => setSelectionAndPanel({ section: issues[0] })}>Tinjau bagian</button></div>}
    {recovery && <div className="form-editor__notice">Ada perubahan lokal yang belum tersimpan{recovery.version !== form.draftVersion ? " dari versi lama. Periksa sebelum menyimpan karena versi server sudah berubah" : ""}. <button type="button" onClick={() => { setHistory(h => [...h, draft]); latest.current = recovery.draft; setDraft(recovery.draft); setRecovery(null); setStatus("Belum tersimpan"); }}>Pulihkan perubahan lokal</button> <button type="button" onClick={() => { try { localStorage.removeItem(recoveryKey); setRecovery(null); } catch { setError("Cadangan lokal tidak dapat dihapus."); } }}>Buang cadangan</button></div>}
    <div hidden={activeTab !== "questions"}>
    <fieldset disabled={!!recovery} className="form-editor__workspace"><div className="form-editor__layout">
      <section id="form-editor-preview" className={`form-editor__canvas ${panel === "canvas" ? "is-active" : ""} ${showPreview ? "is-preview" : ""}`} aria-label={showPreview ? "Pratinjau formulir" : "Pertanyaan formulir"}>
        {showPreview ? <><div className="form-editor__canvas-heading"><h2 className="type-heading-4">Pratinjau formulir</h2><div className="form-editor__actions"><button type="button" aria-pressed={preview === "desktop"} onClick={() => setPreview("desktop")}>Desktop</button><button type="button" aria-pressed={preview === "mobile"} onClick={() => setPreview("mobile")}>Mobile</button></div></div><div className={preview === "mobile" ? "form-editor__mobile-preview" : ""}><FormRenderer schema={draft} preview /></div></> : <>
          <div className="form-editor__intro"><FormEditorImage formId={id} label="Logo" value={draft.logoAssetId} onChange={asset => edit(d => { if (asset) d.logoAssetId = asset; else delete d.logoAssetId; })} /><div className="form-editor__header-image"><FormEditorImage formId={id} label="Gambar header" value={draft.headerAssetId} onChange={asset => edit(d => { if (asset) d.headerAssetId = asset; else delete d.headerAssetId; })} /></div><label>Judul formulir<BrandInput value={draft.title} onChange={e => edit(d => { d.title = e.target.value; })} /></label><label>Deskripsi<BrandTextarea value={draft.description || ""} onChange={e => edit(d => { d.description = e.target.value; })} /></label><details onToggle={e => { if (e.currentTarget.open) setSelection(null); }}><summary>Petunjuk tambahan</summary>{!selection && properties}</details></div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => { if (over && active.id !== over.id) reorderSection(draft.sections.findIndex(s => s.id === active.id), draft.sections.findIndex(s => s.id === over.id)); }}><SortableContext items={draft.sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
          {draft.sections.map((s, si) => <SortableItem key={s.id} id={s.id} label={`Seret bagian ${s.title || si + 1}`}><div className="form-editor__canvas-section">
            <button type="button" className={`form-editor__section-title ${selection?.section === s.id && !selection.question ? "is-selected" : ""}`} onClick={() => setSelectionAndPanel({ section: s.id })}><span>Bagian {si + 1} dari {draft.sections.length}</span><strong className="type-heading-4">{s.title || "Bagian tanpa judul"}</strong>{s.description && <span>{s.description}</span>}</button>
            {selection?.section === s.id && !selection.question && properties}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => { if (over && active.id !== over.id) reorderQuestion(s.id, s.questions.findIndex(q => q.id === active.id), s.questions.findIndex(q => q.id === over.id)); }}><SortableContext items={s.questions.map(q => q.id)} strategy={verticalListSortingStrategy}>{s.questions.map((q, qi) => <SortableItem key={q.id} id={q.id} label={`Seret ${q.title || "pertanyaan"}`}><article className={`form-editor__card ${selection?.question === q.id ? "is-selected" : ""}`}>
              <button type="button" hidden={selection?.question === q.id} className="form-editor__card-select" aria-pressed={selection?.question === q.id} onClick={() => setSelectionAndPanel({ section: s.id, question: q.id })}><span className="form-editor__card-type">{types.find(([type]) => type === q.type)?.[1]}</span><strong className="type-heading-5">{q.title || "Pertanyaan tanpa judul"}{q.required && <span aria-label=" wajib diisi"> *</span>}</strong>{q.description && <span>{q.description}</span>}<span className="form-editor__answer" aria-hidden="true">{choiceTypes.includes(q.type) ? q.options.map(o => <span key={o.id}><i className={q.type === "multiple_choice" ? "is-square" : ""} />{o.label || "Pilihan"}</span>) : gridTypes.includes(q.type) ? <span>{q.rows.map(r => r.label || "Baris").join(", ")} / {q.columns.map(c => c.label || "Kolom").join(", ")}</span> : <span>{({ long_text: "Teks jawaban panjang", file: "Unggah berkas", date: "Tanggal", time: "Waktu", datetime: "Tanggal dan waktu", rating: "1  2  3  4  5", linear_scale: "1  2  3  4  5", info: "" } as Record<string, string>)[q.type] ?? "Teks jawaban"}</span>}</span></button>
              <div className="form-editor__card-actions"><AdminIconButton label="Edit" onClick={() => setSelectionAndPanel({ section: s.id, question: q.id })}><Type size={17} /></AdminIconButton><AdminIconButton label="Pindah ke atas" disabled={qi === 0} onClick={() => reorderQuestion(s.id, qi, qi - 1)}><ArrowUp size={17} /></AdminIconButton><AdminIconButton label="Pindah ke bawah" disabled={qi === s.questions.length - 1} onClick={() => reorderQuestion(s.id, qi, qi + 1)}><ArrowDown size={17} /></AdminIconButton><AdminIconButton label="Duplikat" onClick={() => { const cloned = cloneQuestion(q); edit(d => { const target = d.sections.find(item => item.id === s.id); if (target) target.questions.splice(qi + 1, 0, cloned); }); setSelectionAndPanel({ section: s.id, question: cloned.id }); }}><Copy size={17} /></AdminIconButton><AdminIconButton label="Hapus" onClick={async () => { if (await confirm({ title: "Hapus pertanyaan ini?", confirmLabel: "Hapus", destructive: true })) { edit(d => { const target = d.sections.find(item => item.id === s.id); if (target) target.questions = target.questions.filter(item => item.id !== q.id); }); setSelectionAndPanel({ section: s.id }); } }}><Trash2 size={17} /></AdminIconButton></div>
              {selection?.question === q.id && properties}
            </article></SortableItem>)}</SortableContext></DndContext>
            <div className="form-editor__insert"><AdminIconButton label="Tambah pertanyaan" onClick={() => { const q = newQuestion("short_text"); edit(d => d.sections.find(item => item.id === s.id)?.questions.push(q)); setSelectionAndPanel({ section: s.id, question: q.id }); }}><Plus size={18} /></AdminIconButton><AdminIconButton label="Tambah teks" onClick={() => { const q = newQuestion("info"); q.title = "Informasi"; edit(d => d.sections.find(item => item.id === s.id)?.questions.push(q)); setSelectionAndPanel({ section: s.id, question: q.id }); }}><Type size={18} /></AdminIconButton><AdminIconButton label="Tambah gambar" onClick={() => { const q = newQuestion("info"); q.title = "Gambar"; edit(d => d.sections.find(item => item.id === s.id)?.questions.push(q)); setSelectionAndPanel({ section: s.id, question: q.id }); }}><ImagePlus size={18} /></AdminIconButton><AdminIconButton label="Pindah bagian ke atas" disabled={si === 0} onClick={() => reorderSection(si, si - 1)}><ArrowUp size={18} /></AdminIconButton><AdminIconButton label="Pindah bagian ke bawah" disabled={si === draft.sections.length - 1} onClick={() => reorderSection(si, si + 1)}><ArrowDown size={18} /></AdminIconButton></div>
          </div></SortableItem>)}</SortableContext></DndContext>
          <AdminIconButton label="Tambah bagian" onClick={() => { const s = newSection(); edit(d => d.sections.push(s)); setSelectionAndPanel({ section: s.id }); }}><Layers size={18} /></AdminIconButton>
        </>}
      </section>

    </div></fieldset></div>
    <FormWorkspacePanels id={id} activeTab={activeTab} disabled={!!recovery} draft={draft} edit={edit} slug={slug} setSlug={setSlug} savedSlug={form.slug} saveSlug={saveSlug} />
  </main>;
}
