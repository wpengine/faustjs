/**
 * @jest-environment jsdom
 */

import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';

describe('auth/client/accessToken', () => {
  let accessToken: any;

  afterEach(() => {
    fetchMock.restore();
    jest.useRealTimers();
  });

  /**
   * Isolate modules so that local module state doesn't conflict between tests
   * @link https://jestjs.io/docs/jest-object#jestisolatemodulesfn
   */
  beforeEach(() => {
    jest.isolateModules(() => {
      accessToken = require('../../../src/auth/client/accessToken');
    });
  });

  test('getAccessToken() returns undefined when there is no access token', () => {
    expect(accessToken.getAccessToken()).toBeUndefined();
  });

  test('getAccessTokenExpiration() returns undefined when there is no expiration', () => {
    expect(accessToken.getAccessTokenExpiration()).toBeUndefined();
  });

  test('setAccessToken() sets the access token', () => {
    const exp = Math.floor(Date.now() / 1000) + 1000;
    accessToken.setAccessToken('test', exp);

    expect(accessToken.getAccessToken()).toBe('test');
    expect(accessToken.getAccessTokenExpiration()).toBe(exp);
  });

  test('fetchAccessToken() should clear the current access token/expiration upon failure', async () => {
    accessToken.setAccessToken('test', new Date().getTime() + 1000);

    fetchMock.get('/api/faust/auth/token', {
      status: 401,
      ok: false,
      json: { error: 'Unauthorized' },
    });

    const token = await accessToken.fetchAccessToken();

    expect(token).toBe(undefined);
    expect(accessToken.getAccessToken()).toBe(undefined);
    expect(accessToken.getAccessTokenExpiration()).toBe(undefined);
  });

  test('fetchAccessToken() should set the token/expiration upon success', async () => {
    const exp = new Date().getTime() + 1000;

    fetchMock.get('/api/faust/auth/token', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
        accessTokenExpiration: exp,
      }),
    });

    const token = await accessToken.fetchAccessToken();

    expect(token).toBe('test');

    expect(accessToken.getAccessToken()).toBe('test');
    expect(accessToken.getAccessTokenExpiration()).toBe(exp);
  });

  test('fetchAccessToken() should append the code query param to the fetch URL if provided', async () => {
    fetchMock.get('/api/faust/auth/token', {
      status: 401,
      body: JSON.stringify({
        error: 'Unauthorized',
      }),
    });

    fetchMock.get('/api/faust/auth/token?code=valid-code', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
      }),
    });

    const token = await accessToken.fetchAccessToken('valid-code');

    expect(token).toBe('test');
    expect(accessToken.getAccessToken()).toBe('test');
  });

  test('fetchAccessToken() should url encode the code parameter if provided', async () => {
    const code = "//+\\==asdasdadasd:*&^%$))!£!";
    fetchMock.get(`/api/faust/auth/token?code=${encodeURIComponent(code)}`, {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
      }),
    });
    const token = await accessToken.fetchAccessToken(code);

    expect(token).toBe('test');
    expect(accessToken.getAccessToken()).toBe('test');
  });

  test('A refresh timer is set after calling fetchAccessToken()', async () => {
    jest.spyOn(accessToken, 'getRefreshTimer');

    fetchMock.get('/api/faust/auth/token', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
        accessTokenExpiration: 123,
      }),
    });

    expect(accessToken.getRefreshTimer()).toBeUndefined();

    await accessToken.fetchAccessToken();

    expect(accessToken.getRefreshTimer()).toBeDefined();
  });

  test('Refresh timer is called after the refresh time lapses', async () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    fetchMock.get('/api/faust/auth/token', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
        accessTokenExpiration: 123,
      }),
    });

    await accessToken.fetchAccessToken();

    jest.runAllTimers();

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
