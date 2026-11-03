"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/forms/schema";
import { MAX_FILE_SIZE, validateUpload } from "@/lib/storage/policy";

export type UploadItem = { id: string; assetId?: string; name: string; progress: number; error?: string };
type Props = { items: UploadItem[]; setItems: React.Dispatch<React.SetStateAction<UploadItem[]>>; question: Question; slug: string; revisionId: string; uploadSessionId: string; value: string[]; onChange: (ids: string[]) => void; onUploadingChange: (uploading: boolean) => void; disabled?: boolean; id?: string; "aria-describedby"?: string };

export function FileUpload({ items, setItems, question, slug, revisionId, uploadSessionId, value, onChange, onUploadingChange, disabled, id, ...accessibility }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const request = async (body: object) => { const response = await fetch(`/api/forms/${encodeURIComponent(slug)}/uploads`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, revisionId, questionId: question.id, uploadSessionId }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Unggah gagal"); return result; };
  const remove = async (item: UploadItem) => {
    if (busy.current) return;
    busy.current = true; setUploading(true); onUploadingChange(true); setError("");
    try {
      if (item.assetId || value.includes(item.id)) await request({ action: "remove", assetId: item.assetId ?? item.id });
      setItems(current => current.filter(x => x.id !== item.id)); onChange(value.filter(id => id !== item.id));
    } catch { setError("Berkas belum dihapus. Coba lagi."); }
    finally { busy.current = false; setUploading(false); onUploadingChange(false); }
  };
  const upload = async (file: File) => {
    if (busy.current) return;
    const localId = crypto.randomUUID();
    const update = (change: Partial<UploadItem>) => setItems(current => current.map(item => item.id === localId ? { ...item, ...change } : item));
    setItems(current => [...current, { id: localId, name: file.name, progress: 0 }]);
    if (!validateUpload({ filename: file.name, contentType: file.type, size: file.size }, question.validation)) { update({ error: "Jenis atau ukuran berkas tidak sesuai." }); return; }
    busy.current = true;
    setUploading(true); onUploadingChange(true);
    try {
      const start = await request({ action: "start", filename: file.name, contentType: file.type, size: file.size });
      update({ assetId: start.assetId });
      await new Promise<void>((resolve, reject) => { const xhr = new XMLHttpRequest(); xhr.open("POST", start.url); xhr.upload.onprogress = event => { if (event.lengthComputable) update({ progress: Math.round(event.loaded / event.total * 100) }); }; xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Unggah gagal")); xhr.onerror = () => reject(new Error("Koneksi terputus")); const data = new FormData(); for (const [key, val] of Object.entries(start.fields)) data.append(key, String(val)); data.append("file", file); xhr.send(data); });
      await request({ action: "complete", assetId: start.assetId });
      setItems(current => current.map(item => item.id === localId ? { ...item, id: start.assetId, progress: 100 } : item));
      onChange([...value, start.assetId]);
    } catch { update({ error: "Unggah gagal. Pilih berkas kembali untuk mencoba lagi." }); }
    finally { busy.current = false; setUploading(false); onUploadingChange(false); }
  };
  return <div className="space-y-3"><input {...accessibility} id={id} type="file" accept={question.validation.allowedTypes?.join(",")} disabled={disabled || uploading || value.length >= (question.validation.maxFiles ?? 1)} onChange={event => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void upload(file); }} /><p className="type-caption">JPEG, PNG, GIF, WebP, atau PDF sesuai batas pertanyaan. Maksimum {Math.floor(Math.min(question.validation.maxFileSize ?? MAX_FILE_SIZE, MAX_FILE_SIZE) / 1024 / 1024)} MB per berkas.</p>{error && <p role="alert">{error}</p>}<ul className="space-y-2">{items.map(item => <li key={item.id} className="flex flex-wrap items-center gap-3"><span>{item.name}</span>{!item.error && item.progress < 100 && <progress value={item.progress} max={100} aria-label={`Mengunggah ${item.name}`} />}{item.error && <span role="alert">{item.error}</span>}<Button type="button" variant="outline" disabled={disabled || uploading} onClick={() => void remove(item)}>Hapus</Button></li>)}</ul></div>;
}
