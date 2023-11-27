'use client';

// eslint-disable-next-line import/extensions
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { PropsWithChildren } from 'react';
import { createSSRApolloClient } from './config.js';

function makeClient() {
  return createSSRApolloClient(false);
}

export function FaustProvider({ children }: PropsWithChildren<object>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
