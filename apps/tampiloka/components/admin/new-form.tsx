"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api, post, type AdminForm } from "./api";
export function NewForm() {
 const router = useRouter(); const [title, setTitle] = useState(""); const [template, setTemplate] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
 async function submit(e: React.FormEvent) { e.preventDefault(); setBusy(true); setError(""); try { const data = await api<{form: AdminForm}>("/api/admin/forms", post({ title, ...(template ? { template } : {}) })); router.push(`/admin/forms/${encodeURIComponent(data.form.id)}/edit`); } catch (e) { setError(e instanceof Error ? e.message : "Gagal membuat formulir."); setBusy(false); } }
 return <div className="max-w-xl space-y-6"><h1 className="type-heading-1">Formulir baru</h1><form onSubmit={submit} className="space-y-5"><label className="block space-y-2"><span>Nama formulir</span><input required maxLength={200} value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded border bg-background p-3" /></label><label className="block space-y-2"><span>Mulai dari</span><select value={template} onChange={e => setTemplate(e.target.value)} className="w-full rounded border bg-background p-3"><option value="">Formulir kosong</option><option value="wedding">Data undangan pernikahan</option></select></label>{error && <p role="alert">{error}</p>}<Button type="submit" disabled={busy}>{busy ? "Membuat..." : "Buat formulir"}</Button></form></div>;
}
