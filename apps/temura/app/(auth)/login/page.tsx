"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCallback = searchParams.get("callbackUrl") ?? "/admin";
  const callbackUrl = requestedCallback.startsWith("/") && !requestedCallback.startsWith("//") ? requestedCallback : "/admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); setError(null); setPending(true);
    try {
      const result = await signIn("credentials", { username: username.trim(), password, redirect: false });
      if (!result?.ok) { setError("Nama pengguna atau kata sandi salah. Periksa kembali, lalu coba lagi."); return; }
      router.push(callbackUrl); router.refresh();
    } catch { setError("Belum bisa masuk. Silakan coba lagi."); }
    finally { setPending(false); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-brand-neutral-light p-6"><div className="w-full max-w-md rounded-2xl border border-border bg-white p-8">
    <Link href="/" aria-label="Beranda Temura"><Image src="/brand/logos/light/temura-horizontal-light.svg" alt="Temura" width={176} height={44} priority /></Link>
    <h1 className="type-heading-3 mt-8">Masuk ke Temura</h1><p className="type-body mt-3 text-brand-neutral-mid">Kelola undangan dan kehadiran tamu.</p>
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5"><label className="grid gap-2"><span className="type-label">Nama pengguna</span><input name="username" autoComplete="username" value={username} onChange={event=>setUsername(event.target.value)} className="type-body rounded-lg border border-input p-3 focus:outline-2 focus:outline-brand-primary-dark" required /></label><label className="grid gap-2"><span className="type-label">Kata sandi</span><input name="password" type="password" autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} className="type-body rounded-lg border border-input p-3 focus:outline-2 focus:outline-brand-primary-dark" required /></label>{error && <p className="type-body-sm text-red-700" role="alert">{error}</p>}<button type="submit" disabled={pending} className="type-label-lg rounded-full bg-brand-primary-dark p-3 text-white hover:bg-green-900 disabled:opacity-60">{pending ? "Sedang masuk…" : "Masuk"}</button></form>
    <Link href="/" className="type-label mt-6 inline-block text-brand-primary-dark">← Kembali ke beranda</Link>
  </div></main>;
}
export default function LoginPage() { return <Suspense fallback={<p className="type-body p-8">Memuat…</p>}><LoginForm /></Suspense>; }
