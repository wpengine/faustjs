import 'isomorphic-fetch';

import { infoLog, errorLog } from '../stdout/index.js';
import { getGraphqlEndpoint } from '../utils/index.js';

/**
 * Checks if the WordPress GraphQL endpoint is available to use.
 */
export async function verifyGraphQLEndpoint() {
  const graphqlEndpoint = getGraphqlEndpoint();

  try {
    // Perform GraphQL request.
    const response: Response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: '{ __typename }' }),
    });

    // Expect a valid GraphQL response.
    const json: {
      data: {
        __typename: 'string';
      };
    } = await response.json();

    // eslint-disable-next-line no-underscore-dangle
    if (json.data.__typename) {
      infoLog('Discovered WPGraphQL endpoint!');
      return true;
    }

    return process.exit(0);
  } catch (err) {
    errorLog(`Unable to find a GraphQL endpoint at ${graphqlEndpoint}`);
    errorLog(
      'WPGraphQL may not be active, or your WordPress site is unavailable.',
    );

    return process.exit(0);
  }
}
