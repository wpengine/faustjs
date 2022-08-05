import React, { PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { getTemplate } from '../getTemplate';
import { WordPressTemplate } from '../getWordPressProps';
import { SeedNode } from '../queries/seedQuery';
import { getConfig } from '../config';
import { usePreviewNode } from '../hooks';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode;
  __IS_PREVIEW__: boolean;
  templates: { [key: string]: WordPressTemplate };
}>;

export function WordPressTemplate(props: WordPressTemplateProps) {
  const {
    __SEED_NODE__: seedNode,
    __IS_PREVIEW__: isPreview,
  } = props;
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const template = getTemplate(seedNode, templates);

  if (!template) {
    console.error('No template found');
    return null;
  }

  const tempResponse = usePreviewNode(template, seedNode);
  console.log({tempResponse});

  const { query, variables, Component } = template;

  let res;
  res = useQuery(query, {
    variables: variables ? variables(seedNode, isPreview) : undefined,
    ssr: !isPreview,
    skip: !query,
  });

  const { data, error, loading } = res ?? {};

  return React.cloneElement(
    <Component />,
    { ...props, data, error, loading },
    null,
  );
}
