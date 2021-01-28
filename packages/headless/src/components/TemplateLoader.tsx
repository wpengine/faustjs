import React from 'react';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useNextUriInfo } from '../api/hooks';
import { resolveTemplate } from '../utils/resolveTemplate';

export interface Template {
  default: React.FunctionComponent | null;
  getPropsMiddleware?: (
    /* eslint-disable @typescript-eslint/no-explicit-any */
    promises: Array<Promise<unknown> | undefined>,
    apolloClient: ApolloClient<NormalizedCacheObject>,
    currentUrlPath: string,
    context: GetStaticPropsContext | GetServerSidePropsContext,
  ) => Array<Promise<unknown> | undefined>;
}

export default function TemplateLoader(): JSX.Element | null {
  const pageInfo = useNextUriInfo();

  const Component = resolveTemplate(pageInfo)?.default;

  if (!Component) {
    return null;
  }

  return <Component />;
}
