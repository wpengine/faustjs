import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual.js';
import { useMemo } from 'react';
// eslint-disable-next-line import/extensions
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line import/extensions
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'js-sha256';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { getAccessToken } from './auth/index.js';
import { getConfig } from './config/index.js';
import { getGraphqlEndpoint } from './lib/getGraphqlEndpoint.js';
import { hooks } from './wpHooks/index.js';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

declare global {
  interface Window {
    [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
  }
}

const windowApolloState =
  typeof window !== 'undefined' ? window[APOLLO_STATE_PROP_NAME] : {};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
let apolloAuthClient: ApolloClient<NormalizedCacheObject> | undefined;

export function createApolloClient(authenticated = false) {
  const { possibleTypes, usePersistedQueries, useGETForQueries } = getConfig();

  let inMemoryCacheObject: InMemoryCacheConfig = {
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

  inMemoryCacheObject = hooks.applyFilters(
    'apolloClientInMemoryCacheOptions',
    inMemoryCacheObject,
    {},
  ) as InMemoryCacheConfig;

  let linkChain = createHttpLink({
    uri: getGraphqlEndpoint(),
    /**
     * Only add this option if usePersistedQueries is not set/false.
     * When persisted queries is enabled and this flag and useGETForHashedQueries
     * are both set, there is a conflict and persisted queries does not work.
     */
    useGETForQueries: useGETForQueries && !usePersistedQueries,
  });

  // If the user requested to use persisted queries, apply the link.
  if (usePersistedQueries) {
    linkChain = createPersistedQueryLink({
      sha256,
      useGETForHashedQueries: useGETForQueries,
    }).concat(linkChain);
  }

  // If the request is coming from the auth client, apply the auth link.
  if (authenticated) {
    linkChain = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = getAccessToken();

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    }).concat(linkChain);
  }

  let apolloClientOptions: ApolloClientOptions<NormalizedCacheObject> = {
    ssrMode: typeof window === 'undefined',
    connectToDevTools: typeof window !== 'undefined',
    link: linkChain,
    cache: new InMemoryCache(inMemoryCacheObject).restore(windowApolloState),
  };

  apolloClientOptions = hooks.applyFilters(
    'apolloClientOptions',
    apolloClientOptions,
    {},
  ) as ApolloClientOptions<NormalizedCacheObject>;

  return new ApolloClient(apolloClientOptions);
}

export function getApolloClient(initialState = null) {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      arrayMerge: (destination, source) => [
        ...source,
        ...destination.filter((d) => source.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function getApolloAuthClient() {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _apolloAuthClient = apolloAuthClient ?? createApolloClient(true);

  if (!apolloAuthClient) apolloAuthClient = _apolloAuthClient;

  return _apolloAuthClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps<{
    props: { [key: string]: any };
    revalidate?: number | boolean;
  }>['pageProps'],
): AppProps<{
  props: { [key: string]: any };
  revalidate?: number | boolean;
}>['pageProps'] {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(
  pageProps: AppProps<{ [key: string]: any }>['pageProps'],
) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const store = useMemo(() => getApolloClient(state), [state]);
  return store;
}
