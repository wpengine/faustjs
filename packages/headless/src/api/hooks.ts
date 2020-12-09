import { useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Page,
  Post,
  ContentNodeIdType,
  GeneralSettings,
  UriInfo,
} from '../types';
import {
  getPosts,
  getGeneralSettings,
  getContentNode,
  getUriInfo,
} from './services';
import { headlessConfig } from '../config';
import { getUrlPath, isServerSide, resolvePrefixedUrlPath } from '../utils';

/**
 * React Hook for retrieving a list of posts from your WordPress site
 *
 * @example
 * ```ts
 * import { usePosts } from '@wpengine/headless';
 *
 * export function ListPosts() {
 *   const posts = usePosts();
 *
 *   if (!posts) {
 *     return <></>;
 *   }
 *
 *   return (
 *     <>
 *       {posts.map((post) => (
 *         <div key={post.id} dangerouslySetInnerHTML={ { __html: post.content ?? '' } } />
 *       ))}
 *     </>
 *   );
 * }
 * @export
 * @returns {(Post[] | undefined)}
 */
export function usePosts(): Post[] | undefined {
  const [result, setResult] = useState<Post[]>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        try {
          const posts = await getPosts(
            client as ApolloClient<NormalizedCacheObject>,
          );

          if (subscribed) {
            setResult(posts);
          }
        } catch (e) {
          console.log('Error getting posts');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client]);

  return result;
}

export function useGeneralSettings() {
  const [result, setResult] = useState<GeneralSettings>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (client) {
      void (async () => {
        try {
          const settings = await getGeneralSettings(
            client as ApolloClient<NormalizedCacheObject>,
          );

          if (subscribed && !!settings) {
            setResult(settings);
          }
        } catch (e) {
          console.log('Error getting settings');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [result, client]);

  return result;
}

export function useNextUriInfo() {
  const [pageInfo, setUriInfo] = useState<UriInfo>();
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;
    let page: string | undefined;

    if (router) {
      if (router.asPath.indexOf('[[') === -1) {
        page = router.asPath;
        page = resolvePrefixedUrlPath(page, headlessConfig().uriPrefix);
      }
    }

    if (page) {
      void (async () => {
        try {
          const info = await getUriInfo(
            client as ApolloClient<NormalizedCacheObject>,
            page,
          );

          if (!subscribed) {
            return;
          }

          setUriInfo(info as UriInfo);
        } catch (e) {
          console.log('Error getting URI info');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [router, client, router.asPath]);

  if (
    !!router &&
    pageInfo?.uriPath !==
      resolvePrefixedUrlPath(router.asPath, headlessConfig().uriPrefix)
  ) {
    return undefined;
  }

  return pageInfo;
}

export function useUriInfo(uri?: string) {
  const [pageInfo, setUriInfo] = useState<UriInfo>();
  const client = useApolloClient();
  let localUri = uri;

  if (!localUri && !isServerSide()) {
    localUri = resolvePrefixedUrlPath(
      getUrlPath(window.location.href),
      headlessConfig().uriPrefix,
    );
  }

  useEffect(() => {
    let subscribed = true;
    let page: string | undefined;

    if (localUri) {
      page = localUri;
    }

    if (page) {
      void (async () => {
        try {
          const info = await getUriInfo(
            client as ApolloClient<NormalizedCacheObject>,
            page,
          );

          if (!subscribed) {
            return;
          }

          setUriInfo(info as UriInfo);
        } catch (e) {
          console.log('Error getting URI info');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client, localUri]);

  if (
    pageInfo?.uriPath !==
    resolvePrefixedUrlPath(localUri || '', headlessConfig().uriPrefix)
  ) {
    return undefined;
  }

  return pageInfo;
}

export function usePost(): Post | Page | undefined;
export function usePost(uriInfo: UriInfo): Post | Page | undefined;
export function usePost(
  id: string,
  idType: ContentNodeIdType,
): Post | Page | undefined;
export function usePost(
  idOrUriInfo?: UriInfo | string,
  idType?: ContentNodeIdType,
): Post | Page | undefined {
  const [result, setResult] = useState<Post | Page>();
  const client = useApolloClient();
  let id: string | undefined;
  let uri: string | undefined;

  if (!!idOrUriInfo && typeof idOrUriInfo !== 'string') {
    uri = idOrUriInfo.uriPath;
  } else {
    id = idOrUriInfo;
  }

  if (!uri && !isServerSide()) {
    uri = resolvePrefixedUrlPath(
      `${window.location.pathname}${window.location.search || ''}`,
      headlessConfig().uriPrefix,
    );
  }

  const pageInfo = useUriInfo(uri as string);

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        try {
          let post: Post | Page | undefined;

          if (id) {
            post = await getContentNode(
              client as ApolloClient<NormalizedCacheObject>,
              id,
              idType,
            );
          } else if (pageInfo) {
            post = await getContentNode(
              client as ApolloClient<NormalizedCacheObject>,
              pageInfo.uriPath,
              ContentNodeIdType.URI,
              pageInfo.isPreview,
            );
          }

          if (subscribed) {
            setResult(post);
          }
        } catch (e) {
          console.log('Error getting a post');
          console.log(e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client, pageInfo, id, idType]);

  return result;
}
