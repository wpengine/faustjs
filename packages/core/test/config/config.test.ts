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
    };

    const config1 = headlessConfig(cfg);
    const config2 = headlessConfig();

    expect(config1).toBe(config2);
    expect(headlessConfig()).toBe(config1);
  });

  test('apiBasePath should default to `/api/faust` unless set', () => {
    let config = normalizeConfig({
      wpUrl: '',
    });

    expect(config.apiBasePath).toBe('/api/faust');

    config = normalizeConfig({
      wpUrl: '',
      apiBasePath: '/api/testing',
    });

    expect(config.apiBasePath).toBe('/api/testing');
  });

  test('apiBasePath should always have a leading /', () => {
    let config = normalizeConfig({
      wpUrl: '',
      apiBasePath: 'api/testing',
    });

    expect(config.apiBasePath).toBe('/api/testing');
  });

  test('All strings should be trimmed', () => {
    const config = normalizeConfig({
      wpUrl: '   foo   ',
      gqlUrl: '   foo   ',
      blogUrlPrefix: '   foo   ',
      apiBasePath: '   foo   ',
    });

    expect(config.wpUrl).toBe('foo');
    expect(config.gqlUrl).toBe('foo');
    expect(config.blogUrlPrefix).toBe('foo');
    expect(config.apiBasePath).toBe('/foo');
  });

  test('URLs should never end in `/`', () => {
    const config = normalizeConfig({
      wpUrl: 'http://test.local/',
      gqlUrl: 'http://test.local/graphql',
      apiBasePath: '/api/my-api/',
      blogUrlPrefix: '/blog/',
    });

    expect(config.wpUrl).toBe('http://test.local');
    expect(config.gqlUrl).toBe('http://test.local/graphql');
    expect(config.apiBasePath).toBe('/api/my-api');
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

    expect(getGqlUrl()).toBe('http://test.local/custom-graphql-endpoint');
  });
});
