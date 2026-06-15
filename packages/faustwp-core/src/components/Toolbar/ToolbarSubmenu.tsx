import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

type Props = PropsWithChildren<{
	id?: string;
	secondary?: boolean;
}>;

export function ToolbarSubmenu({ secondary, children, ...props }: Props) {
	return (
		<ul
			className={classNames('ab-submenu', { 'ab-sub-secondary': secondary })}
			{...props}>
			{children}
		</ul>
	);
}
