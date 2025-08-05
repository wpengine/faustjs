/**
 * @file TypeScript definitions for @faustjs/astro
 */

/**
 * GraphQL client interface that users can implement
 * @typedef {Object} GraphQLClient
 * @property {(query: string, variables?: Record<string, any>) => Promise<{data?: any, error?: any}>} request - Execute a GraphQL query
 */

/**
 * Options for getSeedQuery function
 * @typedef {Object} SeedQueryOptions
 * @property {string} uri - The URI to query for
 * @property {GraphQLClient} [graphqlClient] - Optional GraphQL client to use
 */

export {};
