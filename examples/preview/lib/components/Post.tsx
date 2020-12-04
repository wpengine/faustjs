import React from 'react';
import { usePost } from '@wpengine/headless';

export default function Post() {
  const post = usePost();

  return (
    <div>
      { post &&
        <div>
          <div>
            <h5>
              { post.title }
            </h5>
            <p dangerouslySetInnerHTML={ { __html: post.content ?? '' } } />
          </div>
        </div>
      }
    </div>
  );
}
