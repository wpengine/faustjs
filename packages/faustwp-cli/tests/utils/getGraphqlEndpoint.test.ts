/**
 * @jest-environment jsdom
 */

import { getGraphqlEndpoint } from '../../src/utils';

describe('utils/getGraphqlEndpoint', () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('provides the GraphQL endpoint', async () => {
    const wpUrlFromEnv = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    expect(getGraphqlEndpoint()).toEqual(wpUrlFromEnv + '/index.php?graphql');
  });

});
