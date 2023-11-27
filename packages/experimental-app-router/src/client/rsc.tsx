// eslint-disable-next-line import/extensions
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { fetchAccessToken } from '../server/auth/fetchAccessToken.js';
import { createRSCApolloClient } from './config.js';

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
