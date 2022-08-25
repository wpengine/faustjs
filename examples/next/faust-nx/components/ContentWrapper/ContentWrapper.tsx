import className from 'classnames/bind';
import styles from './ContentWrapper.module.scss';

let cx = className.bind(styles);

type Props = {
  content: string,
  children?: JSX.Element,
};

export default function ContentWrapper({ content, children }: Props): JSX.Element {
  return (
    <article className={cx('component')}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
