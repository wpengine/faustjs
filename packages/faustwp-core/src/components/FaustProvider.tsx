import { ApolloProvider } from '@apollo/client';
import React from 'react';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { useApollo } from '../client.js';
import { FaustAdminBar } from './FaustAdminBar.js';

export function FaustProvider(props: {
  children: React.ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  const { pageProps, children } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <FaustAdminBar />
      {children}
    </ApolloProvider>
  );
}
