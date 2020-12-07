import { GetServerSidePropsContext } from 'next';
import { getUriInfo, getPosts, getContentNode } from './services';
import { initializeApollo, addApolloState } from '../graphql';
import { initializeServerCookie } from '../auth';
import { ensureAuthorization } from '../auth/authorize';
import { wpeHeadlessConfig } from '../config';
import { ContentNodeIdType } from '../types';
import { resolveUrlPath } from '../utils';

export async function initializeHeadlessProps(
  context: GetServerSidePropsContext
) {
  const apolloClient = initializeApollo();
  initializeServerCookie(context.req.headers.cookie);
  const wpeConfig = wpeHeadlessConfig();
  const currentUrlPath = resolveUrlPath(context.resolvedUrl ?? '', wpeConfig.uriPrefix);
  const pageInfo = await getUriInfo(apolloClient, currentUrlPath);

  if (pageInfo.isPreview) {
    const response = await ensureAuthorization(
      apolloClient,
      `${context.req.headers.host as string}${context.resolvedUrl ?? ''}`,
      context.query,
      context.res,
    );

    if (response?.redirect) {
      return response;
    }
  }

  if (pageInfo.isPostsPage) {
    await getPosts(apolloClient);
  } else {
    await getContentNode(
      apolloClient,
      pageInfo.uriPath,
      ContentNodeIdType.URI,
      pageInfo.isPreview,
    );
  }

  return addApolloState(apolloClient, {
    props: { preview: context.preview ?? false },
  });
}
