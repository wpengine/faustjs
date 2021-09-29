import { headlessConfig } from '../src';

describe('config', () => {
  test('headlessConfig() should throw an error if no config is set', () => {
    expect(() => headlessConfig()).toThrowError();
  });

  test('headlessConfig() should setup a default next config', () => {
    const config = headlessConfig({ wpUrl: 'http://local.local' });
    expect(config.next).toBeDefined();
  });

  test('headlessConfig() default revalidate should be 900 seconds', () => {
    const config = headlessConfig({ wpUrl: 'http://local.local' });
    expect(config.next.revalidate).toBe(900);
  });

  test('headlessConfig() should allow setting revalidate', () => {
    const config = headlessConfig({
      wpUrl: 'http://local.local',
      next: { revalidate: 30 },
    });
    expect(config.next.revalidate).toBe(30);
  });
});
