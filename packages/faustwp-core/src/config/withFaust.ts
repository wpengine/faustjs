import { trim } from 'lodash';
import isFunction from 'lodash/isFunction.js';
import { NextConfig } from 'next';
import { Redirect, RouteHas } from 'next/dist/lib/load-custom-routes.js';

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

/**
 * A helper function to merge Faust related Next.js config with a user defined Next.js config.
 *
 * @param {NextConfig} config
 * @param {WithFaustConfig} withFaustConfig
 * @returns {NextConfig}
 */
export function withFaust(
  config?: NextConfig,
  withFaustConfig?: WithFaustConfig,
): NextConfig {
  const { previewDestination } = withFaustConfig || {};

  const nextConfig = config ?? {};

  const existingRedirects = nextConfig.redirects;
  nextConfig.redirects = () =>
    createRedirects(nextConfig, existingRedirects, previewDestination);

  return nextConfig;
}
