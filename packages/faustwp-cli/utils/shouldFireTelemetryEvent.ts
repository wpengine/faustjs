import { getWpSecret } from './getWpSecret.js';
import { userConfig } from './userConfig.js';

export function shouldFireTelemetryEvent(): boolean {
  const hasAnonymousId = userConfig.get('telemetry.anonymousId');
  const hasTelemetryEnabled = userConfig.get('telemetry.enabled') === true;

  const shouldFireEvent =
    getWpSecret() && hasAnonymousId && hasTelemetryEnabled;

  return shouldFireEvent as boolean;
}
