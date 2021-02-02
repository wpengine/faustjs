import React from 'react';
import Link from 'next/link';
import { usePosts, WPHead } from '@wpengine/headless';

export default function Index() {
  const posts = usePosts({variables: {
    first: 1
  }});

  return (
    <>
      <WPHead />

      <div>
        {posts && posts.nodes &&
          posts.nodes.map((post) => (
            <div key={post.id} id={`post-${post.id}`}>
              <div>
                <Link href={post.uri}>
                  <h2>
                    <a href={post.uri}>{post.title}</a>
                  </h2>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
