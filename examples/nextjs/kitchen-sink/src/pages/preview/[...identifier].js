import { sessionConfig } from '@/constants/sessionConfig';
import { resolveWpRoute } from '@/lib/resolveWpRoute';
import availableTemplates from '@/wp-templates';
import { createDefaultClient, setGraphQLClient } from '@faustjs/nextjs/pages';
import { getIronSession } from 'iron-session';

// This is an alternative preview approach to use the user credentials stored in the session
// instead of the Next.js Draft Mode with application passwords.
// To enable previews, set the HWP Previews plugin setting to: http://your.frontend/preview/{ID}

export default function Preview(props) {
	const { templateData } = props;

	const PageTemplate = availableTemplates[templateData?.template?.id];

	return <PageTemplate {...props} />;
}

export async function getServerSideProps({ req, res, params }) {
	const session = await getIronSession(req, res, sessionConfig);

	if (!session?.authToken) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const client = createDefaultClient(process.env.NEXT_PUBLIC_WORDPRESS_URL, {
		Authorization: `Bearer ${session?.authToken}`,
	});

	setGraphQLClient(client);

	return await resolveWpRoute(params?.identifier, true, client);
}
