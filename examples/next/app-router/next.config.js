import { withFaust } from '@faustwp/core';
import { createSecureHeaders } from 'next-secure-headers';

/** @type {import('next').NextConfig} */
export default withFaust({
  async headers() {
    return [{ source: '/:path*', headers: createSecureHeaders({
      xssProtection: false
    }) }];
  },
});
