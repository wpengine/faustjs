
import React from "react";
import { adminUrl } from "../../utils/adminUrl";

type Props = {
  postId: any,
}

export function Edit({
  postId,
}: Props ) {
  const editPostUrl = adminUrl(`post.php?post=${postId}&action=edit`);

  return (
    <li id="wp-admin-bar-edit">
      <a className="ab-item" href={editPostUrl}>Edit Page</a>
    </li>
  );
}
