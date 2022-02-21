/**
 * @jest-environment jsdom
 */

import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import * as accessToken from '../../../src/auth/client/accessToken';
import { config } from '../../../src/config/config';
describe('auth/client/accessToken', () => {
  test('getAccessToken() returns undefined when there is no access token', () => {
    config({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    expect(accessToken.getAccessToken()).toBeUndefined();
  });

  test('getAccessTokenExpiration() returns undefined when there is no expiration', () => {
    config({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

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

    config({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
      apiBasePath: '/testing',
    });

    fetchMock.get('/testing/auth/token', {
      status: 401,
      ok: false,
      json: { error: 'Unauthorized' },
    });

    const token = await accessToken.fetchAccessToken();

    expect(token).toBe(undefined);
    expect(accessToken.getAccessToken()).toBe(undefined);
    expect(accessToken.getAccessTokenExpiration()).toBe(undefined);

    fetchMock.restore();
  });

  test('fetchAccessToken() should set the token/expiration upon success', async () => {
    config({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

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

    fetchMock.restore();
  });

  test('fetchAccessToken() should append the code query param to the fetch URL if provided', async () => {
    config({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

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

    fetchMock.restore();
  });

  test('A refresh timer is set after calling fetchAccessToken()', async () => {
    jest.spyOn(accessToken, 'fetchAccessToken');
    jest.spyOn(accessToken, 'getRefreshTimer');

    config({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

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

    fetchMock.restore();
  });

  test('Refresh timer is called after the refresh time lapses', async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(accessToken, 'fetchAccessToken');

    config({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    fetchMock.get('/api/faust/auth/token', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
        accessTokenExpiration: 123,
      }),
    });

    await accessToken.fetchAccessToken();

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
    fetchMock.restore();
  });
});
