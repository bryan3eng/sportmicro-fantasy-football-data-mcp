import test from 'node:test';
import assert from 'node:assert/strict';
import { SportmicroClient } from '../sportmicro/client.js';

function createFetchStub(responseBody: unknown, status = 200) {
  return async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => responseBody
  } as Response);
}

test('SportmicroClient sends bearer auth and returns array items', async () => {
  let receivedUrl = '';
  const fetchImpl = async (url: string | URL | Request, init?: RequestInit) => {
    receivedUrl = String(url);
    assert.equal(init?.headers && new Headers(init.headers).get('Authorization'), 'Bearer test-key');
    return {
      ok: true,
      status: 200,
      json: async () => [{ id: '1', name: 'Player One' }]
    } as Response;
  };

  const client = new SportmicroClient({ apiKey: 'test-key', fetchImpl });
  const result = await client.get('/players', { team_id: '12', limit: 1 });

  assert.match(receivedUrl, /\/players\?/);
  assert.equal(result.status, 200);
  assert.equal(result.items.length, 1);
});

test('SportmicroClient throws on non-ok responses', async () => {
  const client = new SportmicroClient({
    apiKey: 'test-key',
    fetchImpl: createFetchStub({ error: true }, 500)
  });

  await assert.rejects(() => client.get('/players'), /Sportmicro request failed with status 500/);
});
