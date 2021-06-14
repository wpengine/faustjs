import { Post } from '@wpengine/headless-core';

export default function PostList(posts: Post[] | undefined) {
  return (
    <>
      {posts?.map((post, index) => (
        <article key={post?.id}>
          <h2>{post?.title()}</h2>
          <p>{post?.excerpt()}</p>
        </article>
      ))}
    </>
  );
}
