import React from 'react';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dynamic from 'next/dynamic';
import { useNextUriInfo } from '../api/hooks';
import { resolveTemplate } from '../utils/resolveTemplate';

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
}: {
  templates: WPTemplates;
}): JSX.Element | null {
  const pageInfo = useNextUriInfo();
  const Component = dynamic(() => resolveTemplate(pageInfo, templates));

  if (!Component) {
    return null;
  }

  return <Component />;
}
