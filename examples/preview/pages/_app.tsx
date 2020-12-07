import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { WPGraphQLProvider, wpeHeadlessConfig } from '@wpengine/headless';

wpeHeadlessConfig({
  uriPrefix: '/blog'
});

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
