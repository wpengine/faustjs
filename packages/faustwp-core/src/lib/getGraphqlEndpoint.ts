import { hooks } from '../wpHooks/index.js';
import { getWpUrl } from './getWpUrl.js';

export function getGraphqlEndpoint(): string {
  const wpUrl = getWpUrl();
  let graphqlEndpoint = `${wpUrl}/graphql`;

  graphqlEndpoint = hooks.applyFilters('graphqlEndpoint', graphqlEndpoint, {
    wpUrl,
  }) as string;

  return graphqlEndpoint;
}
