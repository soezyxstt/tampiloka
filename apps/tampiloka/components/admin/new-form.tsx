"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BrandInput } from "@/components/ui/form-controls";
import { api, post, type AdminForm } from "./api";
export function NewForm() {
 const router = useRouter(); const [title, setTitle] = useState(""); const [template, setTemplate] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
 async function submit(e: React.FormEvent) { e.preventDefault(); setBusy(true); setError(""); try { const data = await api<{form: AdminForm}>("/api/admin/forms", post({ title, ...(template ? { template } : {}) })); router.push(`/admin/forms/${encodeURIComponent(data.form.id)}/edit`); } catch (e) { setError(e instanceof Error ? e.message : "Gagal membuat formulir."); setBusy(false); } }
 return <div className="admin-page max-w-2xl space-y-6"><div><h1 className="type-heading-1">Formulir baru</h1><p className="admin-muted mt-2">Beri nama dan pilih titik awal untuk formulir Anda.</p></div><form onSubmit={submit} className="admin-surface space-y-6"><label className="block space-y-2"><span className="type-label">Nama formulir</span><BrandInput required maxLength={200} value={title} onChange={e => setTitle(e.target.value)} placeholder="Contoh: Pendaftaran acara" /></label><fieldset><legend className="type-label mb-3">Mulai dari</legend><div className="admin-starters">{[{value:"",title:"Formulir kosong",description:"Susun pertanyaan dari awal."},{value:"wedding",title:"Data undangan pernikahan",description:"Mulai dengan pertanyaan untuk undangan."}].map(item => <label key={item.value} className="admin-starter"><input type="radio" name="template" value={item.value} checked={template === item.value} onChange={e => setTemplate(e.target.value)} /><span><strong>{item.title}</strong><small>{item.description}</small></span></label>)}</div></fieldset>{error && <p role="alert" className="admin-error">{error}</p>}<Button type="submit" disabled={busy}>{busy ? "Membuat..." : "Buat formulir"}</Button></form></div>;
}
