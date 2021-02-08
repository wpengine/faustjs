interface WithApolloClient {
  __apollo_client?: import('@apollo/client').ApolloClient<
    import('@apollo/client').NormalizedCacheObject
  >;
}
