import React from 'react';
import className from 'classnames';
import styles from './Heading.module.scss';

let cx = className.bind(styles);

export default function Heading({ level = 'h1', children, className }) {
  const Tag = ({ ...props }) => React.createElement(level, props, children);

  return <Tag className={cx('component', className)}>{children}</Tag>;
}
