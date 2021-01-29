import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { initializeApollo, addApolloState } from '../provider';
import { headlessConfig } from '../config';
import { resolvePrefixedUrlPath, isPreview, isPreviewPath } from '../utils';
import getCurrentPath from '../utils/getCurrentPath';
import { ensureAuthorization } from '../auth';
import isHTTPS from '../utils/isHTTPS';
import nextFetchFromWP from './nextFetchFromWP';

/**
 * Must be called from getServerSideProps within a Next app in order to support SSR. It will
 * initialized cookies and prefetch/cache the page content and bundle it with the page for
 * rehydration on the frontend.
 *
 * @param {GetServerSidePropsContext} context The Next SSR context
 */
export async function initializeNextServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<unknown>> {
  const apolloClient = initializeApollo();
  (context as GetServerSidePropsContextWithClient).__apollo_client = apolloClient;

  const wpeConfig = headlessConfig();

  const currentUrlPath = resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.uriPrefix,
  );

  if (isPreview(context)) {
    const host = context.req.headers.host as string;
    const protocol = isHTTPS(host, context) ? 'https' : 'http';
    const response = ensureAuthorization(
      `${protocol}://${context.req.headers.host as string}${
        context.resolvedUrl ?? ''
      }`,
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

  await nextFetchFromWP({ apolloClient, currentUrlPath, context });

  return addApolloState(apolloClient, {
    props: { preview: context.preview ?? false },
  });
}
