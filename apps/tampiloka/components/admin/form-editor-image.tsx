"use client";

import { useState } from "react";

export function FormEditorImage({ formId, label, value, onChange }: { formId: string; label: string; value?: string; onChange: (id: string | undefined) => void }) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const upload = async (file: File) => {
    setError(""); setProgress(0);
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
    } catch (e) { setError(e instanceof Error ? e.message : "Unggah gagal."); }
    finally { setProgress(null); }
  };
  return <div><label>{label}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={progress !== null} onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; if (file) void upload(file); }} /></label>{progress !== null && <p role="status">Mengunggah {progress}%</p>}{error && <p role="alert">{error}</p>}{value && <button type="button" onClick={() => onChange(undefined)}>Hapus gambar</button>}</div>;
}
