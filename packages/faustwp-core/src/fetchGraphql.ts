export async function fetchGraphQL<T = any>(
  url: string,
  query: string,
  variables?: Record<string, any>,
  fetchImpl: typeof fetch = globalThis.fetch
): Promise<T> {
  if (!fetchImpl) {
    throw new Error('No fetch implementation found');
  }

  const res = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Network error: ${res.status} ${res.statusText} - ${text}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    const message = json.errors.map((e) => e.message).join('\n');
    const err: Error & { graphql?: GraphQLResponse<T> } = new Error(`GraphQL errors:\n${message}`);
    err.graphql = json;
    throw err;
  }

  return (json.data as T) ?? ({} as T);
}
