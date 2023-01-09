import React, { useState } from "react";
import { getWpUrl } from "../../lib/getWpUrl.js";

const wpUrl = getWpUrl();

export function SiteName({
  siteName = '',
  url = wpUrl,
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      id="wp-admin-bar-site-name"
      className={`${ hover ? 'hover' : '' } menupop`}
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
    >
      <a className="ab-item" aria-haspopup="true" href={url}>{siteName}</a>
      <div className="ab-sub-wrapper">
        <ul id="wp-admin-bar-site-name-default" className="ab-submenu">
          <li id="wp-admin-bar-view-site">
            <a className="ab-item" href="http://faustwp-symlink.local/">Visit Site</a>
          </li>
        </ul>
      </div>
    </li>
  );
}
