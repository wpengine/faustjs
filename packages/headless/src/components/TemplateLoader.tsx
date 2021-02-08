import React from 'react';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { resolveTemplate } from '../utils/resolveTemplate';
import { UriInfo } from '../types';

export interface Template {
  default: React.ComponentType;
  getPropsMiddleware?: (
    promises: Array<Promise<unknown> | undefined>,
    apolloClient: ApolloClient<NormalizedCacheObject>,
    currentUrlPath: string,
    context: GetStaticPropsContext | GetServerSidePropsContext,
  ) => Array<Promise<unknown> | undefined>;
}

export interface WPTemplates {
  index: Promise<Template>;
  [template: string]: Promise<Template>;
}

export default function TemplateLoader({
  templates,
  uriInfo,
  dynamicLoader = React.lazy,
}: {
  uriInfo: UriInfo | undefined;
  templates: WPTemplates;
  dynamicLoader: (loader: () => Promise<Template>) => React.ComponentType;
}): JSX.Element | null {
  const Component = dynamicLoader(() => resolveTemplate(uriInfo, templates));

  if (!Component) {
    return null;
  }

  return <Component />;
}
