import '@faustwp/core/dist/css/toolbar.css';
import { useRouter } from 'next/router';
import React from 'react';
import '../faust.config';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <Component {...pageProps} key={router.asPath} />;
}
