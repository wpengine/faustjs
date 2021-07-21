const { headlessConfig } = require('@faustjs/core');

/**
 * @type {import("@faustjs/core").HeadlessConfig}
 */
module.exports = headlessConfig({
  wpUrl: process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
