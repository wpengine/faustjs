import React from 'react';
import type { MenuItem } from './Menu';

interface MenuListProps {
  items?: MenuItem[];
  anchor?(item: MenuItem): React.ReactNode;
}

const defaultAnchor = (item: MenuItem) => <a href={item.href}>{item.title}</a>;

/**
 * MenuList component to recursively build menu items and submenus.
 */
export const MenuList = ({
  items,
  anchor = defaultAnchor,
}: MenuListProps): JSX.Element[] | null => {
  if (!items) {
    return null;
  }

  return items.map((item) => {
    return (
      <li key={item.title}>
        {anchor(item)}
        {item?.children && item.children.length > 0 && (
          <ul className="submenu">
            {MenuList({ items: item.children, anchor })}
          </ul>
        )}
      </li>
    );
  });
};
