import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Container } from 'components';
import { NavigationMenu, SkipNavigationLink } from 'components';
import styles from './Header.module.scss';

let cx = classNames.bind(styles);

type Props = {
  title?: string,
  description?: string,
  menuItems?: any,
};

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems
}: Props): JSX.Element {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className={cx('component')}>
      <SkipNavigationLink />
        <Container>
          <div className={cx('navbar')}>
            <div className={cx('brand')}>
              <Link href="/">
                <a>{title}</a>
              </Link>
              {description && <p className={cx('description')}>{description}</p>}
            </div>
            <button
              type="button"
              className={cx('nav-toggle')}
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={isNavShown}
            >
              ☰
            </button>
            <NavigationMenu
              className={cx(
                'primary-navigation',
                isNavShown ? 'show' : undefined,
              )}
              menuItems={menuItems}
            >
              <li>
                <Link href="https://github.com/wpengine/faustjs">
                  <a>View on GitHub</a>
                </Link>
              </li>
            </NavigationMenu>
        </div>
      </Container>
    </header>
  );
}
