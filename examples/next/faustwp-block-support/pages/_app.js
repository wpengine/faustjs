import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { WordPressBlocksProvider, fromThemeJson } from '@faustwp/blocks';
import { FaustProvider } from '@faustwp/core';
import themeJson from '../theme.json';
import blocks from '../wp-blocks';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{
          blocks,
          theme: fromThemeJson(themeJson),
        }}>
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  );
}
