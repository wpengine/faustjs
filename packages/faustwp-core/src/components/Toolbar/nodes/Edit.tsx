import React from 'react';
import { SeedNode } from '../../../queries/seedQuery.js';
import { getAdminUrl } from '../../../lib/getAdminUrl.js';
import { ToolbarItem } from '../index.js';

type Props = {
  seedNode?: SeedNode;
};

export function Edit({ seedNode }: Props) {
  if (
    seedNode === undefined ||
    seedNode?.isFrontPage ||
    seedNode?.isPostsPage
  ) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  // eslint-disable-next-line no-underscore-dangle
  const postType = seedNode?.__typename || '';
  const postId = seedNode?.databaseId || '';

  const editPostUrl = getAdminUrl(`post.php?post=${postId}&action=edit`);

  return <ToolbarItem href={editPostUrl}>Edit {postType}</ToolbarItem>;
}
