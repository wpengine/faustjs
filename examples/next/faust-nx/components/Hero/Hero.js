import React from 'react';
import className from 'classnames/bind';
import { Heading } from 'components';
import styles from './Hero.module.scss';

let cx = className.bind(styles);

export default function Hero({ title, subtitle, level = 'h2', children, className }) {
  return (
    <div className={cx(['component', className])}>
      <Heading level={level}>
        <span className={cx('title')}>{title}</span>
      </Heading>
      {children}
    </div>
  );
}
