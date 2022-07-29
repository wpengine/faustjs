import { useMemo } from 'react';
import merge from 'deepmerge';
import { isEqual } from 'lodash';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { AppProps } from 'next/app';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

declare global {
  interface Window {
    [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
  }
}

const windowApolloState =
  typeof window !== 'undefined' ? window[APOLLO_STATE_PROP_NAME] : {};

export function initializeApollo(
  client: ApolloClient<NormalizedCacheObject>,
  initialState = null,
) {
  client.restore(windowApolloState);

  if (initialState) {
    const existingCache = client.extract();

    const data = merge(existingCache, initialState, {
      arrayMerge: (destination, source) => [
        ...source,
        destination.filter((d) => source.every((s) => !isEqual(d, s))),
      ],
    });

    client.cache.restore(data);
  }

  return client;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(client, state), [state]);
  return store;
}
