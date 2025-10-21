import { useToolbar } from '@wpengine/hwp-toolbar/react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { createToolbar } from './createToolbar';
import { registerDefaultNodes } from './registerNodes';
import { renderNode } from './renderNode';

export const Toolbar = forwardRef(function Toolbar({ user, post, site, config = {}, onToolbarReady, isPreview, disablePreviewUrl }, ref) {
	const toolbar = useMemo(() => createToolbar(config), []);
	const { nodes } = useToolbar(toolbar);
	const [position, setPosition] = useState(config.position || 'bottom');
	const [activePanel, setActivePanel] = useState(null);

	// Expose toolbar instance to parent components
	useImperativeHandle(ref, () => ({
		toolbar,
		register: (id, nodeConfig) => toolbar.register(id, nodeConfig),
		unregister: (id) => toolbar.unregister(id),
		getNode: (id) => toolbar.getNode(id),
		update: (id, updates) => toolbar.update(id, updates),
		setConfig: (config) => toolbar.setConfig(config),
		getConfig: () => toolbar.getConfig()
	}), [toolbar]);

	// Notify parent when toolbar is ready
	useEffect(() => {
		if (onToolbarReady && typeof onToolbarReady === 'function') {
			onToolbarReady(toolbar);
		}
	}, [toolbar, onToolbarReady]);

	useEffect(() => {
		if (user || post || site) {
			toolbar.setWordPressContext({ user, site, post });
		}
	}, [toolbar, user, post, site]);

	useEffect(() => {
		const currentPosition = toolbar.getConfig()?.position || 'top';
		setPosition(currentPosition);

		const cleanup = registerDefaultNodes(toolbar, { position, setPosition, user, site, isPreview, disablePreviewUrl });
		return cleanup;
	}, [toolbar, position, user, site]);

	useEffect(() => {
		const currentPosition = toolbar.getConfig()?.position || 'bottom';
		document.body.classList.add(`faust-toolbar-has-toolbar-${currentPosition}`);

		const unsubscribe = toolbar.subscribe(() => {
			const config = toolbar.getConfig();
			const newPosition = config?.position || 'bottom';
			if (currentPosition !== newPosition) {
				document.body.classList.remove(`faust-toolbar-has-toolbar-${currentPosition}`);
				document.body.classList.add(`faust-toolbar-has-toolbar-${newPosition}`);
			}
		});

		return () => {
			unsubscribe();
			document.body.classList.remove(`faust-toolbar-has-toolbar-${currentPosition}`);
		};
	}, [toolbar]);

	return (
		<div className={`faust-toolbar faust-toolbar-${position}`}>
			<div className="faust-toolbar-header">
				<div className="faust-toolbar-content">
					<div className="faust-toolbar-left">
						{nodes.filter(node => node.position !== 'right').map(node => renderNode(node, { activePanel, setActivePanel }))}
					</div>
					<div className="faust-toolbar-right">
						{nodes.filter(node => node.position === 'right').map(node => renderNode(node, { activePanel, setActivePanel }))}
					</div>
				</div>
			</div>

			{activePanel && (
				<div className="faust-toolbar-panel-container">
					{(() => {
						const activeNode = nodes.find(node => node.panel === activePanel);
						return activeNode?.panelComponent || <div className="faust-toolbar-no-content">No content</div>;
					})()}
				</div>
			)}
		</div>
	);
});
