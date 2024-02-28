import { Hooks } from '@wordpress/hooks/build-types';
import { FaustPlugin } from '../../src';
import { FaustConfig, getConfig, setConfig } from '../../src/config/index';

class HelloWorldTestPlugin {
  constructor() {}

  apply(hooks: Hooks) {
    console.log('Plugin called');
  }
}

// Plugins must have an apply method.
class InvalidPlugin {
  constructor() {}
}

describe('config', () => {
  test('plugins apply method is called', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    setConfig({
      // @ts-ignore
      templates: [],
      // @ts-ignore
      plugins: [new HelloWorldTestPlugin(), new HelloWorldTestPlugin()],
    });

    expect(consoleLogSpy).toBeCalledTimes(2);
  });

  test('plugin without apply method fails silently', () => {
    expect(() =>
      setConfig({
        // @ts-ignore
        templates: [],
        plugins: [
          new HelloWorldTestPlugin(),
          new InvalidPlugin() as FaustPlugin,
        ],
      }),
    ).not.toThrowError();
  });

  test('config without plugins is still valid', () => {
    expect(() =>
      setConfig({
        // @ts-ignore
        templates: [],
      }),
    ).not.toThrowError();
  });

  test('config sets useGETForRequests to true by default', () => {
    setConfig({} as any as FaustConfig);

    expect(getConfig().useGETForQueries).toBeTruthy();
  });

  test('useGETForRequests can be modified', () => {
    setConfig({ useGETForQueries: false } as any as FaustConfig);
    expect(getConfig().useGETForQueries).toBeFalsy();

    setConfig({ useGETForQueries: true } as any as FaustConfig);
    expect(getConfig().useGETForQueries).toBeTruthy();
  });

  test('config sets usePersistedQueries to false by default', () => {
    setConfig({} as any as FaustConfig);

    expect(getConfig().usePersistedQueries).toBeFalsy();
  });

  test('usePersistedQueries can be modified', () => {
    setConfig({ usePersistedQueries: false } as any as FaustConfig);
    expect(getConfig().usePersistedQueries).toBeFalsy();

    setConfig({ usePersistedQueries: true } as any as FaustConfig);
    expect(getConfig().usePersistedQueries).toBeTruthy();
  });

  test('config does not use basePath by default', () => {
    setConfig({} as any as FaustConfig);
    expect(getConfig().basePath).toBeFalsy();
  });

  test('basePath can be modified', () => {
    const mockBasePath = '/blog';
    setConfig({ basePath: mockBasePath } as any as FaustConfig);
    expect(getConfig().basePath).toEqual(mockBasePath);
  });
});
