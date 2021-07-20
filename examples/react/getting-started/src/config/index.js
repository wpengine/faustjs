require('dotenv').config();
const { headlessConfig } = require('@faustjs/core');

/**
 * @type {import("@faustjs/core").HeadlessConfig}
 */
module.exports = headlessConfig({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL || '',
  apiUrl: process.env.REACT_APP_API_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
