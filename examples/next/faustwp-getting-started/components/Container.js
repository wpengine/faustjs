import React from 'react';
import styles from '../styles/components/Container.module.scss';

export default function Container({ children }) {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
}
