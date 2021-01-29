import { GetServerSidePropsResult, GetStaticPropsContext } from 'next';
import {
  getUriInfo,
  getPosts,
  getContentNode,
  getGeneralSettings,
} from './services';
import { initializeApollo, addApolloState } from '../provider';
import { headlessConfig } from '../config';
import { UriInfo } from '../types';
import { resolvePrefixedUrlPath, isPreview, isPreviewPath } from '../utils';
import getCurrentPath from '../utils/getCurrentPath';
import { ensureAuthorization } from '../auth';
import isHTTPS from '../utils/isHTTPS';

import type { Template } from '../components/TemplateLoader';
import { resolveTemplate } from '../utils/resolveTemplate';

/**
 * Must be called from getServerSideProps within a Next app in order to support SSR. It will
 * initialized cookies and prefetch/cache the page content and bundle it with the page for
 * rehydration on the frontend.
 *
 * @param {GetStaticPropsContext} context The Next SSR context
 */
export async function initializeNextStaticProps(
  context: GetStaticPropsContext,
): Promise<GetServerSidePropsResult<unknown>> {
  const apolloClient = initializeApollo();
  const wpeConfig = headlessConfig();
  (context as GetStaticPropsContextWithClient).__apollo_client = apolloClient;

  const currentUrlPath = resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.uriPrefix,
  );

  if (isPreview(context)) {
    const path = Array.isArray(context.params?.page)
      ? context.params?.page ?? []
      : [context.params?.page];

    const host = context.previewData.serverInfo.host as string;
    const protocol = isHTTPS(host, context) ? 'https' : 'http';

    const response = ensureAuthorization(
      `${protocol}://${host}/${path.join('/') ?? ''}`,
    );

    if (typeof response !== 'string' && response?.redirect) {
      return {
        redirect: {
          permanent: false,
          destination: response.redirect,
        },
      };
    }
  } else if (isPreviewPath(context)) {
    return {
      notFound: true,
      props: {},
    };
  }

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

  const promises = [
    getGeneralSettings(apolloClient),
    getPosts(apolloClient),
    currentUrlPath !== '/'
      ? getContentNode(apolloClient, currentUrlPath, 'URI', isPreview(context))
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

  return addApolloState(apolloClient, {
    props: { preview: context.preview ?? false },
    revalidate: 1,
  });
}
