"use client";
import { toast } from "sonner";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
export function Login() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function signIn() {
    setBusy(true); setError(""); const toastId = toast.loading("Menghubungkan ke Google...");
    try {
      const { data, error } = await authClient.signIn.social({ provider: "google", callbackURL: "/admin" });
      if (error || !data?.url) throw new Error(error?.message || "Tidak dapat memulai login.");
      toast.dismiss(toastId); window.location.assign(data.url);
    } catch (e) { const message = e instanceof Error ? e.message : "Tidak dapat memulai login."; setError(message); toast.error(message, { id: toastId }); setBusy(false); }
  }
  return <main className="admin-login flex min-h-screen items-center justify-center px-6"><div className="admin-surface w-full max-w-md space-y-6"><img src="/brand/logos/light/tampiloka-horizontal-light.svg" alt="Tampiloka" className="w-40" /><div><h1 className="type-heading-2">Masuk ke admin</h1><p className="admin-muted mt-2">Gunakan akun Google yang telah diberi akses.</p></div><Button type="button" onClick={signIn} disabled={busy}>{busy ? "Menghubungkan..." : "Masuk dengan Google"}</Button>{error && <p role="alert" className="admin-error">{error}</p>}</div></main>;
}
