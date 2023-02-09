import React from 'react';
import { adminUrl } from '../../../utils/adminUrl.js';
import {
  ToolbarLink,
  ToolbarSubmenuWrapper,
  ToolbarSubmenu,
  ToolbarItem,
} from '../index.js';

const defaultUrl = adminUrl('about.php');

export function Brand({ url = defaultUrl }) {
  return (
    <>
      <ToolbarLink url='https://faustjs.org'>
        Faust.js™
      </ToolbarLink>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu id="wp-admin-bar-wp-logo-default">
          <ToolbarItem id="wp-admin-bar-about">
            <ToolbarLink url={url}>About Faust</ToolbarLink>
          </ToolbarItem>
          <ToolbarItem id="wp-admin-bar-documentation">
            <ToolbarLink url={'https://faustjs.org/docs/getting-started'}>Documentation</ToolbarLink>
          </ToolbarItem>
          <ToolbarItem id="wp-admin-bar-support-forums">
            <ToolbarLink url={'https://github.com/wpengine/faustjs'}>GitHub</ToolbarLink>
          </ToolbarItem>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  );
}
