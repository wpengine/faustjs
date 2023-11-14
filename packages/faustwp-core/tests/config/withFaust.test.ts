import { NextConfig } from 'next';
import { withFaust, WithFaustConfig } from '../../src/config/withFaust';

const defaultNextConfig: NextConfig = {};
const defaultFaustConfig: WithFaustConfig = {};

describe('withFaust', () => {
  test('it applies a default headers config', async () => {
    expect.assertions(3);
    const finalConfig = withFaust(defaultNextConfig, defaultFaustConfig);

    expect(finalConfig).toEqual(
      expect.objectContaining({ poweredByHeader: false }),
    );
    expect(finalConfig).toEqual(
      expect.objectContaining({ headers: expect.any(Function) }),
    );
    const headers = await finalConfig.headers!();
    expect(headers).toEqual([
      { headers: [{ key: 'x-using', value: 'faust' }], source: '/:path*' },
    ]);
  });
  test('it applies a default redirects config', async () => {
    expect.assertions(2);
    const finalConfig = withFaust(defaultNextConfig, defaultFaustConfig);

    expect(finalConfig).toEqual(
      expect.objectContaining({ redirects: expect.any(Function) }),
    );
    const redirects = await finalConfig.redirects!();
    expect(redirects).toMatchInlineSnapshot(`
      Array [
        Object {
          "destination": "/preview",
          "has": Array [
            Object {
              "key": "preview",
              "type": "query",
              "value": "true",
            },
          ],
          "permanent": false,
          "source": "/((?!preview).*)",
        },
        Object {
          "destination": "/preview",
          "has": Array [
            Object {
              "key": "preview",
              "type": "query",
              "value": "true",
            },
          ],
          "permanent": false,
          "source": "/((?!preview).*)",
        },
      ]
    `);
  });
  test('it allows a custom preview destination', async () => {
    const finalConfig = withFaust(defaultNextConfig, {
      ...defaultFaustConfig,
      previewDestination: '/demo',
    });
    const redirects = await finalConfig.redirects!();
    expect(redirects).toMatchInlineSnapshot(`
      Array [
        Object {
          "destination": "/demo",
          "has": Array [
            Object {
              "key": "preview",
              "type": "query",
              "value": "true",
            },
          ],
          "permanent": false,
          "source": "/((?!demo).*)",
        },
        Object {
          "destination": "/preview",
          "has": Array [
            Object {
              "key": "preview",
              "type": "query",
              "value": "true",
            },
          ],
          "permanent": false,
          "source": "/((?!preview).*)",
        },
        Object {
          "destination": "/preview",
          "has": Array [
            Object {
              "key": "preview",
              "type": "query",
              "value": "true",
            },
          ],
          "permanent": false,
          "source": "/((?!preview).*)",
        },
      ]
    `);
  });
});
