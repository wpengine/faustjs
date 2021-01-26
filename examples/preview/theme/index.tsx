import React from 'react';
import Link from 'next/link';
import {
  usePosts,
  useMenus,
  menuLocation,
  WPGraphQL,
  WPHead,
  Menu,
  MenuItem,
} from '@wpengine/headless';

export default function Index() {
  const posts = usePosts();

  const menus = useMenus();
  const primaryMenu = menuLocation(menus, WPGraphQL.MenuLocationEnum.Primary);
  const nextLink = (item: MenuItem): React.ReactNode => (
    <Link href={item.href}>
      <a>{item.title}</a>
    </Link>
  );

  return (
    <>
      <WPHead />
      <Menu
        items={primaryMenu}
        className="header"
        aria-label="Main"
        anchor={nextLink}
      />
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
    </>
  );
}
