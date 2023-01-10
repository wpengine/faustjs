import { config as coreConfig } from '@faustjs/core';

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  console.error(
    'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?',
  );
}

function getSecretKey() {
  return process.env.FAUST_SECRET_KEY || process.env.FAUSTWP_SECRET_KEY;
}

/**
 * @type {import("@faustjs/core").Config}
 */
export default coreConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: getSecretKey(),
});
