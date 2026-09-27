import test from 'node:test';
import assert from 'node:assert/strict';
import { createToolHandlers } from '../tools/registry.js';

type MockItem = { id: string; query?: Record<string, unknown> };
type MockClient = {
  get(path: string, query?: Record<string, unknown>): Promise<{ items: MockItem[]; status: number }>;
};

const client: MockClient = {
  async get(path: string, query?: Record<string, unknown>) {
    if (path === '/players') {
      return { items: [{ id: 'player-1', query }], status: 200 };
    }
    if (path === '/players-statistics') {
      return { items: [{ id: 'stat-1', query }], status: 200 };
    }
    return { items: [], status: 200 };
  }
};

test('tool handlers validate inputs and wrap results', async () => {
  const handlers = createToolHandlers(client as never);
  const result = await handlers.sportmicro_get_players({ team_id: 'team-1', limit: 10 });

  assert.equal(result.meta.resource, 'players');
  assert.equal(result.meta.count, 1);
  assert.deepEqual((result.items[0] as MockItem).query, { team_id: 'team-1', limit: 10 });
});

test('tool handlers reject invalid inputs', async () => {
  const handlers = createToolHandlers(client as never);
  await assert.rejects(() => handlers.sportmicro_get_player_statistics({}), /Invalid input/);
});
