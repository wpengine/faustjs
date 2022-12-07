import { ApolloProvider } from '@apollo/client';
import React, { createContext, useContext } from 'react';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { useApollo } from '../client.js';

const FaustContext = createContext<Record<string, unknown> | undefined>(
  undefined,
);

export function useFaustContext() {
  return useContext(FaustContext);
}

export function FaustProvider(props: {
  children: React.ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  const { pageProps, children } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <FaustContext.Provider value={pageProps}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </FaustContext.Provider>
  );
}
