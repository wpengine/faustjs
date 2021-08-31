import merge from 'lodash/merge';
import { NextConfig } from 'next';

export const defaultFaustNextConfig: NextConfig = {
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: '/((?!preview$).*)',
        has: [
          {
            type: 'query',
            key: 'preview',
            value: 'true',
          },
        ],
        destination: '/preview',
        permanent: false,
      },
    ];
  },
};

export function withFaust(config: NextConfig): NextConfig {
  return merge(defaultFaustNextConfig, config);
}
