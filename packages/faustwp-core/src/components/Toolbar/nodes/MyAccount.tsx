import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { getApolloAuthClient } from '../../../client.js';
import { useLogout } from '../../../hooks/useLogout.js';
import { useAuth } from '../../../hooks/useAuth.js';
import { getAdminUrl } from '../../../lib/getAdminUrl.js';
import {
  ToolbarItem,
  ToolbarNodeSkeleton,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper,
} from '../index.js';

export function AuthenticatedAccount() {
  const client = getApolloAuthClient();
  const { logout } = useLogout();
  const { data, loading } = useQuery(
    gql`
      {
        viewer {
          name
          username
          avatar26: avatar(size: 26) {
            url
          }
          avatar52: avatar(size: 52) {
            url
          }
          avatar64: avatar(size: 64) {
            url
          }
          avatar128: avatar(size: 128) {
            url
          }
        }
      }
    `,
    { client },
  );

  if (loading) {
    return <ToolbarNodeSkeleton />;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void logout();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    void logout();
  };

  return (
    <>
      <ToolbarItem aria-haspopup="true">
        Howdy, <span className="display-name">{data?.viewer?.name}</span>
        <img
          alt=""
          src={data?.viewer?.avatar26.url}
          srcSet={`${data?.viewer?.avatar52.url as string} 2x`}
          className="avatar avatar-26 photo"
          height="26"
          width="26"
          loading="lazy"
          decoding="async"
        />
      </ToolbarItem>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu id="wp-admin-bar-user-actions">
          <li id="wp-admin-bar-user-info">
            <ToolbarItem tabIndex={-1} href={getAdminUrl('profile.php')}>
              <img
                alt=""
                src={data?.viewer?.avatar64.url}
                srcSet={`${data?.viewer?.avatar128.url as string} 2x`}
                className="avatar avatar-64 photo"
                height="64"
                width="64"
                loading="lazy"
                decoding="async"
              />
              <span className="display-name">{data?.viewer?.name}</span>
              <span className="username">{data?.viewer?.username}</span>
            </ToolbarItem>
          </li>
          <li id="wp-admin-bar-edit-profile">
            <ToolbarItem href={getAdminUrl('profile.php')}>
              Edit Profile
            </ToolbarItem>
          </li>
          <li id="wp-admin-bar-logout">
            <ToolbarItem
              href="#"
              onKeyDown={handleKeyDown}
              onClick={handleClick}>
              Log Out
            </ToolbarItem>
          </li>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  );
}

export function MyAccount() {
  const { isAuthenticated, isReady } = useAuth({
    strategy: 'redirect',
    shouldRedirect: false,
  });

  if (!isReady) {
    return <ToolbarNodeSkeleton />;
  }

  if (isAuthenticated === true) {
    return <AuthenticatedAccount />;
  }

  return null;
}
