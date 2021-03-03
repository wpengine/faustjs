import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { resolvePrefixedUrlPath } from '../utils';
import { headlessConfig } from '../config';

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
) {
  const wpeConfig = headlessConfig();
  return resolvePrefixedUrlPath(getCurrentPath(context), wpeConfig.uriPrefix);
}
