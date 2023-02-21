import React from 'react';
import { adminUrl } from '../../../utils/adminUrl.js';
import { ToolbarItem } from '../index.js';

export function SiteName({ url = adminUrl(), title = 'WordPress' }) {
  return <ToolbarItem href={url}>{title}</ToolbarItem>;
}
