interface Node {
  id: number;
  parentId?: number;
  [key: string]: any;
}

interface Params {
  idKey?: string;
  parentKey?: string;
  childrenKey?: string;
}

/**
 * 
 * @param data The node items.
 * @param param1 The node parameters.
 * @returns Node Array
 */
export default function flatListToHierarchical(
  data: Node[] = [],
  {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
  }: Params = {},
): Node[] {
  const tree: Node[] = [];
  const childrenOf: { [key: number]: Node[] } = {};

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
