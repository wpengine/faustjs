import {
	uriToTemplate,
	setGraphQLClient,
	createDefaultClient,
} from '@faustjs/nextjs/pages';
import availableTemplates from '@/wp-templates';

export default function Page(props) {
	const { templateData } = props;

	const PageTemplate = availableTemplates[templateData?.template?.id];

	return <PageTemplate {...props} />;
}

export async function getServerSideProps(context) {
	const { params } = context;

	const client = createDefaultClient(process.env.WORDPRESS_URL);
	setGraphQLClient(client);

	const uri = Array.isArray(params?.uri)
		? '/' + params.uri.join('/') + '/'
		: '/';

	try {
		const templateData = await uriToTemplate({
			uri,
			availableTemplates: Object.keys(availableTemplates),
			wordpressUrl: process.env.WORDPRESS_URL,
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
