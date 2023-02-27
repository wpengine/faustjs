import { withFaust, getWpHostname } from '@faustwp/core';

/**
 * @type {import('next').NextConfig}
 **/
export default withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
