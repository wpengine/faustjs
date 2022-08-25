import 'faustnx.config';
import React from 'react';
import client from 'client';
import { FaustNXProvider } from 'faust-nx';
import 'styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <FaustNXProvider client={client} pageProps={pageProps}>
      <Component {...pageProps} />
    </FaustNXProvider>
  );
}
