/**
 * @file Type definitions for @faustjs/graphql
 */

/**
 * @typedef {Object} GraphQLClient
 * @property {function(string, Object): Promise<{data?: any, error?: string}>} request - Execute a GraphQL request
 */

/**
 * @typedef {Object} GraphQLResponse
 * @property {any} [data] - The response data
 * @property {string} [error] - Error message if request failed
 */

/**
 * @typedef {Object} SeedQueryOptions
 * @property {string} uri - The URI to fetch content for
 * @property {GraphQLClient} [graphqlClient] - Custom GraphQL client
 * @property {string} [wordpressUrl] - WordPress site URL
 */

export default {};
