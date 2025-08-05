/**
 * @file Type definitions for the @faustjs/nextjs package
 */

/**
 * @typedef {Object} GraphQLClient
 * @property {function} request - Function to make GraphQL requests
 */

/**
 * @typedef {Object} NextJSConfig
 * @property {string} [templatePath="wp-templates"] - Path to template files relative to src/pages
 * @property {string} [graphqlEndpoint] - WordPress GraphQL endpoint URL
 * @property {GraphQLClient} [graphqlClient] - Custom GraphQL client instance
 */

/**
 * @typedef {Object} NextJSTemplateData
 * @property {string} uri - The requested URI
 * @property {Object} seedQuery - Seed query result with data and error
 * @property {Array} availableTemplates - Array of available template metadata objects
 * @property {Array} possibleTemplates - Array of possible templates for the current content
 * @property {Object} template - The resolved template to use
 */

/**
 * @typedef {Object} TemplateMetadata
 * @property {string} id - Template identifier (e.g., 'index', 'page', 'single')
 * @property {string} path - Template path for hierarchy resolution
 */

export {};
