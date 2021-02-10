import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getContentNode,
  getGeneralSettings,
  getPosts,
  getUriInfo,
} from './services';
import { getPreviewID, isDraftPreview, isPreview } from '../utils';
// eslint-disable-next-line import/no-cycle
import { WPTemplates } from '../components/TemplateLoader';
import { resolveTemplate } from '../utils/resolveTemplate';
import { UriInfo } from '../types';

/**
 * Runs default queries from Node.js to WordPress backend to prime Apollo Cache.
 */
export default async function nextFetchFromWP({
  apolloClient,
  currentUrlPath,
  context,
  templates,
}: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  currentUrlPath: string;
  context: GetStaticPropsContext | GetServerSidePropsContext;
  templates: WPTemplates | undefined;
}): Promise<void> {
  /**
   * Cannot happen at the same time as the rest of the requests because we need to know which templates to load for
   * middleware.
   */
  const pageInfo = await getUriInfo(
    apolloClient,
    currentUrlPath,
    isPreview(context),
  );

  const template = templates
    ? await resolveTemplate(pageInfo as UriInfo, templates)
    : undefined;

  const isLatestPostsFrontPage =
    pageInfo && pageInfo?.isFrontPage && pageInfo?.isPostsPage;

  let getContentNodeQuery;

  /**
   * Running getContentNode on the site root results in a 500 error from
   * WPGraphQL if the front page is set to “Latest Posts” in Settings → Reading.
   */
  if (pageInfo && pageInfo?.isSingular && !isLatestPostsFrontPage) {
    getContentNodeQuery = getContentNode(
      apolloClient,
      currentUrlPath,
      'URI',
      isPreview(context),
    );
  }

  const promises = [
    getGeneralSettings(apolloClient),
    getPosts(apolloClient),
    getContentNodeQuery,
    isDraftPreview(context)
      ? getContentNode(
          apolloClient,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          getPreviewID(context)!,
          'DATABASE_ID',
          true,
        )
      : undefined,
  ];

  await Promise.all(
    template?.getPropsMiddleware
      ? template?.getPropsMiddleware(
          promises,
          apolloClient,
          currentUrlPath,
          context,
        )
      : promises,
  );
}
