import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useClient } from './hooks';

export function ApiProvider({ children }: React.PropsWithChildren<unknown>) {
  const client = useClient();

  if (!client) {
    return <></>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
