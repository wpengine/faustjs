import { getCliArgs } from './getCliArgs.js';
import { userConfig } from './userConfig.js';

export function shouldFireTelemetryEvent(): boolean {
  const args = getCliArgs();
  const arg1 = args[0];

  const hasSecretKey =
    process.env.FAUST_SECRET_KEY || process.env.FAUSTWP_SECRET_KEY;
  const hasAnonymousId = userConfig.get('telemetry.anonymousId');
  const hasTelemetryEnabled = userConfig.get('telemetry.enabled') === true;
  const runningUsingProperCommands = arg1 === 'dev' || arg1 === 'build';

  const shouldFireEvent =
    hasSecretKey &&
    hasAnonymousId &&
    hasTelemetryEnabled &&
    runningUsingProperCommands;

  return shouldFireEvent as boolean;
}
