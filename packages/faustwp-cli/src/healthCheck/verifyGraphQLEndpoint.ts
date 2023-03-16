import 'isomorphic-fetch';

import { infoLog, warnLog } from '../stdout/index.js';
import { getGraphqlEndpoint } from '../utils/index.js';

/**
 * Checks if the WordPress GraphQL endpoint is available to use.
 * Exits on failure.
 */
export async function verifyGraphQLEndpoint() {
  const graphqlEndpoint = getGraphqlEndpoint();

  try {
    const response: Response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: '{ __typename }' }),
    });

    const json: {
      data: {
        __typename: 'string';
      };
    } = await response.json();

    // eslint-disable-next-line no-underscore-dangle
    if (json.data.__typename) {
      infoLog('Discovered WPGraphQL endpoint!');
      return;
    }
  } catch (err) {
    warnLog(`

    Unable to find a GraphQL endpoint at ${graphqlEndpoint}

    Potential reasons you are experiencing this warning:

      ● Your WordPress site is unavailable
      ● WPGraphQL is not active
      ● WPGraphQL's default endpoint (/graphql) was changed in the plugin's settings
    `);
  }
}
