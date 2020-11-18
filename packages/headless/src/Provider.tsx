import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApiConfig, useClient } from './client';

export interface ApiProviderProps {
  config: ApiConfig;
}

export function ApiProvider({ children, config }: React.PropsWithChildren<ApiProviderProps>) {
  const client = useClient(config);

  if (!client) {
    return <></>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
