import { getWpUrl } from './getWpUrl.js';

/**
 * Returns the GraphQL Endpoint.
 */
export function getGraphqlEndpoint() {
  const wpUrl = getWpUrl();

  // Use direct WordPress query to avoid relying on a filter.
  // https://github.com/wpengine/faustjs/issues/1360
  return `${wpUrl}/index.php?graphql`;
}
