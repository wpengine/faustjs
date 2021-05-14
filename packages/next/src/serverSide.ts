import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getContentNode,
  getGeneralSettings,
  getPosts,
  getUriInfo,
  getApolloClient,
} from '../api';
import type { QueriesConfig } from '../react';
import { getCurrentUrlPath } from './utils';

/**
 * Makes the appropriate requests for WordPress data so it will exist client-side
 *
 * @export
 * @param {(GetStaticPropsContext | GetServerSidePropsContext)} context
 * @returns {Promise<void>}
 */
export async function fetchData(
  context: GetStaticPropsContext | GetServerSidePropsContext,
  options: QueriesConfig = {},
): Promise<void> {
  const client = getApolloClient(context);
  const currentUrlPath = getCurrentUrlPath(context);
  const uriPath = currentUrlPath;

  const pageInfo = await getUriInfo(client, uriPath);

  const isLatestPostsFrontPage =
    pageInfo && pageInfo?.isFrontPage && pageInfo?.isPostsPage;

  await getGeneralSettings(client);

  if (!pageInfo) {
    throw new Error('Cannot retrieve page information');
  }

  if (pageInfo.isPostsPage) {
    await getPosts(client, options.posts);
  }

  /**
   * Running getContentNode on the site root results in a 500 error from
   * WPGraphQL if the front page is set to “Latest Posts” in Settings → Reading.
   */
  if (pageInfo && pageInfo?.isSingular && !isLatestPostsFrontPage) {
    const variables: WPGraphQL.RootQueryContentNodeArgs = {
      id: uriPath,
      idType: 'URI',
    };
    const opts = options;

    if (opts.post && opts.post.variables) {
      opts.post.variables = {
        ...variables,
        ...opts.post.variables,
      };
    }

    await getContentNode(client, {
      fragments: opts.post?.fragments,
      variables,
    });
  }
}
