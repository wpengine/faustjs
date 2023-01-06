import React from "react";
import { Icon, wordpress as defaultIcon } from '@wordpress/icons';
import { adminUrl } from "../../utils/adminUrl";

const defaultUrl = adminUrl('about.php');

export function Brand({
  url = defaultUrl,
  icon = defaultIcon
}) {
  return (
    <li id="wp-admin-bar-wp-logo" className="menupop">
      <a className="ab-item" aria-haspopup="true" href={url}>
        <Icon icon={icon} style={{ position: 'relative', top: '3px' }} />
      </a>
      <div className="ab-sub-wrapper">
        <ul id="wp-admin-bar-wp-logo-default" className="ab-submenu">
          <li id="wp-admin-bar-about">
            <a className="ab-item" href={url}>About WordPress</a>
          </li>
        </ul>
        <ul id="wp-admin-bar-wp-logo-external" className="ab-sub-secondary ab-submenu">
          <li id="wp-admin-bar-wporg">
            <a className="ab-item" href="https://wordpress.org/">WordPress.org</a>
          </li>
          <li id="wp-admin-bar-documentation">
            <a className="ab-item" href="https://wordpress.org/support/">Documentation</a>
          </li>
          <li id="wp-admin-bar-support-forums">
            <a className="ab-item" href="https://wordpress.org/support/forums/">Support</a>
          </li>
          <li id="wp-admin-bar-feedback">
            <a className="ab-item" href="https://wordpress.org/support/forum/requests-and-feedback">Feedback</a>
          </li>
        </ul>
      </div>
    </li>
  );
}
