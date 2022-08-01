import React, { PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { getTemplate } from '../getTemplate.js';
import { WordPressTemplate as WordPressTemplateType } from '../getWordPressProps.js';
import { SeedNode } from '../queries/seedQuery.js';
import { getConfig } from '../config/index.js';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode;
  templates: { [key: string]: WordPressTemplateType };
}>;

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const { __SEED_NODE__: seedNode } = props;
  const template = getTemplate(seedNode, templates);

  if (!template) {
    console.error('No template found');
    return null;
  }

  const { query, variables, Component } = template;

  const res = useQuery(query, {
    variables: variables ? variables(seedNode) : undefined,
    ssr: true,
    skip: !query,
  });

  const { data, error, loading } = res ?? {};

  return React.cloneElement(
    <Component />,
    { ...props, data, error, loading },
    null,
  );
}
