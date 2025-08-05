import styles from './Container.module.scss';
import className from 'classnames/bind';

let cx = className.bind(styles);

export default function Container({ children, className }) {
  return (
    <div className={cx(['component', className])}>
      {children}
    </div>
  );
}
