import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import '../themes/bootstrap/styles.css';
import { WPGraphQLProvider } from '@wpengine/headless';

export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <WPGraphQLProvider pageProps={ pageProps }>
      <Component { ...pageProps } />
    </WPGraphQLProvider>
  );
}
