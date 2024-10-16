/**
 * @jest-environment jsdom
 */

import { getWpUrl } from '../../src/utils';

describe('utils/getWpUrl', () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it("provides the (unfiltered) WordPress URL from the project's .env", async () => {
    const wpUrlFromEnv = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    expect(getWpUrl()).toEqual(wpUrlFromEnv);
  });

  it('provides the (unfiltered) WordPress URL at a specific path when using the path argument', async () => {
    const wpUrlFromEnv = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    expect(getWpUrl('with/path')).toEqual(wpUrlFromEnv + '/with/path');
  });

  it('provides the (unfiltered) WordPress URL at a specific path when using the path argument with leading/trailing slashes', async () => {
    const wpUrlFromEnv = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    expect(getWpUrl('/with/path/')).toEqual(wpUrlFromEnv + '/with/path');
  });
});
