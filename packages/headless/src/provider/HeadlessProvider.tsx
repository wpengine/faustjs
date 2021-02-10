import React from 'react';
import { NextPageContext } from 'next';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './apolloClient';
import NextPreviewContext from './NextPreviewContext';

interface PageProps {
  pageProps: Record<string, any>;
  ctx: NextPageContext;
}

/**
 * Provider component to be used in your Next.js Custom `App` component (pages/_app.js)
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 *
 * @example
 * ```ts
 * import {WPGraphQLProvider} from '@wpengine/headless/graphql'
 *
 * function MyApp({Component, pageProps}) {
 *     return (
 *         <WPGraphQLProvider>
 *             <Component {...pageProps} />
 *         </WPGraphQLProvider>
 *     )
 * }
 *
 * export default MyApp
 * ```
 */
export function HeadlessProvider({
  children,
  ctx,
  pageProps,
}: React.PropsWithChildren<PageProps>): JSX.Element {
  const apolloClient = useApollo(ctx, pageProps);

  return (
    <NextPreviewContext.Provider
      value={{ isPreview: pageProps?.preview ?? false }}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </NextPreviewContext.Provider>
  );
}
