import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
	return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
	return getWordPressProps({ ctx, disableUseFaustQuery: true });
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
