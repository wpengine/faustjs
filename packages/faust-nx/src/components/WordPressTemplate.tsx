import { QueryOptions } from '@apollo/client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ensureAuthorization, getAccessToken } from '../auth/index.js';
import { getApolloClient } from '../client.js';
import { getConfig } from '../config/index.js';
import { getTemplate } from '../getTemplate.js';
import { WordPressTemplate as WordPressTemplateType } from '../getWordPressProps.js';
import { WordPressTemplate } from '../getWordPressProps.js';
import { SeedNode, SEED_QUERY } from '../queries/seedQuery.js';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__?: SeedNode;
  __TEMPLATE_QUERY_DATA__?: any;
  __IS_PREVIEW__?: boolean;
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

  const [seedNode, setSeedNode] = useState<SeedNode | undefined>(
    props.__SEED_NODE__, // eslint-disable-line no-underscore-dangle, react/destructuring-assignment
  );
  const [isTemplateSet, setIsTemplateSet] = useState(
    getTemplate(seedNode, templates) !== true,
  );
  const template = getTemplate(seedNode, templates);
  const [data, setData] = useState<any | undefined>(
    props.__TEMPLATE_QUERY_DATA__, // eslint-disable-line no-underscore-dangle, react/destructuring-assignment
  );
  const [loading, setLoading] = useState(template === null);
  const [isPreview, setIsPreview] = useState<boolean | null>(
    props.__IS_PREVIEW__ ?? null, // eslint-disable-line no-underscore-dangle, react/destructuring-assignment
  );
  const [isAuthenticated, setIsAuthenticated] = useState<
    | true
    | {
        redirect?: string | undefined;
        login?: string | undefined;
      }
    | null
  >(null);

  console.log('template', template);

  useEffect(() => {
    if (!window) {
      return;
    }

    setIsPreview(window.location.search.includes('preview=true'));
  }, []);

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

  useEffect(() => {
    if (isPreview === null) {
      return;
    }

    if (isPreview === true && isAuthenticated !== true) {
      return;
    }

    void (async () => {
      const client = getApolloClient();

      let queryArgs: QueryOptions = {
        query: SEED_QUERY,
        variables: {
          uri: window.location.href.replace(window.location.origin, ''),
        },
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

      if (!seedNode) {
        setLoading(true);

        const seedQueryRes = await client.query(queryArgs);

        const node = seedQueryRes?.data?.node as SeedNode;

        setSeedNode(node);
      }
    })();
  }, [seedNode, isPreview, isAuthenticated]);

  useEffect(() => {
    if (!templates || !seedNode) {
      return;
    }

    if (!isTemplateSet) {
      setIsTemplateSet(true);
    }
  }, [seedNode, templates, template]);

  useEffect(() => {
    if (isPreview === null) {
      return;
    }

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
            ? template?.variables(seedNode)
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
