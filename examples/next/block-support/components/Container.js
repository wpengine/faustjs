import styles from '../styles/components/Container.module.scss';
import className from 'classnames/bind';

let cx = className.bind(styles);

export function Container({ children, className }) {
  return (
    <div className={cx(['component', className])}>
      {children}
    </div>
  );
}
