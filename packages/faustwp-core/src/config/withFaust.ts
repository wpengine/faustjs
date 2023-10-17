import trim from 'lodash/trim.js';
import isFunction from 'lodash/isFunction.js';
import { NextConfig } from 'next';
import {
  Redirect,
  RouteHas,
  Header,
} from 'next/dist/lib/load-custom-routes.js';

export interface WithFaustConfig {
  previewDestination?: string;
}

export async function createRedirects(
  nextConfig?: NextConfig,
  redirectFn?: NextConfig['redirects'],
  previewDestination = '/preview',
): Promise<Redirect[]> {
  let redirects: Redirect[] = [];
  const previewQuery: RouteHas[] = [
    {
      type: 'query',
      key: 'preview',
      value: 'true',
    },
  ];

  if (isFunction(redirectFn)) {
    redirects = await redirectFn();
  }

  let previewPath = trim(previewDestination, '/');

  if (nextConfig?.trailingSlash) {
    previewPath += '/';
  }

  redirects.unshift({
    source: `/((?!${previewPath}).*)`,
    has: previewQuery,
    destination: `/${previewPath}`,
    permanent: false,
  });

  if (nextConfig?.i18n) {
    /**
     * All redirect sources are automatically prefixed with available locales
     * when i18n is configured, so our previous rule won't match '/'. We need
     * an extra rule to catch each locale's root path.
     *
     * https://nextjs.org/docs/api-reference/next.config.js/redirects#redirects-with-i18n-support
     */
    redirects.unshift({
      source: nextConfig.trailingSlash ? '/:lang/' : '/:lang',
      has: previewQuery,
      destination: `/:lang/${previewPath}`,
      permanent: false,
      locale: false,
    });
  }

  return redirects;
}

export async function addHeaders(
  nextConfig?: NextConfig,
  existingHeaders?: NextConfig['headers'],
): Promise<Header[]> {
  let headers: Header[] = [];
  if (isFunction(existingHeaders)) {
    headers = await existingHeaders();
  }

  headers.push({
    source: '/:path*',
    headers: [
      {
        key: 'x-using',
        value: 'faust',
      },
    ],
  });
  return headers;
}

/**
 * A helper function to merge Faust related Next.js config with a user defined Next.js config.
 *
 * @param {NextConfig} exportedUserNextConfig The existing config to be exported prior to adding Faust
 * @param {WithFaustConfig} withFaustConfig The Configuration for Faust
 * @returns {NextConfig} The modified config to be exported
 */
export function withFaust(
  exportedUserNextConfig?: NextConfig,
  withFaustConfig?: WithFaustConfig,
): NextConfig {
  const nextConfig = exportedUserNextConfig ?? {};
  const { previewDestination } = withFaustConfig || {};

  const existingRedirects = nextConfig.redirects;
  nextConfig.redirects = () =>
    createRedirects(nextConfig, existingRedirects, previewDestination);

  const existingHeaders = nextConfig.headers;
  nextConfig.headers = () => addHeaders(nextConfig, existingHeaders);
  nextConfig.poweredByHeader = false;

  return nextConfig;
}
