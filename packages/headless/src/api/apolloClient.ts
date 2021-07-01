import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import {
  getCookiesFromContext,
  isServerSide,
  trimTrailingSlash,
} from '../utils';
import { CookieOptions, getAccessToken } from '../auth';

export type PersistentContext = Record<string, unknown>;

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);

if (!WP_URL) {
  console.warn(
    'Set NEXT_PUBLIC_WORDPRESS_URL to your WordPress site URL and install the WPGraphQL plugin to see your own content.',
  );
}

/**
 * Creates Apollo Client instance and points it to the WordPress API endpoint specified via environment variables.
 */
function createApolloClient(
  options?: CookieOptions,
): ApolloClient<NormalizedCacheObject> {
  const authLink = setContext((_, { headers }) => {
    const token = getAccessToken(options);

    if (!token) {
      return {};
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: isServerSide(),
    link: WP_URL
      ? authLink.concat(
          new BatchHttpLink({
            uri: `${WP_URL}/graphql`,
          }),
        )
      : undefined,

    cache: new InMemoryCache(),
  });
}

/**
 * Creates the Apollo Client instance if it doesn't already exist. This works on both the client side and server side.
 *
 * If client side, it will hydrate the cache using initial state passed through Next.js' Data Fetching functions.
 *
 * @example
 * ```ts
 * // Client-side
 * // For client-side, it's recommended that you use useApollo() instead getApolloClient() directly.
 * ```
 *
 * @example
 * ```ts
 * // Server-side
 * export async function getStaticProps() {
 *     const apolloClient = getApolloClient()
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
export function getApolloClient(
  context?: PersistentContext,
  initialState: unknown = null,
): ApolloClient<NormalizedCacheObject> {
  let localApolloClient:
    | ApolloClient<NormalizedCacheObject>
    // eslint-disable-next-line no-underscore-dangle
    | undefined = (context as WithApolloClient)?.__apollo_client;

  if (!localApolloClient) {
    localApolloClient = createApolloClient({
      cookies: getCookiesFromContext(context),
    });
  }

  if (context) {
    // eslint-disable-next-line no-underscore-dangle
    (context as WithApolloClient).__apollo_client = localApolloClient;
  }

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = localApolloClient.extract();

    const overwriteMerge = (
      target: never,
      source: unknown[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      options?: merge.Options,
    ): unknown[] => source;

    // @see https://github.com/wpengine/headless-framework/pull/11#discussion_r533133428
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState ?? ({} as any), existingCache, {
      arrayMerge: overwriteMerge,
    });

    // Restore the cache with the merged data
    localApolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServerSide()) return localApolloClient;
  // Create the Apollo Client once in the client
  // if (!apolloClient) apolloClient = localApolloClient;

  return localApolloClient;
}
