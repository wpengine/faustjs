import 'isomorphic-fetch';

import { TelemetryData } from './marshallTelemetryData.js';

const GA_TRACKING_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const GA_TRACKING_ID = 'G-KPVSTHK1G4';
const GA_API_SECRET = '-SLuZb8JTbWkWcT5BD032w';

/**
 * Send the marshalled telemetry data to GA.
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
    events: [
      {
        name: 'telemetry_event',
        params: payload,
      },
    ],
  };

  return fetch(
    `${GA_TRACKING_ENDPOINT}?${new URLSearchParams({
      api_secret: GA_API_SECRET,
      measurement_id: GA_TRACKING_ID,
    }).toString()}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};
