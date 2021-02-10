import React from 'react';
import { MenuList } from './MenuList';

export interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  items: MenuItem[];
  anchor?(item: MenuItem): React.ReactNode;
}

export interface MenuItem
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  title: string;
  children?: MenuItem[];
}

/**
 * Menu component to display menu items.
 *
 * @example
 * ```ts
 * import { Menu, MenuItem } from '@wpengine/headless/components'
 *
 * function MyApp() {
 *     const items = [
 *        { title: "Home", href: "/" },
 *        {
 *           title: "About",
 *           href: "/about",
 *           children: [{ title: "Careers", href: "/careers" }],
 *        },
 *     ];
 *
 *     // Alter link output if required. Remember to import `Link` components.
 *     const nextLink = (item: MenuItem): React.ReactNode => (
 *         <Link href={item.href}>
 *             <a>{item.title}</a>
 *         </Link>
 *     );
 *     const reactRouterLink = (item: MenuItem): React.ReactNode => (
 *         <Link to={item.href}>{item.title}</Link>
 *     );
 *
 *     return (
 *         <>
 *             <Menu items={items} />
 *             <Menu items={items} className="menu" ariaLabel="main" />
 *             <Menu items={items} anchor={nextLink} />
 *             <Menu items={items} anchor={reactRouterLink} />
 *         </>
 *     );
 * }
 *
 * export default MyApp
 * ```
 */
export function Menu({
  items,
  anchor,
  ...attributes
}: MenuProps): JSX.Element | null {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav {...attributes}>
      <div className="wrap">
        <ul>{MenuList({ items, anchor })}</ul>
      </div>
    </nav>
  );
}
