import 'isomorphic-fetch';

import { TelemetryData } from './marshallTelemetryData.js';

const GA_TRACKING_ENDPOINT = 'http://www.google-analytics.com/debug/mp/collect';
const GA_TRACKING_ID = 'G-KPVSTHK1G4';
const GA_API_SECRET = '-SLuZb8JTbWkWcT5BD032w';

/**
 * Send the marshalled telemetry data to GA.
 *
 * @param category GA Category
 * @param action GA Action
 * @param label GA Label
 * @param payload The data being sent to GA
 * @param anonymousId The anonymous ID of the machine we captured during init
 */
export const sendTelemetryData = (
  category: string,
  action: string,
  label: string,
  payload: TelemetryData,
  anonymousId: string,
) => {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: anonymousId,
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: payload,
  };

  return fetch(
    `${GA_TRACKING_ENDPOINT}?${new URLSearchParams({
      api_secret: GA_API_SECRET,
    }).toString()}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
};
