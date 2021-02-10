import React, { useMemo } from 'react';
import { ApolloProvider, DocumentNode, gql } from '@apollo/client';
import { useApollo } from './apolloClient';
import type { ContentNodeOptions, ListPostOptions } from '../../api';

export interface QueriesConfig {
  posts?: ListPostOptions;
  post?: ContentNodeOptions;
}

export interface HeadlessProviderPageProps {
  pageProps?: Record<string, any> & {
    queries?: QueriesConfig;
  };
}

export const HeadlessContext = React.createContext<any>({});

function parseContext(pageProps?: { queries?: QueriesConfig }) {
  if (!pageProps || !pageProps.queries) {
    return {
      ...pageProps,
    };
  }

  const ctx: { queries: QueriesConfig } = {
    queries: {} as QueriesConfig,
  };

  let pageData: DocumentNode | undefined;
  let postData: DocumentNode | undefined;
  let listPostData: DocumentNode | undefined;

  if (typeof pageProps.queries.post?.fragments?.pageData === 'string') {
    pageData = gql`
      ${(pageProps.queries.post.fragments.pageData as any) as string}
    `;
  }

  if (typeof pageProps.queries.post?.fragments?.postData === 'string') {
    postData = gql`
      ${(pageProps.queries.post.fragments.postData as any) as string}
    `;
  }

  if (typeof pageProps.queries.posts?.fragments?.listPostData === 'string') {
    listPostData = gql`
      ${(pageProps.queries.posts.fragments.listPostData as any) as string}
    `;
  }

  if (pageData || postData) {
    ctx.queries.post = {
      fragments: {
        pageData,
        postData,
      },
      variables: pageProps.queries.post?.variables,
    };
  }

  if (listPostData) {
    ctx.queries.posts = {
      fragments: {
        listPostData,
      },
      variables: pageProps.queries.posts?.variables,
    };
  }

  return {
    ...pageProps,
    queries: ctx.queries,
  };
}

/**
 * Provider component for your headless application, use this at the root of your application
 *
 * @example
 * ```ts
 * import { HeadlessProvider } from '@wpengine/headless'
 *
 * function MyApp({Component, pageProps}) {
 *     return (
 *         <HeadlessProvider>
 *             <Component {...pageProps} />
 *         </HeadlessProvider>
 *     )
 * }
 *
 * export default MyApp
 * ```
 */
export function HeadlessProvider({
  children,
  pageProps,
}: React.PropsWithChildren<HeadlessProviderPageProps>): JSX.Element {
  const apolloClient = useApollo(pageProps);
  const ctx = useMemo(() => parseContext(pageProps), [pageProps]);

  return (
    <ApolloProvider client={apolloClient}>
      <HeadlessContext.Provider value={ctx}>
        {children}
      </HeadlessContext.Provider>
    </ApolloProvider>
  );
}
