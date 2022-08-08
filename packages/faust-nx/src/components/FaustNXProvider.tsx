import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { useApollo } from '../client.js';

export function FaustNXProvider(props: {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  const { client, pageProps, children } = props;
  const apolloClient = useApollo(client, pageProps);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
