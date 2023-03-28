import React from 'react';
import classNames from 'classnames/bind';
import * as SELECTORS from '../constants/selectors';
import styles from '../styles/components/SkipNavigationLink.module.scss';

let cx = classNames.bind(styles);

export default function SkipNavigationLink() {
  return (
    <a
      className={cx(['component', 'sr-only'])}
      href={`#${SELECTORS.MAIN_CONTENT_ID}`}
    >
      Skip To Main Content
    </a>
  );
}
