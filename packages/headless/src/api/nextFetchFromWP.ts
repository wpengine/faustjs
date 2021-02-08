import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getContentNode,
  getGeneralSettings,
  getPosts,
  getUriInfo,
} from './services';
import { isPreview } from '../utils';
// eslint-disable-next-line import/no-cycle
import { Template } from '../components/TemplateLoader';
import { resolveTemplate } from '../utils/resolveTemplate';
import { UriInfo } from '../types';

/**
 * Runs default queries from Node.js to WordPress backend to prime Apollo Cache.
 */
export default async function nextFetchFromWP({
  apolloClient,
  currentUrlPath,
  context,
}: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  currentUrlPath: string;
  context: GetStaticPropsContext | GetServerSidePropsContext;
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

  const template: Template | null = resolveTemplate(pageInfo as UriInfo);
  let promises: Promise<unknown>[] = [
    getGeneralSettings(apolloClient)
  ];

  if (pageInfo?.isPostsPage) {
    promises.push(getPosts(apolloClient));
  }

  /**
   * Running getContentNode blindly on the site root will result in a 500 error from WP GraphQL if the frontpage
   * is not set.
   *
   * If a frontpage/blog is not set in Settings » Reading, both isFrontPage and isPostsPage will be true.
   */
  if (!(
    currentUrlPath === '/' &&
    !!pageInfo &&
    pageInfo.isFrontPage &&
    pageInfo.isPostsPage
  )) {
    promises.push(getContentNode(apolloClient, {
      variables: {
        id: currentUrlPath,
        idType: 'URI',
        asPreview: isPreview(context)
      }
    }));
  }

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
