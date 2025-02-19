import React, { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = PropsWithChildren<{}>;

export function ToolbarSubmenuWrapper({ children, ...props }: Props) {
	return (
		<div className="ab-sub-wrapper" {...props}>
			{children}
		</div>
	);
}
