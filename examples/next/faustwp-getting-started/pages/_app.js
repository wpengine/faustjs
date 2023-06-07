import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { WordPressBlocksProvider, fromThemeJson } from '@faustwp/blocks';
import blocks from '../wp-blocks/index.js';
import themeJson from '../theme.json';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import '../globalStylesheet.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{ theme: fromThemeJson(themeJson), blocks }}>
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  );
}
