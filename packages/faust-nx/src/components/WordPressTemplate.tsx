import { QueryOptions } from '@apollo/client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ensureAuthorization, getAccessToken } from '../auth/index.js';
import { getApolloClient } from '../client.js';
import { getConfig } from '../config/index.js';
import { getTemplate } from '../getTemplate.js';
import { WordPressTemplate as WordPressTemplateType } from '../getWordPressProps.js';
import { SeedNode, SEED_QUERY } from '../queries/seedQuery.js';
import { getQueryParam } from '../utils/convert.js';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode | null;
  __TEMPLATE_QUERY_DATA__: any | null;
}>;

function cleanTemplate(
  template: WordPressTemplateType,
): React.FC<{ [key: string]: any }> {
  const copy = (template as React.FC<{ [key: string]: any }>).bind({});
  return copy;
}

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { templates } = getConfig();

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

      if (isPreview) {
        seedQueryUri = getQueryParam(window.location.href, 'previewPathname');

        if (seedQueryUri === '') {
          throw new Error(
            'The URL must contain the proper "previewPathname" query param for previews.',
          );
        }
      }

      let queryArgs: QueryOptions = {
        query: SEED_QUERY,
        variables: {
          uri: seedQueryUri,
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

        const node = seedQueryRes?.data?.node as SeedNode;

        setSeedNode(node);
      }
    })();
  }, [seedNode, isPreview, isAuthenticated]);

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

      if (!template || !template?.query || !seedNode) {
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

  // Remove unnecessary properties from component before rendering
  const Component = cleanTemplate(template);

  return React.createElement(Component, { ...props, data, loading }, null);
}
