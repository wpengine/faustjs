import { userConfig } from '../userConfig.js';

export function telemetryPrefsExist(): boolean {
  return (
    userConfig.all.telemetry !== undefined &&
    userConfig.all.telemetry.anonymousId !== undefined &&
    userConfig.all.telemetry.enabled !== undefined
  );
}
