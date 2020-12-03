import React from "react";

export interface MenuItem
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	title: string;
	children?: MenuItem[];
}
