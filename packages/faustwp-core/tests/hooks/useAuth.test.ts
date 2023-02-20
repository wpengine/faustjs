/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import { useAuth } from '../../src/hooks/useAuth';

describe('useAuth hook', () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('Provides the proper login url with redirect strategy', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth());
    await waitForNextUpdate();
    const { loginUrl } = result.current;

    expect(loginUrl).toEqual(
      'http://headless.local/generate?redirect_uri=http%3A%2F%2Flocalhost%2F',
    );
  });

  it('Provides the proper login url with local strategy', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAuth({
        strategy: 'local',
        loginPageUrl: '/login',
      }),
    );
    await waitForNextUpdate();
    const { loginUrl } = result.current;

    expect(loginUrl).toEqual('/login?redirect_uri=http%3A%2F%2Flocalhost%2F');
  });

  it('ensures isAuthenticated is not available until isReady', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toStrictEqual(null);
    expect(result.current.isReady).toStrictEqual(false);

    await waitForNextUpdate();

    expect(result.current.isAuthenticated).toStrictEqual(false);
    expect(result.current.isReady).toStrictEqual(true);
  });

  it('ensures strategy local requires a "loginPageUrl"', () => {
    expect(() =>
      useAuth({
        strategy: 'local',
      } as any),
    ).toThrowError('useAuth: Local strategies must specify the "loginPageUrl"');
  });

  it('returns isAuthenticated true when token endpoint returns valid tokens', async () => {
    // Mock a valid response from the token endpoint.
    fetchMock.get(`/api/faust/auth/token`, {
      status: 200,
      body: JSON.stringify({
        accessToken: 'at',
        refreshToken: 'rt',
      }),
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toStrictEqual(null);

    await waitForNextUpdate();

    expect(result.current.isAuthenticated).toStrictEqual(true);

    fetchMock.restore();
  });

  it('returns isAuthenticated false when token endpoint returns 401', async () => {
    // Mock a valid response from the token endpoint.
    fetchMock.get(`/api/faust/auth/token`, {
      status: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toStrictEqual(null);

    await waitForNextUpdate();

    expect(result.current.isAuthenticated).toStrictEqual(false);

    fetchMock.restore();
  });
});
