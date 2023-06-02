import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { DocumentNode } from 'graphql';
import { SeedNode, SEED_QUERY } from './queries/seedQuery.js';
import { getPossibleTemplates, getTemplate } from './getTemplate.js';
import { FaustTemplateProps } from './components/WordPressTemplate.js';
import { addApolloState, getApolloClient } from './client.js';
import { getConfig } from './config/index.js';
import { hooks } from './wpHooks/index.js';
import { infoLog, debugLog } from './utils/log.js';

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

export interface FaustTemplate<Data>
  extends React.FC<FaustTemplateProps<Data>> {
  query?: WordPressTemplate['query'];
  variables?: WordPressTemplate['variables'];
}

export interface GetWordPressPropsConfig<Props = Record<string, unknown>> {
  ctx: GetServerSidePropsContext | GetStaticPropsContext;
  props?: Props;
  revalidate?: number | boolean;
}
export async function getWordPressProps(
  options: GetWordPressPropsConfig,
): Promise<
  | {
      props: {
        [key: string]: any;
      };
      revalidate?: number | boolean | undefined;
    }
  | {
      notFound: true;
    }
> {
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
    resolvedUrl = ctx.resolvedUrl;
    ctx.res.setHeader('x-using', 'faust');
  }

  resolvedUrl = hooks.applyFilters('resolvedUrl', resolvedUrl, {
    nextContext: ctx,
  }) as string | null;

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

  // Since previews only work for client side, we only need to handle nodeByUri instead of both that and contentNode.
  const seedNode = seedQueryRes?.data?.nodeByUri as SeedNode;

  debugLog(`Seed Node for resolved url: "${resolvedUrl}": `, seedNode);

  if (!seedNode) {
    return {
      notFound: true,
    };
  }

  infoLog(
    `Possible templates for resolved url: "${resolvedUrl}":`,
    getPossibleTemplates(seedNode),
  );

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
