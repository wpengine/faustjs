import { getPreviewSeedNode } from '../../src/queries/seedQuery';

describe('queries/seedQuery', () => {
	test('getPreviewSeedNode() takes front page flags from the previewed page', () => {
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

	test('getPreviewSeedNode() keeps the node as is without a source node', () => {
		const contentNode = { __typename: 'Post', isFrontPage: false };

		expect(getPreviewSeedNode({ contentNode })).toBe(contentNode);
		expect(getPreviewSeedNode({ contentNode, previewSourceNode: null })).toBe(
			contentNode,
		);
	});

	test('getPreviewSeedNode() keeps node flags the source does not have', () => {
		const node = getPreviewSeedNode({
			contentNode: { __typename: 'Post', isFrontPage: false },
			previewSourceNode: {},
		});

		expect(node?.isFrontPage).toBe(false);
	});

	test('getPreviewSeedNode() returns undefined without data', () => {
		expect(getPreviewSeedNode(undefined)).toBeUndefined();
		expect(getPreviewSeedNode({})).toBeUndefined();
	});
});
