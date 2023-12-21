/**
 * Handles opt-in telemetry decisions made by the user.
 */
let faustwp = {};
faustwp.handleTelemetryDecision = (() => {
	const yesButton = document.getElementById('faustwp-telemetry-decision-yes');
	const noButton = document.getElementById('faustwp-telemetry-decision-no');
	const remindButton = document.getElementById('faustwp-telemetry-decision-remind');
	const buttons = [yesButton, noButton, remindButton];

	function init() {
		buttons.forEach(el => el.onclick = (event) => {
			event.preventDefault();
			const decision = event.target.value;
			wp.a11y.speak(`faustwp_telemetry.strings.decision_${decision}`, 'polite');
			saveDecision(decision);
		});
	}

	async function saveDecision(decision = 'remind') {
		if ( ! ['yes', 'no', 'remind'].includes(decision)) {
			decision = 'remind';
		}

		const request = {
			path: '/faustwp/v1/telemetry/decision',
			method: 'POST',
			data: {decision}
		}

		const faustNotice = document.getElementById('faustwp-telemetry-notice');
		let response = await wp.apiFetch(request);
		if (response.success) {
			wp.a11y.speak(faustwp_telemetry.strings.decision_success, 'polite');
			faustNotice.innerHTML = faustwp_telemetry.strings.decision_success;
			// Toggle checkbox on settings page to match decision, since we don't reload the page.
			document.getElementById('enable_telemetry').checked = decision === 'yes';
		} else {
			faustNotice.innerHTML = faustwp_telemetry.strings.decision_fail;
			wp.a11y.speak(faustwp_telemetry.strings.decision_fail, 'polite');
		}
	}
	return {init, saveDecision}
})();

faustwp.handleTelemetryDecision.init();
