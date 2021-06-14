import React from 'react';
import styles from '../scss/components/Header.module.scss';
import { Link } from 'react-router-dom';

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
    { title: 'Posts', href: '/category/uncategorized' },
  ];

  return (
    <>
      <header>
        <div className={styles.wrap}>
          <div className={styles['title-wrap']}>
            <p className={styles['site-title']}>
              <Link to="/">{title}</Link>
            </p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <div className={styles.menu}>
            <ul>
              {menuItems &&
                menuItems.map((item) => (
                  <li key={`${item.title}$-menu`}>
                    <Link to={item.href}>{item.title}</Link>
                  </li>
                ))}
              <li>
                <a
                  href="https://github.com/wpengine/headless-framework"
                  target="_blank"
                  rel="noreferrer"
                  className="button">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
