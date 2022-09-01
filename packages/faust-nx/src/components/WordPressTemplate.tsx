import React, { PropsWithChildren } from 'react';
import { DocumentNode, useQuery } from '@apollo/client';
import { getTemplate } from '../getTemplate.js';
import { SeedNode } from '../queries/seedQuery.js';
import { getConfig } from '../config/index.js';
import { WordPressTemplate as WordPressTemplateType } from '../getWordPressProps.js';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode;
}>;

function cleanTemplate(
  template: WordPressTemplateType,
): React.FC<{ [key: string]: any }> {
  const copy = (template as React.FC<{ [key: string]: any }>).bind({});
  return copy as React.FC<{ [key: string]: any }>;
}

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const { __SEED_NODE__: seedNode } = props;
  const template = getTemplate(seedNode, templates);

  /**
   * This code block exists above the !template conditional
   * as React Hooks can not be behind conditionals
   */
  const res = useQuery(template?.query as DocumentNode, {
    variables: template?.variables ? template?.variables(seedNode) : undefined,
    ssr: true,
    skip: !template?.query,
  });

  if (!template) {
    console.error('No template found');
    return null;
  }
  // Remove unnecessary properties from component before rendering
  const Component = cleanTemplate(template);
  const { data, error, loading } = res ?? {};

  return React.createElement(
    Component,
    { ...props, data, error, loading },
    null,
  );
}
