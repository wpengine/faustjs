import { useMemo } from 'react';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual.js';
import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from '@apollo/client';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { getConfig } from './config/index.js';
import { hooks } from './hooks/index.js';
import { getGraphqlEndpoint } from './lib/getGraphqlEndpoint.js';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

declare global {
  interface Window {
    [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
  }
}

const windowApolloState =
  typeof window !== 'undefined' ? window[APOLLO_STATE_PROP_NAME] : {};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  const { possibleTypes } = getConfig();

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

  let apolloClientOptions: ApolloClientOptions<NormalizedCacheObject> = {
    ssrMode: typeof window === 'undefined',
    connectToDevTools: typeof window !== 'undefined',
    uri: getGraphqlEndpoint(),
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
        destination.filter((d) => source.every((s) => !isEqual(d, s))),
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

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps<{
    props: { [key: string]: any };
  }>['pageProps'],
): AppProps<{
  props: { [key: string]: any };
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
