import React from 'react';
import { getAdminUrl } from '../../../lib/getAdminUrl.js';
import { ToolbarItem } from '../index.js';

export function SiteName({ url = getAdminUrl(), title = 'WordPress' }) {
	return <ToolbarItem href={url}>{title}</ToolbarItem>;
}
