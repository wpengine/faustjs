import className from 'classnames/bind';
import styles from '../styles/components/ContentWrapper.module.scss';

let cx = className.bind(styles);

export function ContentWrapper({ content, children, className }) {
  return (
    <article className={cx(['component', className])}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
