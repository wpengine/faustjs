import {
	uriToTemplate,
	setGraphQLClient,
	createDefaultClient,
} from '@faustjs/nextjs/pages';
import availableTemplates from '@/wp-templates';

export default function Page(props) {
	const { templateData } = props;

	if (!templateData?.template?.id) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<h1 style={{ color: 'red' }}>Template not found</h1>
				<p>No template could be resolved for this URI.</p>
			</div>
		);
	}

	const PageTemplate = availableTemplates[templateData.template.id];

	if (!PageTemplate) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<h1 style={{ color: 'red' }}>Component not found</h1>
				<p>Template "{templateData.template.id}" is not available.</p>
				<pre
					style={{ textAlign: 'left', background: '#f5f5f5', padding: '10px' }}>
					{JSON.stringify(templateData, null, 2)}
				</pre>
			</div>
		);
	}

	return <PageTemplate {...props} />;
}

export async function getServerSideProps(context) {
	const { params } = context;

	const uri = Array.isArray(params?.uri)
		? '/' + params.uri.join('/') + '/'
		: '/';

	const client = createDefaultClient(process.env.WORDPRESS_URL);
	setGraphQLClient(client);

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
