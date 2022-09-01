import React, { PropsWithChildren, useEffect, useState } from 'react';
import { getApolloClient } from '../client.js';
import { getConfig } from '../config/index.js';
import { getTemplate } from '../getTemplate.js';
import { WordPressTemplate as WordPressTemplateType } from '../getWordPressProps.js';
import { SeedNode, SEED_QUERY } from '../queries/seedQuery.js';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__?: SeedNode;
  __TEMPLATE_QUERY_DATA__?: any;
}>;

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const [seedNode, setSeedNode] = useState<SeedNode | undefined>(
    props.__SEED_NODE__, // eslint-disable-line no-underscore-dangle, react/destructuring-assignment
  );
  const [template, setTemplate] = useState<WordPressTemplateType | null>(
    getTemplate(seedNode, templates),
  );
  const [data, setData] = useState<any | undefined>(
    props.__TEMPLATE_QUERY_DATA__, // eslint-disable-line no-underscore-dangle, react/destructuring-assignment
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      const client = getApolloClient();

      if (!seedNode) {
        setLoading(true);

        const seedQueryRes = await client.query({
          query: SEED_QUERY,
          variables: { uri: window.location.pathname },
        });

        setLoading(false);

        const node = seedQueryRes?.data?.node as SeedNode;

        setSeedNode(node);
      }
    })();
  }, [seedNode]);

  useEffect(() => {
    if (!templates || !seedNode) {
      return;
    }

    if (!template) {
      setTemplate(getTemplate(seedNode, templates));
    }
  }, [seedNode, templates, template]);

  useEffect(() => {
    void (async () => {
      const client = getApolloClient();

      if (!template || !seedNode) {
        return;
      }

      if (!data) {
        setLoading(true);

        const templateQueryRes = await client.query({
          query: template?.query,
          variables: template?.variables
            ? template?.variables(seedNode)
            : undefined,
        });

        setLoading(false);

        setData(templateQueryRes.data);
      }
    })();
  }, [data, template, seedNode]);

  if (!template) {
    console.error('No template found');
    return null;
  }

  const { Component } = template;

  return React.cloneElement(<Component />, { ...props, data, loading }, null);
}
