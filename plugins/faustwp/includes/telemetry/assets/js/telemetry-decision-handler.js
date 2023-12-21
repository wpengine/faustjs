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

		let response = await wp.apiFetch(request);
		if (response.success) {
			wp.a11y.speak(faustwp_telemetry.strings.decision_success, 'polite');
		} else {
			wp.a11y.speak(faustwp_telemetry.strings.decision_fail, 'polite');
		}
	}
	return {init, saveDecision}
})();

faustwp.handleTelemetryDecision.init();
