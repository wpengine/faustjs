import dotenv from 'dotenv';
import { headlessConfig } from '@faustjs/core';

dotenv.config();

/**
 * @type {import("@faustjs/core").HeadlessConfig}
 */
export default headlessConfig({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL || '',
  apiUrl: process.env.REACT_APP_API_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
