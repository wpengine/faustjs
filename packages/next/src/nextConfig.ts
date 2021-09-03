import { trim } from 'lodash';
import isFunction from 'lodash/isFunction';
import { NextConfig } from 'next';
import { Redirect } from 'next/dist/lib/load-custom-routes';

export interface WithFaustConfig {
  previewDestination?: string;
}

export async function createRedirects(
  redirectFn?: NextConfig['redirects'],
  previewDestination = '/preview',
): Promise<Redirect[]> {
  let redirects: Redirect[] = [];

  if (isFunction(redirectFn)) {
    redirects = await redirectFn();
  }

  redirects.unshift({
    source: '/((?!preview$).*)',
    has: [
      {
        type: 'query',
        key: 'preview',
        value: 'true',
      },
    ],
    destination: `/${trim(previewDestination, '/')}`,
    permanent: false,
  });

  return redirects;
}

export function withFaust(
  config: NextConfig,
  withFaustConfig?: WithFaustConfig,
): NextConfig {
  const { previewDestination } = withFaustConfig || {};

  const nextConfig = config;

  const existingRedirects = nextConfig.redirects;
  nextConfig.redirects = () =>
    createRedirects(existingRedirects, previewDestination);

  return nextConfig;
}
