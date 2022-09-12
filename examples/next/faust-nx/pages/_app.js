import '../faustnx.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustNXProvider } from 'faust-nx';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <FaustNXProvider pageProps={pageProps}>
      <Component {...pageProps} key={router.asPath} />
    </FaustNXProvider>
  );
}
