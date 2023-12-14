import 'isomorphic-fetch';

import { TelemetryData } from './marshallTelemetryData.js';
import { getWpUrl } from '../utils/getWpUrl.js';
import { getWpSecret } from '../utils/getWpSecret.js';

const GA_TRACKING_ID = 'G-KPVSTHK1G4';
const GA_API_SECRET = '-SLuZb8JTbWkWcT5BD032w';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const WP_TELEMETRY_ENDPOINT = `${getWpUrl()!}/wp-json/faustwp/v1/telemetry`;
const WP_SECRET = getWpSecret();

/**
 * Send the marshalled telemetry data to Faust Telemetry API.
 *
 * @param payload The data being sent to GA
 * @param anonymousId The anonymous ID of the machine we captured during init
 */
export const sendTelemetryData = (
  payload: TelemetryData,
  anonymousId: string,
) => {
  const body = {
    client_id: anonymousId,
    wp_secret: WP_SECRET,
    events: [
      {
        name: 'telemetry_event',
        params: payload,
      },
    ],
  };

  return fetch(
    `${WP_TELEMETRY_ENDPOINT}?${new URLSearchParams({
      api_secret: GA_API_SECRET,
      measurement_id: GA_TRACKING_ID,
    }).toString()}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};
