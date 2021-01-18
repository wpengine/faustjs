/**
 * Handles WPGraphQL plugin installation at Settings → Headless.
 */
wpeHeadless.installWPGraphQL = (() => {
	const $button = document.getElementById('wpe-headless-button-install-graphql');
	const $spinner = document.querySelector('.sidebar .spinner');

	// Attaches event listeners.
	function init() {
		$button.onclick = (event) => {
			event.preventDefault();
			installWPGraphQL().then(() => update('complete'));
		}
	}

	// Installs and activates the WP GraphQL plugin.
	async function installWPGraphQL() {
		update('installing');

		// Default to install and activate.
		const request = {
			path: '/wp/v2/plugins',
			method: 'POST',
			data: {slug: 'wp-graphql', status: 'active'}
		}

		// Just activate the plugin if it is already installed.
		if (wpeHeadless.wpgraphqlIsInstalled) {
			request.path = '/wp/v2/plugins/wp-graphql/wp-graphql';
			request.data = {status: 'active'};
		}

		await wp.apiFetch(request);
	}

	// Updates the button and spinner.
	function update(state = 'installing') {
		switch (state) {
			case 'installing':
				wp.a11y.speak(wpeHeadless.strings.installing, 'polite');
				$button.innerHTML = wpeHeadless.strings.installing;
				$button.disabled = true;
				$spinner.style.visibility = 'visible';
				break;
			case 'complete':
				wp.a11y.speak(wpeHeadless.strings.active, 'polite');
				$button.innerHTML = `☑️ ${wpeHeadless.strings.active}`;
				$button.classList.add('active');
				$spinner.style.visibility = 'hidden';
				break;
		}
	}

	return { init: init }
})();

wpeHeadless.installWPGraphQL.init();
