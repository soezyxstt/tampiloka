import { test, expect, mock } from 'bun:test';
mock.module('@/lib/mcp/auth', () => ({ authorizedOwner: async (subject: unknown) => subject === 'owner-1' ? 'owner-1' : null }));
mock.module('@/lib/auth', () => ({ getAuth: () => ({}) }));
mock.module('@better-auth/mcp', () => ({ requireMcpAuth: (_auth: unknown, handler: (request: Request, claims: { sub: string }) => Promise<Response>) => async (request: Request) => request.headers.get('authorization') === 'Bearer valid' ? handler(request, { sub: 'owner-1' }) : new Response('Unauthorized', { status: 401 }) }));
mock.module('@/lib/forms/http', () => ({ rateLimit: async () => {} }));
mock.module('@/lib/forms/service', () => ({ FormError: class extends Error {}, listForms: async (owner: string) => [{ owner }], getForm: async () => ({}), createForm: async () => ({}), updateForm: async () => ({}), formAction: async () => ({}), listResponses: async () => ({}), responseAction: async () => ({}) }));
mock.module('@/lib/storage/client', () => ({ storageClient: () => ({}) }));
mock.module('@/lib/storage/uploads', () => ({ adminUpload: async () => ({}) }));
const { POST } = await import('../app/api/mcp/route');
const headers = { authorization: 'Bearer valid', 'content-type': 'application/json', accept: 'application/json, text/event-stream' };
const request = (body: unknown, extra: Record<string, string> = {}) => new Request('https://example.com/api/mcp', { method: 'POST', headers: { ...headers, ...extra }, body: JSON.stringify(body) });

test('remote transport initializes, lists tools and enforces authorization and origin', async () => {
  process.env.BETTER_AUTH_URL = 'https://example.com';
  expect((await POST(request({}, { authorization: 'Bearer bad' }))).status).toBe(401);
  expect((await POST(request({}, { origin: 'https://evil.example' }))).status).toBe(403);
  const init = await POST(request({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '1' } } }));
  expect(init.status).toBe(200);
  expect((await init.json()).result.serverInfo.name).toBe('tampiloka-forms');
  const listed = await POST(request({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }, { 'mcp-protocol-version': '2025-06-18' }));
  expect((await listed.json()).result.tools.some((tool: { name: string }) => tool.name === 'list_responses')).toBe(true);
  const call = await POST(request({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'list_forms', arguments: {} } }, { 'mcp-protocol-version': '2025-06-18' }));
  expect(JSON.parse((await call.json()).result.content[0].text)).toEqual([{ owner: 'owner-1' }]);
});
