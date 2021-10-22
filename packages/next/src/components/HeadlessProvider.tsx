import isNil from 'lodash/isNil';
import React from 'react';
import type { getClient } from '../gqty/client';
import {
  AUTH_CLIENT_CACHE_PROP,
  CLIENT_CACHE_PROP,
  PageProps,
} from '../server/getProps';
import { HeadlessContext } from '../gqty/client';

/**
 * The HeadlessProvider is a React component required to properly facilitate SSR and SSG for Faust.js.
 *
 * @see https://faustjs.org/docs/next/guides/ssr-ssg#rehydration-using-headlessprovider-
 */
export function HeadlessProvider<Props = Record<string, unknown>>({
  children,
  pageProps,
  client,
}: React.PropsWithChildren<{
  pageProps: PageProps<Props>['props'];
  client: ReturnType<typeof getClient>;
}>): JSX.Element {
  client.setAsRoot();

  const {
    useHydrateCache,
    auth: { useHydrateCache: useAuthHydrateCache },
  } = client;
  const cacheSnapshot = pageProps[CLIENT_CACHE_PROP];
  const authSnapshot = pageProps[AUTH_CLIENT_CACHE_PROP];

  useHydrateCache({
    cacheSnapshot: isNil(cacheSnapshot) ? undefined : cacheSnapshot,
  });

  useAuthHydrateCache({
    cacheSnapshot: isNil(authSnapshot) ? undefined : authSnapshot,
  });

  return (
    <HeadlessContext.Provider
      value={{
        client,
      }}>
      {children}
    </HeadlessContext.Provider>
  );
}
