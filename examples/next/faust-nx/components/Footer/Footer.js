import classNames from 'classnames/bind';
import { Container } from 'components';
import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('component')}>
      <Container>
        <p>{`${title} © ${year}. All rights reserved.`}</p>
      </Container>
    </footer>
  );
}
