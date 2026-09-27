import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { getRequiredEnv } from './config.js';
import { SportmicroClient } from './sportmicro/client.js';
import { createToolHandlers, mcpToolDefinitions } from './tools/registry.js';

const client = new SportmicroClient({ apiKey: getRequiredEnv('SPORTMICRO_API_KEY') });
const handlers = createToolHandlers(client);

const server = new Server(
  { name: 'sportmicro-fantasy-football-data-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: mcpToolDefinitions.map((tool) => ({
    ...tool,
    inputSchema: {
      type: 'object',
      additionalProperties: true
    }
  }))
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const tool = request.params.name as keyof typeof handlers;
  const handler = handlers[tool];
  if (!handler) {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const result = await handler(request.params.arguments ?? {});
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
});

await server.connect(new StdioServerTransport());
