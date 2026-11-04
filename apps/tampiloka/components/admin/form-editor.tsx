"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandInput, BrandTextarea, SelectField } from "@/components/ui/form-controls";
import { Popover } from "@base-ui/react/popover";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FormRenderer } from "@/components/forms/form-renderer";
import type { FormSchema, Question, Section } from "@/lib/forms/schema";
import { cloneQuestion, copy, move, repairRouting, routingIssues, uid } from "./form-editor-helpers";
import { FormEditorImage } from "./form-editor-image";
import { FormNavigation } from "./form-navigation";
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

export function FormEditor({ id }: { id: string }) {
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
  const [search, setSearch] = useState("");
  const [insertSection, setInsertSection] = useState<string | null>(null);
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
  const propertiesRef = useRef<HTMLElement>(null);
  const focusProperties = useRef(false);
  const recoveryKey = `tampiloka-form-draft:${id}`;

  useLayoutEffect(() => {
    if (panel !== "properties" || !focusProperties.current) return;
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
  }, [id, recoveryKey, recovery]);

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
    saving.current = true; setStatus("Menyimpan…"); setError("");
    try {
      const response = await fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ draft: snapshot, expectedVersion: version.current }) });
      const data = await response.json();
      if (response.status === 409) { blocked.current = true; setConflict(true); throw new Error("Draf berubah di tempat lain. Muat ulang untuk membandingkan sebelum menyimpan kembali."); }
      if (!response.ok) throw new Error(data.error || "Draf gagal disimpan.");
      version.current = data.form.draftVersion; saved.current = serial; setForm(data.form);
      if (JSON.stringify(latest.current) === serial) { try { localStorage.removeItem(recoveryKey); } catch { /* Storage can be unavailable. */ } setStatus("Tersimpan"); }
      else { try { localStorage.setItem(recoveryKey, JSON.stringify({ draft: latest.current, version: version.current })); } catch { setError("Cadangan lokal tidak tersedia. Jangan tutup halaman sebelum tersimpan."); } setStatus("Belum tersimpan"); setSaveTick(t => t + 1); }
    } catch (e) { setError(e instanceof Error ? e.message : "Draf gagal disimpan."); setStatus("Gagal menyimpan"); }
    finally { saving.current = false; }
  }, [id, recoveryKey, recovery]);

  useEffect(() => { if (!draft || conflict || status !== "Belum tersimpan") return; const timer = window.setTimeout(save, 1000); return () => window.clearTimeout(timer); }, [draft, conflict, save, status, saveTick]);
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (recovery || (latest.current && JSON.stringify(latest.current) !== saved.current)) event.preventDefault(); }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [recovery]);

  useEffect(() => {
    const guard = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target || link.origin !== location.origin || link.pathname === location.pathname) return;
      if ((recovery || (latest.current && JSON.stringify(latest.current) !== saved.current)) && !window.confirm("Ada perubahan yang belum tersimpan. Keluar dari editor?")) { event.preventDefault(); event.stopPropagation(); }
    };
    document.addEventListener("click", guard, true);
    return () => document.removeEventListener("click", guard, true);
  }, [recovery]);

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
    if (!window.confirm(name === "publish" ? "Terbitkan versi draf saat ini?" : name === "close" ? "Tutup formulir untuk respons baru?" : "Buka kembali formulir?") ) return;
    try { const response = await fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: name }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Tindakan gagal."); setForm(data.form); setError(""); } catch (e) { setError(e instanceof Error ? e.message : "Tindakan gagal."); }
  };
  const saveSlug = async () => {
    if (!form || slug === form.slug) return;
    if (recovery || saving.current || blocked.current || JSON.stringify(latest.current) !== saved.current) { setError("Simpan draf terlebih dahulu sebelum mengubah tautan."); return; }
    saving.current = true; setStatus("Menyimpan tautan…");
    try {
      const response = await fetch(`/api/admin/forms/${encodeURIComponent(id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, expectedVersion: version.current }) });
      const data = await response.json();
      if (response.status === 409 && data.error === "Draft version conflict") { blocked.current = true; setConflict(true); throw new Error("Draf berubah di tempat lain. Muat ulang untuk memeriksa versi terbaru."); }
      if (!response.ok) throw new Error(data.error || "Tautan gagal disimpan.");
      version.current = data.form.draftVersion; setForm(data.form); setSlug(data.form.slug); setError("");
      if (JSON.stringify(latest.current) === saved.current) setStatus("Tersimpan");
      else { setStatus("Belum tersimpan"); setSaveTick(t => t + 1); }
    } catch (e) { setError(e instanceof Error ? e.message : "Tautan gagal disimpan."); setStatus("Gagal menyimpan tautan"); }
    finally { saving.current = false; }
  };
  const issues = draft ? routingIssues(draft) : [];
  const section = draft?.sections.find(s => s.id === selection?.section);
  const question = section?.questions.find(q => q.id === selection?.question);
  const updateSection = (fn: (s: Section) => void) => edit(d => { const s = d.sections.find(item => item.id === selection?.section); if (s) fn(s); });
  const updateQuestion = (fn: (q: Question) => void) => updateSection(s => { const q = s.questions.find(item => item.id === selection?.question); if (q) fn(q); });
  const reorderSection = (from: number, to: number) => edit(d => move(d.sections, from, to));
  const reorderQuestion = (sid: string, from: number, to: number) => edit(d => { const s = d.sections.find(item => item.id === sid); if (s) move(s.questions, from, to); });
  const setSelectionAndPanel = (s: Selection) => { focusProperties.current = true; setSelection(s); setPanel("properties"); setShowPreview(false); };
  if (!form || !draft) return <main className="form-editor"><p role={error ? "alert" : "status"}>{error || status}</p></main>;

  return <main className="form-editor">
    <header className="form-editor__top"><div><Link href="/admin">Semua formulir</Link><h1>{draft.title || "Formulir tanpa judul"}</h1><p role="status">{status} · {form.status}</p></div><div className="form-editor__actions">
      <Button type="button" variant="outline" disabled={!!recovery || !history.length} onClick={() => restoreHistory("undo")}>Urungkan</Button><Button type="button" variant="outline" disabled={!!recovery || !future.length} onClick={() => restoreHistory("redo")}>Ulangi</Button>
      <Button type="button" variant="outline" onClick={() => { setPanel("canvas"); setShowPreview(value => !value); }}>{showPreview ? "Kembali mengedit" : "Pratinjau"}</Button>
      <Button type="button" variant="outline" disabled={!form.publishedRevisionId} onClick={async () => { try { await navigator.clipboard.writeText(new URL(`/f/${form.slug}`, window.location.origin).href); if (JSON.stringify(latest.current) === saved.current) setStatus("Tautan disalin"); } catch { setError("Tautan tidak dapat disalin."); } }}>Salin tautan</Button>
      <Button type="button" variant="brand" size="pill" onClick={() => action("publish")}>Terbitkan</Button>{form.status === "published" && <Button type="button" variant="outline" onClick={() => action("close")}>Tutup</Button>}{form.status === "closed" && <Button type="button" variant="outline" onClick={() => action("reopen")}>Buka kembali</Button>}
    </div></header>
    <FormNavigation id={id} active="questions" />
    {error && <div className="form-editor__notice" role="alert">{error} {!conflict && <button type="button" onClick={save}>Coba simpan lagi</button>}</div>}
    {conflict && <div className="form-editor__notice">Cadangan perubahan tersedia di perangkat ini. <button type="button" onClick={() => window.location.reload()}>Muat versi terbaru</button></div>}
    {issues.length > 0 && <div className="form-editor__notice" role="alert">Percabangan pada {issues.length} bagian perlu diperbaiki sebelum menyimpan. Aturan yang tidak lagi memiliki pertanyaan, pilihan, atau tujuan yang valid akan dihapus; alur berlanjut sesuai urutan. <button type="button" onClick={() => { if (window.confirm("Hapus hanya aturan percabangan yang tidak valid? Perubahan ini dapat diurungkan.")) edit(repairRouting); }}>Perbaiki aturan</button> <button type="button" onClick={() => setSelectionAndPanel({ section: issues[0] })}>Tinjau bagian</button></div>}
    {recovery && <div className="form-editor__notice">Ada perubahan lokal yang belum tersimpan{recovery.version !== form.draftVersion ? " dari versi lama. Periksa sebelum menyimpan karena versi server sudah berubah" : ""}. <button type="button" onClick={() => { setHistory(h => [...h, draft]); latest.current = recovery.draft; setDraft(recovery.draft); setRecovery(null); setStatus("Belum tersimpan"); }}>Pulihkan perubahan lokal</button> <button type="button" onClick={() => { try { localStorage.removeItem(recoveryKey); setRecovery(null); } catch { setError("Cadangan lokal tidak dapat dihapus."); } }}>Buang cadangan</button></div>}
    <fieldset disabled={!!recovery} className="form-editor__workspace"><nav className="form-editor__tabs" aria-label="Panel editor">{([["canvas", "Pertanyaan"], ["outline", "Susunan"], ["properties", "Pengaturan"]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={panel === value} onClick={() => setPanel(value)}>{label}</button>)}</nav>
    <div className="form-editor__layout">
      <aside className={`form-editor__outline ${panel === "outline" ? "is-active" : ""}`} aria-label="Susunan formulir">
        <button type="button" className="form-editor__item" onClick={() => setSelectionAndPanel(null)}>Pengaturan formulir</button>
        {draft.sections.map((s, si) => <div key={s.id} className="form-editor__section" draggable onDragStart={e => { e.dataTransfer.setData("application/x-section", String(si)); e.dataTransfer.effectAllowed = "move"; }} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const from = e.dataTransfer.getData("application/x-section"); if (from !== "") reorderSection(Number(from), si); }}>
          <div className="form-editor__row"><button type="button" className="form-editor__item" onClick={() => setSelectionAndPanel({ section: s.id })}>{s.title || "Bagian tanpa judul"}</button><button type="button" aria-label={`Pindah bagian ${s.title} ke atas`} disabled={si === 0} onClick={() => reorderSection(si, si - 1)}>↑</button><button type="button" aria-label={`Pindah bagian ${s.title} ke bawah`} disabled={si === draft.sections.length - 1} onClick={() => reorderSection(si, si + 1)}>↓</button></div>
          {s.questions.map((q, qi) => <div className="form-editor__row form-editor__question" key={q.id} draggable onDragStart={e => { e.stopPropagation(); e.dataTransfer.setData("application/x-question", JSON.stringify({ sid: s.id, index: qi })); e.dataTransfer.effectAllowed = "move"; }} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); e.stopPropagation(); const raw = e.dataTransfer.getData("application/x-question"); if (raw) { const item = JSON.parse(raw); if (item.sid === s.id) reorderQuestion(s.id, item.index, qi); } }}><button type="button" className="form-editor__item" aria-pressed={selection?.question === q.id} onClick={() => setSelectionAndPanel({ section: s.id, question: q.id })}>{q.title || "Pertanyaan tanpa judul"}</button><button type="button" aria-label={`Pindah ${q.title} ke atas`} disabled={qi === 0} onClick={() => reorderQuestion(s.id, qi, qi - 1)}>↑</button><button type="button" aria-label={`Pindah ${q.title} ke bawah`} disabled={qi === s.questions.length - 1} onClick={() => reorderQuestion(s.id, qi, qi + 1)}>↓</button></div>)}
          <Popover.Root open={insertSection === s.id} onOpenChange={open => { setInsertSection(open ? s.id : null); setSearch(""); }}><Popover.Trigger render={<Button type="button" variant="outline" />}>Tambah pertanyaan</Popover.Trigger><Popover.Portal><Popover.Positioner sideOffset={6} className="z-50"><Popover.Popup className="form-editor__popover"><Popover.Title>Tambah pertanyaan</Popover.Title><label>Cari jenis<BrandInput value={search} onChange={e => setSearch(e.target.value)} /></label><div className="form-editor__types">{types.filter(([, label]) => label.toLowerCase().includes(search.toLowerCase())).map(([type, label]) => <button type="button" key={type} onClick={() => { const q = newQuestion(type); edit(d => d.sections.find(item => item.id === s.id)?.questions.push(q)); setSelectionAndPanel({ section: s.id, question: q.id }); setInsertSection(null); }}>{label}</button>)}</div></Popover.Popup></Popover.Positioner></Popover.Portal></Popover.Root>
        </div>)}
        <Button type="button" variant="outline" onClick={() => { const s = newSection(); edit(d => d.sections.push(s)); setSelectionAndPanel({ section: s.id }); }}>Tambah bagian</Button>
      </aside>
      <section id="form-editor-preview" className={`form-editor__canvas ${panel === "canvas" ? "is-active" : ""} ${showPreview ? "is-preview" : ""}`} aria-label={showPreview ? "Pratinjau formulir" : "Pertanyaan formulir"}>
        {showPreview ? <><div className="form-editor__canvas-heading"><h2 className="type-heading-4">Pratinjau formulir</h2><div className="form-editor__actions"><button type="button" aria-pressed={preview === "desktop"} onClick={() => setPreview("desktop")}>Desktop</button><button type="button" aria-pressed={preview === "mobile"} onClick={() => setPreview("mobile")}>Mobile</button></div></div><div className={preview === "mobile" ? "form-editor__mobile-preview" : ""}><FormRenderer schema={draft} preview /></div></> : <>
          <button type="button" className={`form-editor__intro ${!selection ? "is-selected" : ""}`} onClick={() => setSelectionAndPanel(null)}><span className="type-heading-3">{draft.title || "Formulir tanpa judul"}</span><span>{draft.description || "Tambahkan deskripsi formulir"}</span><span className="form-editor__hint">Edit informasi formulir</span></button>
          {draft.sections.map((s, si) => <div className="form-editor__canvas-section" key={s.id}>
            <button type="button" className={`form-editor__section-title ${selection?.section === s.id && !selection.question ? "is-selected" : ""}`} onClick={() => setSelectionAndPanel({ section: s.id })}><span>Bagian {si + 1} dari {draft.sections.length}</span><strong className="type-heading-4">{s.title || "Bagian tanpa judul"}</strong>{s.description && <span>{s.description}</span>}</button>
            {s.questions.map((q, qi) => <article key={q.id} className={`form-editor__card ${selection?.question === q.id ? "is-selected" : ""}`}>
              <button type="button" className="form-editor__card-select" aria-pressed={selection?.question === q.id} onClick={() => setSelectionAndPanel({ section: s.id, question: q.id })}><span className="form-editor__card-type">{types.find(([type]) => type === q.type)?.[1]}</span><strong className="type-heading-5">{q.title || "Pertanyaan tanpa judul"}{q.required && <span aria-label=" wajib diisi"> *</span>}</strong>{q.description && <span>{q.description}</span>}<span className="form-editor__answer" aria-hidden="true">{choiceTypes.includes(q.type) ? q.options.map(o => <span key={o.id}><i className={q.type === "multiple_choice" ? "is-square" : ""} />{o.label || "Pilihan"}</span>) : gridTypes.includes(q.type) ? <span>{q.rows.map(r => r.label || "Baris").join(", ")} / {q.columns.map(c => c.label || "Kolom").join(", ")}</span> : <span>{({ long_text: "Teks jawaban panjang", file: "Unggah berkas", date: "Tanggal", time: "Waktu", datetime: "Tanggal dan waktu", rating: "1  2  3  4  5", linear_scale: "1  2  3  4  5", info: "" } as Record<string, string>)[q.type] ?? "Teks jawaban"}</span>}</span></button>
              <div className="form-editor__card-actions"><button type="button" onClick={() => setSelectionAndPanel({ section: s.id, question: q.id })}>Edit</button><button type="button" aria-label={`Pindah ${q.title} ke atas`} disabled={qi === 0} onClick={() => reorderQuestion(s.id, qi, qi - 1)}><ArrowUp size={16} aria-hidden="true" /></button><button type="button" aria-label={`Pindah ${q.title} ke bawah`} disabled={qi === s.questions.length - 1} onClick={() => reorderQuestion(s.id, qi, qi + 1)}><ArrowDown size={16} aria-hidden="true" /></button><button type="button" onClick={() => { const cloned = cloneQuestion(q); edit(d => { const target = d.sections.find(item => item.id === s.id); if (target) target.questions.splice(qi + 1, 0, cloned); }); setSelectionAndPanel({ section: s.id, question: cloned.id }); }}>Duplikat</button><button type="button" onClick={() => { if (window.confirm("Hapus pertanyaan ini?")) { edit(d => { const target = d.sections.find(item => item.id === s.id); if (target) target.questions = target.questions.filter(item => item.id !== q.id); }); setSelectionAndPanel({ section: s.id }); } }}>Hapus</button></div>
            </article>)}
            <Button type="button" variant="outline" onClick={() => { const q = newQuestion("short_text"); edit(d => d.sections.find(item => item.id === s.id)?.questions.push(q)); setSelectionAndPanel({ section: s.id, question: q.id }); }}>+ Tambah pertanyaan</Button>
          </div>)}
          <Button type="button" variant="outline" onClick={() => { const s = newSection(); edit(d => d.sections.push(s)); setSelectionAndPanel({ section: s.id }); }}>+ Tambah bagian</Button>
        </>}
      </section>
      <aside ref={propertiesRef} className={`form-editor__properties ${panel === "properties" ? "is-active" : ""}`} aria-label="Pengaturan pilihan">
        {question && section ? <><h2>Pertanyaan</h2><SelectField id="editor-question-type" label="Jenis" value={question.type} options={types.map(([value, label]) => ({ value, label }))} onChange={value => { if (value === question.type) return; if (!window.confirm("Mengubah jenis akan mengganti pilihan dan validasi pertanyaan. Lanjutkan?")) return; updateQuestion(q => { const replacement = newQuestion(value as Question["type"]); q.type = replacement.type; q.options = replacement.options; q.rows = replacement.rows; q.columns = replacement.columns; q.validation = replacement.validation; }); }} /><label>Judul<BrandInput value={question.title} onChange={e => updateQuestion(q => { q.title = e.target.value; })} /></label><label>Penjelasan<BrandTextarea value={question.description || ""} onChange={e => updateQuestion(q => { q.description = e.target.value; })} /></label><label className="form-editor__check"><input type="checkbox" checked={question.required} onChange={e => updateQuestion(q => { q.required = e.target.checked; })} /> Wajib diisi</label>
          <FormEditorImage key={question.id} formId={id} label="Gambar pertanyaan" value={question.imageAssetId} onChange={asset => updateQuestion(q => { if (asset) q.imageAssetId = asset; else delete q.imageAssetId; })} />
          {(choiceTypes.includes(question.type) || gridTypes.includes(question.type)) && (gridTypes.includes(question.type) ? (["rows", "columns"] as const) : (["options"] as const)).map(key => <fieldset key={key}><legend>{key === "options" ? "Pilihan" : key === "rows" ? "Baris" : "Kolom"}</legend>{question[key].map((item, i) => <div key={item.id}><div className="form-editor__row"><BrandInput aria-label={`${key} ${i + 1}`} value={item.label} onChange={e => updateQuestion(q => { const target = q[key].find(o => o.id === item.id); if (target) target.label = e.target.value; })} /><button type="button" aria-label={`Hapus ${item.label}`} onClick={() => updateQuestion(q => { q[key] = q[key].filter(o => o.id !== item.id); })}>Hapus</button></div>{key === "options" && <FormEditorImage formId={id} label={`Gambar untuk ${item.label || "pilihan"}`} value={item.imageAssetId} onChange={asset => updateQuestion(q => { const option = q.options.find(o => o.id === item.id); if (option) { if (asset) option.imageAssetId = asset; else delete option.imageAssetId; } })} />}</div>)}<button type="button" onClick={() => updateQuestion(q => { q[key].push({ id: uid(), label: "" }); })}>Tambah</button></fieldset>)}
          {choiceTypes.includes(question.type) && <label className="form-editor__check"><input type="checkbox" checked={question.allowOther || false} onChange={e => updateQuestion(q => { q.allowOther = e.target.checked; })} /> Izinkan jawaban lain</label>}
          <fieldset><legend>Validasi</legend>{([
            ...(["short_text", "long_text"].includes(question.type) ? [["minLength", "Panjang minimum"], ["maxLength", "Panjang maksimum"]] : []),
            ...(["number", "linear_scale", "rating"].includes(question.type) ? [["min", "Nilai minimum"], ["max", "Nilai maksimum"]] : []),
            ...(question.type === "multiple_choice" ? [["minSelections", "Pilihan minimum"], ["maxSelections", "Pilihan maksimum"]] : []),
            ...(question.type === "file" ? [["maxFileSize", "Ukuran maksimum per berkas (byte)"], ["maxFiles", "Jumlah maksimum berkas"]] : []),
          ] as [keyof Question["validation"], string][]).map(([key, label]) => <label key={key}>{label}<BrandInput type="number" value={String(question.validation[key] ?? "")} onChange={e => updateQuestion(q => { const v = q.validation as Record<string, unknown>; if (e.target.value === "") delete v[key]; else v[key] = Number(e.target.value); })} /></label>)}
          {["date", "datetime"].includes(question.type) && (["minDate", "maxDate"] as const).map((key, i) => <label key={key}>{i ? "Tanggal maksimum" : "Tanggal minimum"}<BrandInput type={question.type === "datetime" ? "datetime-local" : "date"} value={question.validation[key] || ""} onChange={e => updateQuestion(q => { if (e.target.value) q.validation[key] = e.target.value; else delete q.validation[key]; })} /></label>)}
          {question.type === "file" && <label>Jenis berkas yang diizinkan (pisahkan dengan koma)<BrandInput key={question.id} defaultValue={(question.validation.allowedTypes || []).join(", ")} onBlur={e => updateQuestion(q => { q.validation.allowedTypes = e.target.value.split(",").map(x => x.trim()).filter(Boolean); })} /></label>}
          <label>Pesan kesalahan<BrandInput value={question.validation.message || ""} onChange={e => updateQuestion(q => { q.validation.message = e.target.value; })} /></label></fieldset>
          <div className="form-editor__actions"><Button type="button" variant="outline" onClick={() => { const cloned = cloneQuestion(question); updateSection(s => { const index = s.questions.findIndex(q => q.id === question.id); s.questions.splice(index + 1, 0, cloned); }); setSelection({ section: section.id, question: cloned.id }); }}>Duplikat</Button><Button type="button" variant="outline" onClick={() => { if (window.confirm("Hapus pertanyaan ini?")) { updateSection(s => { s.questions = s.questions.filter(q => q.id !== question.id); }); setSelection({ section: section.id }); } }}>Hapus</Button></div>
        </> : section ? <><h2>Bagian</h2><label>Judul<BrandInput value={section.title} onChange={e => updateSection(s => { s.title = e.target.value; })} /></label><label>Penjelasan<BrandTextarea value={section.description || ""} onChange={e => updateSection(s => { s.description = e.target.value; })} /></label>
          <fieldset><legend>Percabangan</legend><SelectField id="route-question" label="Pertanyaan penentu" value={section.routing?.questionId || ""} options={[{ value: "", label: "Lanjut sesuai urutan" }, ...section.questions.filter(q => ["single_choice", "dropdown"].includes(q.type)).map(q => ({ value: q.id, label: q.title || "Pertanyaan tanpa judul" }))]} onChange={value => { if (section.routing && value !== section.routing.questionId && !window.confirm("Mengganti pertanyaan akan menghapus aturan percabangan bagian ini. Lanjutkan?")) return; updateSection(s => { if (value) s.routing = { questionId: value, choices: {} }; else delete s.routing; }); }} />{section.routing && <>{section.questions.find(q => q.id === section.routing?.questionId)?.options.map(option => <SelectField key={option.id} id={`route-${option.id}`} label={option.label || "Pilihan tanpa judul"} value={section.routing?.choices[option.id] || ""} options={[{ value: "", label: "Lanjut sesuai urutan" }, ...draft.sections.slice(draft.sections.indexOf(section) + 1).map(s => ({ value: s.id, label: s.title || "Bagian tanpa judul" }))]} onChange={value => updateSection(s => { if (!s.routing) return; if (value) s.routing.choices[option.id] = value; else delete s.routing.choices[option.id]; })} />)}<SelectField id="route-default" label="Jika tidak ada pilihan yang cocok" value={section.routing.defaultSectionId || ""} options={[{ value: "", label: "Lanjut sesuai urutan" }, ...draft.sections.slice(draft.sections.indexOf(section) + 1).map(s => ({ value: s.id, label: s.title || "Bagian tanpa judul" }))]} onChange={value => updateSection(s => { if (!s.routing) return; if (value) s.routing.defaultSectionId = value; else delete s.routing.defaultSectionId; })} /></>}</fieldset>
          <div className="form-editor__actions"><Button type="button" variant="outline" onClick={() => { const cloned = copy(section); cloned.id = uid(); cloned.questions = cloned.questions.map(cloneQuestion); delete cloned.routing; edit(d => { const index = d.sections.findIndex(s => s.id === section.id); d.sections.splice(index + 1, 0, cloned); }); setSelection({ section: cloned.id }); }}>Duplikat</Button><Button type="button" variant="outline" disabled={draft.sections.length <= 1} onClick={() => { if (window.confirm("Hapus bagian dan seluruh pertanyaannya?")) { edit(d => { d.sections = d.sections.filter(s => s.id !== section.id); }); setSelection(null); } }}>Hapus</Button></div></> : <><h2>Formulir</h2><label>Judul<BrandInput value={draft.title} onChange={e => edit(d => { d.title = e.target.value; })} /></label><label>Deskripsi<BrandTextarea value={draft.description || ""} onChange={e => edit(d => { d.description = e.target.value; })} /></label><label>Petunjuk awal<BrandTextarea value={draft.welcomeText || ""} onChange={e => edit(d => { d.welcomeText = e.target.value; })} /></label><FormEditorImage formId={id} label="Gambar header" value={draft.headerAssetId} onChange={asset => edit(d => { if (asset) d.headerAssetId = asset; else delete d.headerAssetId; })} /><FormEditorImage formId={id} label="Logo" value={draft.logoAssetId} onChange={asset => edit(d => { if (asset) d.logoAssetId = asset; else delete d.logoAssetId; })} /><label>Pesan setelah pengiriman<BrandTextarea value={draft.settings.confirmationMessage} onChange={e => edit(d => { d.settings.confirmationMessage = e.target.value; })} /></label><label>Alamat formulir<BrandInput value={slug} onChange={e => setSlug(e.target.value)} /></label><Button type="button" variant="outline" disabled={slug === form.slug} onClick={saveSlug}>Simpan alamat</Button><p>Perubahan alamat dapat memengaruhi tautan yang sudah dibagikan.</p><Link href={`/admin/forms/${encodeURIComponent(id)}/settings`}>Pengaturan warna dan formulir</Link></>}
      </aside>
    </div></fieldset>
  </main>;
}
