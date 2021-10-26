import dotenv from 'dotenv';
import { config } from '@faustjs/core';

dotenv.config();

/**
 * @type {import("@faustjs/core").Config}
 */
export default config({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL || '',
  apiUrl: process.env.REACT_APP_API_URL,
  apiClientSecret: process.env.FAUSTWP_SECRET_KEY,
});
