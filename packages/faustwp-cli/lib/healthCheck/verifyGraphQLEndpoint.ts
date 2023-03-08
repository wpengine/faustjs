import 'isomorphic-fetch';

import { infoLog, errorLog } from '../stdout/index.js';
import { getGraphqlEndpoint, getWpUrl } from '../../utils/index.js';

/**
 * Checks if the WordPress GraphQL endpoint is available to use.
 * Exits on failure.
 */
export async function verifyGraphQLEndpoint() {
  const graphqlEndpoint = getGraphqlEndpoint();
  const wpUrl = getWpUrl();

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
        __typename: 'string'
      }
    } = await response.json();

    // If __typename exists in the response then our GraphQL was successful.
    if (json.data.__typename) {
      infoLog('Discovered WPGraphQL endpoint');
      return;
    }
  } catch (err) {
    errorLog(`

    Unable to find a GraphQL endpoint at ${graphqlEndpoint}

    Potential reasons you are experiencing this error:

      ● Your WordPress site is unavailable
      ● WPGraphQL is not active
      ● WPGraphQL\'s default endpoint (/graphql) was changed in the plugin\'s settings
    `);

    process.exit(0);
  }
}
