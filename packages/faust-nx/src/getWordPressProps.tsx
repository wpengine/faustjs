import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { DocumentNode } from 'graphql';
import { SeedNode, SEED_QUERY } from './queries/seedQuery.js';
import { getTemplate } from './getTemplate.js';
import { addApolloState, initializeApollo } from './client.js';
import { getConfig } from './config/index.js';
import { hooks } from './hooks/index.js';

function isSSR(
  ctx: GetServerSidePropsContext | GetStaticPropsContext,
): ctx is GetServerSidePropsContext {
  return (ctx as GetServerSidePropsContext).req !== undefined;
}

export interface WordPressTemplate {
  query: DocumentNode;
  variables: (seedNode: SeedNode) => { [key: string]: any };
  Component: React.FC<{ [key: string]: any }>;
}

export interface GetWordPressPropsConfig {
  ctx: GetServerSidePropsContext | GetStaticPropsContext;
}

export async function getWordPressProps(options: GetWordPressPropsConfig) {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const { ctx } = options;

  const client = initializeApollo();

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

  if (template.query) {
    await client.query({
      query: template.query,
      variables: template?.variables ? template.variables(seedNode) : undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return addApolloState(client, {
    props: {
      __SEED_NODE__: seedNode,
    },
  });
}
