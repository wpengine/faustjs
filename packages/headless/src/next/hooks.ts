import { QueryResult, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import {
  ContentNodeOptions,
  getContentNodeQuery,
  GET_URI_INFO,
} from '../api/queries';
import { headlessConfig } from '../config';
import { HeadlessContext, QueriesConfig } from '../react';
import { UriInfo } from '../types';
import {
  getUrlPath,
  isServerSide,
  resolvePrefixedUrlPath,
  trimOriginFromUrl,
} from '../utils';
import { getPreviewID, isPreviewPath } from './utils';

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
export function useUriInfo(): UriInfo | undefined {
  const router = useRouter();
  const { preview: isPreview } = useContext<{ preview: boolean }>(
    HeadlessContext,
  );
  let page = '';

  if (router.asPath.indexOf('[[') === -1) {
    page = router.asPath;
    page = resolvePrefixedUrlPath(page, headlessConfig().uriPrefix);
  }

  let localUri = page ?? '';
  let resolvedUri = router.asPath;

  if (!localUri && !isServerSide()) {
    localUri = resolvePrefixedUrlPath(
      getUrlPath(window.location.href),
      headlessConfig().uriPrefix,
    );
  }

  localUri = getUrlPath(localUri);
  // eslint-disable-next-line no-param-reassign
  resolvedUri = getUrlPath(resolvedUri);

  const response = useQuery<
    WPGraphQL.GetUriInfoQuery,
    WPGraphQL.GetUriInfoQueryVariables
  >(GET_URI_INFO, {
    variables: {
      uri: localUri,
    },
  });

  const result = response?.data?.nodeByUri;

  /**
   * Unpublished content need to be queried differently than published content.
   */
  const preview: QueryResult<WPGraphQL.GetContentNodeQuery> | void =
    isPreviewPath(resolvedUri ?? localUri, true) && isPreview
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery<
          WPGraphQL.GetContentNodeQuery,
          WPGraphQL.GetContentNodeQueryVariables
        >(getContentNodeQuery(), {
          variables: {
            asPreview: true,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            id: getPreviewID(resolvedUri ?? localUri)!,
            idType: 'DATABASE_ID',
          },
          // eslint-disable-next-line react-hooks/rules-of-hooks
        })
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {});

  if (preview && preview?.data?.contentNode) {
    const previewNode = preview?.data?.contentNode;

    return {
      isPostsPage: false,
      isFrontPage: false,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: getPreviewID(resolvedUri ?? localUri)!,
      idType: 'DATABASE_ID',
      uriPath: previewNode.uri,
      isPreview: true,
      templates: previewNode.templates,
    };
  }

  if (!result) {
    return {
      is404: true,
      templates: ['404'],
      uriPath: getUrlPath(localUri),
    };
  }

  const { id, templates } = result;

  const pageInfo = {
    isPostsPage: (result as { isPostsPage: boolean }).isPostsPage ?? false,
    isFrontPage: (result as { isFrontPage: boolean }).isFrontPage ?? false,
    id,
    uriPath: getUrlPath(localUri),
    isPreview: isPreviewPath(resolvedUri ?? localUri) && isPreview,
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
  const context = useContext<{ queries?: QueriesConfig }>(HeadlessContext);
  const pageInfo = useUriInfo();
  let opts: ContentNodeOptions = options;

  if (!opts) {
    opts = {};
  }

  if (context.queries?.post) {
    opts.variables = {
      ...context.queries.post.variables,
      ...opts.variables,
    } as WPGraphQL.RootQueryContentNodeArgs;

    opts.fragments = {
      ...context.queries.post.fragments,
      ...opts.fragments,
    };
  }

  if (!pageInfo || pageInfo.isPostsPage) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {});
    return;
  }

  opts.variables = {
    idType: pageInfo.idType ?? 'URI',
    asPreview: pageInfo.isPreview,
    id:
      pageInfo.idType === 'DATABASE_ID' && pageInfo.id
        ? pageInfo.id
        : pageInfo.uriPath,
    ...opts.variables,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery<WPGraphQL.RootQuery>(getContentNodeQuery(opts), {
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
