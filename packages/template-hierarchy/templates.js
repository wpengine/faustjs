/**
 * @file Template hierarchy utilities for WordPress template resolution
 */

import './types.js'; // Import central type definitions

/**
 * Get possible templates for a given node based on WordPress template hierarchy
 * @param {import('./types.js').SeedNode} node - The node to get templates for
 * @returns {string[]} Array of possible template names in priority order
 */
export function getPossibleTemplates(node) {
	let possibleTemplates = [];

	if (node.template?.templateName && node.template.templateName !== 'Default') {
		possibleTemplates.push(`template-${node.template.templateName}`);
	}

	// Front page
	if (node.isFrontPage) {
		possibleTemplates.push('front-page');
	}

	// Blog page
	if (node.isPostsPage) {
		possibleTemplates.push('home');
	}

	// CPT archive page
	// eslint-disable-next-line no-underscore-dangle
	if (node.__typename === 'ContentType' && node.isPostsPage === false) {
		if (node.name) {
			possibleTemplates.push(`archive-${node.name}`);
		}

		possibleTemplates.push('archive');
	}

	// Archive Page
	if (node.isTermNode) {
		const { taxonomyName } = node;

		switch (taxonomyName) {
			case 'category': {
				if (node.slug) {
					possibleTemplates.push(`category-${node.slug}`);
				}

				if (node.databaseId) {
					possibleTemplates.push(`category-${node.databaseId}`);
				}

				possibleTemplates.push(`category`);

				break;
			}
			case 'post_tag': {
				if (node.slug) {
					possibleTemplates.push(`tag-${node.slug}`);
				}

				if (node.databaseId) {
					possibleTemplates.push(`tag-${node.databaseId}`);
				}

				possibleTemplates.push(`tag`);

				break;
			}
			default: {
				if (taxonomyName) {
					if (node.slug) {
						possibleTemplates.push(`taxonomy-${taxonomyName}-${node.slug}`);
					}

					if (node.databaseId) {
						possibleTemplates.push(
							`taxonomy-${taxonomyName}-${node.databaseId}`,
						);
					}

					possibleTemplates.push(`taxonomy-${taxonomyName}`);
				}

				possibleTemplates.push(`taxonomy`);
			}
		}

		possibleTemplates.push(`archive`);
	}

	if (node.userId) {
		if (node.name) {
			possibleTemplates.push(`author-${node.name?.toLocaleLowerCase()}`);
		}

		possibleTemplates.push(`author-${node.userId}`);
		possibleTemplates.push(`author`);
		possibleTemplates.push(`archive`);
	}

	// Singular page
	if (node.isContentNode) {
		if (
			node?.contentType?.node?.name !== 'page' &&
			node?.contentType?.node?.name !== 'post'
		) {
			if (node.contentType?.node?.name && node.slug) {
				possibleTemplates.push(
					`single-${node.contentType?.node?.name}-${node.slug}`,
				);
			}

			if (node.contentType?.node?.name) {
				possibleTemplates.push(`single-${node.contentType?.node?.name}`);
			}
		}

		if (node?.contentType?.node?.name === 'page') {
			if (node.slug) {
				possibleTemplates.push(`page-${node.slug}`);
			}

			if (node.databaseId) {
				possibleTemplates.push(`page-${node.databaseId}`);
			}

			possibleTemplates.push(`page`);
		}

		if (node?.contentType?.node?.name === 'post') {
			if (node.slug) {
				possibleTemplates.push(
					`single-${node.contentType.node.name}-${node.slug}`,
				);
			}

			possibleTemplates.push(`single-${node.contentType.node.name}`);
			possibleTemplates.push(`single`);
		}

		possibleTemplates.push(`singular`);
	}

	possibleTemplates.push('index');

	return possibleTemplates;
}

/**
 * Get the first matching template from available templates
 * @param {string[]} availableTemplates - Array of available template IDs
 * @param {string[]} [possibleTemplates=[]] - Array of possible template names in priority order
 * @returns {string | undefined} The first matching template ID or undefined
 */
export function getTemplate(availableTemplates, possibleTemplates = []) {
	// eslint-disable-next-line no-plusplus
	for (const possibleTemplate of possibleTemplates) {
		if (availableTemplates?.includes(possibleTemplate)) {
			return possibleTemplate;
		}
	}
}
