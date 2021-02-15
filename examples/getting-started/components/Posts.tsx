import React from 'react';
import Link from 'next/link';
import styles from 'scss/components/Posts.module.scss';
import Heading, { HeadingProps } from './Heading';

interface Props {
  posts: WPGraphQL.Post[] | undefined;
  intro?: string;
  id?: string;
  count?: number;
  heading?: string;
  headingLevel?: HeadingProps['level'];
  postTitleLevel?: HeadingProps['level'];
  readMoreText?: string;
}

function Posts({
  posts,
  intro,
  heading,
  id,
  count = 0,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  readMoreText = 'Read more',
}: Props): JSX.Element {
  // TODO: deprecate `count` and limit posts at the query level instead.
  const thePosts = count > 0 ? posts?.slice(0, count) : posts;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className={styles['posts-block']} {...(id && { id })}>
      <div className="wrap">
        {heading && (
          <Heading level={headingLevel} className={styles.heading}>
            {heading}
          </Heading>
        )}
        {intro && <p className={styles.intro}>{intro}</p>}
        <div className="posts">
          {thePosts &&
            thePosts.map((post) => (
              <div
                className={styles.single}
                key={post.id}
                id={`post-${post.id}`}>
                <div>
                  <Heading level={postTitleLevel} className={styles.title}>
                    <Link href={post.uri}>
                      <a href={post.uri}>{post.title}</a>
                    </Link>
                  </Heading>
                  <div
                    className={styles.excerpt}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }}
                  />
                  <a
                    href={post.uri}
                    aria-label={`Read more about ${post.title}`}>
                    {readMoreText}
                  </a>
                </div>
              </div>
            ))}
          {thePosts && thePosts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  );
}

export default Posts;
