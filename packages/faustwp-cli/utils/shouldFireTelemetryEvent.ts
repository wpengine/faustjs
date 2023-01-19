import { userConfig } from './userConfig.js';
import { getWpSecret } from '../../faustwp-core/src/lib/getWpSecret.js';

export function shouldFireTelemetryEvent(): boolean {
  const args = getCliArgs();
  const arg1 = args[0];
  const hasAnonymousId = userConfig.get('telemetry.anonymousId');
  const hasTelemetryEnabled = userConfig.get('telemetry.enabled') === true;

  const shouldFireEvent =
    getWpSecret() &&
    hasAnonymousId &&
    hasTelemetryEnabled;

  return shouldFireEvent as boolean;
}
