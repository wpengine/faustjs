/**
 * @file Higher-level utility for creating WordPress-powered Next.js pages
 */

import React from 'react';
import {
	uriToTemplate,
	setGraphQLClient,
	createDefaultClient,
} from './index.js';
import { DefaultNotFoundComponent } from './DefaultNotFoundComponent.jsx';

/**
 * Create a WordPress-powered Next.js page component with simplified setup
 * @param {Object} options - Configuration options
 * @param {Object} options.templates - Object mapping template IDs to React components
 * @param {React.Component} [options.NotFoundComponent] - Custom component for 404/not found cases
 * @param {import('../types.js').GraphQLClient} [options.graphqlClient] - Custom GraphQL client instance
 * @param {string} [options.wordpressUrl] - WordPress site URL
 * @returns {Object} Object containing the page component and getWordPressProps function
 */
export function createWordPressPage({
	templates,
	NotFoundComponent = DefaultNotFoundComponent,
	graphqlClient,
	wordpressUrl,
}) {
	// Validate templates object
	if (!templates || typeof templates !== 'object') {
		throw new Error('createWordPressPage: templates object is required');
	}

	const availableTemplateIds = Object.keys(templates);

	if (availableTemplateIds.length === 0) {
		throw new Error(
			'createWordPressPage: at least one template must be provided',
		);
	}

	/**
	 * The generated page component
	 */
	function WordPressPage(props) {
		const { templateData } = props;

		// Handle case where no template could be resolved
		if (!templateData?.template?.id) {
			return <NotFoundComponent templateData={templateData} error="template" />;
		}

		// Get the component for the resolved template
		const TemplateComponent = templates[templateData.template.id];

		// Handle case where template ID exists but component is not available
		if (!TemplateComponent) {
			return (
				<NotFoundComponent templateData={templateData} error="component" />
			);
		}

		// Render the template component with all props
		return <TemplateComponent {...props} />;
	}

	/**
	 * Generated getWordPressProps function (can be used for both SSG and SSR)
	 */
	async function getWordPressProps(context) {
		const { params } = context;

		// Extract URI from params
		const uri = Array.isArray(params?.uri)
			? '/' + params.uri.join('/') + '/'
			: '/';

		// Setup GraphQL client - use provided client or create default
		let client = graphqlClient;

		if (!client) {
			// Use provided wordpressUrl or fall back to environment variable
			const wpUrl = wordpressUrl;
			if (!wpUrl) {
				console.error(
					'WordPress URL is required. Provide it via options.wordpressUrl or WORDPRESS_URL environment variable',
				);
				return { notFound: true };
			}

			client = createDefaultClient(wpUrl);
		}

		setGraphQLClient(client);

		try {
			// Resolve template using WordPress template hierarchy
			const templateData = await uriToTemplate({
				uri,
				availableTemplates: availableTemplateIds,
				graphqlClient: client,
			});

			// Handle 404 cases
			if (
				!templateData?.template?.id ||
				templateData?.template?.id === '404 Not Found'
			) {
				return { notFound: true };
			}

			// Prepare props for the page component
			const props = {
				uri,
				templateData: JSON.parse(JSON.stringify(templateData)),
			};

			return { props };
		} catch (error) {
			return { notFound: true };
		}
	}

	// Return both the component and the getWordPressProps function
	return {
		default: WordPressPage,
		getWordPressProps,
	};
}
