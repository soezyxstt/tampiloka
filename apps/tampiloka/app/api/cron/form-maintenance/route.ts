import { timingSafeEqual } from 'node:crypto';
import { runMaintenance } from '@/lib/storage/maintenance.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const actual = request.headers.get('authorization') ?? '';
  const expected = `Bearer ${secret ?? ''}`;
  if (!secret || Buffer.byteLength(secret) < 32 || Buffer.byteLength(actual) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) {
    return new Response(null, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    await runMaintenance();
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    console.error('Form maintenance failed; retry required');
    return new Response(null, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
