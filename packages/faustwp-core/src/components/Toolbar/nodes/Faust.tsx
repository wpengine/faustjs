import React from 'react';
import {
  ToolbarLink,
  ToolbarSubmenuWrapper,
  ToolbarSubmenu,
  ToolbarItem,
} from '../index.js';

export function Faust() {
  return (
    <>
      <ToolbarLink url="https://faustjs.org">Faust.js™</ToolbarLink>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu>
          <ToolbarItem>
            <ToolbarLink url={'https://faustjs.org/docs/getting-started'}>
              Documentation
            </ToolbarLink>
          </ToolbarItem>
          <ToolbarItem id="wp-admin-bar-support-forums">
            <ToolbarLink
              url={'https://github.com/wpengine/faustjs/issues/new/choose'}>
              Report an Issue on GitHub
            </ToolbarLink>
          </ToolbarItem>
          <ToolbarItem>
            <ToolbarLink url={'https://discord.gg/J2khkF9XYK'}>
              Headless WordPress Discord
            </ToolbarLink>
          </ToolbarItem>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  );
}

Faust.id = 'faust';
