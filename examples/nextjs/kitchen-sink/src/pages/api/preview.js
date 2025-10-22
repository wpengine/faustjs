import { getAuthString } from '@/utils/getAuthString';
import { enablePreview } from '@faustjs/nextjs/pages';

// This is a preview approach using Next.js Draft Mode with application passwords.
// To enable Draft Mode previews, set the HWP Previews setting to: http://your.frontend/api/preview?secret=YOURSECRET&id={ID}

export default enablePreview({
	wordpressUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
	expectedSecret: process.env.WP_PREVIEW_SECRET,
	// graphqlClient: client,
	bearerToken: getAuthString(),
});
