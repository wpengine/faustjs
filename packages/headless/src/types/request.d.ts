type GetServerSidePropsContextWithClient = import('next').GetServerSidePropsContext & {
    __apollo_client: import('@apollo/client').ApolloClient<import('@apollo/client').NormalizedCacheObject>;
}
type GetStaticPropsContextWithClient = import('next').GetStaticPropsContext & {
    __apollo_client: import('@apollo/client').ApolloClient<import('@apollo/client').NormalizedCacheObject>;
}

interface WithApolloClient {
    __apollo_client?: import('@apollo/client').ApolloClient<import('@apollo/client').NormalizedCacheObject>;
}
