import React, { useState } from 'react';
import { adminUrl } from '../../utils/adminUrl.js';

export function SiteName({ siteName = '' }) {
  const [hover, setHover] = useState(false);
  const dashboardUrl = adminUrl();
  const navMenusUrl = adminUrl('nav-menus.php');

  return (
    <li
      id="wp-admin-bar-site-name"
      className={`${hover ? 'hover' : ''} menupop`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}>
      <a className="ab-item" href={dashboardUrl}>
        {siteName}
      </a>
      <div className="ab-sub-wrapper">
        <ul id="wp-admin-bar-site-name-default" className="ab-submenu">
          <li id="wp-admin-bar-view-site">
            <a className="ab-item" href={dashboardUrl}>
              Dashboard
            </a>
          </li>
        </ul>
        <ul id="wp-admin-bar-appearance" className="ab-submenu">
          <li id="wp-admin-bar-menus">
            <a className="ab-item" href={navMenusUrl}>
              Menus
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
}
