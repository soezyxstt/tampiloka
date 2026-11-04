import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { requireMcpAuth } from '@better-auth/mcp';
import { getAuth } from '@/lib/auth';
import { authorizedOwner } from '@/lib/mcp/auth';
import { createMcpServer } from '@/lib/mcp/server';
import { rateLimit } from '@/lib/forms/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    if (origin && (!process.env.BETTER_AUTH_URL || origin !== new URL(process.env.BETTER_AUTH_URL).origin)) return new Response('Forbidden', { status: 403 });
    const auth = getAuth();
    if (!auth || !process.env.BETTER_AUTH_URL) return new Response('Service unavailable', { status: 503 });
    await rateLimit(request, 'mcp', 120);
    const resource = new URL('/api/mcp', process.env.BETTER_AUTH_URL).href;
    return await requireMcpAuth(auth, async (req, claims) => {
      const ownerId = await authorizedOwner(claims.sub);
      if (!ownerId) return new Response('Forbidden', { status: 403 });
      const server = createMcpServer(ownerId);
      const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 1_000_000 });
      await server.connect(transport);
      const response = await transport.handleRequest(req);
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }, { resource, requiredScopes: ['forms:manage'] })(request);
  } catch (error) { console.error('MCP request failed', error); return new Response('Service unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
export async function GET() { return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } }); }
export async function DELETE() { return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } }); }
