import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import '../globalStylesheet.css';
import blocks from '../wp-blocks';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{
          blocks,
          theme: {},
        }}>
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  );
}
