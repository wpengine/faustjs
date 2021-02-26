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
): Promise<T> | T {
  if (!templates) {
    throw new Error('No templates provided to template resolver.');
  }

  if (!pageInfo || !pageInfo.templates) {
    return templates.index;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const template of pageInfo.templates) {
    if (typeof templates[template] !== 'undefined') {
      return templates?.[template];
    }
  }

  return templates.index;
}

function isPromise(component: any): component is Promise<any> {
  return !!component.then;
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

  const template = resolveTemplate(uriInfo, templates);
  let Component: React.ComponentType;

  if (isPromise(template)) {
    Component = dynamicLoader(() => template);
  } else {
    Component = template.default;
  }

  if (!Component) {
    return null;
  }

  return <Component />;
}
