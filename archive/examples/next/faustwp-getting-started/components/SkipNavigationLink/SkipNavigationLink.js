import classNames from 'classnames/bind';
import * as SELECTORS from '../../constants/selectors';
import styles from './SkipNavigationLink.module.scss';

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
