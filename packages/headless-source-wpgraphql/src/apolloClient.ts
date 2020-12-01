/**
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
 */
import { useMemo } from 'react'
import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client'
import merge from 'deepmerge'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || process.env.WORDPRESS_API_URL;
let apolloClient: ApolloClient<NormalizedCacheObject>;

if (!API_URL) {
    throw new Error('WORDPRESS_API_URL environment variable is not set. Please set it to your WPGraphQL endpoint.')
}

/**
 * Creates Apollo Client instance and points it to the WordPress API endpoint specified via environment variables.
 */
function createApolloClient() : ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: API_URL,
        }),
        cache: new InMemoryCache(),
    })
}

/**
 * Creates the Apollo Client instance if it doesn't already exist. This works on both the client side and server side.
 *
 * If client side, it will hydrate the cache using initial state passed through Next.js' Data Fetching functions.
 *
 * @example
 * ```ts
 * // Client-side
 * // For client-side, it's recommended that you use useApollo() instead initializeApollo() directly.
 * ```
 *
 * @example
 * ```ts
 * // Server-side
 * export async function getStaticProps() {
 *     const apolloClient = initializeApollo()
 *
 *     await apolloClient.query({
 *         query: ALL_POSTS_QUERY,
 *         variables: allPostsQueryVars,
 *     })
 *
 *     return addApolloState(apolloClient, {
 *         props: {},
 *       revalidate: 1,
 *     })
 * }
 * ```
 */
export function initializeApollo(initialState = null) : ApolloClient<NormalizedCacheObject> {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        // @ts-ignore
        const data = merge(initialState, existingCache)

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

/**
 * Merges the Apollo state with the page props passed through the various Next.js Data Fetching
 * functions such as getStaticProps, getServerSideProps, etc.
 *
 * @example
 * ```ts
 * export async function getStaticProps({preview = false}) {
 *     const apolloClient = initializeApollo()
 *
 *     await apolloClient.query({query: YOUR_QUERY})
 *
 *     return addApolloState(apolloClient, {
 *         props: {preview},
 *         revalidate: 1
 *     })
 * }
 * ```
 */
export function addApolloState(client: ApolloClient<any>, pageProps: { [prop: string]: any }) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }

    return pageProps
}

/**
 * React Hook to use the Apollo client. This is used by <WPGraphQLProvider>
 *
 * @see WPGraphQLProvider
 */
export function useApollo(pageProps: { [prop: string]: any }) {
    const state = pageProps[APOLLO_STATE_PROP_NAME]

    return useMemo(() => initializeApollo(state), [state])
}


