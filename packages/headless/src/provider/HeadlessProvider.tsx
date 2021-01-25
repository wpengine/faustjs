import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './apolloClient';

interface Props {
  children: React.ReactNode;
  pageProps: NextPageProps;
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
export function HeadlessProvider({ children, pageProps }: Props): JSX.Element {
  const apolloClient = useApollo(pageProps);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
