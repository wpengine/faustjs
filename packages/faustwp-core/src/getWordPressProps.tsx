import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { DocumentNode } from 'graphql';
import { SeedNode, SEED_QUERY } from './queries/seedQuery.js';
import { getTemplate } from './getTemplate.js';
import { addApolloState, getApolloClient } from './client.js';
import { getConfig } from './config/index.js';
import { hooks } from './hooks/index.js';

export const DEFAULT_ISR_REVALIDATE = 60 * 15; // 15 minutes

function isSSR(
  ctx: GetServerSidePropsContext | GetStaticPropsContext,
): ctx is GetServerSidePropsContext {
  return (ctx as GetServerSidePropsContext).req !== undefined;
}

export type WordPressTemplate = React.FC & {
  query?: DocumentNode;
  variables?: (
    seedNode: SeedNode,
    context?: { asPreview?: boolean; locale?: string },
  ) => { [key: string]: any };
};

export interface GetWordPressPropsConfig<Props = Record<string, unknown>> {
  ctx: GetServerSidePropsContext | GetStaticPropsContext;
  props?: Props;
  revalidate?: number | boolean;
}

export async function getWordPressProps(options: GetWordPressPropsConfig) {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const { ctx, props, revalidate } = options;

  const client = getApolloClient();

  let resolvedUrl = null;
  if (!isSSR(ctx)) {
    const wordPressNodeParams = ctx.params?.wordpressNode;
    if (wordPressNodeParams && Array.isArray(wordPressNodeParams)) {
      resolvedUrl = `/${wordPressNodeParams.join('/')}`;
    } else {
      resolvedUrl = '/';
    }
  } else {
    resolvedUrl = ctx.req.url;
    ctx.res.setHeader('x-powered-by', 'Faust');
  }

  if (!resolvedUrl) {
    return {
      notFound: true,
    };
  }

  const seedQuery = hooks.applyFilters('seedQueryDocumentNode', SEED_QUERY, {
    resolvedUrl,
  }) as DocumentNode;

  const seedQueryRes = await client.query({
    query: seedQuery,
    variables: { uri: resolvedUrl },
  });

  const seedNode = seedQueryRes?.data?.node as SeedNode;

  if (!seedNode) {
    return {
      notFound: true,
    };
  }

  const template = getTemplate(seedNode, templates);

  if (!template) {
    return {
      notFound: true,
    };
  }

  let templateQueryRes;
  const templateVariables = template?.variables
    ? template?.variables(seedNode, { asPreview: false, locale: ctx.locale })
    : undefined;

  if (template.query) {
    templateQueryRes = await client.query({
      query: template.query,
      variables: templateVariables,
    });
  }

  const appProps = addApolloState(client, {
    props: {
      /**
       * The following props may be null coalesced as an "undefined"
       * value is not able to be serialized
       */
      __SEED_NODE__: seedNode ?? null,
      __TEMPLATE_QUERY_DATA__: templateQueryRes?.data ?? null,
      __TEMPLATE_VARIABLES__: templateVariables ?? null,
      ...props,
    },
  });

  if (!isSSR(ctx)) {
    appProps.revalidate = revalidate ?? DEFAULT_ISR_REVALIDATE;
  }

  return appProps;
}
