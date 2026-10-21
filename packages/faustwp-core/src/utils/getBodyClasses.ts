import type { SeedNode } from '../queries/seedQuery.js';

/**
 * Turn a page template name like "Full Width" into "full-width".
 */
function toClassName(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Get WordPress-style body classes for a page from its seed node.
 *
 * The classes follow the names WordPress's `body_class()` uses, such as
 * `home`, `single-post`, `postid-123` and `category-news`, so CSS written for a
 * WordPress theme keeps working. They're worked out from the seed node alone,
 * so they're a subset of what WordPress adds, and page template classes use
 * the template's name rather than its file name.
 *
 * @param seedNode The seed node for the current page.
 *
 * @returns The body classes.
 */
export function getBodyClasses(seedNode?: SeedNode | null): string[] {
	if (!seedNode) {
		return [];
	}

	const classes: string[] = [];
	const id = seedNode.databaseId;
	// eslint-disable-next-line no-underscore-dangle
	const typeName = seedNode.__typename;

	if (seedNode.isFrontPage) {
		classes.push('home');
	}

	if (seedNode.isPostsPage) {
		classes.push('blog');
	}

	if (seedNode.isContentNode) {
		const postType = seedNode.contentType?.node?.name;
		const templateName = seedNode.template?.templateName;

		if (postType === 'page') {
			classes.push('page', `page-id-${id}`);

			if (templateName) {
				classes.push(
					templateName === 'Default'
						? 'page-template-default'
						: `page-template-${toClassName(templateName)}`,
				);
			}
		} else if (postType) {
			classes.push('single', `single-${postType}`, `postid-${id}`);

			if (postType === 'attachment') {
				classes.push('attachment', `attachmentid-${id}`);
			}
		}

		return classes;
	}

	if (seedNode.isTermNode) {
		const { slug, taxonomyName } = seedNode;

		if (taxonomyName === 'category') {
			classes.push('archive', 'category', `category-${slug}`, `category-${id}`);
		} else if (taxonomyName === 'post_tag') {
			classes.push('archive', 'tag', `tag-${slug}`, `tag-${id}`);
		} else if (taxonomyName) {
			classes.push(
				'archive',
				`tax-${taxonomyName}`,
				`term-${slug}`,
				`term-${id}`,
			);
		}

		return classes;
	}

	if (typeName === 'User') {
		classes.push('archive', 'author', `author-${id}`);

		return classes;
	}

	// The posts page is also a post type archive, but WordPress only calls it "blog".
	if (typeName === 'ContentType' && seedNode.name && !seedNode.isPostsPage) {
		classes.push(
			'archive',
			'post-type-archive',
			`post-type-archive-${seedNode.name}`,
		);
	}

	return classes;
}
