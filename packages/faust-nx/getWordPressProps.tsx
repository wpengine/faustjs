import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { DocumentNode } from 'graphql'
import { SeedNode, SEED_QUERY } from './queries/seedQuery';
import { getTemplate } from './getTemplate';
import { addApolloState } from './client';

function isSSR(
  ctx: GetServerSidePropsContext | GetStaticPropsContext,
): ctx is GetServerSidePropsContext {
  return (ctx as GetServerSidePropsContext).req !== undefined;
}

export interface WordPressTemplate {
    query: DocumentNode,
    variables: (seedNode: SeedNode) => {[key: string]: any}
    Component: React.FC<{[key: string]: any}>;
}

export interface getWordPressPropsConfig {
    client: ApolloClient<NormalizedCacheObject>;
    templates: {[key: string]: WordPressTemplate};
    ctx: GetServerSidePropsContext | GetStaticPropsContext
}

export async function getWordPressProps(options: getWordPressPropsConfig) {
  const { client, templates, ctx } = options;
  let resolvedUrl = null;

  if (!isSSR(ctx)) {
    const wordPressNodeParams = ctx.params?.wordpressNode;
    if (wordPressNodeParams && Array.isArray(wordPressNodeParams)) {
      resolvedUrl = `/${wordPressNodeParams.join("/")}`;
    }
  } else {
    resolvedUrl = ctx.req.url;
  }

  if (!resolvedUrl) {
    return {
      notFound: true,
    };
  }

  const seedQueryRes = await client.query({
    query: SEED_QUERY,
    variables: { uri: resolvedUrl },
  });

  const seedNode = seedQueryRes?.data?.node;

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

  return addApolloState(client, {
    props: {
      __SEED_NODE__: seedNode,
    },
  });
}
