import { getAuth } from '@/lib/auth';
export async function GET(request: Request) {
  const auth = getAuth();
  if (!auth) return new Response('Service unavailable', { status: 503 });
  return auth.handler(request);
}
