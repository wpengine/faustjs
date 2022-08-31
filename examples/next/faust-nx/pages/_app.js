import 'faustnx.config';
import React from 'react';
import { FaustNXProvider } from 'faust-nx';
import 'styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <FaustNXProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </FaustNXProvider>
  );
}
