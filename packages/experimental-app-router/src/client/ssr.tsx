'use client';

// eslint-disable-next-line import/extensions
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  // eslint-disable-next-line import/extensions
} from '@apollo/experimental-nextjs-app-support';
import React, { PropsWithChildren } from 'react';
import { createApolloConfig } from './config.js';

export function createSSRApolloClient(authenticated = false) {
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated);
  return new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheObject),
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
