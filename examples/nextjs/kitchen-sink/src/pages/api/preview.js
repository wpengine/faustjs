import { getAuthString } from '@/utils/getAuthString';
import { enablePreview } from '@faustjs/nextjs/pages';

export default enablePreview({
	wordpressUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
	expectedSecret: process.env.WP_PREVIEW_SECRET,
	// graphqlClient: client,
	bearerToken: getAuthString(),
});
