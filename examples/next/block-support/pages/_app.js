import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { WordPressBlocksProvider, fromThemeJson } from '@faustwp/blocks';
import { FaustProvider } from '@faustwp/core';
import blocks from '../wp-blocks';
import '../styles/blocks.scss'; // <-- Import block styles from WordPress.
import '../globalStylesheet.css'; // <-- Generated by @faustwp/cli

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{
          blocks,
          theme: null,
        }}>
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  );
}
