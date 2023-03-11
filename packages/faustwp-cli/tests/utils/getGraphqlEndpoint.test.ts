/**
 * @jest-environment jsdom
 */

import { getGraphqlEndpoint } from '../../src/utils';

describe('utils/getGraphqlEndpoint', () => {
  const envBackup = process.env;
  const mockWordPressUrl = 'http://headless.local';

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = mockWordPressUrl;
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('provides the GraphQL endpoint (currently without a hook)', async () => {
    const wpUrlFromEnv = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    expect(getGraphqlEndpoint()).toEqual(wpUrlFromEnv + '/graphql');
  });

  it('provides the GraphQL endpoint (currently without a hook)', async () => {
    const wpUrlFromEnv = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    expect(getGraphqlEndpoint()).toEqual(wpUrlFromEnv + '/graphql');
  });

});
