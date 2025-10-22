import React from 'react';
import FaustLogo from './assets/faust-logo.svg';
import SettingsIcon from './assets/icons/settings.svg';
import EyeOffIcon from './assets/icons/eye-off.svg';

/**
 * Registers default Faust.js nodes to the toolbar
 */
export function registerDefaultNodes(toolbar, { position, setPosition, user, site, isPreview, disablePreviewUrl }) {
	// Unregister default preview node
	toolbar.unregister('preview');

	if (isPreview) {
		toolbar.register('preview', {
			label:"Exit preview mode",
			icon: EyeOffIcon.src,
			order: 3,
			onClick: ()=> {
				disablePreviewUrl && (window.location.href = disablePreviewUrl);
			},
		});
	}

	// Register Faust branding
	toolbar.register('faust-brand', {
		icon: <img  src={FaustLogo.src}  alt={"Faust.js"} className="faust-toolbar-btn-icon-faust" />,
		order: 0,
		onClick: ()=> {
			window.open("https://faustjs.org" , "_blank")
		},
	});

	// Register settings panel
	toolbar.register('settings', {
		icon: SettingsIcon.src,
		panel: 'settings',
		position: 'right',
		order: 99,
		panelComponent: (
			<div className="faust-toolbar-settings-panel">
				<div className="faust-toolbar-settings-row">
					<label className="faust-toolbar-settings-label">Position:</label>
					<select 
						value={position}
						onChange={(e) => {
							const newPosition = e.target.value;
							setPosition(newPosition);
							toolbar.setConfig({
								...toolbar.getConfig(),
								position: newPosition,
							});
						}}
						className="faust-toolbar-settings-select"
					>
						<option value="bottom">Bottom</option>
						<option value="top">Top</option>
					</select>
				</div>
			</div>
		)
	});

	// Register WordPress user node if available
	if (user) {
		toolbar.register('wp-user', {
			label: user.name,
			icon: user.avatar,
			position: 'right',
			order: 98,
			onClick: ()=> {
				window.open(`${site?.adminUrl}/profile.php`, "_blank")
			}
		});
	}

	// Return cleanup function
	return () => {
		toolbar.unregister('faust-brand');
		toolbar.unregister('settings');
		if (user) toolbar.unregister('wp-user');
	};
}
