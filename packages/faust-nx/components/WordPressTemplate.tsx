import React from 'react';
import { useQuery } from '@apollo/client';
import { PropsWithChildren } from 'react';
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
  if (query) {
    res = useQuery(query, {
      variables: variables ? variables(seedNode) : undefined,
      ssr: true,
    });
  }

  const { data, error, loading } = res ?? {};

  return Component({ ...props, data, error, loading });
}
