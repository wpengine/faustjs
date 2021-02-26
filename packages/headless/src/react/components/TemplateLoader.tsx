import React from 'react';
import { UriInfo } from '../../types';

export interface Template {
  default: React.ComponentType;
}

export interface Templates<T extends Template> {
  index: Promise<T> | T;
  [template: string]: Promise<T> | T;
}

export function resolveTemplate<T extends Template>(
  pageInfo: UriInfo | undefined,
  templates: Templates<T>,
): Promise<T> {
  if (!templates) {
    throw new Error('No templates provided to template resolver.');
  }

  if (!pageInfo || !pageInfo.templates) {
    return Promise.resolve(templates.index);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const template of pageInfo.templates) {
    if (typeof templates[template] !== 'undefined') {
      return Promise.resolve(templates?.[template]);
    }
  }

  return Promise.resolve(templates.index);
}

export function TemplateLoader<T extends Template>({
  templates,
  uriInfo,
  dynamicLoader = React.lazy,
}: {
  uriInfo: UriInfo | undefined;
  templates: Templates<T>;
  dynamicLoader: (loader: () => Promise<T>) => React.ComponentType;
}): JSX.Element | null {
  if (!uriInfo) {
    return null;
  }

  const Component = dynamicLoader(() => resolveTemplate(uriInfo, templates));

  if (!Component) {
    return null;
  }

  return <Component />;
}
