import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { useRouter } from 'next/router';
// eslint-disable-next-line import/extensions
import { AppProps } from 'next/app';
import { useApollo } from '../client.js';
import { Toolbar } from './Toolbar/index.js';
import { getConfig } from '../config/index.js';
import { FaustContext, FaustQueries } from '../store/FaustContext.js';
import { FaustProps } from './WordPressTemplate.js';

export type FaustPageProps = AppProps['pageProps'] & FaustProps;

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

  /**
   * On page transitions, reset the queries state based on the new page props.
   */
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (pageProps.__FAUST_QUERIES__) setQueries(pageProps.__FAUST_QUERIES__);
    // eslint-disable-next-line no-underscore-dangle
  }, [pageProps.__FAUST_QUERIES__]);

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
