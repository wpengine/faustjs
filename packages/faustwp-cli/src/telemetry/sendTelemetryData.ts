import 'isomorphic-fetch';

import { getWpUrl } from '../utils/getWpUrl.js';
import { getWpSecret } from '../utils/getWpSecret.js';
import { TelemetryData } from './marshallTelemetryData.js';

/**
 * Send the marshalled telemetry data to Faust Telemetry API.
 *
 * @param payload The data being sent to telemetry API
 */
export const sendTelemetryData = (payload: TelemetryData) => {
  const secret = getWpSecret();

  if (!secret) {
    throw new Error('Faust secret key is required');
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const WP_TELEMETRY_ENDPOINT = `${getWpUrl()!}/wp-json/faustwp/v1/process_telemetry`;

  return fetch(WP_TELEMETRY_ENDPOINT, {
    headers: {
      'x-faustwp-secret': secret,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
