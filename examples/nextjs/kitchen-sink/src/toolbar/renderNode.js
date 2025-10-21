import React from 'react';

/**
 * Renders a toolbar node with proper handling for components and default buttons
 */
export function renderNode(node, { activePanel, setActivePanel }) {
	// Generate className for consistent styling across all node types
	const nodeClassName = `faust-toolbar-btn ${
		node.position ? `faust-toolbar-btn-${node.position}` : ''
	}`;

	if (node.component) {
		// If it's a React component, render it
		if (React.isValidElement(node.component)) {
			return React.cloneElement(node.component, {
				key: node.id,
				className: nodeClassName,
			});
		}
		const Component = node.component;
		return <Component key={node.id} className={nodeClassName} />;
	}

	// Default tab rendering
	return (
		<button
			key={node.id}
			className={nodeClassName}
			onClick={() => {
				if (node.panel) {
					setActivePanel(activePanel === node.panel ? null : node.panel);
				}
				if (node.onClick) {
					node.onClick();
				}
			}}
			style={{
				order: node.order ?? 1,
			}}>
			{node.icon &&
				(React.isValidElement(node.icon) ? (
					React.cloneElement(node.icon, {
						className: `${
							node.icon.props.className || ''
						} faust-toolbar-btn-icon`.trim(),
					})
				) : (
					<img
						src={node.icon}
						alt={node.label}
						className="faust-toolbar-btn-icon"
					/>
				))}
			{node.label && (
				<span className="faust-toolbar-btn-label">{node.label}</span>
			)}
		</button>
	);
}
