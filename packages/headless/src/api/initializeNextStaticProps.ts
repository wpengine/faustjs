import { GetServerSidePropsResult, GetStaticPropsContext } from 'next';
import { initializeApollo, addApolloState } from '../provider';
import { headlessConfig } from '../config';
import { resolvePrefixedUrlPath, isPreview } from '../utils';
import getCurrentPath from '../utils/getCurrentPath';
import { ensureAuthorization } from '../auth';
import isHTTPS from '../utils/isHTTPS';
import nextFetchFromWP from './nextFetchFromWP';
import type { WPTemplates } from '../components/TemplateLoader';

/**
 * Must be called from getServerSideProps within a Next app in order to support SSR. It will
 * initialized cookies and prefetch/cache the page content and bundle it with the page for
 * rehydration on the frontend.
 *
 * @param {GetStaticPropsContext} context The Next SSR context
 * @param {WPTemplates} templates to be made available to the template loader
 */
export async function initializeNextStaticProps(
  context: GetStaticPropsContext,
  templates?: WPTemplates,
): Promise<GetServerSidePropsResult<unknown>> {
  const apolloClient = initializeApollo(context);
  const wpeConfig = headlessConfig();

  const currentUrlPath = resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.uriPrefix,
  );

  if (isPreview(context)) {
    const path = Array.isArray(context.params?.page)
      ? context.params?.page ?? []
      : [context.params?.page];

    const { host, cookies } = (context.previewData as PreviewData).serverInfo;
    const protocol = isHTTPS(host, context) ? 'https' : 'http';

    const response = ensureAuthorization(
      `${protocol}://${host}/${path.join('/') ?? ''}`,
      {
        cookies,
      },
    );

    if (typeof response !== 'string' && response?.redirect) {
      return {
        redirect: {
          permanent: false,
          destination: response.redirect,
        },
      };
    }
  }

  await nextFetchFromWP({ apolloClient, currentUrlPath, context, templates });

  return addApolloState(apolloClient, {
    props: { preview: context.preview ?? false },
    revalidate: 1,
  });
}
