import {
  getGqlUrl,
  headlessConfig,
  normalizeConfig,
} from '../../src/config/config';

describe('config/config', () => {
  test('headlessConfig() should throw an error if no config is set', () => {
    expect(() => headlessConfig()).toThrowError();
  });

  test('headlessConfig() should NOT throw an error if a config is set', () => {
    headlessConfig({
      wpUrl: '',
    });

    expect(() => headlessConfig()).not.toThrowError();
  });

  test('headlessConfig() called with no arguments should not modify the config', () => {
    const config = headlessConfig({
      wpUrl: '',
      apiEndpoint: '',
    });

    expect(headlessConfig()).toBe(config);
  });

  test('headlessConfig() should return the set wpUrl', () => {
    const cfg = {
      wpUrl: 'http://wpengine.com',
    };

    let config = headlessConfig(cfg);
    expect(config.wpUrl).toBe(cfg.wpUrl);
  });

  test('headlessConfig() arguments should be immutable', () => {
    const cfg = {
      wpUrl: '',
      apiEndpoint: '',
    };

    let config = headlessConfig(cfg);

    expect(config).not.toBe(cfg);
  });

  test('headlessConfig() should return the set wpUrl', () => {
    const cfg = {
      wpUrl: 'http://my-headless-site.com',
    };

    const config = headlessConfig(cfg);
    expect(config.wpUrl).toBe(cfg.wpUrl);
  });

  test('headlessConfig() should always return the config', () => {
    const cfg = {
      wpUrl: '',
      apiEndpoint: '',
    };

    const config1 = headlessConfig(cfg);
    const config2 = headlessConfig();

    expect(config1).toBe(config2);
    expect(headlessConfig()).toBe(config1);
  });

  test('apiEndpoint should default to `/api/auth/wpe-headless` unless set', () => {
    let config = normalizeConfig({
      wpUrl: '',
    });

    expect(config.apiEndpoint).toBe('/api/auth/wpe-headless');

    config = normalizeConfig({
      wpUrl: '',
      apiEndpoint: '/api/auth',
    });

    expect(config.apiEndpoint).toBe('/api/auth');
  });

  test('All strings should be trimmed', () => {
    const config = normalizeConfig({
      wpUrl: '   foo   ',
      gqlUrl: '   foo   ',
      apiEndpoint: '   foo   ',
      blogUrlPrefix: '   foo   ',
    });

    expect(config.wpUrl).toBe('foo');
    expect(config.gqlUrl).toBe('foo');
    expect(config.apiEndpoint).toBe('foo');
    expect(config.blogUrlPrefix).toBe('foo');
  });

  test('URLs should never end in `/`', () => {
    const config = normalizeConfig({
      wpUrl: 'http://test.local/',
      gqlUrl: 'http://test.local/graphql',
      apiEndpoint: '/api/auth/',
      blogUrlPrefix: '/blog/',
    });

    expect(config.wpUrl).toBe('http://test.local');
    expect(config.gqlUrl).toBe('http://test.local/graphql');
    expect(config.apiEndpoint).toBe('/api/auth');
    expect(config.blogUrlPrefix).toBe('/blog');
  });
});

describe('getGqlUrl', () => {
  test('getGqlUrl() should return the default graphql endpoint if gqlUrl is not set', () => {
    headlessConfig({
      wpUrl: 'http://test.local',
    });

    expect(getGqlUrl()).toBe('http://test.local/graphql');
  });

  test('getGqlUrl() should return gqlUrl if it is a full URL', () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      gqlUrl: 'http://my-gql-url.com/graphql/',
    });

    expect(getGqlUrl()).toBe('http://my-gql-url.com/graphql');
  });

  test('getGqlUrl() should return the wpUrl with gqlUrl if it is NOT a full URL', () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      gqlUrl: '/custom-graphql-endpoint',
    });

    console.log(headlessConfig());

    expect(getGqlUrl()).toBe('http://test.local/custom-graphql-endpoint');
  });
});
