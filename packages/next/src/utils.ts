import {
  headlessConfig,
  resolvePrefixedUrlPath,
} from '@wpengine/headless-core';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function isServerSidePropsContext(
  context: any,
): context is GetServerSidePropsContext {
  const ctx: GetServerSidePropsContext = context;

  return !!ctx.req && !!ctx.res && !!ctx.resolvedUrl;
}

export function isStaticPropsContext(
  context: any,
): context is GetStaticPropsContext {
  return !isServerSidePropsContext(context);
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */

export function getCurrentPath(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  if (isServerSidePropsContext(context)) {
    return context.resolvedUrl ?? '';
  }

  let url: string;

  if (context.params?.page && Array.isArray(context.params?.page)) {
    const pagePath: string[] = context.params?.page;

    url = `/${pagePath.join('/')}`;
  } else {
    url = `/${(context.params?.page as string) ?? ''}`;
  }

  return url;
}

export function getCurrentUrlPath(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  const wpeConfig = headlessConfig();
  return resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.blogUrlPrefix,
  );
}
