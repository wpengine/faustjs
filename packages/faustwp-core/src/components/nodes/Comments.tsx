import React from "react";
import { adminUrl } from "../../utils/adminUrl";

const defaultUrl = adminUrl('edit-comments.php');

export function Comments({
  url = defaultUrl,
  commentsInModeration = 0,
}) {
  return (
    <li id="wp-admin-bar-comments">
      <a className="ab-item" href={url}>
        <span className="ab-icon" aria-hidden="true"></span>
        <span className={"ab-label awaiting-mod pending-count" + (commentsInModeration === 0) && 'count-0'} aria-hidden="true">{commentsInModeration}</span>
        <span className="screen-reader-text comments-in-moderation-text">{commentsInModeration} Comments in moderation</span>
      </a>
    </li>
  );
}
