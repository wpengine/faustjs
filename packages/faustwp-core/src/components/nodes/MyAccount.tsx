import React, { useState } from "react";
import { adminUrl } from "../../utils/adminUrl";

const profileUrl = adminUrl('profile.php');

export function MyAccount({
  displayName = 'Anonymous',
  username = 'anonymous'
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      id="wp-admin-bar-my-account"
      className={`${ hover ? 'hover' : '' } menupop with-avatar`}
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
    >
      <a className="ab-item" aria-haspopup="true" href={profileUrl}>Howdy, <span className="display-name">{displayName}</span>
        <img alt="" src="http://0.gravatar.com/avatar/cbe4ce55c088edd60fe400147668989e?s=26&amp;d=mm&amp;r=g" srcSet="http://0.gravatar.com/avatar/cbe4ce55c088edd60fe400147668989e?s=52&amp;d=mm&amp;r=g 2x" className="avatar avatar-26 photo" height="26" width="26" loading="lazy" decoding="async" />
      </a>
      <div className="ab-sub-wrapper">
        <ul id="wp-admin-bar-user-actions" className="ab-submenu">
          <li id="wp-admin-bar-user-info">
            <a className="ab-item" tabIndex={-1} href={profileUrl}>
              <img alt="" src="http://0.gravatar.com/avatar/cbe4ce55c088edd60fe400147668989e?s=64&amp;d=mm&amp;r=g" srcSet="http://0.gravatar.com/avatar/cbe4ce55c088edd60fe400147668989e?s=128&amp;d=mm&amp;r=g 2x" className="avatar avatar-64 photo" height="64" width="64" loading="lazy" decoding="async" />
              <span className="display-name">{displayName}</span>
              <span className="username">{username}</span>
            </a>
          </li>
          <li id="wp-admin-bar-edit-profile">
            <a className="ab-item" href={profileUrl}>Edit Profile</a>
          </li>
          <li id="wp-admin-bar-logout">
            <a className="ab-item" href="http://faustwp-symlink.local/wp-login.php?action=logout&amp;_wpnonce=3fe2939cc1">Log Out</a>
          </li>
        </ul>
      </div>
    </li>
  );
}
