import { InMemoryCacheConfig, createHttpLink } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line import/extensions
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  // eslint-disable-next-line import/extensions
} from '@apollo/experimental-nextjs-app-support/ssr';
// eslint-disable-next-line import/extensions
/**
 * We are currently importing these utils from their respective dist paths because importing
 * from the root will also include the FaustProvider component, which throws an error because
 * it does not have the "use client" directive set.
 *
 * @todo Find a workaround for importing these utils without invoking FaustProvider.
 */
import { getConfig } from '@faustwp/core/dist/cjs/config/index.js';
import { getGraphqlEndpoint } from '@faustwp/core/dist/cjs/lib/getGraphqlEndpoint.js';
import { fetchAccessToken } from './server/auth/fetchAccessToken.js';

async function createFaustApolloClient(authenticated = false) {
  const { possibleTypes } = getConfig();

  const inMemoryCacheObject: InMemoryCacheConfig = {
    possibleTypes,
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      RootMutation: {
        mutationType: true,
      },
    },
  };

  let linkChain = createHttpLink({
    uri: getGraphqlEndpoint(),
  });

  // @todo Create hook for client and options.

  // If the request is coming from the auth client, apply the auth link.
  if (authenticated) {
    linkChain = setContext(async (_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = await fetchAccessToken();

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    }).concat(linkChain);
  }

  /**
   * @todo
   * Configure GET requests and persisted queries options.
   * These are not defined right now as these behaviors may
   * change based on the App Router implementation. For example,
   * we may set config differently than how we currently do it.
   */

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}

export async function getClient() {
  const faustApolloClient = await createFaustApolloClient(false);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}

export async function getAuthClient() {
  const token = await fetchAccessToken();

  if (!token) {
    return null;
  }

  const faustApolloClient = await createFaustApolloClient(true);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}
