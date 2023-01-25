import { userConfig } from './userConfig.js';

export function shouldFireTelemetryEvent(): boolean {
  const hasSecretKey = process.env.FAUSTWP_SECRET_KEY;
  const hasAnonymousId = userConfig.get('telemetry.anonymousId');
  const hasTelemetryEnabled = userConfig.get('telemetry.enabled') === true;

  const shouldFireEvent = hasSecretKey && hasAnonymousId && hasTelemetryEnabled;

  return shouldFireEvent as boolean;
}
