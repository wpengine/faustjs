import 'isomorphic-fetch';

import { getWpUrl } from '../utils/getWpUrl.js';
import {
	getWpAuthHeaders,
	hasWpCredentials,
} from '../utils/getWpAuthHeaders.js';
import { TelemetryData } from './marshallTelemetryData.js';

/**
 * Send the marshalled telemetry data to Faust Telemetry API.
 *
 * @param payload The data being sent to telemetry API
 */
export const sendTelemetryData = (payload: TelemetryData) => {
	if (!hasWpCredentials()) {
		throw new Error('Faust secret key or Application Password is required');
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const WP_TELEMETRY_ENDPOINT = `${getWpUrl()!}/?rest_route=/faustwp/v1/process_telemetry`;

	return fetch(WP_TELEMETRY_ENDPOINT, {
		headers: {
			...getWpAuthHeaders(),
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(payload),
	});
};
