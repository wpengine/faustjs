/**
 * @jest-environment jsdom
 */
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { verifyGraphQLEndpoint } from '../../src/healthCheck/verifyGraphQLEndpoint.js';
import { getGraphqlEndpoint } from '../../src/utils/index.js';

describe('healthCheck/verifyGraphQLEndpoint', () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
  });

  afterAll(() => {
    process.env = envBackup;
    fetchMock.restore();
  });

  it('returns true when test GraphQL query is successful', async () => {
    fetchMock.post(getGraphqlEndpoint(), {
      status: 200,
      body: JSON.stringify({
        data: {
          __typename: 'RootQuery',
        },
      }),
    }, { overwriteRoutes: true });

    const result = await verifyGraphQLEndpoint();

    expect(result).toEqual(true);
  });

  it('returns false when test GraphQL query fails', async () => {
    const graphqlEndpoint = getGraphqlEndpoint();

    // Request could still be a successful 200 if a regular WordPress page exists.
    fetchMock.post(graphqlEndpoint, {
      status: 200,
      body: '<html><head></head><body>Regular HTML Page</body></html>',
    }, { overwriteRoutes: true });

    const result = await verifyGraphQLEndpoint();

    expect(result).toEqual(false);
  });

  it('prints a warning when GraphQL endpoint cannot be verified', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const graphqlEndpoint = getGraphqlEndpoint();

    // Request could still be a successful 200 if a regular WordPress page exists.
    fetchMock.post(graphqlEndpoint, {
      status: 200,
      body: '<html><head></head><body>Regular HTML Page</body></html>',
    }, { overwriteRoutes: true });

    await verifyGraphQLEndpoint();

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`Unable to find a GraphQL endpoint at ${graphqlEndpoint}`));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("WPGraphQL may not be active, or your WordPress site is unavailable."));

    consoleLogSpy.mockClear();
  });

});
