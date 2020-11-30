/**
 * Takes a flat list of menu items with `id` and `parentID` properties.
 * Moves items with a parentID to the parent's `children` array.
 *
 * @see https://www.wpgraphql.com/docs/menus/#hierarchical-data.
 */
function joinChildren(data, parentId = null) {
    const rootItems = data.filter(item => item.parentId === parentId);
    return rootItems.map((item) => {
        const newItem = {...item};
        const children = data.filter(i => i.parentId === item.key)
        newItem.children = joinChildren(children, item.key);
        return newItem;
    });
}

/**
 * Orders menu items by their order property.
 *
 * @param items
 * @returns {array}
 */
function orderMenuItems(items) {
    return items.sort((a, b) => a.order - b.order);
}

/**
 * Removes menu items that do not have a matching `location` property.
 *
 * @see https://www.wpgraphql.com/docs/menus/#hierarchical-data.
 */
export function getMenuLocation(location = "", menuItems = []) {
    let items = menuItems.filter(menuItem => menuItem.locations.includes(location.toUpperCase()));
    items = orderMenuItems(items);
    return joinChildren(items);
}

// const test = [
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbTo1Njg4OA==",
//         "parentId": null,
//         "title": "Test",
//         "url": "/test-3/",
//         "locations": [
//             "FOOTER"
//         ],
//         "order": 1
//     },
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbTo1Njg4MA==",
//         "parentId": null,
//         "title": "Home",
//         "url": "/",
//         "locations": [
//             "PRIMARY"
//         ],
//         "order": 1
//     },
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbTo1Njg4Nw==",
//         "parentId": null,
//         "title": "Home",
//         "url": "/",
//         "locations": [
//             "FOOTER"
//         ],
//         "order": 2
//     },
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbTo1Njg4MQ==",
//         "parentId": null,
//         "title": "About Us",
//         "url": "/about-us/",
//         "locations": [
//             "PRIMARY"
//         ],
//         "order": 2
//     },
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbTo1Njg4Mw==",
//         "parentId": "bmF2X21lbnVfaXRlbTo1Njg4MQ==",
//         "title": "Subpage",
//         "url": "/block-content-examples/",
//         "locations": [
//             "PRIMARY"
//         ],
//         "order": 3
//     },
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbTo1Njg4NA==",
//         "parentId": "bmF2X21lbnVfaXRlbTo1Njg4MQ==",
//         "title": "Landing Page",
//         "url": "/landing-page/",
//         "locations": [
//             "PRIMARY"
//         ],
//         "order": 4
//     },
//     {
//         "__typename": "MenuItem",
//         "key": "bmF2X21lbnVfaXRlbo1Njg4Mg==",
//         "parentId": null,
//         "title": "Contact Us",
//         "url": "/contact-us/",
//         "locations": [
//             "PRIMARY"
//         ],
//         "order": 5
//     }
// ];
//
// const primary = getMenuLocation("primary", test);
//
// const sorted = orderMenuItems(primary);
//
// const nested = joinChildren(sorted); // ?
