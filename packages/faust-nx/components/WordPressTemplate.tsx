import React, { PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { getTemplate } from '../getTemplate';
import { WordPressTemplate } from '../getWordPressProps';
import { SeedNode } from '../queries/seedQuery';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode;
  templates: { [key: string]: WordPressTemplate };
}>;

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { __SEED_NODE__: seedNode, templates } = props;
  const template = getTemplate(seedNode, templates);

  if (!template) {
    console.error('No template found');
    return null;
  }

  const { query, variables, Component } = template;

  let res;
  res = useQuery(query, {
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
