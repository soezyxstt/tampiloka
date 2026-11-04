import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { isAllowedAdmin } from '@/lib/auth';

/** Recheck current account authorization even for a correctly signed access token. */
export async function authorizedOwner(subject: unknown): Promise<string | null> {
  if (typeof subject !== 'string' || !subject) return null;
  const [owner] = await getDb().select({ id: user.id, email: user.email, verified: user.emailVerified }).from(user).where(eq(user.id, subject)).limit(1);
  return owner?.verified && isAllowedAdmin(owner.email) ? owner.id : null;
}
