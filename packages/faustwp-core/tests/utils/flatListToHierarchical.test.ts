import { flatListToHierarchical } from '../../src/utils/flatListToHierarchical';

const items = [
	{ id: '1', name: 'abc', parentId: '2' },
	{ id: '2', name: 'abc', parentId: '' },
	{ id: '3', name: 'abc', parentId: '5' },
	{ id: '4', name: 'abc', parentId: '2' },
	{ id: '5', name: 'abc', parentId: '' },
	{ name: 'abc', parentId: '' },
	{ id: '6', name: 'abc', parentId: '2' },
	{ id: '7', name: 'abc', parentId: '6' },
	{ id: '8', name: 'abc', parentId: '6' },
];

const result = [
	{
		id: '2',
		name: 'abc',
		parentId: '',
		children: [
			{ id: '1', name: 'abc', parentId: '2', children: [] },
			{ id: '4', name: 'abc', parentId: '2', children: [] },
			{
				id: '6',
				name: 'abc',
				parentId: '2',
				children: [
					{ id: '7', name: 'abc', parentId: '6', children: [] },
					{ id: '8', name: 'abc', parentId: '6', children: [] },
				],
			},
		],
	},
	{
		id: '5',
		name: 'abc',
		parentId: '',
		children: [{ id: '3', name: 'abc', parentId: '5', children: [] }],
	},
];

describe('utils/flatListToHierarchical', () => {
	test('returns a hierarchical list from items array', () => {
		expect(flatListToHierarchical(items)).toEqual(result);
	});
});
