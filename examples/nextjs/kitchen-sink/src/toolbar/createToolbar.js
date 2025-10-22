import { Toolbar as BaseToolbar } from '@wpengine/hwp-toolbar';

/**
 * Creates and configures the toolbar instance
 */
export function createToolbar(config = {}) {
	return new BaseToolbar({
		position: 'top',
		onPreviewChange: (enabled) => {
			// Emit event for Next.js integration
			if (typeof window !== 'undefined') {
				window.dispatchEvent(
					new CustomEvent('faust:preview-change', {
						detail: { enabled },
					}),
				);
			}
		},
		...config,
	});
}
