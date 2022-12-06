import { ConfigStoreType } from '../index.js';

export function TelemetryPrefsExist(config: ConfigStoreType): boolean {
  return (
    config.all.telemetry !== undefined &&
    config.all.telemetry.anonymousId !== undefined &&
    config.all.telemetry.enabled !== undefined
  );
}
