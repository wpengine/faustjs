import React from 'react';
import { WPGraphQL } from '@wpengine/headless';
import Link from 'next/link';
import styles from 'sass/components/Posts.module.scss';

interface Props {
  posts: WPGraphQL.GetPostsQuery['posts']['nodes'] | undefined;
  intro?: string;
  id?: string;
  count?: number;
  heading?: string;
  headingLevel?: number;
  postTitleLevel?: number;
  readMoreText?: string;
}

function Posts({
  posts,
  intro,
  heading,
  id,
  count = 0,
  headingLevel = 1,
  postTitleLevel = 2,
  readMoreText = 'Read more',
}: Props) {
  // TODO: deprecate `count` and limit posts at the query level instead.
  const thePosts = count > 0 ? posts?.slice(0, count) : posts;
  const Heading = `h${headingLevel}`;
  const PostHeading = `h${postTitleLevel}`;
  return (
    <section className={styles['posts-block']} {...(id && { id })}>
      <div className="wrap">
        {heading && <Heading className={styles.heading}>{heading}</Heading>}
        {intro && <p className={styles.intro}>{intro}</p>}
        <div className="posts">
          {thePosts &&
            thePosts.map((post) => (
              <div
                className={styles.single}
                key={post.id}
                id={`post-${post.id}`}>
                <div>
                  <Link href={post.uri}>
                    <PostHeading className={styles.title}>
                      <a href={post.uri}>{post.title}</a>
                    </PostHeading>
                  </Link>
                  <div
                    className={styles.excerpt}
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
