export interface ListNode {
  id: number | string;
  parentId?: number | string;
  [key: string]: any;
}

export interface Params {
  idKey?: string;
  parentKey?: string;
  childrenKey?: string;
}

/**
 * Converts a flat list to hierarchical.
 * @param data The ListNode items.
 * @param param1 The ListNode parameters.
 * @returns ListNode Array
 */
export function flatListToHierarchical(
  data: ListNode[] = [],
  {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
  }: Params = {},
): ListNode[] {
  const tree: ListNode[] = [];
  const childrenOf: { [key: number]: ListNode[] } = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;

    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });

  return tree;
}
