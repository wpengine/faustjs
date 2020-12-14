import React from "react";

interface MenuItem
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	title: string;
	children?: MenuItem[];
}

export default MenuItem;
