/**
 * @jest-environment jsdom
 */

import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import {
  fetchAccessToken,
  getAccessToken,
  getAccessTokenExpiration,
  setAccessToken,
} from '../../../src/auth/client/accessToken';
import { config } from '../../../src/config/config';

describe('auth/client/accessToken', () => {
  test('getAccessToken() returns undefined when there is no access token', () => {
    config({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    expect(getAccessToken()).toBeUndefined();
  });

  test('getAccessTokenExpiration() returns undefined when there is no expiration', () => {
    config({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    expect(getAccessTokenExpiration()).toBeUndefined();
  });

  test('setAccessToken() sets the access token', () => {
    const exp = Math.floor(Date.now() / 1000) + 1000;
    setAccessToken('test', exp);

    expect(getAccessToken()).toBe('test');
    expect(getAccessTokenExpiration()).toBe(exp);
  });

  test('fetchAccessToken() should clear the current access token/expiration upon failure', async () => {
    setAccessToken('test', new Date().getTime() + 1000);

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

    const token = await fetchAccessToken();

    expect(token).toBe(undefined);
    expect(getAccessToken()).toBe(undefined);
    expect(getAccessTokenExpiration()).toBe(undefined);

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

    const token = await fetchAccessToken();

    expect(token).toBe('test');

    expect(getAccessToken()).toBe('test');
    expect(getAccessTokenExpiration()).toBe(exp);

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

    const token = await fetchAccessToken('valid-code');

    expect(token).toBe('test');
    expect(getAccessToken()).toBe('test');

    fetchMock.restore();
  });
});
