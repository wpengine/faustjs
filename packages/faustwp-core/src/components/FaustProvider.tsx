import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { useRouter } from 'next/router';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { useApollo } from '../client.js';
import { Toolbar } from './Toolbar/index.js';
import { SeedNode } from '../queries/seedQuery.js';
import { getConfig } from '../config/index.js';
import { FaustContext, FaustQueries } from '../store/FaustContext.js';

export type FaustPageProps = AppProps['pageProps'] & {
  __SEED_NODE__?: SeedNode;
  __FAUST_QUERIES__?: FaustQueries | null;
};

export function FaustProvider(props: {
  children: React.ReactNode;
  pageProps: FaustPageProps;
}) {
  const { pageProps, children } = props;
  const { experimentalToolbar } = getConfig();
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  const setQueries = (newQueries: FaustQueries) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setFaustContext((prevContext) => {
      return {
        ...prevContext,
        queries: newQueries,
      };
    });
  };

  const [faustContext, setFaustContext] = useState({
    // eslint-disable-next-line no-underscore-dangle
    queries: pageProps.__FAUST_QUERIES__,
    setQueries,
  });

  return (
    <FaustContext.Provider value={faustContext}>
      <ApolloProvider client={apolloClient}>
        {experimentalToolbar && (
          <Toolbar
            key={`faust-toolbar-${router.asPath}`} // Required in order to load each route's own seed node.
            // eslint-disable-next-line no-underscore-dangle
            seedNode={pageProps.__SEED_NODE__}
          />
        )}
        {children}
      </ApolloProvider>
    </FaustContext.Provider>
  );
}
