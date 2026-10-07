import { getPreviewSeedNode } from '../../src/queries/seedQuery';

describe('queries/seedQuery', () => {
	test('getPreviewSeedNode() uses the front page flag from the previewed page', () => {
		const node = getPreviewSeedNode({
			contentNode: {
				__typename: 'Page',
				databaseId: '72',
				slug: '2-autosave-v1',
				isFrontPage: false,
				isPostsPage: false,
			},
			previewSourceNode: { isFrontPage: true, isPostsPage: false },
		});

		expect(node).toEqual({
			__typename: 'Page',
			databaseId: '72',
			slug: '2-autosave-v1',
			isFrontPage: true,
			isPostsPage: false,
		});
	});

	test('getPreviewSeedNode() returns the revision unchanged without a source node', () => {
		const contentNode = { __typename: 'Post', isFrontPage: false };

		expect(getPreviewSeedNode({ contentNode })).toBe(contentNode);
		expect(getPreviewSeedNode({ contentNode, previewSourceNode: null })).toBe(
			contentNode,
		);
	});

	test('getPreviewSeedNode() keeps the revision flags when the source has none', () => {
		const node = getPreviewSeedNode({
			contentNode: { __typename: 'Post', isFrontPage: false },
			previewSourceNode: {},
		});

		expect(node?.isFrontPage).toBe(false);
	});

	test('getPreviewSeedNode() uses the posts page flag from the previewed page', () => {
		const node = getPreviewSeedNode({
			contentNode: {
				__typename: 'Page',
				isFrontPage: false,
				isPostsPage: false,
			},
			previewSourceNode: { isFrontPage: false, isPostsPage: true },
		});

		expect(node?.isPostsPage).toBe(true);
	});

	test('getPreviewSeedNode() returns undefined without a revision', () => {
		expect(getPreviewSeedNode(undefined)).toBeUndefined();
		expect(getPreviewSeedNode({})).toBeUndefined();
		expect(
			getPreviewSeedNode({
				contentNode: null,
				previewSourceNode: { isFrontPage: true },
			}),
		).toBeUndefined();
	});
});
