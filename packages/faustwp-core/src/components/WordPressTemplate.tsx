import { QueryOptions } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { print } from '@apollo/client/utilities';
import { sha256 } from 'js-sha256';
import { AppProps } from 'next/app.js';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ensureAuthorization, getAccessToken } from '../auth/index.js';
import { getApolloAuthClient, getApolloClient } from '../client.js';
import { getConfig } from '../config/index.js';
import { getTemplate } from '../getTemplate.js';
import { SEED_QUERY, SeedNode } from '../queries/seedQuery.js';
import { FaustContext, FaustQueries } from '../store/FaustContext.js';
import { getQueryParam } from '../utils/convert.js';

export type FaustPageProps = AppProps['pageProps'] & {
  __SEED_NODE__?: SeedNode | null;
  __FAUST_QUERIES?: FaustQueries | null;
  __TEMPLATE_QUERY_DATA__?: any | null;
  __TEMPLATE_VARIABLES__?: { [key: string]: any } | null;
};

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode | null;
  __TEMPLATE_QUERY_DATA__: any | null;
}>;

export type FaustTemplateProps<Data, Props = Record<string, never>> = Props & {
  data?: Data;
  loading?: boolean;
  __SEED_NODE__?: SeedNode | null;
  __TEMPLATE_QUERY_DATA__?: any | null;
  __TEMPLATE_VARIABLES__?: { [key: string]: any };
};

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { basePath, templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const {
    __SEED_NODE__: seedNodeProp,
    __TEMPLATE_QUERY_DATA__: templateQueryDataProp,
  } = props;

  const [seedNode, setSeedNode] = useState<SeedNode | null>(seedNodeProp);
  const template = getTemplate(seedNode, templates);
  const [data, setData] = useState<any | null>(templateQueryDataProp);
  const [loading, setLoading] = useState(template === null);
  const [isPreview, setIsPreview] = useState<boolean | null>(
    templateQueryDataProp ? false : null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState<
    | true
    | {
        redirect?: string | undefined;
        login?: string | undefined;
      }
    | null
  >(null);
  const { setQueries } = useContext(FaustContext) || {};

  /**
   * Determine if the URL we are on is for previews
   */
  useEffect(() => {
    if (!window) {
      return;
    }

    setIsPreview(window.location.search.includes('preview=true'));
  }, []);

  /**
   * If the URL we are on is for previews, ensure we are authenticated.
   */
  useEffect(() => {
    if (isPreview === null || isPreview === false) {
      return;
    }

    void (async () => {
      const ensureAuthRes = await ensureAuthorization({
        redirectUri: window.location.href,
      });

      if (ensureAuthRes !== true && ensureAuthRes?.redirect) {
        window.location.replace(ensureAuthRes.redirect);
      }

      setIsAuthenticated(ensureAuthRes);
    })();
  }, [isPreview]);

  /**
   * Execute the seed query.
   *
   * If the seed query was not available via a prop, it was not executed on the
   * server, meaning we are either dealing with a CSR page, or a preview page.
   */
  useEffect(() => {
    if (isPreview === null) {
      return;
    }

    if (isPreview === true && isAuthenticated !== true) {
      return;
    }

    void (async () => {
      const client = getApolloClient();

      let seedQueryUri = window.location.href.replace(
        window.location.origin,
        '',
      );

      let databaseId = '';

      if (isPreview) {
        seedQueryUri = getQueryParam(window.location.href, 'previewPathname');
        databaseId = getQueryParam(window.location.href, 'p');

        // If a user includes a base path, it will be part of the uri query that we need to filter out
        if (basePath) {
          seedQueryUri = seedQueryUri.replace(basePath, '');
        }

        if (seedQueryUri === '') {
          throw new Error(
            'The URL must contain the proper "previewPathname" query param for previews.',
          );
        }
      }

      let queryArgs: QueryOptions = {
        query: SEED_QUERY,
        variables: {
          // Conditionally add relevant query args.
          ...(!isPreview && { uri: seedQueryUri }),
          ...(isPreview && { id: databaseId }),
          ...(isPreview && { asPreview: true }),
        },
      };

      if (isPreview) {
        queryArgs = {
          ...queryArgs,
          context: {
            headers: {
              /**
               * We know the access token is available here since we ensured
               * authorization in the useEffect above
               */
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              Authorization: `bearer ${getAccessToken()!}`,
            },
          },
        };
      }

      if (!seedNode) {
        setLoading(true);

        const seedQueryRes = await client.query(queryArgs);

        const node = isPreview
          ? (seedQueryRes?.data?.contentNode as SeedNode)
          : (seedQueryRes?.data?.nodeByUri as SeedNode);

        setSeedNode(node);
      }
    })();
  }, [seedNode, isPreview, isAuthenticated, basePath]);

  useEffect(() => {
    // We don't know yet if this is a preview route or not
    if (isPreview === null) {
      return;
    }

    // This is a preview route, but we are not authenticated yet.
    if (isPreview === true && isAuthenticated !== true) {
      return;
    }

    void (async () => {
      const client = isPreview ? getApolloAuthClient() : getApolloClient();

      if (!template || !seedNode) {
        return;
      }

      if (template.query) {
        return;
      }

      if (!template.queries) {
        return;
      }

      if (!setQueries) {
        return;
      }

      let queries: { [key: string]: string } | null = null;

      const queryCalls = template.queries.map(({ query, variables }) => {
        const queryVariables = variables
          ? variables(seedNode, { asPreview: isPreview })
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

      setQueries(queries);

      setLoading(false);
    })();
  }, [isAuthenticated, isPreview, seedNode, template, setQueries]);

  /**
   * Finally, get the template's query data.
   */
  useEffect(() => {
    // We don't know yet if this is a preview route or not
    if (isPreview === null) {
      return;
    }

    // This is a preview route, but we are not authenticated yet.
    if (isPreview === true && isAuthenticated !== true) {
      return;
    }

    void (async () => {
      const client = getApolloClient();

      if (!template || !template?.query || !template?.queries || !seedNode) {
        return;
      }

      if (!data) {
        setLoading(true);

        let queryArgs: QueryOptions = {
          query: template?.query,
          variables: template?.variables
            ? template?.variables(seedNode, { asPreview: isPreview })
            : undefined,
        };

        if (isPreview) {
          queryArgs = {
            ...queryArgs,
            context: {
              headers: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Authorization: `bearer ${getAccessToken()!}`,
              },
            },
          };
        }

        const templateQueryRes = await client.query(queryArgs);

        setData(templateQueryRes.data);

        setLoading(false);
      }
    })();
  }, [data, template, seedNode, isPreview, isAuthenticated]);

  if (!template) {
    return null;
  }

  const Component = template as React.FC<{ [key: string]: any }>;
  return React.createElement(Component, { ...props, data, loading }, null);
}
