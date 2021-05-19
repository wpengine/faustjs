import { headlessConfig } from '@wpengine/headless-core';
import { HeadlessProvider } from '@wpengine/headless-react';
import 'normalize.css/normalize.css';
import 'scss/main.scss';

headlessConfig({
  wpUrl: process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});

console.log(headlessConfig());

function MyApp({ Component, pageProps }) {
  return (
    <HeadlessProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </HeadlessProvider>
  );
}

export default MyApp;
