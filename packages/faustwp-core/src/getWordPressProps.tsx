// eslint-disable-next-line import/extensions
import { print } from '@apollo/client/utilities';
import type { DocumentNode } from 'graphql';
import { sha256 } from 'js-sha256';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { addApolloState, getApolloClient } from './client.js';
import { FaustTemplateProps } from './components/WordPressTemplate.js';
import { getConfig } from './config/index.js';
import { getPossibleTemplates, getTemplate } from './getTemplate.js';
import { SEED_QUERY, SeedNode } from './queries/seedQuery.js';
import { debugLog, infoLog } from './utils/log.js';
import { hooks } from './wpHooks/index.js';
import { FaustQueries } from './store/FaustContext.js';

export const DEFAULT_ISR_REVALIDATE = 60 * 15; // 15 minutes

function isSSR(
  ctx: GetServerSidePropsContext | GetStaticPropsContext,
): ctx is GetServerSidePropsContext {
  return (ctx as GetServerSidePropsContext).req !== undefined;
}

type QueryVariablesArgs = [
  seedNode: SeedNode,
  context?: {
    asPreview?: boolean;
    locale?: string;
  },
  extra?: Record<string, unknown>,
];
const createNotFound = (
  ctx: GetStaticPropsContext,
  revalidate?: number | boolean,
) => ({
  notFound: true as const,
  ...(!isSSR(ctx) && { revalidate: revalidate ?? DEFAULT_ISR_REVALIDATE }),
});

export type WordPressTemplate = React.FC & {
  query?: DocumentNode;
  queries?: {
    query: DocumentNode;
    variables?: (...args: QueryVariablesArgs) => {
      [key: string]: any;
    };
  }[];
  variables?: (...args: QueryVariablesArgs) => {
    [key: string]: any;
  };
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
  /**
   * Provide extra parameters for the Page.variables function call.
   */
  extra?: Props;
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
      revalidate?: number | boolean | undefined;
    }
> {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const { ctx, props, revalidate, extra } = options;

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
    return createNotFound(ctx, revalidate);
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
    return createNotFound(ctx, revalidate);
  }

  infoLog(
    `Possible templates for resolved url: "${resolvedUrl}":`,
    getPossibleTemplates(seedNode),
  );

  const template = getTemplate(seedNode, templates);

  if (!template) {
    return createNotFound(ctx, revalidate);
  }

  if (template.query && template.queries) {
    throw new Error(
      '`Only either `Component.query` or `Component.queries` can be provided, but not both.',
    );
  }

  let templateQueryRes;
  const templateVariables = template?.variables
    ? template?.variables(
        seedNode,
        {
          asPreview: false,
          locale: ctx.locale,
        },
        extra,
      )
    : undefined;

  if (template.query) {
    templateQueryRes = await client.query({
      query: template.query,
      variables: templateVariables,
    });
  }

  let queries: FaustQueries | null = null;
  if (template.queries) {
    const queryCalls = template.queries.map(({ query, variables }) => {
      const queryVariables = variables
        ? variables(
            seedNode,
            {
              asPreview: false,
              locale: ctx.locale,
            },
            extra,
          )
        : undefined;
      return client.query({
        query,
        variables: queryVariables,
      });
    });
    const queriesRes = await Promise.all(queryCalls);

    queries = {};

    queriesRes.forEach((queryRes, index) => {
      if (queries && template.queries) {
        queries[sha256(print(template.queries[index].query))] = queryRes.data;
      }
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
      __FAUST_QUERIES__: queries ?? null,
      ...props,
    },
  });

  if (!isSSR(ctx)) {
    appProps.revalidate = revalidate ?? DEFAULT_ISR_REVALIDATE;
  }

  return appProps;
}
