import classNames from 'classnames/bind';
import { Container } from 'components';
import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

type Props = {
  menuItems?: any,
};

export default function Footer({ menuItems }: Props): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('component')}>
      <Container>
        <p>{`© ${year}. All rights reserved.`}</p>
      </Container>
    </footer>
  );
}
