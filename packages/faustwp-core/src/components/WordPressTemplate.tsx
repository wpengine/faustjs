import { QueryOptions } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { print } from '@apollo/client/utilities';
import { sha256 } from 'js-sha256';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getApolloAuthClient, getApolloClient } from '../client.js';
import { getConfig } from '../config/index.js';
import { getTemplate } from '../getTemplate.js';
import { useAuth } from '../hooks/useAuth.js';
import { SEED_QUERY, SeedNode } from '../queries/seedQuery.js';
import { FaustContext, FaustQueries } from '../store/FaustContext.js';
import { getQueryParam } from '../utils/convert.js';

export type FaustProps = {
  __SEED_NODE__?: SeedNode | null;
  __FAUST_QUERIES__?: FaustQueries | null;
  __TEMPLATE_QUERY_DATA__?: any | null;
  __TEMPLATE_VARIABLES__?: { [key: string]: any } | null;
};

export type WordPressTemplateProps = PropsWithChildren<FaustProps>;

/**
 * This is an external type for end users.
 * @external
 */
export type FaustTemplateProps<Data, Props = Record<string, never>> = Props & {
  data?: Data;
  loading?: boolean;
  __SEED_NODE__?: SeedNode | null;
  __TEMPLATE_QUERY_DATA__?: any | null;
  __TEMPLATE_VARIABLES__?: { [key: string]: any };
};

export function WordPressTemplateInternal(
  props: WordPressTemplateProps & {
    seedNode: SeedNode;
    isPreview: boolean;
    isAuthenticated: boolean | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
  },
) {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const {
    seedNode,
    isAuthenticated,
    isPreview,
    __TEMPLATE_QUERY_DATA__: templateQueryDataProp,
    loading,
    setLoading,
    ...wordpressTemplateProps
  } = props;
  const template = getTemplate(seedNode, templates);
  const [data, setData] = useState<any | null>(templateQueryDataProp);
  const { setQueries } = useContext(FaustContext) || {};

  if (template && template.queries && template.query) {
    throw new Error(
      '`Only either `Component.query` or `Component.queries` can be provided, but not both.',
    );
  }

  /**
   * Fetch the template's queries if defined.
   */
  useEffect(() => {
    void (async () => {
      const client = isPreview ? getApolloAuthClient() : getApolloClient();

      if (!template) {
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

      let queries: FaustQueries | null = null;

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
  }, [isAuthenticated, isPreview, seedNode, template, setQueries, setLoading]);

  /**
   * Fetch the template's query if defined.
   */
  useEffect(() => {
    void (async () => {
      const client = isPreview ? getApolloAuthClient() : getApolloClient();

      if (!template || !template?.query || template?.queries || !seedNode) {
        return;
      }

      if (data) {
        return;
      }

      setLoading(true);

      const queryArgs: QueryOptions = {
        query: template?.query,
        variables: template?.variables
          ? template?.variables(seedNode, { asPreview: isPreview })
          : undefined,
      };

      const templateQueryRes = await client.query(queryArgs);

      setData(templateQueryRes.data);

      setLoading(false);
    })();
  }, [data, template, seedNode, isPreview, isAuthenticated, setLoading]);

  if (!template) {
    return null;
  }

  const Component = template as React.FC<{ [key: string]: any }>;

  const newProps = {
    ...wordpressTemplateProps,
    __TEMPLATE_QUERY_DATA__: templateQueryDataProp,
    data,
    loading,
  };

  return React.createElement(Component, newProps, null);
}

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { basePath, templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const {
    __SEED_NODE__: seedNodeProp,
    __TEMPLATE_QUERY_DATA__: templateQueryDataProp,
  } = props;

  const [seedNode, setSeedNode] = useState<SeedNode | null>(
    seedNodeProp ?? null,
  );
  const template = getTemplate(seedNode, templates);
  const [loading, setLoading] = useState(template === null);
  const [isPreview, setIsPreview] = useState<boolean | null>(
    templateQueryDataProp ? false : null,
  );
  const { isAuthenticated, loginUrl } = useAuth({
    strategy: 'redirect',
    shouldRedirect: false,
    skip: !isPreview,
  });

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
   * If we are on a preview route and there is no authenticated user, redirect
   * them to the login page
   */
  useEffect(() => {
    if (!window) {
      return;
    }

    if (isPreview && isAuthenticated === false && loginUrl) {
      window.location.assign(loginUrl);
    }
  }, [isAuthenticated, isPreview, loginUrl]);

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

    if (seedNode) {
      return;
    }

    void (async () => {
      const client = isPreview ? getApolloAuthClient() : getApolloClient();

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

      const queryArgs: QueryOptions = {
        query: SEED_QUERY,
        variables: {
          // Conditionally add relevant query args.
          ...(!isPreview && { uri: seedQueryUri }),
          ...(isPreview && { id: databaseId }),
          ...(isPreview && { asPreview: true }),
        },
      };

      setLoading(true);

      const seedQueryRes = await client.query(queryArgs);

      const node = isPreview
        ? (seedQueryRes?.data?.contentNode as SeedNode)
        : (seedQueryRes?.data?.nodeByUri as SeedNode);

      setSeedNode(node);
    })();
  }, [seedNode, isPreview, isAuthenticated, basePath]);

  if (
    seedNode === null ||
    isPreview === null ||
    (isPreview && isAuthenticated === null)
  ) {
    return null;
  }

  return (
    <WordPressTemplateInternal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      seedNode={seedNode}
      isPreview={isPreview}
      isAuthenticated={isAuthenticated}
      loading={loading}
      setLoading={setLoading}
    />
  );
}
