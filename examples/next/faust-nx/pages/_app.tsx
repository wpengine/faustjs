import 'faustnx.config';
import React from 'react';
import { FaustNXProvider } from 'faust-nx';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FaustNXProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </FaustNXProvider>
  );
}
