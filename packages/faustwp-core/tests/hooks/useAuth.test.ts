/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import { useAuth } from '../../src/hooks/useAuth';
import { setAccessToken } from '../../src/auth';

describe('useAuth hook', () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  afterEach(() => {
    setAccessToken(undefined, undefined);
  });

  it('skips authentication check when skip is true', async () => {
    // Set up the fetch mock but expect it not to be called
    fetchMock.get(`/api/faust/auth/token`, {
      status: 200,
      body: JSON.stringify({ accessToken: 'at', refreshToken: 'rt' }),
    });

    const { result } = renderHook(() => useAuth({ skip: true }));

    // The hook should skip the authentication check
    expect(result.current.isAuthenticated).toStrictEqual(null);
    expect(result.current.isReady).toStrictEqual(false);

    // Ensure the token endpoint was not called
    expect(fetchMock.called(`/api/faust/auth/token`)).toBe(false);

    fetchMock.restore();
  });

  it('performs authentication check by default (skip not provided)', async () => {
    // Mock a valid response
    fetchMock.get(`/api/faust/auth/token`, {
      status: 200,
      body: JSON.stringify({ accessToken: 'at', refreshToken: 'rt' }),
    });
    fetchMock.get(`http://headless.local/index.php?graphql&query=query%20GetFaustViewer%20%7B%0A%20%20viewer%20%7B%0A%20%20%20%20name%0A%20%20%20%20username%0A%20%20%20%20capabilities%0A%20%20%20%20databaseId%0A%20%20%20%20description%0A%20%20%20%20email%0A%20%20%20%20firstName%0A%20%20%20%20id%0A%20%20%20%20lastName%0A%20%20%20%20nickname%0A%20%20%20%20locale%0A%20%20%20%20registeredDate%0A%20%20%20%20slug%0A%20%20%20%20templates%0A%20%20%20%20uri%0A%20%20%20%20url%0A%20%20%20%20userId%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&operationName=GetFaustViewer&variables=%7B%7D`, {
      status: 200,
      body: JSON.stringify({
        data: {
          viewer: {
            name: 'admin',
            username: 'admin',
            capabilities: ['administrator'],
            databaseId: 1,
            description: '',
            email: '',
          },
        },
      }),
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    // Default behavior should perform authentication check
    expect(result.current.isAuthenticated).toStrictEqual(true);
    expect(result.current.isReady).toStrictEqual(true);

    fetchMock.restore();
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
    fetchMock.get(`http://headless.local/index.php?graphql&query=query%20GetFaustViewer%20%7B%0A%20%20viewer%20%7B%0A%20%20%20%20name%0A%20%20%20%20username%0A%20%20%20%20capabilities%0A%20%20%20%20databaseId%0A%20%20%20%20description%0A%20%20%20%20email%0A%20%20%20%20firstName%0A%20%20%20%20id%0A%20%20%20%20lastName%0A%20%20%20%20nickname%0A%20%20%20%20locale%0A%20%20%20%20registeredDate%0A%20%20%20%20slug%0A%20%20%20%20templates%0A%20%20%20%20uri%0A%20%20%20%20url%0A%20%20%20%20userId%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&operationName=GetFaustViewer&variables=%7B%7D`, {
      status: 200,
      body: JSON.stringify({
        data: {
          viewer: {
            name: 'admin',
            username: 'admin',
            capabilities: ['administrator'],
            databaseId: 1,
            description: '',
            email: '',
          },
        },
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

  it('returns the viewer object', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.viewer).toBeDefined();
  });

});
