import React from 'react';
import { SeedNode } from '../../../queries/seedQuery.js';
import { adminUrl } from '../../../utils/adminUrl.js';
import { ToolbarLink } from '../index.js';

export type EditProps = {
  seedNode: SeedNode;
};

export function Edit({ seedNode }: EditProps) {
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

  const editPostUrl = adminUrl(`post.php?post=${postId}&action=edit`);

  return <ToolbarLink url={editPostUrl}>Edit {postType}</ToolbarLink>;
}
