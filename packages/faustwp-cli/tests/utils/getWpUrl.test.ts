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

  it('Provides the WordPress URL from the project\'s .env', async () => {
    expect(process.env.NEXT_PUBLIC_WORDPRESS_URL).toEqual(getWpUrl());
  });

});
