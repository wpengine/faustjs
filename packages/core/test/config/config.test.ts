import {
  getGqlUrl,
  config,
  normalizeConfig,
} from '../../src/config/config';

describe('config/config', () => {
  test('config() should throw an error if no config is set', () => {
    expect(() => config()).toThrowError();
  });

  test('config() should NOT throw an error if a config is set', () => {
    config({
      wpUrl: '',
    });

    expect(() => config()).not.toThrowError();
  });

  test('config() called with no arguments should not modify the config', () => {
    const coreConfig = config({
      wpUrl: '',
      apiEndpoint: '',
    });

    expect(config()).toBe(coreConfig);
  });

  test('config() should return the set wpUrl', () => {
    const cfg = {
      wpUrl: 'http://wpengine.com',
    };

    let coreConfig = config(cfg);
    expect(coreConfig.wpUrl).toBe(cfg.wpUrl);
  });

  test('config() arguments should be immutable', () => {
    const cfg = {
      wpUrl: '',
      apiEndpoint: '',
    };

    let coreConfig = config(cfg);

    expect(coreConfig).not.toBe(cfg);
  });

  test('config() should return the set wpUrl', () => {
    const cfg = {
      wpUrl: 'http://my-headless-site.com',
    };

    const coreConfig = config(cfg);
    expect(coreConfig.wpUrl).toBe(cfg.wpUrl);
  });

  test('config() should always return the config', () => {
    const cfg = {
      wpUrl: '',
      apiEndpoint: '',
    };

    const coreConfig1 = config(cfg);
    const coreConfig2 = config();

    expect(coreConfig1).toBe(coreConfig2);
    expect(config()).toBe(coreConfig2);
  });

  test('apiEndpoint should default to `/api/auth/wpe-headless` unless set', () => {
    let coreConfig = normalizeConfig({
      wpUrl: '',
    });

    expect(coreConfig.apiEndpoint).toBe('/api/auth/wpe-headless');

    coreConfig = normalizeConfig({
      wpUrl: '',
      apiEndpoint: '/api/auth',
    });

    expect(coreConfig.apiEndpoint).toBe('/api/auth');
  });

  test('All strings should be trimmed', () => {
    const coreConfig = normalizeConfig({
      wpUrl: '   foo   ',
      gqlUrl: '   foo   ',
      apiEndpoint: '   foo   ',
      blogUrlPrefix: '   foo   ',
    });

    expect(coreConfig.wpUrl).toBe('foo');
    expect(coreConfig.gqlUrl).toBe('foo');
    expect(coreConfig.apiEndpoint).toBe('foo');
    expect(coreConfig.blogUrlPrefix).toBe('foo');
  });

  test('URLs should never end in `/`', () => {
    const coreConfig = normalizeConfig({
      wpUrl: 'http://test.local/',
      gqlUrl: 'http://test.local/graphql',
      apiEndpoint: '/api/auth/',
      blogUrlPrefix: '/blog/',
    });

    expect(coreConfig.wpUrl).toBe('http://test.local');
    expect(coreConfig.gqlUrl).toBe('http://test.local/graphql');
    expect(coreConfig.apiEndpoint).toBe('/api/auth');
    expect(coreConfig.blogUrlPrefix).toBe('/blog');
  });
});

describe('getGqlUrl', () => {
  test('getGqlUrl() should return the default graphql endpoint if gqlUrl is not set', () => {
    config({
      wpUrl: 'http://test.local',
    });

    expect(getGqlUrl()).toBe('http://test.local/graphql');
  });

  test('getGqlUrl() should return gqlUrl if it is a full URL', () => {
    config({
      wpUrl: 'http://test.local',
      gqlUrl: 'http://my-gql-url.com/graphql/',
    });

    expect(getGqlUrl()).toBe('http://my-gql-url.com/graphql');
  });

  test('getGqlUrl() should return the wpUrl with gqlUrl if it is NOT a full URL', () => {
    config({
      wpUrl: 'http://test.local',
      gqlUrl: '/custom-graphql-endpoint',
    });

    expect(getGqlUrl()).toBe('http://test.local/custom-graphql-endpoint');
  });
});
