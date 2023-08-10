import { InMemoryCacheConfig, createHttpLink } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  // eslint-disable-next-line import/extensions
} from '@apollo/experimental-nextjs-app-support/ssr';
/**
 * We are currently importing these utils from their respective dist paths because importing
 * from the root will also include the FaustProvider component, which throws an error because
 * it does not have the "use client" directive set.
 *
 * @todo Find a workaround for importing these utils without invoking FaustProvider.
 */
import { getConfig } from '@faustwp/core/dist/cjs/config/index.js';
import { getGraphqlEndpoint } from '@faustwp/core/dist/cjs/lib/getGraphqlEndpoint.js';

export const { getClient } = registerApolloClient(() => {
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

  const linkChain = createHttpLink({
    uri: getGraphqlEndpoint(),
  });

  // @todo Create hook for client and options.

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
});
