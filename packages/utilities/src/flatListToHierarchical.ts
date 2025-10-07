export interface Params {
	idKey?: string;
	parentKey?: string;
	childrenKey?: string;
}

type Data = Record<string | number, unknown>;

/**
 * Converts a flat list to hierarchical.
 *
 * @param data The data items as an array.
 * @param param1 The data item property keys.
 * @returns Data Array
 */
export function flatListToHierarchical(
	data: Data[] = [],
	{
		idKey = 'id',
		parentKey = 'parentId',
		childrenKey = 'children',
	}: Params = {},
) {
	const tree: Data[] = [];
	const childrenOf: { [key: string | number]: Data[] } = {};

	data.forEach((item) => {
		const newItem = { ...item };

		const id = newItem?.[idKey] as string | number | undefined;
		const parentId = (newItem?.[parentKey] ?? 0) as string | undefined;

		if (!id) {
			return;
		}

		childrenOf[id] = childrenOf[id] || [];
		newItem[childrenKey] = childrenOf[id];

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		parentId
			? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
			: tree.push(newItem);
	});

	return tree;
}
