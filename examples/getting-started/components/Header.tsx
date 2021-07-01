import React from 'react';
import { WPHead } from '@wpengine/headless/next';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import Head from 'next/head';

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
    {
      title: 'GitHub',
      href: 'https://github.com/wpengine/headless-framework',
      class: 'button',
    },
  ];

  return (
    <>
      <Head>
        <title>{/* Title is required here but replaced by WPHead. */}</title>
        {/* Add extra elements to <head> here. */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
          type="text/css"
          media="all"
        />
      </Head>
      <WPHead />
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
    </>
  );
}

export default Header;
