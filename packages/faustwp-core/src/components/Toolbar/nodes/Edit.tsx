import React from 'react';
import { useRouter } from 'next/router.js';
import { SeedNode } from '../../../queries/seedQuery.js';
import { getAdminUrl } from '../../../lib/getAdminUrl.js';
import { ToolbarItem } from '../index.js';

type Props = {
  seedNode?: SeedNode;
};

export function Edit({ seedNode }: Props) {
  const {
    query: { p, typeName },
  } = useRouter();

  if (seedNode?.isFrontPage || seedNode?.isPostsPage) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  let postType = seedNode?.__typename || '';
  let postId = seedNode?.databaseId || '';

  // This is a preview.
  if (!postId) {
    postId = p;
    postType = typeName;
  }

  const editPostUrl = getAdminUrl(`post.php?post=${postId}&action=edit`);

  return <ToolbarItem href={editPostUrl}>Edit {postType}</ToolbarItem>;
}
