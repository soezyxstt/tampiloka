import { test, expect, mock } from 'bun:test';
let verified = true;
mock.module('@/lib/db', () => ({ getDb: () => ({ select: () => ({ from: () => ({ where: () => ({ limit: async () => [{ id: 'owner-1', email: 'admin@example.com', verified }] }) }) }) }) }));
mock.module('@/lib/auth', () => ({ isAllowedAdmin: (email: string) => email === 'admin@example.com' }));
const { authorizedOwner } = await import('../lib/mcp/auth');
test('only a verified allowlisted token subject may access forms', async () => {
  expect(await authorizedOwner(null)).toBeNull();
  expect(await authorizedOwner('owner-1')).toBe('owner-1');
  verified = false;
  expect(await authorizedOwner('owner-1')).toBeNull();
});
