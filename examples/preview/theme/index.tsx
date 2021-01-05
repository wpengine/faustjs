import React from 'react';
import Link from 'next/link';
import { usePosts } from '@wpengine/headless';

export default function Index() {
  const posts = usePosts();

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post.id} id={`post-${post.id}`}>
            <div>
              <Link href={post.uri}>
                <h5>
                  <a href={post.uri}>{post.title}</a>
                </h5>
              </Link>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }} />
            </div>
          </div>
        ))}
    </div>
  );
}
