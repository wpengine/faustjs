import React from 'react';
import { useRouter } from 'next/router.js';
import { SeedNode } from '../../../queries/seedQuery.js';
import { getAdminUrl } from '../../../lib/getAdminUrl.js';
import { ToolbarItem } from '../index.js';

type Props = {
  seedNode?: SeedNode | null;
};

export function Edit({ seedNode }: Props) {
  const {
    query: { p, typeName },
  } = useRouter();

  if (seedNode?.isFrontPage || seedNode?.isPostsPage) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line no-underscore-dangle
  const postType = seedNode?.__typename ?? (typeName as string | undefined);
  const postId = seedNode?.databaseId ?? (p as string | undefined);

  if (!postId || !postType) {
    return null;
  }

  const editPostUrl = getAdminUrl(`post.php?post=${postId}&action=edit`);

  return <ToolbarItem href={editPostUrl}>Edit {postType}</ToolbarItem>;
}
