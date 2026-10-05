"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, type DragEvent, type PointerEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Circle, Copy, Download, Layers, Redo2, Save, Square, Trash2, Type, Undo2, Upload, Heart, Sparkles, ImagePlus } from "lucide-react";

type Kind = "text" | "circle" | "arch" | "heart" | "sparkle" | "line" | "image";
type Element = { id: string; kind: Kind; text: string; imageData?: string; x: number; y: number; width: number; height: number; rotation: number; color: string; fontSize: number; font: "heading" | "body" | "serif" };
type Document = { version: 1; background: string; elements: Element[] };
const storageKey = "temura-studio-demo-v1";
const initial: Document = { version: 1, background: "#fffdf8", elements: [
  { id: "names", kind: "text", text: "Nara & Aruna", x: 42, y: 264, width: 316, height: 75, rotation: 0, color: "#234739", fontSize: 36, font: "serif" },
  { id: "caption", kind: "text", text: "12.12.2027", x: 40, y: 340, width: 320, height: 30, rotation: 0, color: "#617367", fontSize: 11, font: "body" },
] };
const assets: { kind: Kind; label: string; icon: typeof Type }[] = [
  { kind: "text", label: "Teks", icon: Type }, { kind: "arch", label: "Lengkung", icon: Square },
  { kind: "circle", label: "Lingkaran", icon: Circle }, { kind: "heart", label: "Hati", icon: Heart },
  { kind: "sparkle", label: "Bintang", icon: Sparkles }, { kind: "line", label: "Garis", icon: ArrowLeft },
];
function validDocument(value: unknown): value is Document {
  if (!value || typeof value !== "object") return false;
  const doc = value as Document;
  return doc.version === 1 && /^#[\da-f]{6}$/i.test(doc.background) && Array.isArray(doc.elements) && doc.elements.length <= 100 && new Set(doc.elements.map((e) => e?.id)).size === doc.elements.length && doc.elements.every((e) =>
    e && typeof e.id === "string" && (assets.some((a) => a.kind === e.kind) || (e.kind === "image" && typeof e.imageData === "string" && e.imageData.length <= 3000000 && /^data:image\/(png|jpeg|webp);base64,[a-z\d+/=]+$/i.test(e.imageData))) && typeof e.text === "string" && e.text.length <= 2000 && /^#[\da-f]{6}$/i.test(e.color) && ["heading", "body", "serif"].includes(e.font) &&
    [e.x, e.y, e.width, e.height, e.rotation, e.fontSize].every((n) => typeof n === "number" && Number.isFinite(n)) && e.x >= 0 && e.x <= 400 && e.y >= 0 && e.y <= 640 && e.width >= 10 && e.width <= 400 && e.height >= 10 && e.height <= 640 && e.fontSize >= 8 && e.fontSize <= 100 && Math.abs(e.rotation) <= 360);
}
function Shape({ element }: { element: Element }) {
  if (element.kind === "image") return <span className="studio-canvas-image" style={{ backgroundImage: `url(${element.imageData})` }} />;
  if (element.kind === "text") return <span className={`studio-canvas-text studio-font-${element.font}`} style={{ fontSize: `${element.fontSize / 4}cqw` }}>{element.text}</span>;
  return <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" fill="currentColor">
    {element.kind === "circle" && <circle cx="50" cy="50" r="46" />}
    {element.kind === "arch" && <path d="M5 95V48a45 45 0 0 1 90 0v47Z" fill="none" stroke="currentColor" strokeWidth="3" />}
    {element.kind === "heart" && <path d="M50 90 12 52C-12 27 26-3 50 22 74-3 112 27 88 52Z" />}
    {element.kind === "sparkle" && <path d="M50 0 61 39 100 50 61 61 50 100 39 61 0 50 39 39Z" />}
    {element.kind === "line" && <path d="M2 50H98" stroke="currentColor" strokeWidth="3" />}
  </svg>;
}

export function StudioEditor() {
  const [document, setDocument] = useState<Document>(initial);
  const [selected, setSelected] = useState<string | null>("names");
  const [past, setPast] = useState<Document[]>([]);
  const [future, setFuture] = useState<Document[]>([]);
  const [message, setMessage] = useState("Draf lokal · Belum disimpan");
  const [mobilePanel, setMobilePanel] = useState("assets");
  const canvas = useRef<HTMLDivElement>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const gesture = useRef<{ id: string; startX: number; startY: number; x: number; y: number; before: Document } | null>(null);
  const active = document.elements.find((element) => element.id === selected);
  function commit(next: Document) {
    if (JSON.stringify(next) === JSON.stringify(document)) return;
    setPast((history) => [...history.slice(-49), document]); setFuture([]); setDocument(next); setMessage("Draf lokal · Belum disimpan");
  }
  function update(patch: Partial<Element>) {
    commit({ ...document, elements: document.elements.map((e) => e.id === selected ? { ...e, ...patch } : e) });
  }
  function add(kind: Kind, x = 140, y = 180) {
    if (document.elements.length >= 100) { setMessage("Draf demo maksimal 100 elemen."); return; }
    const element: Element = { id: crypto.randomUUID(), kind, text: "Tulis cerita kalian", x: Math.max(0, Math.min(280, x)), y: Math.max(0, Math.min(540, y)), width: kind === "text" ? 240 : 100, height: kind === "text" ? 60 : kind === "line" ? 15 : 100, color: "#416853", rotation: 0, fontSize: 24, font: "heading" };
    commit({ ...document, elements: [...document.elements, element] }); setSelected(element.id); setMobilePanel("properties");
  }
  function reorder(direction: number) {
    const elements = [...document.elements]; const index = elements.findIndex((e) => e.id === selected); const next = index + direction;
    if (index < 0 || next < 0 || next >= elements.length) return;
    [elements[index], elements[next]] = [elements[next], elements[index]]; commit({ ...document, elements });
  }
  function undo() {
    if (!past.length) return; setFuture((history) => [document, ...history]); setDocument(past[past.length - 1]); setPast(past.slice(0, -1)); setMessage("Draf lokal · Belum disimpan");
  }
  function redo() {
    if (!future.length) return; setPast((history) => [...history, document]); setDocument(future[0]); setFuture(future.slice(1)); setMessage("Draf lokal · Belum disimpan");
  }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(document)); setMessage("Draf lokal · Tersimpan di browser ini"); }
    catch { setMessage("Browser tidak dapat menyimpan draf. Unduh JSON sebagai cadangan."); }
  }
  function load() {
    try { const raw = localStorage.getItem(storageKey); if (!raw) { setMessage("Belum ada draf tersimpan di browser ini."); return; } const value: unknown = JSON.parse(raw); if (!validDocument(value)) throw new Error(); commit(value); setSelected(null); setMessage("Draf lokal dibuka."); }
    catch { setMessage("Draf lokal tidak dapat dibuka. Coba impor file JSON yang valid."); }
  }
  function exportDocument() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(document, null, 2)], { type: "application/json" })); const link = window.document.createElement("a"); link.href = url; link.download = "temura-studio-draf.json"; link.click(); URL.revokeObjectURL(url); setMessage("Draf JSON diunduh.");
  }
  async function importDocument(file: File | undefined) {
    if (!file) return;
    try { if (file.size > 8000000) throw new Error(); const value: unknown = JSON.parse(await file.text()); if (!validDocument(value)) throw new Error(); commit(value); setSelected(null); setMessage("Draf JSON berhasil diimpor."); }
    catch { setMessage("File tidak valid. Gunakan JSON yang diekspor dari Studio Temura."); }
  }
  async function uploadImage(file: File | undefined) {
    if (!file) return;
    if (document.elements.length >= 100 || !["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 2000000) { setMessage("Gunakan PNG, JPG, atau WebP maksimal 2 MB. Draf maksimal 100 elemen."); return; }
    try {
      const imageData = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); });
      const element: Element = { id: crypto.randomUUID(), kind: "image", imageData, text: file.name.slice(0, 100), x: 90, y: 180, width: 220, height: 220, rotation: 0, color: "#416853", fontSize: 24, font: "body" };
      const next = { ...document, elements: [...document.elements, element] }; if (JSON.stringify(next).length > 8000000) { setMessage("Draf terlalu besar. Hapus beberapa gambar sebelum menambah gambar baru."); return; }
      commit(next); setSelected(element.id); setMobilePanel("properties"); setMessage("Gambar ditambahkan · Lokal di browser ini");
    } catch { setMessage("Gambar tidak dapat dibaca. Coba file lain."); }
  }
  function startMove(event: PointerEvent<HTMLButtonElement>, element: Element) {
    if (event.button !== 0) return; event.stopPropagation(); setSelected(element.id); setMobilePanel("properties");
    gesture.current = { id: element.id, startX: event.clientX, startY: event.clientY, x: element.x, y: element.y, before: document }; event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const drag = gesture.current; const rect = canvas.current?.getBoundingClientRect(); if (!drag || !rect) return;
    const x = Math.max(0, Math.min(390, drag.x + (event.clientX - drag.startX) * 400 / rect.width));
    const y = Math.max(0, Math.min(630, drag.y + (event.clientY - drag.startY) * 640 / rect.height));
    setDocument((doc) => ({ ...doc, elements: doc.elements.map((e) => e.id === drag.id ? { ...e, x: Math.round(x), y: Math.round(y) } : e) }));
  }
  function finishMove(event: PointerEvent<HTMLButtonElement>) {
    const drag = gesture.current; if (!drag) return; gesture.current = null;
    if (event.type === "pointercancel") { setDocument(drag.before); return; }
    if (JSON.stringify(document) !== JSON.stringify(drag.before)) { setPast((history) => [...history.slice(-49), drag.before]); setFuture([]); setMessage("Draf lokal · Belum disimpan"); }
  }
  function drop(event: DragEvent) {
    event.preventDefault(); const kind = event.dataTransfer.getData("temura-element"); const rect = canvas.current?.getBoundingClientRect();
    if (rect && assets.some((a) => a.kind === kind)) add(kind as Kind, (event.clientX - rect.left) * 400 / rect.width - 50, (event.clientY - rect.top) * 640 / rect.height - 50);
  }
  return <main className="temura-studio">
    <header className="studio-header">
      <div className="studio-brand"><Link href="/" className="studio-back" aria-label="Kembali ke Temura"><ArrowLeft size={18} /><Image src="/brand/logos/light/temura-horizontal-light.svg" alt="Temura" width={136} height={34} /></Link><span className="studio-divider" /><h1 className="type-heading-5">Studio</h1></div>
      <div className="studio-top-actions"><button className="studio-icon" onClick={undo} disabled={!past.length} aria-label="Urungkan"><Undo2 size={18} /></button><button className="studio-icon" onClick={redo} disabled={!future.length} aria-label="Ulangi"><Redo2 size={18} /></button><button className="studio-button type-label" onClick={load}>Buka draf</button><button className="studio-button studio-primary type-label" onClick={save}><Save size={16} />Simpan lokal</button></div>
    </header>
    <div className="studio-mobile-tabs" aria-label="Panel studio">{[{ id: "assets", label: "Elemen" }, { id: "properties", label: "Pengaturan" }, { id: "layers", label: "Layer" }].map((tab) => <button key={tab.id} className="type-label" aria-pressed={mobilePanel === tab.id} onClick={() => setMobilePanel(tab.id)}>{tab.label}</button>)}</div>
    <div className="studio-workspace">
      <aside className={`studio-assets ${mobilePanel === "assets" ? "studio-panel-visible" : ""}`}>
        <div className="studio-panel-title"><h2 className="type-heading-5">Elemen</h2></div>
        <div className="studio-asset-grid">{assets.map(({ kind, label, icon: Icon }) => <button className="studio-asset type-label" key={kind} draggable onDragStart={(e) => e.dataTransfer.setData("temura-element", kind)} onClick={() => add(kind)} title="Klik atau tarik ke kanvas"><Icon size={20} strokeWidth={1.5} /><span>{label}</span></button>)}</div>
        <button className="studio-button studio-upload type-label" onClick={() => imageInput.current?.click()}><ImagePlus size={18} />Tambah gambar</button><input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => { void uploadImage(e.target.files?.[0]); e.target.value = ""; }} /><p className="type-caption studio-muted">PNG, JPG, WebP · Maks. 2 MB per gambar</p>
        <label className="studio-field type-label">Warna kanvas<input type="color" value={document.background} onChange={(e) => commit({ ...document, background: e.target.value })} /></label>
        <div className="studio-file-actions"><button className="studio-button type-label" onClick={exportDocument}><Download size={16} />Unduh JSON</button><button className="studio-button type-label" onClick={() => importInput.current?.click()}><Upload size={16} />Impor JSON</button><input ref={importInput} type="file" accept="application/json,.json" hidden onChange={(e) => { void importDocument(e.target.files?.[0]); e.target.value = ""; }} /></div>
      </aside>
      <section className="studio-stage" aria-label="Kanvas desain">
        <div className="studio-stage-caption"><span className="type-label">Kanvas</span><span className="type-caption">400 × 640</span></div>
        <div className="studio-canvas-wrap"><div ref={canvas} className="studio-canvas" style={{ background: document.background }} onDragOver={(e) => e.preventDefault()} onDrop={drop} onPointerDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          {document.elements.map((element) => <button key={element.id} className={`studio-element ${selected === element.id ? "studio-selected" : ""}`} aria-label={`${element.kind === "text" || element.kind === "image" ? element.text : assets.find((a) => a.kind === element.kind)?.label}. Pilih dan geser dengan tombol panah.`} aria-pressed={selected === element.id} style={{ left: `${element.x / 4}%`, top: `${element.y / 6.4}%`, width: `${element.width / 4}%`, height: `${element.height / 6.4}%`, transform: `rotate(${element.rotation}deg)`, color: element.color }} onPointerDown={(e) => startMove(e, element)} onPointerMove={move} onPointerUp={finishMove} onPointerCancel={finishMove} onFocus={() => setSelected(element.id)} onKeyDown={(e) => { const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }; const direction = directions[e.key]; if (direction) { e.preventDefault(); const step = e.shiftKey ? 10 : 1; update({ x: Math.max(0, Math.min(390, element.x + direction[0] * step)), y: Math.max(0, Math.min(630, element.y + direction[1] * step)) }); } }}><Shape element={element} /></button>)}
        </div></div>
      </section>
      <aside className="studio-inspector">
        <section className={`studio-properties ${mobilePanel === "properties" ? "studio-panel-visible" : ""}`}>
          <h2 className="type-heading-5">Pengaturan</h2>
          {active ? <><p className="type-caption studio-muted">{active.kind === "image" ? "Gambar lokal" : assets.find((a) => a.kind === active.kind)?.label}</p>
            {active.kind === "text" && <><label className="studio-field type-label">Teks<textarea className="type-body" maxLength={2000} value={active.text} onChange={(e) => update({ text: e.target.value })} /></label><label className="studio-field type-label">Font<select className="type-body" value={active.font} onChange={(e) => update({ font: e.target.value as Element["font"] })}><option value="heading">Manrope</option><option value="body">Inter</option><option value="serif">Cormorant Garamond</option></select></label><label className="studio-field type-label">Ukuran teks<input className="type-body" type="number" min={8} max={100} value={active.fontSize} onChange={(e) => update({ fontSize: Math.max(8, Math.min(100, Number(e.target.value))) })} /></label></>}
            <div className="studio-transform-grid">{([{ key: "x", label: "Posisi X", min: 0, max: 390 }, { key: "y", label: "Posisi Y", min: 0, max: 630 }, { key: "width", label: "Lebar", min: 10, max: 400 }, { key: "height", label: "Tinggi", min: 10, max: 640 }, { key: "rotation", label: "Rotasi °", min: -360, max: 360 }] as const).map((field) => <label className="studio-field type-label-sm" key={field.key}>{field.label}<input className="type-body" type="number" min={field.min} max={field.max} value={active[field.key]} onChange={(e) => update({ [field.key]: Math.max(field.min, Math.min(field.max, Number(e.target.value))) })} /></label>)}</div>
            {active.kind !== "image" && <label className="studio-field type-label">Warna elemen<input type="color" value={active.color} onChange={(e) => update({ color: e.target.value })} /></label>}
            <div className="studio-element-actions"><button className="studio-button type-label" disabled={document.elements.length >= 100} onClick={() => { const copy = { ...active, id: crypto.randomUUID(), x: Math.min(390, active.x + 15), y: Math.min(630, active.y + 15) }; commit({ ...document, elements: [...document.elements, copy] }); setSelected(copy.id); }}><Copy size={16} />Duplikat</button><button className="studio-icon studio-delete" aria-label="Hapus elemen" onClick={() => { commit({ ...document, elements: document.elements.filter((e) => e.id !== selected) }); setSelected(null); }}><Trash2 size={18} /></button></div>
          </> : <p className="type-body-sm studio-muted">Pilih elemen.</p>}
        </section>
        <section className={`studio-layers ${mobilePanel === "layers" ? "studio-panel-visible" : ""}`}><div className="studio-layer-heading"><h2 className="type-heading-5"><Layers size={18} />Layer</h2><div><button className="studio-icon" disabled={!active || document.elements.at(-1)?.id === selected} onClick={() => reorder(1)} aria-label="Naikkan layer"><ArrowUp size={16} /></button><button className="studio-icon" disabled={!active || document.elements[0]?.id === selected} onClick={() => reorder(-1)} aria-label="Turunkan layer"><ArrowDown size={16} /></button></div></div><p className="type-caption studio-muted">Layer teratas tampil di depan.</p><div className="studio-layer-list">{[...document.elements].reverse().map((e) => <button className="studio-layer type-label" aria-pressed={selected === e.id} key={e.id} onClick={() => { setSelected(e.id); setMobilePanel("properties"); }}><span className="studio-layer-dot" style={{ background: e.color }} />{e.kind === "text" || e.kind === "image" ? e.text || "Teks kosong" : assets.find((a) => a.kind === e.kind)?.label}</button>)}{!document.elements.length && <p className="type-body-sm">Belum ada elemen. Tambahkan dari panel Elemen.</p>}</div></section>
      </aside>
    </div>
    <footer className="studio-status"><p className="type-caption" role="status">{message}</p><Link className="type-label-sm" href="/fitur">Lihat fitur Temura</Link></footer>
  </main>;
}
