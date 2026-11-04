"use client";
import { Button } from "@/components/ui/button";
import { BrandInput, BrandTextarea } from "@/components/ui/form-controls";
import type { FormSchema } from "@/lib/forms/schema";

export function FormSettings({ draft, edit, slug, setSlug, savedSlug, saveSlug }: { draft: FormSchema; edit: (change: (next: FormSchema) => void) => void; slug: string; setSlug: (value: string) => void; savedSlug: string; saveSlug: () => void | Promise<void> }) {
 return <div className="admin-page max-w-4xl space-y-6">
  <section className="admin-surface space-y-5"><div><h2 className="type-heading-4">Informasi formulir</h2><p className="admin-muted mt-1">Atur tautan dan pesan konfirmasi.</p></div>
   <label className="block space-y-2"><span className="type-label">Slug tautan</span><BrandInput required value={slug} onChange={e => setSlug(e.target.value)} /><span className="admin-muted block type-body-sm">Tautan lama tetap mengarah ke formulir ini.</span></label>
   <Button type="button" variant="outline" disabled={!slug || slug === savedSlug} onClick={() => void saveSlug()}>Simpan alamat</Button>
   <label className="block space-y-2"><span className="type-label">Pesan setelah dikirim</span><BrandTextarea value={draft.settings.confirmationMessage} onChange={e => edit(d => { d.settings.confirmationMessage = e.target.value; })} /></label>
  </section>
  <section className="admin-surface space-y-5"><div><h2 className="type-heading-4">Tampilan</h2><p className="admin-muted mt-1">Pilih warna untuk formulir publik.</p></div><div className="admin-color-fields">{([{key:"accent",label:"Warna aksen",fallback:"#22c55e"},{key:"background",label:"Warna latar",fallback:"#ffffff"}] as const).map(({key,label,fallback}) => <label key={key} className="admin-color-field"><span className="type-label">{label}</span><input type="color" value={/^#[0-9a-f]{6}$/i.test(draft.settings[key]) ? draft.settings[key] : fallback} onChange={e => edit(d => { d.settings[key] = e.target.value; })} /></label>)}</div></section>
  <section className="admin-surface space-y-5"><div><h2 className="type-heading-4">Penerimaan jawaban</h2><p className="admin-muted mt-1">Atur batas dan waktu penutupan otomatis.</p></div>
   <label className="block space-y-2"><span className="type-label">Batas jumlah jawaban</span><BrandInput type="number" min={1} max={1000000} step={1} placeholder="Tanpa batas" value={draft.settings.maxResponses ?? ""} onChange={e => { const value = e.target.value; edit(d => { d.settings.maxResponses = value === "" ? undefined : Number(value); }); }} /></label>
   <label className="block space-y-2"><span className="type-label">Tutup otomatis (UTC)</span><BrandInput type="datetime-local" value={draft.settings.closesAt?.slice(0,16) ?? ""} onChange={e => { const value = e.target.value; edit(d => { d.settings.closesAt = value ? new Date(`${value}Z`).toISOString() : undefined; }); }} /></label>
  </section><p className="admin-muted type-body-sm">Perubahan disimpan otomatis. Publikasikan agar berlaku pada formulir publik.</p>
 </div>;
}
