/**
 * @file Central type definitions for the template-hierarchy package
 */

/**
 * @typedef {Object} SeedNode
 * @property {string} [__typename] - The GraphQL typename
 * @property {string} [uri] - The URI of the node
 * @property {string} [id] - The ID of the node
 * @property {string} [databaseId] - The database ID
 * @property {string} [mimeType] - The MIME type for media items
 * @property {string} [name] - The name of the node
 * @property {boolean} [isFrontPage] - Whether this is the front page
 * @property {boolean} [isPostsPage] - Whether this is the posts page
 * @property {boolean} [isTermNode] - Whether this is a term node
 * @property {string} [slug] - The slug of the node
 * @property {string} [taxonomyName] - The taxonomy name for term nodes
 * @property {boolean} [isContentNode] - Whether this is a content node
 * @property {Object} [contentType] - The content type information
 * @property {Object} [contentType.node] - The content type node
 * @property {string} [contentType.node.name] - The content type name
 * @property {Object} [template] - The template information
 * @property {string} [template.templateName] - The template name
 * @property {number} [userId] - The user ID for author pages
 */

/**
 * @typedef {Object} WordPressTemplate
 * @property {string} id - The template ID
 * @property {string} path - The template path
 */

/**
 * @typedef {Object} TemplateData
 * @property {string} uri - The URI that was resolved
 * @property {Object} seedQuery - The seed query data from WordPress
 * @property {WordPressTemplate[]} availableTemplates - All available templates
 * @property {string[]} possibleTemplates - Possible template names in priority order
 * @property {WordPressTemplate} template - The selected template to use
 */

/**
 * @typedef {Object} UriToTemplateOptions
 * @property {typeof globalThis.fetch} fetch - The fetch function to use
 * @property {string} uri - The URI to resolve
 */

/**
 * @typedef {Object} UriToTemplateBaseParams
 * @property {string} uri - The URI to resolve (required)
 * @description Base parameters for uriToTemplate functions. Can be extended with additional properties as needed.
 */

// Export types for use in other modules
export {};
