import React from 'react';
import { adminUrl } from '../../utils/adminUrl.js';

const defaultUrl = adminUrl('edit-comments.php');

export function Comments({ url = defaultUrl, commentsInModeration = 0 }) {
  const maybeCount0Class = commentsInModeration === 0 ? 'count-0' : ''; // .count-0 adds opacity.

  return (
    <li id="wp-admin-bar-comments">
      <a className="ab-item" href={url}>
        <span className="ab-icon" aria-hidden="true" />
        <span
          className={`ab-label awaiting-mod pending-count ${maybeCount0Class}`}
          aria-hidden="true">
          {commentsInModeration}
        </span>
        <span className="screen-reader-text comments-in-moderation-text">
          {commentsInModeration} Comments in moderation
        </span>
      </a>
    </li>
  );
}
