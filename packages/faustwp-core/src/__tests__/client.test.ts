import { FaustClient } from '../client';

const mockFetch = async () => ({
  ok: true,
  status: 200,
  json: async () => ({ data: { hello: 'world' } }),
}) as any;

test('FaustClient query returns typed data', async () => {
  const client = new FaustClient('https://fake/graphql', { fetch: mockFetch });
  const data = await client.query<{ hello: string }>('query { hello }');
  expect(data.hello).toBe('world');
});
