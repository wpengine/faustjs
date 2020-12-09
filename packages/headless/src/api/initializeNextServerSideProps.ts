import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getUriInfo, getPosts, getContentNode } from './services';
import { initializeApollo, addApolloState } from '../provider';
import { initializeServerCookie, storeAccessToken } from '../auth';
import { ensureAuthorization } from '../auth/authorize';
import { headlessConfig } from '../config';
import { ContentNodeIdType, UriInfo } from '../types';
import { resolvePrefixedUrlPath } from '../utils';

export async function initializeNextServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<unknown>> {
  const apolloClient = initializeApollo();

  initializeServerCookie(context.req.headers.cookie);

  const wpeConfig = headlessConfig();
  const currentUrlPath = resolvePrefixedUrlPath(
    context.resolvedUrl ?? '',
    wpeConfig.uriPrefix,
  );
  const pageInfo = (await getUriInfo(apolloClient, currentUrlPath)) as UriInfo;

  if (pageInfo.isPreview) {
    const host = context.req.headers.host as string;
    const protocol = /localhost/.test(host) ? 'http:' : 'https:';
    const response = ensureAuthorization(
      `${protocol}//${context.req.headers.host as string}${
        context.resolvedUrl ?? ''
      }`,
    );

    if (typeof response !== 'string' && typeof response.redirect === 'string') {
      return {
        redirect: {
          permanent: false,
          destination: response.redirect,
        },
      };
    }
  }

  try {
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
  } catch (e) {
    storeAccessToken(undefined, context.res);
  }

  return addApolloState(apolloClient, {
    props: { preview: context.preview ?? false },
  }) as {
    props: unknown;
  };
}
