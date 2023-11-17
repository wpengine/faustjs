import {
  ApolloClient,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
// eslint-disable-next-line import/extensions
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line import/extensions
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  // eslint-disable-next-line import/extensions
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getConfig, getGraphqlEndpoint } from '../faust-core-utils.js';
import { fetchAccessToken } from '../server/auth/fetchAccessToken.js';

export function createFaustApolloClient(
  authenticated = false,
  rsc = true,
):
  | ApolloClient<NormalizedCacheObject>
  | NextSSRApolloClient<NormalizedCacheObject> {
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

  if (!rsc) {
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(inMemoryCacheObject),
      link: linkChain,
    });
  }

  return new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}
