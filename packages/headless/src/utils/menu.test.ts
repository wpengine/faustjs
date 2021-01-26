import { menuLocation } from './menu';
import { WPGraphQL } from '../types';
import MenuItem from '../components/menu/MenuItemInterface';

describe('menuLocation', () => {
  test('filters by location', () => {
    const input: WPGraphQL.GetMenusQuery['menuItems']['nodes'] = [
      {
        id: 'primary-location',
        parentId: '',
        title: 'Home',
        href: '/',
        locations: [WPGraphQL.MenuLocationEnum.Primary],
      },
      {
        id: 'no-location',
        parentId: '',
        title: 'Landing',
        href: '/',
        locations: [],
      },
      {
        id: 'footer-location',
        parentId: '',
        title: 'Careers',
        href: '/',
        locations: [WPGraphQL.MenuLocationEnum.Footer],
      },
    ];

    const expected: MenuItem[] = [
      { id: 'primary-location', title: 'Home', href: '/', children: [] },
    ];

    const result = menuLocation(input, WPGraphQL.MenuLocationEnum.Primary);

    expect(result).toStrictEqual(expected);
  });

  test('moves children into parents', () => {
    const input: WPGraphQL.GetMenusQuery['menuItems']['nodes'] = [
      {
        id: 'root-menu-item',
        parentId: '',
        title: 'Root',
        href: '/',
        locations: [WPGraphQL.MenuLocationEnum.Primary],
      },
      {
        id: 'child-menu-item',
        parentId: 'root-menu-item',
        title: 'Child',
        href: '/child',
        locations: [WPGraphQL.MenuLocationEnum.Primary],
      },
      {
        id: 'grandchild-menu-item',
        parentId: 'child-menu-item',
        title: 'Grandchild',
        href: '/grandchild',
        locations: [WPGraphQL.MenuLocationEnum.Primary],
      },
    ];

    const expected: MenuItem[] = [
      {
        id: 'root-menu-item',
        title: 'Root',
        href: '/',
        children: [
          {
            id: 'child-menu-item',
            title: 'Child',
            href: '/child',
            children: [
              {
                id: 'grandchild-menu-item',
                title: 'Grandchild',
                href: '/grandchild',
                children: [],
              },
            ],
          },
        ],
      },
    ];

    const result = menuLocation(input, WPGraphQL.MenuLocationEnum.Primary);

    expect(result).toStrictEqual(expected);
  });
});
