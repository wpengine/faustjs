import { config } from '../src/config';

describe('config', () => {
  test('config() should setup a default next config', () => {
    const cfg = config();
    expect(cfg).toBeDefined();
  });

  test('config() default revalidate should be 900 seconds', () => {
    const cfg = config();
    expect(cfg.revalidate).toBe(900);
  });

  test('config() should allow setting revalidate', () => {
    const cfg = config({ revalidate: 30 });
    expect(cfg.revalidate).toBe(30);
    expect(config().revalidate).toBe(30);
    expect(config({ revalidate: 10 }).revalidate).toBe(10);
  });
});
