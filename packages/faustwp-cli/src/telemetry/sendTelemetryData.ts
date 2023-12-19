import 'isomorphic-fetch';

import { getWpUrl } from '../utils/getWpUrl.js';
import { TelemetryData } from './marshallTelemetryData.js';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const WP_TELEMETRY_ENDPOINT = `${getWpUrl()!}/wp-json/faustwp/v1/process_telemetry`;

/**
 * Send the marshalled telemetry data to Faust Telemetry API.
 *
 * @param payload The data being sent to telemetry API
 */
export const sendTelemetryData = (payload: TelemetryData) => {
  return fetch(WP_TELEMETRY_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-faustwp-secret': getWpSecret(),
      'Content-Type': 'application/json'
    }
    body: JSON.stringify(payload),
  });
};
