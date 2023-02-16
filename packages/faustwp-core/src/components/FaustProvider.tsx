import { ApolloProvider } from '@apollo/client';
import React from 'react';
// eslint-disable-next-line import/extensions
import { useRouter } from 'next/router';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { useApollo } from '../client.js';
import { Toolbar } from './Toolbar/index.js';
import { SeedNode } from '../queries/seedQuery.js';
import { getConfig } from '../config/index.js';

export type FaustPageProps = AppProps['pageProps'] & {
  __SEED_NODE__: SeedNode;
};

export function FaustProvider(props: {
  children: React.ReactNode;
  pageProps: FaustPageProps;
}) {
  const { pageProps, children } = props;
  const { experimentalToolbar } = getConfig();
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      {enableExperimentalToolbar && (
        <Toolbar
          key={`faust-toolbar-${router.asPath}`} // Required in order to load each route's own seed node.
          client={apolloClient}
          // eslint-disable-next-line no-underscore-dangle
          seedNode={pageProps.__SEED_NODE__}
        />
      )}
      {children}
    </ApolloProvider>
  );
}
