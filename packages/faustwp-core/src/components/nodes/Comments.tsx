import React from "react";
import { Icon, comment as defaultIcon } from '@wordpress/icons';
import { adminUrl } from "../../utils/adminUrl";

const defaultUrl = adminUrl('edit-comments.php');

export function Comments({
  icon = defaultIcon,
  url = defaultUrl,
  commentsInModeration = 0,
}) {
  return (
    <li id="wp-admin-bar-comments">
      <a className="ab-item" href={url}>
        <Icon icon={icon} />
        <span className="ab-label awaiting-mod pending-count" aria-hidden="true">{commentsInModeration}</span>
        <span className="screen-reader-text comments-in-moderation-text">{commentsInModeration} Comments in moderation</span>
      </a>
    </li>
  );
}
