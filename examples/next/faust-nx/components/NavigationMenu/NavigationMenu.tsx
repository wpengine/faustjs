import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './NavigationMenu.module.scss';

let cx = classNames.bind(styles);

type Props = {
  menuItems: any
  children?: JSX.Element,
  className?: string
};

export default function NavigationMenu({ menuItems, children, className }: Props): JSX.Element | null {
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
        {menuItems.map((item: any) => {
          const { id, path, label } = item;
          return (
            <li key={id ?? ''}>
              <Link href={path ?? ''}>{label ?? ''}</Link>
            </li>
          );
        })}
        {children}
      </ul>
    </nav>
  );
}
