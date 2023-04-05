import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider, increaseBundleSize } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(increaseBundleSize); // REMOVE

  return (
    <FaustProvider pageProps={pageProps}>
      <Component {...pageProps} key={router.asPath} />
    </FaustProvider>
  );
}
