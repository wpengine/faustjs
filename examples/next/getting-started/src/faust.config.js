import { headlessConfig } from '@faustjs/core';

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  console.error(
    'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env file?',
  );
}

/**
 * @type {import("@faustjs/core").HeadlessConfig}
 */
export default headlessConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
