import 'isomorphic-fetch';

import { infoLog, errorLog } from '../stdout/index.js';
import { getGraphqlEndpoint } from '../utils/index.js';

/**
 * Checks if the WordPress GraphQL endpoint is available to use.
 */
export async function verifyGraphQLEndpoint() {
  const graphqlEndpoint = getGraphqlEndpoint();

  const response: Response = await fetch(graphqlEndpoint);

  if (response.status === 200) {
    infoLog('Discovered WPGraphQL endpoint!');
    return true;
  }

  errorLog(`Unable to find a GraphQL endpoint at ${graphqlEndpoint}`);
  return process.exit(0);
}
