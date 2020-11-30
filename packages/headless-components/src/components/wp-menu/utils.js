/**
 * Restores parent-child trees from a flat list of menu items.
 *
 * Joins children with a `parentId` property to a parent with the same `key`.
 * Items without a `parentId` property are removed.
 *
 * @example
 * const items = [
 *   { title: 'Parent', key: 'abc123', parentId: null },
 *   { title: 'Child', key: 'xyz321', parentId: 'abc123' }
 * ]
 * joinChildren(items)
 * // returns [{
 * //  title: 'Parent',
 * //  key: 'abc123',
 * //  parentId: null,
 * //  children: [
 * //    { title: 'Child', key: 'xyz321', parentId: 'abc123', children: [] }
 * //  ]
 * // }]
 * @param {array} menuItems Objects with `parentID` and `key` properties.
 * @param {null|string} parentId The ID to find children for.
 * @returns {array} Menu items with children.
 */
function joinChildren(menuItems, parentId = null) {
  const rootItems = menuItems.filter((item) => item.parentId === parentId)
  return rootItems.map((item) => {
    const newItem = { ...item }
    const children = menuItems.filter((i) => i.parentId === item.key)
    newItem.children = joinChildren(children, item.key)
    return newItem
  })
}

/**
 * Orders menu items by their order property (ascending).
 *
 * @example
 * const items = [ { title: 'Second', order: 2 }, { title: 'First', order: 1 }]
 * orderMenuItems(items)
 * // returns [ { title: 'First', order: 1 }, { title: 'Second', order: 2 }]
 * @param items Menu items, each with an order property.
 * @returns {array} Ordered menu items.
 */
function orderMenuItems(items) {
  return items.sort((a, b) => a.order - b.order)
}

/**
 * Filters a list of menu items to those with the given `location` property.
 * Orders menu items and joins children to parents.
 *
 * @example
 * const items = [
 *   { title: 'Home', parentId: null, locations: ['PRIMARY'] },
 *   { title: 'Legal', parentId: null, locations: ['FOOTER'] }
 * ]
 * getMenuLocation('primary', items)
 * // returns [{
 * //   title: 'Home',
 * //   parentId: null,
 * //   locations: [ 'PRIMARY' ],
 * //   children: []
 * // }]
 * @param {string} location Menu location to get.
 * @param {array} menuItems Menu items, each with a `locations` property.
 * @returns {array} Menu items that have the given location.
 */
export function getMenuLocation(location = '', menuItems = []) {
  let items = menuItems.filter((menuItem) =>
    menuItem.locations.includes(location.toUpperCase())
  )
  items = orderMenuItems(items)
  return joinChildren(items)
}
