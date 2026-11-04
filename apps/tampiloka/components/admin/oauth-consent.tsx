'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
export function Consent({ clientId, scopes }: { clientId: string; scopes: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function respond(accept: boolean) {
    setBusy(true); setError('');
    try {
      const { data, error } = await authClient.oauth2.consent({ accept });
      if (error || !data?.url) throw new Error(error?.message || 'Otorisasi tidak dapat dilanjutkan.');
      window.location.assign(data.url);
    } catch (e) { setError(e instanceof Error ? e.message : 'Otorisasi gagal.'); setBusy(false); }
  }
  return <main className="admin-login flex min-h-screen items-center justify-center px-6"><div className="admin-surface w-full max-w-md space-y-6"><h1 className="type-heading-2">Hubungkan aplikasi</h1><p>Aplikasi berikut meminta akses ke formulir dan respons Anda:</p><p className="break-all">{clientId}</p><p className="admin-muted">Izin yang diminta: {scopes || 'tidak ada'}</p><p>Aplikasi dapat membaca, mengubah, menerbitkan, dan menghapus formulir serta mengelola respons sesuai izin yang diberikan.</p><div className="flex gap-3"><Button type="button" disabled={busy} onClick={() => respond(true)}>Izinkan</Button><Button type="button" variant="outline" disabled={busy} onClick={() => respond(false)}>Tolak</Button></div>{error && <p role="alert" className="admin-error">{error}</p>}</div></main>;
}
