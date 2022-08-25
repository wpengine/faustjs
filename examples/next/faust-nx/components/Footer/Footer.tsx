import { Container } from 'components';
import styles from './Footer.module.scss';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.component}>
      <Container>
        <p>{`© ${year}. All rights reserved.`}</p>
      </Container>
    </footer>
  );
}
