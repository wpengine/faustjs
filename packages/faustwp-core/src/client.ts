import { fetchGraphQL } from './fetchGraphql';

export class FaustClient {
  readonly url: string;
  readonly fetchImpl: typeof fetch;

  constructor(url: string, options?: { fetch?: typeof fetch }) {
    if (!url) throw new Error('FaustClient requires a GraphQL URL');
    this.url = url;
    this.fetchImpl = options?.fetch ?? globalThis.fetch;
  }

  async query<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    return fetchGraphQL<T>(this.url, query, variables, this.fetchImpl);
  }

  async mutate<T = any>(mutation: string, variables?: Record<string, any>): Promise<T> {
    return fetchGraphQL<T>(this.url, mutation, variables, this.fetchImpl);
  }
}
