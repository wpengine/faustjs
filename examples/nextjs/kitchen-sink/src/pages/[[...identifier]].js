import { resolveWpRoute } from '@/lib/resolveWpRoute';
import { getAuthString } from '@/utils/getAuthString';
import availableTemplates from '@/wp-templates';
import { createDefaultClient, setGraphQLClient } from '@faustjs/nextjs/pages';

// This is a catch-all dynamic route to handle all WordPress pages and posts.
// It uses getStaticProps and getStaticPaths for SSG with fallback blocking.
// It also supports Draft Mode previews with application passwords.

export default function Page(props) {
	const { templateData } = props;

	const PageTemplate = availableTemplates[templateData?.template?.id];

	return <PageTemplate {...props} />;
}

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

	return await resolveWpRoute(params?.identifier, isDraftModeEnabled, client);
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
