import { getBodyClasses } from '../../src/utils/getBodyClasses';

describe('getBodyClasses()', () => {
	const post = (name: string, extra = {}) => ({
		__typename: 'Post',
		databaseId: '7',
		isContentNode: true,
		contentType: { node: { name } },
		...extra,
	});

	test('returns no classes without a seed node', () => {
		expect(getBodyClasses(null)).toEqual([]);
		expect(getBodyClasses(undefined)).toEqual([]);
	});

	test('single posts and custom post types', () => {
		expect(getBodyClasses(post('post'))).toEqual([
			'single',
			'single-post',
			'postid-7',
		]);
		expect(getBodyClasses(post('movie'))).toEqual([
			'single',
			'single-movie',
			'postid-7',
		]);
	});

	test('attachments', () => {
		expect(getBodyClasses(post('attachment'))).toEqual([
			'single',
			'single-attachment',
			'postid-7',
			'attachment',
			'attachmentid-7',
		]);
	});

	test('pages with the default and a custom template', () => {
		expect(
			getBodyClasses(post('page', { template: { templateName: 'Default' } })),
		).toEqual(['page', 'page-id-7', 'page-template-default']);
		expect(
			getBodyClasses(
				post('page', { template: { templateName: 'Full Width' } }),
			),
		).toEqual(['page', 'page-id-7', 'page-template-full-width']);
	});

	test('a static front page', () => {
		expect(getBodyClasses(post('page', { isFrontPage: true }))).toEqual([
			'home',
			'page',
			'page-id-7',
		]);
	});

	test('the posts page, also when it is the front page', () => {
		const postsPage = {
			__typename: 'ContentType',
			name: 'post',
			isPostsPage: true,
		};

		expect(getBodyClasses(postsPage)).toEqual(['blog']);
		expect(getBodyClasses({ ...postsPage, isFrontPage: true })).toEqual([
			'home',
			'blog',
		]);
	});

	test('categories, tags and other taxonomies', () => {
		const term = (taxonomyName: string) => ({
			__typename: 'Term',
			databaseId: '3',
			isTermNode: true,
			slug: 'news',
			taxonomyName,
		});

		expect(getBodyClasses(term('category'))).toEqual([
			'archive',
			'category',
			'category-news',
			'category-3',
		]);
		expect(getBodyClasses(term('post_tag'))).toEqual([
			'archive',
			'tag',
			'tag-news',
			'tag-3',
		]);
		expect(getBodyClasses(term('genre'))).toEqual([
			'archive',
			'tax-genre',
			'term-news',
			'term-3',
		]);
	});

	test('author archives', () => {
		expect(getBodyClasses({ __typename: 'User', databaseId: '2' })).toEqual([
			'archive',
			'author',
			'author-2',
		]);
	});

	test('post type archives', () => {
		expect(
			getBodyClasses({ __typename: 'ContentType', name: 'movie' }),
		).toEqual(['archive', 'post-type-archive', 'post-type-archive-movie']);
	});

	test('removes percent-encoded characters from slugs, like WordPress', () => {
		const term = (slug: string) => ({
			__typename: 'Term',
			databaseId: '3',
			isTermNode: true,
			slug,
			taxonomyName: 'category',
		});

		expect(getBodyClasses(term('caf%c3%a9-news'))).toEqual([
			'archive',
			'category',
			'category-caf-news',
			'category-3',
		]);
		expect(getBodyClasses(term('%e6%97%a5%e6%9c%ac'))).toEqual([
			'archive',
			'category',
			'category-3',
		]);
	});
});
