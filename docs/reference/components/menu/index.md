# Menu

The `<Menu />` component displays a nav element and list items from the supplied `items` prop.

## Basic Usage

```ts
import { Menu } from '@wpengine/headless'

function MyApp() {
  const items = [
    { title: 'Home', href: '/' },
    {
      title: 'About',
      href: '/about',
      children: [{ title: 'Careers', href: '/careers' }],
    },
  ];

  return (
    <>
      <Menu items={items} />
    </>
  );
}
export default MyApp;
```

## Custom link markup

`<Menu />` uses basic anchor elements by default:

```ts
const defaultAnchor = (item: MenuItem) => <a href={item.href}>{item.title}</a>;
```

Use the `anchor` prop to render anchors with other markup or components, such as the [Next.js Link element](https://nextjs.org/docs/api-reference/next/link):

```ts
import { Menu, MenuItem } from '@wpengine/headless'
import Link from 'next/link';

function MyApp2() {
  const items = [
    { title: 'Home', href: '/' },
    {
      title: 'About',
      href: '/about',
      children: [{ title: 'Careers', href: '/careers' }],
    },
  ];

  const nextLink = (item: MenuItem): React.ReactNode => (
    <Link href={item.href}>
      <a>{item.title}</a>
      </Link>
  );

  return (
    <>
      <Menu
        items={items}
        anchor={nextLink}
        className="menu header" /* HTML attributes are also supported. */
        aria-label="Main"
      />
    </>
  );
}
export default MyApp2
```

## Fetch menu items from WordPress

Fetch menu items from a named WordPress menu location via GraphQL with the `useMenus` hook and `menuLocation` helper.

`useMenus` requires that you use the `HeadlessProvider` component, which handles data fetching.

```ts
import { Menu, useMenus, menuLocation, WPGraphQL } from '@wpengine/headless'

function MyApp3() {
  // All menu items as a flat array, as provided by WPGraphQL.
  const menus = useMenus();

  // Menu items in WordPress's 'primary' menu location only, organized as a parent-child tree.
  const primaryMenu = menuLocation(menus, WPGraphQL.MenuLocationEnum.Primary);

  return (
    <>
      <Menu items={primaryMenu} />
    </>
  );
}
export default MyApp3;
```

`menuLocation` takes a `WPGraphQL.MenuLocationEnum` as the second argument to filter by a single preset WPGraphQL menu location:

- WPGraphQL.MenuLocationEnum.Expanded
- WPGraphQL.MenuLocationEnum.Footer
- WPGraphQL.MenuLocationEnum.Mobile
- WPGraphQL.MenuLocationEnum.Primary
- WPGraphQL.MenuLocationEnum.Social
- WPGraphQL.MenuLocationEnum.Test

The WPE Headless WordPress plugin registers the Primary and Footer menu locations by default. Register others if needed at Settings → Headless using the “Menu Locations” field.

[Add menus and menu items in WordPress](https://codex.wordpress.org/WordPress_Menu_User_Guide) and assign them to a menu location at Appearance → Menus.


## Styling

`<Menu />` is not styled by default. This CSS offers a starting point, assuming `menu` is passed to `className`:

```css
.menu li {
    display: inline-block;
    position: relative;
    padding-right: 24px;
}

.menu .submenu {
    display: none;
    position: absolute;
}

.menu li:hover ul.submenu {
    display: block;
}

.menu ul.submenu li {
    width: 280px;
}
```
