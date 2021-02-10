import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getContentNode,
  getGeneralSettings,
  getPosts,
  getUriInfo,
  getApolloClient,
} from '../api';
import { headlessConfig } from '../config';
import type { QueriesConfig } from '../react';
import {
  getCurrentPath,
  getPreviewID,
  isDraftPreview,
  isPreview,
} from './utils';
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

  if (isDraftPreview(context)) {
    const variables: WPGraphQL.RootQueryContentNodeArgs = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: getPreviewID(context)!,
      idType: 'DATABASE_ID',
      asPreview: true,
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
