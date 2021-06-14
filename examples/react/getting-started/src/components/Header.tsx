import client from '../lib/client';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const { useGeneralSettings } = client;
  const settings = useGeneralSettings();

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Posts', href: '/category/uncategorized' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h2 className={styles.title}>
          <Link to="/">{settings?.title}</Link>
        </h2>
        <p className={styles.description}>{settings?.description}</p>
      </div>

      <nav>
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
