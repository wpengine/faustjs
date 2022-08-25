import React from 'react';
import className from 'classnames';
import styles from './Heading.module.scss';

let cx = className.bind(styles);

type Props = {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  children?: string | JSX.Element,
  className?: string,
};

export default function Heading({ level = 'h1', children, className }: Props): JSX.Element {
  const Tag = ({ ...props }) => React.createElement(level, props, children);

  return <Tag className={cx('component', className)}>{children}</Tag>;
}
