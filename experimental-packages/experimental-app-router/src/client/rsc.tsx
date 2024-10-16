// eslint-disable-next-line import/extensions
import { ApolloClient, InMemoryCache } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { fetchAccessToken } from '../server/auth/fetchAccessToken.js';
import { createApolloConfig } from './config.js';

export function createRSCApolloClient(authenticated = false) {
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated);
  return new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}

export async function getClient() {
  const faustApolloClient = createRSCApolloClient(false);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}

export async function getAuthClient() {
  const token = await fetchAccessToken();

  if (!token) {
    return null;
  }

  const faustApolloClient = createRSCApolloClient(true);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}
