#!/usr/bin/env node

import Configstore from 'configstore';
import { spawn } from 'child_process';
import dotenv from 'dotenv-flow';
import {
  marshallTelemetryData,
  getCliArgs,
  validateFaustEnvVars,
  promptUserForTelemetryPref,
  sendTelemetryData,
  requestWPTelemetryData,
  generatePossibleTypes,
  infoLog,
} from './utils/index.js';

dotenv.config();
const CONFIG_STORE_NAME = 'faust';
const config = new Configstore(CONFIG_STORE_NAME);

await (async () => {
  validateFaustEnvVars();
  /**
   * If there is no config (or a non-valid config), prompt the user for their
   * permission to collect anonymous telemetry information and save their
   * preferences on their machine.
   */
  if (
    !config.all?.telemetry ||
    config.all?.telemetry?.enabled === undefined ||
    !config.all?.telemetry?.anonymousId
  ) {
    await promptUserForTelemetryPref(true, config);
  }

  if (getCliArgs()[0] === 'faust-telemetry') {
    await promptUserForTelemetryPref(false, config);

    process.exit(0);
  }

  const arg1 = getCliArgs()[0];

  // Handle custom CLI arguments.
  if (arg1 === 'generatePossibleTypes') {
    await generatePossibleTypes();
    process.exit(0);
  }

  const shouldFireTelemetryEvent =
    (getCliArgs()[0] === 'dev' || getCliArgs()[0] === 'build') &&
    config.get('telemetry.enabled') === true &&
    config.get('telemetry.anonymousId') &&
    process.env.FAUSTWP_SECRET_KEY;

  if (shouldFireTelemetryEvent) {
    try {
      const wpTelemetryData = await requestWPTelemetryData(
        process.env.NEXT_PUBLIC_WORDPRESS_URL!,
        process.env.FAUSTWP_SECRET_KEY!,
      );

      const telemetryData = marshallTelemetryData(wpTelemetryData);

      infoLog('Telemetry event being sent', telemetryData);

      sendTelemetryData(
        'ga-category',
        'ga-action',
        'ga-label',
        telemetryData,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        config.get('telemetry.anonymousId'),
      );
    } catch (err) {
      console.log(err);
      // Fail silently
    }
  }
})();
