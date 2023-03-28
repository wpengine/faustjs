import React from 'react';
import classNames from 'classnames/bind';
import * as SELECTORS from '../constants/selectors';
import styles from '../styles/components/Main.module.scss';

let cx = classNames.bind(styles);

export default function Main({ children, className, ...props }) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cx(['component', className])}
      {...props}
    >
      {children}
    </main>
  );
}
