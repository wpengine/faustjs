import { createWordPressPage } from '@faustjs/nextjs/pages';
import availableTemplates from '@/wp-templates';

// Create the WordPress page with customizable options
const { default: WordPressPage, getWordPressProps } = createWordPressPage({
	templates: availableTemplates,
	wordpressUrl: process.env.WORDPRESS_URL,
	// NotFoundComponent: CustomNotFound, // Custom missing template component
	// graphqlClient: customClient, // Custom GraphQL client
});

// Export the page component as default
export default WordPressPage;

// Export getStaticProps for SSG
export function getStaticProps(ctx) {
	return getWordPressProps(ctx);
}

// Export getStaticPaths for dynamic routes
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
