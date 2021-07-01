import { gql, useQuery } from '@apollo/client';

import { useContext } from 'react';
import { UriInfo } from '../types';
import {
  ContentNodeOptions,
  GENERAL_SETTINGS,
  getContentNodeQuery,
  getPostsQuery,
  GET_URI_INFO,
  ListPostOptions,
} from '../api/queries';
import { HeadlessContext, QueriesConfig } from './provider';
import {
  parseUriInfoQuery,
  composeUrlPath,
  parseContentNodeQuery,
} from '../api';

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
  const context = useContext<{ queries?: QueriesConfig }>(HeadlessContext);
  const opts: ListPostOptions = options ?? {};

  if (context?.queries?.posts) {
    opts.fragments = {
      ...context.queries.posts.fragments,
      ...opts.fragments,
    };

    opts.variables = {
      ...context.queries.posts.variables,
      ...opts.variables,
    };
  }

  const result = useQuery<WPGraphQL.RootQuery>(getPostsQuery(opts), {
    variables: opts?.variables,
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
  const result = useQuery<WPGraphQL.GeneralSettingsQuery>(
    gql`
      ${GENERAL_SETTINGS}
    `,
  );

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
export function useUriInfo(uri?: string): UriInfo | undefined {
  const { urlPath, isPreview } = composeUrlPath(uri) ?? {};
  const skip = !urlPath;

  const response = useQuery<
    WPGraphQL.GetUriInfoQuery,
    WPGraphQL.GetUriInfoQueryVariables
  >(GET_URI_INFO, {
    variables: {
      uri: urlPath ?? '',
    },
    skip,
  });

  if (skip) {
    /* eslint-disable-next-line consistent-return */
    return;
  }

  /* eslint-disable-next-line consistent-return */
  return parseUriInfoQuery(response, urlPath ?? '', isPreview);
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
  uri?: string,
  options: ContentNodeOptions = {},
): WPGraphQL.RootQuery['post'] | WPGraphQL.RootQuery['page'] | undefined {
  const context = useContext<{ queries?: QueriesConfig }>(HeadlessContext);
  const pageInfo = useUriInfo(uri);
  let skip = true;

  let opts: ContentNodeOptions = options;

  if (!opts) {
    opts = {};
  }

  if (!!pageInfo && !pageInfo.isPostsPage) {
    skip = false;
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

    opts.variables = {
      idType: pageInfo.idType ?? 'URI',
      asPreview: pageInfo.isPreview,
      id:
        (pageInfo.idType === 'DATABASE_ID' || pageInfo.idType === 'ID') &&
        pageInfo.id
          ? pageInfo.id
          : pageInfo.uriPath,
      ...opts.variables,
    };
  }

  const result = useQuery<WPGraphQL.GetContentNodeQuery>(
    getContentNodeQuery(opts),
    {
      variables: opts.variables,
      skip,
    },
  );

  if (skip) {
    /* eslint-disable-next-line consistent-return */
    return;
  }

  /* eslint-disable-next-line consistent-return */
  return parseContentNodeQuery(result, opts);
}
/* eslint-enable consistent-return */
