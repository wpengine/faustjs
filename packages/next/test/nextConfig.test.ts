import { withFaust, defaultFaustNextConfig } from '../src';

describe('nextConfig', () => {
  test('withFaust merges default config with user specified config', async () => {
    const expected = { ...defaultFaustNextConfig };
    expected.eslint = {
      ignoreDuringBuilds: true,
    };

    const config = withFaust({
      eslint: {
        ignoreDuringBuilds: true,
      },
    });

    expect(config).toStrictEqual(expected);
  });

  test('user specified redirects overrides the withFaust redirects', async () => {
    const config = withFaust({
      async redirects() {
        return [];
      },
    });

    const redirectsResult =
      typeof config.redirects === 'function'
        ? await config.redirects()
        : undefined;

    expect(redirectsResult).toStrictEqual([]);
  });
});
