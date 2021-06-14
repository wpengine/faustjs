import isNull from 'lodash/isNull';
import React from 'react';
import { client } from './client';
import { CLIENT_CACHE_PROP, PageProps } from './getProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeadlessContext = React.createContext<any>({});

export function HeadlessProvider<Props = Record<string, unknown>>({
  children,
  pageProps,
}: React.PropsWithChildren<{
  pageProps: PageProps<Props>['props'];
}>): JSX.Element {
  const { useHydrateCache } = client();
  const cacheSnapshot = pageProps[CLIENT_CACHE_PROP];

  useHydrateCache({
    cacheSnapshot: isNull(cacheSnapshot) ? undefined : cacheSnapshot,
    shouldRefetch: false,
  });

  return (
    <HeadlessContext.Provider value={{}}>{children}</HeadlessContext.Provider>
  );
}
