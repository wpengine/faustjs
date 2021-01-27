import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { WPGraphQL, UriInfo } from '../types';
import { headlessConfig } from '../config';
import {
  getUrlPath,
  isServerSide,
  resolvePrefixedUrlPath,
  isPreviewPath,
} from '../utils';
import {
  GENERAL_SETTINGS,
  GET_CONTENT_NODE,
  GET_POSTS,
  GET_URI_INFO,
} from './queries';
import * as utils from '../utils';
import trimOriginFromUrl from '../utils/trimOriginFromUrl';

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
  const result = useQuery<WPGraphQL.GetPostsQuery>(GET_POSTS);

  return result.data?.posts.nodes;
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
  const result = useQuery<WPGraphQL.GeneralSettingsQuery>(GENERAL_SETTINGS);

  return result.data?.generalSettings;
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
export function useUriInfo(
  uri?: string,
  resolvedUri?: string,
): UriInfo | undefined {
  let localUri = uri ?? '';

  if (!localUri && !isServerSide()) {
    localUri = resolvePrefixedUrlPath(
      getUrlPath(window.location.href),
      headlessConfig().uriPrefix,
    );
  }

  localUri = trimOriginFromUrl(localUri);

  const result = useQuery<
    WPGraphQL.GetUriInfoQuery,
    WPGraphQL.GetUriInfoQueryVariables
  >(GET_URI_INFO, {
    variables: {
      uri: localUri,
    },
  });

  const nodeByUri = result?.data?.nodeByUri;

  if (!nodeByUri) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id, templates } = nodeByUri;

  const pageInfo = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    isPostsPage: result?.isPostsPage,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    isFrontPage: result?.isFrontPage,
    id,
    uriPath: utils.getUrlPath(localUri),
    templates,
  };

  if (
    pageInfo?.uriPath !==
    resolvePrefixedUrlPath(
      trimOriginFromUrl(resolvedUri ?? localUri),
      headlessConfig().uriPrefix,
    )
  ) {
    return undefined;
  }

  return pageInfo;
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
  const router = useRouter();
  let page = '';

  if (router.asPath.indexOf('[[') === -1) {
    page = router.asPath;
    page = resolvePrefixedUrlPath(page, headlessConfig().uriPrefix);
  }

  return useUriInfo(page, router.asPath);
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
  id?: string,
  idType?: WPGraphQL.ContentNodeIdTypeEnum,
):
  | WPGraphQL.GetContentNodeQuery['contentNode']
  | WPGraphQL.GetContentNodeQuery['contentNode']['preview']['node']
  | undefined {
  const pageInfo = useNextUriInfo();

  let variables;

  if (id) {
    variables = {
      id,
      idType,
    };
  } else if (pageInfo) {
    variables = {
      asPreview: isPreviewPath(pageInfo.uriPath),
      id: pageInfo.uriPath,
      idType: WPGraphQL.ContentNodeIdTypeEnum.Uri,
    };
  }

  const result = useQuery<WPGraphQL.GetContentNodeQuery>(GET_CONTENT_NODE, {
    variables,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result?.data?.contentNode;
}
