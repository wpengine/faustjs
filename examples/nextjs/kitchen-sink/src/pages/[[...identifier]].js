import { resolveWpRoute } from '@/lib/resolveWpRoute';
import { Toolbar } from '@/toolbar';
import { getAuthString } from '@/utils/getAuthString';
import availableTemplates from '@/wp-templates';
import {
	createDefaultClient,
	setGraphQLClient,
	useUser,
} from '@faustjs/nextjs/pages';
import { useRouter } from 'next/router';

// This is a catch-all dynamic route to handle all WordPress pages and posts.
// It uses getStaticProps and getStaticPaths for SSG with fallback blocking.
// It also supports Draft Mode previews with application passwords.

export default function Page(props) {
	const router = useRouter();
	const { templateData, queriesData } = props;
	const { user = {}, isAuthenticated } = useUser();

	const { getPage, getPost } = queriesData || {};
	const result = getPage || getPost;
	const content = result?.data?.page || result?.data?.post;

	const PageTemplate = availableTemplates[templateData?.template?.id];

	return (
		<>
			{isAuthenticated && (
				<Toolbar
					user={{
						...user,
						avatar: user?.avatar?.url,
					}}
					post={
						content
							? {
									...content,
									type: content?.contentTypeName,
									id: content?.databaseId,
							  }
							: undefined
					}
					site={{
						url: 'http://headless.local',
						adminUrl: 'http://headless.local/wp-admin',
					}}
					isPreview={router.isPreview}
					disablePreviewUrl={'/api/disable-preview'}
				/>
			)}
			<PageTemplate {...props} />
		</>
	);
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
