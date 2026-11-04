"use client";

import { useId, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { AdminIconButton } from "./admin-ui";

export function FormEditorImage({ formId, label, value, onChange }: { formId: string; label: string; value?: string; onChange: (id: string | undefined) => void }) {
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const upload = async (file: File) => {
    setError(""); setProgress(0);
    const notification = toast.loading("Mengunggah gambar…");
    try {
      const request = async (body: object) => {
        const response = await fetch("/api/admin/uploads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, formId }) });
        const data = await response.json(); if (!response.ok) throw new Error(data.error || "Unggah gagal."); return data;
      };
      const signed = await request({ action: "start", filename: file.name, contentType: file.type, size: file.size });
      const data = new FormData(); Object.entries(signed.fields as Record<string, string>).forEach(([key, field]) => data.append(key, field)); data.append("file", file);
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest(); xhr.open("POST", signed.url);
        xhr.upload.onprogress = event => { if (event.lengthComputable) setProgress(Math.round(event.loaded * 100 / event.total)); };
        xhr.onerror = () => reject(new Error("Unggah gagal. Pilih berkas untuk mencoba lagi."));
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Penyimpanan menolak unggahan."));
        xhr.send(data);
      });
      await request({ action: "complete", assetId: signed.assetId }); onChange(signed.assetId);
      toast.success("Gambar siap digunakan.", { id: notification });
    } catch (e) { const message = e instanceof Error ? e.message : "Unggah gagal."; setError(message); toast.error(message, { id: notification }); }
    finally { setProgress(null); }
  };
  return <div className="form-editor-image">
    {value && <img className="form-editor-image__preview" src={`/api/forms/assets/${encodeURIComponent(value)}`} alt={label} />}
    <div className="form-editor-image__tools"><AdminIconButton label={`${value ? "Ganti" : "Tambahkan"} ${label.toLowerCase()}`} disabled={progress !== null} onClick={() => input.current?.click()}><ImagePlus size={18} aria-hidden="true" /></AdminIconButton>{value && <AdminIconButton label={`Hapus ${label.toLowerCase()}`} disabled={progress !== null} onClick={() => onChange(undefined)}><X size={16} aria-hidden="true" /></AdminIconButton>}</div>
    <input ref={input} id={inputId} aria-label={label} hidden type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={progress !== null} onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; if (file) void upload(file); }} />
    {progress !== null && <div role="status"><progress value={progress} max={100} aria-label={`Mengunggah ${label.toLowerCase()}`} /><span className="type-caption">{progress === 100 ? "Memeriksa gambar..." : `${progress}%`}</span></div>}
    {error && <p role="alert">{error}</p>}
  </div>;
}
