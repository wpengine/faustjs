import { ApolloClient, InMemoryCache } from '@apollo/client';
import possibleTypes from './possibleTypes.json';

let _client = undefined;

export function getDocsClient() {
  if (_client) {
    return _client;
  }

  const newClient = new ApolloClient({
    uri: 'http://headless-docs.local/graphql',
    cache: new InMemoryCache({
      possibleTypes,
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
    name: 'docs-client',
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all',
    //   },
    //   query: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all',
    //   },
    // },
  });

  _client = newClient;

  return _client;
}
