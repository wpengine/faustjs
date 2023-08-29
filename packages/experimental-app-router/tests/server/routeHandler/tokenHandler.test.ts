import 'isomorphic-fetch';
import * as tokenHandler from '../../../src/server/routeHandler/tokenHandler';
jest.mock('next/headers.js');
import { cookies } from 'next/headers.js';
import fetchMock from 'fetch-mock';
import { NextRequest } from 'next/server';

// // https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-893763840
const nextHeaders = { cookies };

describe('tokenHandler', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('throws a 500 error if the secret key is not set', async () => {
    const req = new Request('http://localhost:3000/api/faust/token');

    const response = await tokenHandler.tokenHandler(req);

    expect(response.status).toBe(500);
    expect(await response.json()).toStrictEqual({
      error: 'Internal Server Error',
    });
  });

  it('throws a 401 when the refresh token or code is not present', async () => {
    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      get() {
        return {};
      },
    } as any);

    process.env.FAUST_SECRET_KEY = 'xxxx';

    const req = new Request('http://localhost:3000/api/faust/token');

    const response = await tokenHandler.tokenHandler(req);

    expect(response.status).toBe(401);
    expect(await response.json()).toStrictEqual({
      error: 'Unauthorized',
    });
  });

  it('returns 401 if wp endpoint response was not ok', async () => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
    process.env.FAUST_SECRET_KEY = 'xxxx';

    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      get() {
        return { value: 'my-invalid-rt' };
      },
    } as any);

    fetchMock.post('http://headless.local/?rest_route=/faustwp/v1/authorize', {
      status: 401,
    });

    const req = new NextRequest(
      new Request('http://localhost:3000/api/faust/token'),
    );

    const response = await tokenHandler.tokenHandler(req);

    expect(response.status).toBe(401);
    expect(await response.json()).toStrictEqual({ error: 'Unauthorized' });
  });

  it('successfully returns tokens using refresh token', async () => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
    process.env.FAUST_SECRET_KEY = 'xxxx';

    const validResponse: tokenHandler.AuthorizeResponse = {
      accessToken: 'at',
      accessTokenExpiration: 1234,
      refreshToken: 'rt',
      refreshTokenExpiration: 1234,
    };

    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      get() {
        return { value: 'my-valid-rt' };
      },
    } as any);

    fetchMock.post(
      {
        url: 'http://headless.local/?rest_route=/faustwp/v1/authorize',
        headers: {
          'Content-Type': 'application/json',
          'x-faustwp-secret': 'xxxx',
        },
        body: {
          refreshToken: 'my-valid-rt',
          code: 'my-code',
        },
      },
      {
        status: 200,
        body: JSON.stringify(validResponse),
      },
    );

    const req = new NextRequest(
      new Request('http://localhost:3000/api/faust/token?code=my-code'),
    );

    const response = await tokenHandler.tokenHandler(req);

    expect(response.status).toBe(200);
    expect(await response.json()).toStrictEqual(validResponse);
  });
});
