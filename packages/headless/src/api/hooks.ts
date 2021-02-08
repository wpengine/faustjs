import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UriInfo } from '../types';
import { headlessConfig } from '../config';
import {
  getUrlPath,
  isServerSide,
  resolvePrefixedUrlPath,
  isPreviewPath,
} from '../utils';
import {
  ContentNodeOptions,
  GENERAL_SETTINGS,
  getContentNodeQuery,
  getPostsQuery,
  GET_URI_INFO,
  ListPostOptions,
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
export function usePosts(
  options?: ListPostOptions,
): WPGraphQL.RootQuery['posts'] | undefined {
  const result = useQuery<WPGraphQL.RootQuery>(getPostsQuery(options), {
    variables: options?.variables,
  });

  return result.data?.posts;
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
  const response = useQuery<
    WPGraphQL.GetUriInfoQuery,
    WPGraphQL.GetUriInfoQueryVariables
  >(GET_URI_INFO, {
    variables: {
      uri: localUri,
    },
  });

  const result = response?.data?.nodeByUri;

  if (!result) {
    return {
      is404: true,
      templates: ['404'],
      uriPath: utils.getUrlPath(localUri),
    };
  }

  const { id, templates } = result;

  const pageInfo = {
    isPostsPage: (result as { isPostsPage: boolean }).isPostsPage ?? false,
    isFrontPage: (result as { isFrontPage: boolean }).isFrontPage ?? false,
    id,
    uriPath: utils.getUrlPath(localUri),
    isPreview: isPreviewPath(resolvedUri ?? localUri),
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

/* eslint-disable consistent-return */
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
export function usePost(
  options: ContentNodeOptions = {},
): WPGraphQL.RootQuery['post'] | WPGraphQL.RootQuery['page'] | undefined {
  const pageInfo = useNextUriInfo();
  let opts: ContentNodeOptions = options;

  if (!opts) {
    opts = {};
  }

  if (!pageInfo || pageInfo.isPostsPage) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {});
    return;
  }

  opts.variables = {
    idType: 'URI',
    asPreview: pageInfo.isPreview,
    id: pageInfo.uriPath,
    ...opts.variables,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery<WPGraphQL.RootQuery>(getContentNodeQuery(options), {
    variables: opts.variables,
  });

  const node = result?.data?.contentNode as
    | WPGraphQL.RootQuery['post']
    | WPGraphQL.RootQuery['page'];
  const { variables } = opts;

  if (variables?.asPreview && !node?.isPreview) {
    if (!node?.preview?.node) {
      return node;
    }

    return node.preview.node;
  }

  return node;
}
/* eslint-enable consistent-return */
