import classNames from 'classnames/bind';
import { gql } from '@apollo/client';
import Link from 'next/link';
import styles from './NavigationMenu.module.scss';

let cx = classNames.bind(styles);

export default function NavigationMenu({ menuItems, children, className }) {
  if (!menuItems) {
    return null;
  }

  return (
    <nav
      className={cx('component', className)}
      role="navigation"
      aria-label={`${menuItems[0]?.menu.node.name} menu`}
    >
      <ul className={cx('menu')}>
        {menuItems.map((item) => {
          const { id, path, label } = item;
          return (
            <li key={id}>
              <Link href={path ?? ''}>{label ?? ''}</Link>
            </li>
          );
        })}
        {children}
      </ul>
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      menu {
        node {
          name
        }
      }
    }
  `
}
