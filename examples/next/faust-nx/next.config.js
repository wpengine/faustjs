const { withFaust } = require('@faustjs/next');
const WP_HOST = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname;

module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [WP_HOST],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})
