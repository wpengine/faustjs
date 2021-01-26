import { useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useRouter } from 'next/router';
import { WPGraphQL, UriInfo } from '../types';
import {
  getPosts,
  getGeneralSettings,
  getContentNode,
  getUriInfo,
  getMenus,
} from './services';
import { headlessConfig } from '../config';
import {
  getUrlPath,
  isServerSide,
  resolvePrefixedUrlPath,
  isPreviewPath,
} from '../utils';

/**
 * React Hook for retrieving a list of posts from your WordPress site
 *
 * @example
 * ```tsx
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
 * ```
 * @export
 * @returns {(Post[] | undefined)}
 */
export function usePosts():
  | WPGraphQL.GetPostsQuery['posts']['nodes']
  | undefined {
  const [result, setResult] = useState<
    WPGraphQL.GetPostsQuery['posts']['nodes']
  >();
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
          console.error('Error getting posts', e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}

/**
 * React Hook for retrieving the general settings (title, description) from your WordPress site
 *
 * @example
 * ```tsx
 * import { useGeneralSettings } from '@wpengine/headless';
 *
 * export function Header() {
 *   const settings = useGeneralSettings();
 *
 *   if (!settings) {
 *     return <></>;
 *   }
 *
 *   return (
 *     <header>
 *       <h1>{settings.title}</h1>
 *       <h2>{settings.description}</h2>
 *     </header>
 *   );
 * }
 * ```
 * @export
 * @returns {(GeneralSettings | undefined)}
 */
export function useGeneralSettings(): WPGraphQL.GeneralSettings | undefined {
  const [result, setResult] = useState<WPGraphQL.GeneralSettings>();
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
          console.error('Error getting settings', e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [result, client]);

  return result;
}

/**
 * React Hook for retrieving information about the current URI within a Next app.
 *
 * @see useUriInfo For similar functionality outside of Next apps.
 *
 * @example
 * ```tsx
 * import { useNextUriInfo } from '@wpengine/headless';
 *
 * export function Screen() {
 *   const uriInfo = useNextUriInfo();
 *
 *   console.log(uriInfo);
 * }
 * ```
 * @export
 * @returns {(UriInfo | undefined)}
 */
export function useNextUriInfo(): UriInfo | undefined {
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
          console.error('Error getting URI info', e);
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

/**
 * React Hook for retrieving information about the current URI. Expects you to
 * either pass in a URI, otherwise it will use window.location
 *
 * @see useNextUriInfo For similar functionality inside Next apps.
 *
 * @example
 * ```tsx
 * import { useUriInfo } from '@wpengine/headless';
 *
 * export function Screen() {
 *   const uriInfo = useUriInfo();
 *
 *   console.log(uriInfo);
 * }
 * ```
 * @export
 * @returns {(UriInfo | undefined)}
 */
export function useUriInfo(uri?: string): UriInfo | undefined {
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
          console.error('Error getting URI info', e);
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

/**
 * React Hook for retrieving the post based on the current URI. Uses window.location if necessary
 *
 * @example
 * ```tsx
 * import { usePost } from '@wpengine/headless';
 *
 * export default function Post() {
 *   const post = usePost();
 *
 *   return (
 *     <div>
 *       {post && (
 *         <div>
 *           <div>
 *             <h5>{post.title}</h5>
 *             <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
 *           </div>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * @export
 * @returns {(Post | Page | undefined)}
 */
export function usePost():
  | WPGraphQL.GetContentNodeQuery['contentNode']
  | undefined;
/**
 * React Hook for retrieving the post based on the passed-in uriInfo.
 *
 * @example
 * ```tsx
 * import { usePost, UriInfo } from '@wpengine/headless';
 *
 * export default function Post({ uriInfo }: { uriInfo: UriInfo }) {
 *   const post = usePost(uriInfo);
 *
 *   return (
 *     <div>
 *       {post && (
 *         <div>
 *           <div>
 *             <h5>{post.title}</h5>
 *             <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
 *           </div>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * @export
 * @param {UriInfo} uriInfo
 * @returns {(Post | Page | undefined)}
 */
export function usePost(
  uriInfo: UriInfo,
): WPGraphQL.GetContentNodeQuery['contentNode'] | undefined;
/**
 * React Hook for retrieving the post based on the passed-in id and idType.
 *
 * @see ContentNodeIdType For the different types of identifiers you can pass in
 *
 * @example
 * ```tsx
 * import { usePost, ContentNodeIdType } from '@wpengine/headless';
 *
 * export default function Post({ slug }: { slug: string; }) {
 *   const post = usePost(slug, ContentNodeIdType.SLUG);
 *
 *   return (
 *     <div>
 *       {post && (
 *         <div>
 *           <div>
 *             <h5>{post.title}</h5>
 *             <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
 *           </div>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * @export
 * @param {string} id The identifier for the post based on ContentNodeIdType
 * @param {ContentNodeIdType} idType The description of the type of id passed in
 * @returns {(Post | Page | undefined)}
 */
export function usePost(
  id: string,
  idType: WPGraphQL.ContentNodeIdTypeEnum,
): WPGraphQL.GetContentNodeQuery['contentNode'];

export function usePost(
  idOrUriInfo?: UriInfo | string,
  idType?: WPGraphQL.ContentNodeIdTypeEnum,
):
  | WPGraphQL.GetContentNodeQuery['contentNode']
  | WPGraphQL.GetContentNodeQuery['contentNode']['preview']['node']
  | undefined {
  const [result, setResult] = useState<
    | WPGraphQL.GetContentNodeQuery['contentNode']
    | WPGraphQL.GetContentNodeQuery['contentNode']['preview']['node']
    | undefined
  >();
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
          let post:
            | WPGraphQL.GetContentNodeQuery['contentNode']
            | WPGraphQL.GetContentNodeQuery['contentNode']['preview']['node']
            | undefined;

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
              WPGraphQL.ContentNodeIdTypeEnum.Uri,
              isPreviewPath(window.location.href),
            );
          }

          if (subscribed) {
            setResult(post);
          }
        } catch (e) {
          console.error('Error getting a post', e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [client, pageInfo, id, idType]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}

/**
 * React Hook for retrieving menus from your WordPress site
 */
export function useMenus():
  | WPGraphQL.GetMenusQuery['menuItems']['nodes']
  | undefined {
  const [result, setResult] = useState<
    WPGraphQL.GetMenusQuery['menuItems']['nodes'] | undefined
  >();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        try {
          const menu = await getMenus(
            client as ApolloClient<NormalizedCacheObject>,
          );

          if (subscribed) {
            setResult(menu);
          }
        } catch (e) {
          console.error('Error getting menu', e);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [result, client]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
