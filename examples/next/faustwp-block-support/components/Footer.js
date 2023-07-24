import classNames from 'classnames/bind';
import { Container, NavigationMenu } from '.';
import styles from '../styles/components/Footer.module.scss';

let cx = classNames.bind(styles);

export function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('component')}>
      <Container>
        <NavigationMenu menuItems={menuItems} />
        <p className={cx('copyright')}>{`${title} © ${year}. Powered by WordPress.`}</p>
      </Container>
    </footer>
  );
}
