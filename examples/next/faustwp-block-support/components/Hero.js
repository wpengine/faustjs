import React from 'react';
import className from 'classnames/bind';
import { Heading } from '.';
import styles from '../styles/components/Hero.module.scss';

let cx = className.bind(styles);

export function Hero({ title, level = 'h2', children, className }) {
  return (
    <div className={cx(['component', className])}>
      <Heading level={level}>
        <span className={cx('title')}>{title}</span>
      </Heading>
      {children}
    </div>
  );
}
