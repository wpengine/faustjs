import { getWpUrl } from './getWpUrl.js';

/**
 * Returns the GraphQL Endpoint.
 */
export function getGraphqlEndpoint() {
  const wpUrl = getWpUrl();

  return `${wpUrl}/graphql`;
}
