import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless';

/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  ctx,
  pageProps,
}: AppContext & AppInitialProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <HeadlessProvider pageProps={pageProps} ctx={ctx}>
      <Component {...pageProps} />
    </HeadlessProvider>
  );
}
