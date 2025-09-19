import availableTemplates from '@/wp-templates';
import availableQueries from '@/wp-templates/templateQueries';
import { fetchTemplateQueries } from '@faustjs/data-fetching';
import { uriToTemplate } from '@faustjs/nextjs/pages';

// Resolves the WordPress route based on the identifier (slug or ID) and fetches the necessary data
// for the corresponding template. It returns the props needed for rendering the page.
// If the route or template is not found, it returns a 404 response.

export async function resolveWpRoute(identifier, isPreview, client) {
	const uri = identifier ? `/${identifier.join('/')}/` : '/';

	const variables = isPreview
		? {
				id: identifier?.[0],
				asPreview: true,
		  }
		: { uri };

	try {
		const templateData = await uriToTemplate({
			...variables,
			availableTemplates: Object.keys(availableTemplates),
			wordpressUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
		});

		if (
			!templateData?.template?.id ||
			templateData?.template?.id === '404 Not Found'
		) {
			return { notFound: true };
		}

		const queriesData = await fetchTemplateQueries({
			availableQueries,
			templateData,
			client,
			locale: templateData?.seedNode?.locale,
		});

		return {
			props: {
				uri,
				templateData: JSON.parse(JSON.stringify(templateData)),
				queriesData,
			},
		};
	} catch (error) {
		console.error('Error resolving template:', error);
		return { notFound: true };
	}
}
