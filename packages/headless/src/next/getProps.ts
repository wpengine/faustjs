import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { addApolloState, getApolloClient } from '../provider';
import { getUriInfo } from '../api';
import * as templateLoader from './NextTemplateLoader';
import { ensureAuthorization } from '../auth';
import { fetchData } from './serverSide';
import { Templates } from '../components/TemplateLoader';
import { headlessConfig } from '../config';
import { getCurrentPath, isPreview, isPreviewPath } from './utils';
import { resolvePrefixedUrlPath } from '../utils';

export interface NextPropsConfig {
  templates?: Templates<templateLoader.NextTemplate>;
}

async function getProps<
  Context extends GetStaticPropsContext | GetStaticPropsContext
>(
  loadTemplates: (
    context: Context,
    templates: Templates<templateLoader.NextTemplate>,
  ) => Promise<unknown>,
  context: Context,
  config: NextPropsConfig = {},
) {
  const client = getApolloClient(context);
  const wpeConfig = headlessConfig();
  const currentUrlPath = resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.uriPrefix,
  );
  const pageInfo = await getUriInfo(client, currentUrlPath, isPreview(context));

  if (isPreview(context)) {
    const path = Array.isArray(context.params?.page)
      ? context.params?.page ?? []
      : [context.params?.page];

    const {
      host,
      protocol,
      cookie: cookies,
    } = (context.previewData as PreviewData).serverInfo;

    const response = ensureAuthorization(
      `${protocol}//${host}/${path.join('/') ?? ''}`,
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
  } else if (pageInfo?.is404 || isPreviewPath(context)) {
    return {
      notFound: true,
      props: {},
    };
  }

  await fetchData(context);

  if (config.templates) {
    await loadTemplates(context, config.templates);
  }

  return addApolloState(client, {
    props: { preview: context.preview ?? false },
    revalidate: 1,
  });
}

export async function getNextServerSideProps(
  context: GetServerSidePropsContext,
  config: NextPropsConfig = {},
) {
  return getProps(
    async (ctx, templates) => {
      return templateLoader.getServerSideProps(ctx, templates);
    },
    context,
    config,
  );
}

export async function getNextStaticProps(
  context: GetStaticPropsContext,
  config: NextPropsConfig = {},
) {
  return getProps(
    async (ctx, templates) => {
      return templateLoader.getStaticProps(ctx, templates);
    },
    context,
    config,
  );
}
