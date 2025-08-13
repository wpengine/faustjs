import { getAuthString } from '@/utils/getAuthString';
import availableTemplates from '@/wp-templates';
import {
	createDefaultClient,
	setGraphQLClient,
	uriToTemplate,
} from '@faustjs/nextjs/pages';

export default function Page(props) {
	const { templateData } = props;

	const PageTemplate = availableTemplates[templateData?.template?.id];

	return <PageTemplate {...props} />;
}

// Statically generate the pages, except for draft mode
// More info: https://nextjs.org/docs/pages/guides/draft-mode
export async function getStaticProps({
	params,
	draftMode: isDraftModeEnabled,
}) {
	// Send the authentication string only if draft mode is enabled
	const headers = isDraftModeEnabled
		? {
				Authorization: getAuthString(),
		  }
		: null;

	const client = createDefaultClient(
		process.env.NEXT_PUBLIC_WORDPRESS_URL,
		headers,
	);

	setGraphQLClient(client);

	const uri = Array.isArray(params?.identifier)
		? '/' + params.identifier.join('/') + '/'
		: '/';

	const variables = isDraftModeEnabled
		? {
				id: params.identifier?.[0],
				isPreview: true,
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

		return {
			props: {
				uri,
				templateData: JSON.parse(JSON.stringify(templateData)),
			},
		};
	} catch (error) {
		console.error('Error resolving template:', error);
		return { notFound: true };
	}
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
