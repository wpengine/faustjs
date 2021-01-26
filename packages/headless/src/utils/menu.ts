import { WPGraphQL } from '../types';
import MenuItem from '../components/menu/MenuItemInterface';

type WPGraphQLMenuItems =
  | WPGraphQL.GetMenusQuery['menuItems']['nodes']
  | undefined;

/**
 * Takes a flat list of menu items with `id` and `parentID` properties.
 * Moves items with a parentID to the parent's `children` array.
 *
 * @see https://www.wpgraphql.com/docs/menus/#hierarchical-data.
 */
const flatToTree = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {},
) => {
  const tree = [];
  const childrenOf = {};
  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    if (parentId) {
      (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem);
    } else {
      tree.push(newItem);
    }
  });
  return tree;
};

/**
 * Filters `menus` to leave only menu items from the WordPress menu `location`.
 *
 * Restores parent-child relationships from the flat WPGraphQL menu item list.
 *
 * @param menus
 * @param location
 */
export function menuLocation(
  menus: WPGraphQLMenuItems,
  location: WPGraphQL.MenuLocationEnum,
): MenuItem[] | undefined {
  if (menus) {
    const locationItems = menus.filter((m) => m.locations.includes(location));
    return flatToTree(locationItems);
  }

  return menus;
}
