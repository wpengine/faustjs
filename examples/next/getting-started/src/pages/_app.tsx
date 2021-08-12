import 'faust.config';
import { HeadlessProvider } from '@faustjs/next';
import 'normalize.css/normalize.css';
import React from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadlessProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </HeadlessProvider>
    </>
  );
}
