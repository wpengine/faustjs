import React from 'react';
import styles from 'scss/components/Footer.module.scss';

interface Props {
  copyrightHolder?: string;
}

function Footer({ copyrightHolder = 'Company Name' }: Props): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.main}>
      <div className={styles.wrap}>
        <p>{`© ${year} ${copyrightHolder}. All rights reserved.`}</p>
      </div>
    </footer>
  );
}

export default Footer;
