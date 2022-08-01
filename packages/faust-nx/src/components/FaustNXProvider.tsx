import React, { createContext } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { AppProps } from 'next/app';
import { useApollo } from '../client';

export function FaustNXProvider(props: {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  const { client, pageProps } = props;
  const apolloClient = useApollo(client, pageProps);

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
