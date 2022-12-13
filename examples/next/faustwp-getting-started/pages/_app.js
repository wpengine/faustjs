import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import { FaustProvider } from '@faustwp/core';
import blocks from '../wp-blocks';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{
          blocks,
        }}>
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  );
}
