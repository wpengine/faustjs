import { createRedirects, withFaust } from '../src';

describe('nextConfig', () => {
  test('withFaust merges default config with user specified config', async () => {
    const config = withFaust({ eslint: { ignoreDuringBuilds: true } });
    const expectedRedirects = await createRedirects();

    expect(config.eslint).toEqual({ ignoreDuringBuilds: true });
    expect((config as any).redirects()).resolves.toEqual(expectedRedirects);
  });

  test('user specified redirects merges with withFaust redirects', async () => {
    const config = withFaust({
      async redirects() {
        return [
          {
            source: '/about',
            destination: '/',
            permanent: true,
          },
        ];
      },
    });

    const configRedirects = await (config as any).redirects();

    const expectedRedirects = [
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
        permanent: true,
      },
      { source: '/about', destination: '/', permanent: true },
    ];

    expect(configRedirects).toStrictEqual(expectedRedirects);
  });

  test('user can specify previewDestination', async () => {
    const config = withFaust(
      {
        async redirects() {
          return [
            {
              source: '/about',
              destination: '/',
              permanent: true,
            },
          ];
        },
      },
      { previewDestination: '/preview-new' },
    );

    const configRedirects = await (config as any).redirects();

    const expectedRedirects = [
      {
        source: '/((?!preview$).*)',
        has: [
          {
            type: 'query',
            key: 'preview',
            value: 'true',
          },
        ],
        destination: '/preview-new',
        permanent: true,
      },
      { source: '/about', destination: '/', permanent: true },
    ];

    expect(configRedirects).toStrictEqual(expectedRedirects);
  });
});
