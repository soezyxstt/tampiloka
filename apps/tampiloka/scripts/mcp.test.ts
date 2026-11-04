import { test, expect, mock } from 'bun:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';

const calls: unknown[][] = [];
mock.module('@/lib/forms/service', () => ({
  FormError: class FormError extends Error {},
  listForms: async (...args: unknown[]) => { calls.push(['list', ...args]); return [{ id: 'owned' }]; },
  getForm: async (...args: unknown[]) => { calls.push(['get', ...args]); return { draftVersion: 2 }; },
  createForm: async (...args: unknown[]) => { calls.push(['create', ...args]); return {}; },
  updateForm: async (...args: unknown[]) => { calls.push(['update', ...args]); return {}; },
  formAction: async (...args: unknown[]) => { calls.push(['action', ...args]); return {}; },
  listResponses: async (...args: unknown[]) => { calls.push(['responses', ...args]); return {}; },
  responseAction: async (...args: unknown[]) => { calls.push(['response_action', ...args]); return {}; },
}));
mock.module('@/lib/storage/client', () => ({ storageClient: () => ({}) }));
mock.module('@/lib/storage/uploads', () => ({ adminUpload: async (...args: unknown[]) => { calls.push(['upload', ...args]); return {}; } }));
const { createMcpServer } = await import('../lib/mcp/server');

test('MCP client discovers tools and schema, and actions are bound to the authenticated owner', async () => {
  const server = createMcpServer('owner-1');
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'test', version: '1' });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    const tools = await client.listTools();
    expect(tools.tools.map(tool => tool.name)).toContain('start_image_upload');
    const schema = await client.readResource({ uri: 'tampiloka://forms/schema' });
    const contents = schema.contents[0];
    expect('text' in contents && JSON.parse(contents.text as string).properties.sections).toBeTruthy();
    await client.callTool({ name: 'list_forms', arguments: {} });
    await client.callTool({ name: 'update_form', arguments: { formId: '123e4567-e89b-42d3-a456-426614174000', expectedVersion: 2, title: 'Updated' } });
    expect(calls).toContainEqual(['list', 'owner-1']);
    expect(calls).toContainEqual(['update', 'owner-1', '123e4567-e89b-42d3-a456-426614174000', { expectedVersion: 2, title: 'Updated' }]);
  } finally { await client.close(); await server.close(); }
});
