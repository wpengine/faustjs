import Link from 'next/link';
import { FeaturedImage } from '../FeaturedImage';
import { PostInfo } from '../PostInfo';
import styles from './Post.module.scss';

export default function Post({
  title,
  content,
  date,
  author,
  uri,
  featuredImage,
}) {
  return (
    <article className={styles.component}>
      {featuredImage && (
        (<Link href={uri} legacyBehavior>

          <FeaturedImage
            image={featuredImage}
            layout="responsive"
            className={styles.featuredImage}
          />

        </Link>)
      )}

      <Link href={uri} legacyBehavior>

        <h2>{title}</h2>

      </Link>
      <PostInfo date={date} author={author} className={styles.postInfo} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
