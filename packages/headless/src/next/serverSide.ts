import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getContentNode,
  getGeneralSettings,
  getPosts,
  getUriInfo,
} from '../api';
import { headlessConfig } from '../config';
import { getApolloClient, QueriesConfig } from '../provider';
import { getCurrentPath, isPreview } from './utils';
import { resolvePrefixedUrlPath } from '../utils';

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
  const wpeConfig = headlessConfig();
  const currentUrlPath = resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.uriPrefix,
  );
  const pageInfo = await getUriInfo(client, currentUrlPath, isPreview(context));

  await getGeneralSettings(client);

  if (!pageInfo) {
    throw new Error('Cannot retrieve page information');
  }

  if (pageInfo.isPostsPage) {
    await getPosts(client, options.posts);
  }

  /**
   * Running getContentNode blindly on the site root will result in a 500 error from WP GraphQL if the frontpage
   * is not set.
   *
   * If a frontpage/blog is not set in Settings » Reading, both isFrontPage and isPostsPage will be true.
   */
  if (
    !(currentUrlPath === '/' && pageInfo.isFrontPage && pageInfo.isPostsPage)
  ) {
    const variables: WPGraphQL.RootQueryContentNodeArgs = {
      id: currentUrlPath,
      idType: 'URI',
      asPreview: isPreview(context),
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
