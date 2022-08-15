import React, { PropsWithChildren } from 'react';
import { DocumentNode, useQuery } from '@apollo/client';
import { getTemplate } from '../getTemplate.js';
import { SeedNode } from '../queries/seedQuery.js';
import { WordPressTemplate } from '../getWordPressProps.js';
import { getConfig } from '../config/index.js';
import { usePreviewQuery } from '../hooks/usePreviewQuery.js';

export type WordPressTemplateProps = PropsWithChildren<{
  __SEED_NODE__: SeedNode;
  __AS_PREVIEW__: boolean;
}>;

export function WordPressTemplate(props: WordPressTemplateProps) {
  const { __SEED_NODE__: seedNode, __AS_PREVIEW__: asPreview } = props;
  const { templates } = getConfig();

  if (!templates) {
    throw new Error('Templates are required. Please add them to your config.');
  }

  const template = getTemplate(seedNode, templates);

  /**
   * This code block exists above the !template conditional
   * as React Hooks can not be behind conditionals
   */
  // const response = useQuery(template?.query as DocumentNode, {
  //   variables: template?.variables ? template?.variables(seedNode, asPreview) : undefined,
  //   ssr: !asPreview,
  //   skip: !template?.query,
  // });

  const response = usePreviewQuery(seedNode, template);

  if (!template) {
    console.error('No template found');
    return null;
  }

  const { Component } = template;
  const { data, error, loading } = response;

  return React.cloneElement(
    <Component />,
    { ...props, data, error, loading },
    null,
  );
}
