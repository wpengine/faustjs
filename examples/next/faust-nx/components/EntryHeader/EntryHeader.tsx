import className from 'classnames/bind';
import { Heading, PostInfo, FeaturedImage } from 'components';
import styles from './EntryHeader.module.scss';

let cx = className.bind(styles);

type Props = {
  title: string,
  image?: any,
  date?: any,
  author?: any,
  className?: string,
  children?: JSX.Element,
};

export default function EntryHeader({ title, image, date, author, className }: Props): JSX.Element {
  const hasText = title || date || author;
  const entryHeaderClasses = cx('entry-header', className);

  return (
    <div className={entryHeaderClasses}>
      {hasText && (
        <div className={cx('text')}>
          {!!title && <Heading className={cx('title')}>{title}</Heading>}
          <PostInfo
            className={cx('byline')}
            author={author}
            date={date}
          />
        </div>
      )}

      {image && (
        <div className={cx('image')}>
          <div className="container">
            <FeaturedImage
              className={cx('featured-image')}
              image={image}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
