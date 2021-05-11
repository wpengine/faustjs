import { headlessConfig } from '../src/config';

describe('config', () => {
  test('headlessConfig() should throw an error if no config is set', () => {
    expect(() => headlessConfig()).toThrowError();
  });

  test('headlessConfig() should NOT throw an error if a config is set', () => {
    headlessConfig({
      wpUrl: '',
    });

    expect(() => headlessConfig()).not.toThrowError();
  });

  test('apiEndpoint should default to `/api/auth/wpe-headless` unless set', () => {
    headlessConfig({
      wpUrl: '',
    });

    expect(headlessConfig().apiEndpoint).toBe('/api/auth/wpe-headless');

    headlessConfig({
      wpUrl: '',
      apiEndpoint: '/api/auth',
    });

    expect(headlessConfig().apiEndpoint).toBe('/api/auth');
  });

  test('URLs should never end in `/`', () => {
    headlessConfig({
      wpUrl: 'http://test.local/',
      apiEndpoint: '/api/auth/',
      blogUrlPrefix: '/blog/',
    });

    const cfg = headlessConfig();

    expect(cfg.wpUrl).toBe('http://test.local');
    expect(cfg.apiEndpoint).toBe('/api/auth');
    expect(cfg.blogUrlPrefix).toBe('/blog');
  });
});
