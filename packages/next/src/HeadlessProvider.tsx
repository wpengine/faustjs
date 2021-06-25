import isNil from 'lodash/isNil';
import React from 'react';
import type { getClient } from './client';
import { CLIENT_CACHE_PROP, PageProps } from './getProps';
import { HeadlessContext } from './client';

export function HeadlessProvider<Props = Record<string, unknown>>({
  children,
  pageProps,
  client,
}: React.PropsWithChildren<{
  pageProps: PageProps<Props>['props'];
  client: ReturnType<typeof getClient>;
}>): JSX.Element {
  client.setAsRoot();
  const { useHydrateCache } = client;
  const cacheSnapshot = pageProps[CLIENT_CACHE_PROP];

  useHydrateCache({
    cacheSnapshot: isNil(cacheSnapshot) ? undefined : cacheSnapshot,
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
