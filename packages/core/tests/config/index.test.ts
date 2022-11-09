import { Hooks } from '@wordpress/hooks/build-types';
import { setConfig } from '../../src/config/index';

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
      experimentalPlugins: [
        new HelloWorldTestPlugin(),
        new HelloWorldTestPlugin(),
      ],
    });

    expect(consoleLogSpy).toBeCalledTimes(2);
  });

  test('plugin without apply method fails silently', () => {
    expect(() =>
      setConfig({
        // @ts-ignore
        templates: [],
        experimentalPlugins: [new HelloWorldTestPlugin(), new InvalidPlugin()],
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
});
