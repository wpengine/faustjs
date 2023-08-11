/**
 * @jest-environment node
 */

import * as apolloClient from '@apollo/client';
import * as client from '../src/client';

afterEach(() => {
  jest.clearAllMocks();
});

describe('getClient', () => {
  const httpLinkSpy = jest.spyOn(apolloClient, 'createHttpLink');

  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
    // @ts-ignore
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('calls the appropriate Apollo link with WordPress GraphQL endpoint', async () => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    client.getClient();

    expect(httpLinkSpy).toHaveBeenCalledTimes(1);

    expect(httpLinkSpy).toHaveBeenCalledWith({
      uri: 'http://headless.local/index.php?graphql',
    });
  });
});
