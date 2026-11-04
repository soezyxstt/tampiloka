import { getAuth, getAdminSession } from '@/lib/auth';
import { verifyOAuthQueryParams } from '@better-auth/oauth-provider';
import { Consent } from '@/components/admin/oauth-consent';

export default async function ConsentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const auth = getAuth();
  const session = await getAdminSession();
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) for (const item of value) query.append(key, item);
    else if (value !== undefined) query.append(key, value);
  }
  if (!auth || !session || !(await verifyOAuthQueryParams(query.toString(), (await auth.$context).secret))) return <main className="admin-surface"><h1>Permintaan tidak tersedia</h1><p>Permintaan otorisasi tidak valid atau telah kedaluwarsa.</p></main>;
  return <Consent clientId={query.get('client_id') ?? ''} scopes={query.get('scope') ?? ''} />;
}
