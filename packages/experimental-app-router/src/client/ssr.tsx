'use client';

// eslint-disable-next-line import/extensions
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  // eslint-disable-next-line import/extensions
} from '@apollo/experimental-nextjs-app-support/ssr';
import React, { PropsWithChildren } from 'react';
import { createApolloConfig } from './config.js';

export function createSSRApolloClient(authenticated = false) {
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated);
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}

export function FaustSSRProvider({ children }: PropsWithChildren<object>) {
  return (
    <ApolloNextAppProvider makeClient={() => createSSRApolloClient(false)}>
      {children}
    </ApolloNextAppProvider>
  );
}
