import Configstore from 'configstore';
import prompt from 'prompt';
import { v4 as uuid } from 'uuid';

prompt.start();

/**
 * Prompt the user for their telemetry preferences.
 *
 * @param isInit boolean Based on this value, we will either save a new telemetry config, or update the "enabled" value in the config.
 * @param config The Configstore config
 */
export const promptUserForTelemetryPref = async (
  isInit: boolean,
  config: Configstore,
) => {
  const { isTelemetryEnabled } = await prompt.get({
    properties: {
      isTelemetryEnabled: {
        description:
          'Would you like to enable telemetry in FaustNX? This helps us make more informed feature decisions. true/false',
        required: true,
        type: 'boolean',
      },
    },
  });

  if (isInit) {
    config.set('telemetry', {
      notifiedAt: new Date().getTime(),
      anonymousId: uuid(),
      enabled: isTelemetryEnabled,
    });
  } else {
    config.set('telemetry.enabled', isTelemetryEnabled);
  }
};
