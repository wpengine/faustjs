import React from 'react';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';

interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = 'Headless by WP Engine',
  description,
}: Props): JSX.Element {
  // TODO: accept a `menuItems` prop to receive menu items from WordPress.
  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Featured', href: '/category/featured' },
    { title: 'Blog', href: '/posts' },
    {
      title: 'GitHub',
      href: 'https://github.com/wpengine/headless-framework',
      class: 'button',
    },
  ];

  return (
    <header>
      <div className={styles.wrap}>
        <div className={styles['title-wrap']}>
          <p className={styles['site-title']}>
            <Link href="/">
              <a>{title}</a>
            </Link>
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.menu}>
          <ul>
            {menuItems &&
              menuItems.map((item) => (
                <li key={`${item.title}$-menu`}>
                  <Link href={item.href}>
                    <a className={item?.class}>{item.title}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
