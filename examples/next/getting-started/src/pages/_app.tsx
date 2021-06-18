import { headlessConfig } from '@wpengine/headless-core';
import { HeadlessProvider } from '@wpengine/headless-next';
import 'normalize.css/normalize.css';
import React from 'react';
import 'scss/main.scss';

headlessConfig({
  wpUrl: process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadlessProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </HeadlessProvider>
    </>
  );
}

export default MyApp;
