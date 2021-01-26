import { WPGraphQL } from '../types';
import MenuItem from '../components/menu/MenuItemInterface';

interface Children {
  [key: string]: MenuItem[];
}

type WPGraphQLMenuItems =
  | WPGraphQL.GetMenusQuery['menuItems']['nodes']
  | undefined;

/**
 * Takes a flat list of menu items with `id` and `parentID` properties.
 * Moves items with a parentID to the parent's `children` array.
 *
 * @see https://www.wpgraphql.com/docs/menus/#hierarchical-data.
 */
const flatToTree = (data: WPGraphQLMenuItems = []) => {
  const tree: MenuItem[] = [];
  const childrenOf: Children = {};
  data.forEach((item) => {
    const newItem: MenuItem = {
      id: item.id,
      title: item.title,
      href: item.href,
      children: [],
    };
    childrenOf[item.id] = childrenOf[item.id] || [];
    newItem.children = childrenOf[item.id];
    if (item.parentId) {
      (childrenOf[item.parentId] = childrenOf[item.parentId] || []).push(
        newItem,
      );
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
    const locationItems: WPGraphQLMenuItems = menus.filter((m) =>
      m.locations.includes(location),
    );
    return flatToTree(locationItems);
  }

  return menus;
}
