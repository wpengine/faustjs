import 'isomorphic-fetch';
import * as fetchAccessToken from '../../src/server/auth/fetchAccessToken.js';
import fetchMock from 'fetch-mock';
import { cookies } from 'next/headers.js';

// // https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-893763840
const nextHeaders = { cookies };

jest.mock('next/headers.js');

describe('fetchAccessToken', () => {
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

  it('returns null if no code or refresh token is present', async () => {
    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      get(name: string) {
        return { name: undefined, value: undefined };
      },
    } as any);

    const token = await fetchAccessToken.fetchAccessToken();

    expect(token).toBe(null);
  });

  it('makes a request to the token endpoint with the code if given', async () => {
    process.env.NEXT_PUBLIC_URL = 'http://localhost:3000';

    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      get(name: string) {
        return { name: undefined, value: undefined };
      },
    } as any);

    const code = 'my code';

    // Ensures proper URL encoding
    fetchMock.get(`http://localhost:3000/api/faust/token?code=my%20code`, {
      status: 200,
      body: {
        accessToken: 'valid-token',
      },
    });

    const token = await fetchAccessToken.fetchAccessToken(code);

    expect(token).toBe('valid-token');
  });

  it('returns null if the token response was not ok', async () => {
    process.env.NEXT_PUBLIC_URL = 'http://localhost:3000';

    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    cookiesSpy.mockReturnValue({
      get(name: string) {
        return { name, value: '1234' };
      },
    } as any);

    fetchMock.get(`http://localhost:3000/api/faust/token`, {
      status: 401,
    });

    const token = await fetchAccessToken.fetchAccessToken();

    expect(token).toBeNull();
  });

  it('properly returns the access token', async () => {
    process.env.NEXT_PUBLIC_URL = 'http://localhost:3000';

    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      get(name: string) {
        return { name, value: 'valid-refresh-token' };
      },
    } as any);

    fetchMock.get(`http://localhost:3000/api/faust/token`, {
      status: 200,
      body: {
        accessToken: 'valid-token',
      },
    });

    const token = await fetchAccessToken.fetchAccessToken();

    expect(token).toBe('valid-token');
  });
});
