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

  // eslint-disable-next-line default-case
  switch (getCliArgs()[0]) {
    case 'faust-telemetry': {
      await promptUserForTelemetryPref(false, config);
      process.exit(0);

      break;
    }
    case 'generatePossibleTypes': {
      await generatePossibleTypes();
      process.exit(0);

      break;
    }
  }

  const shouldFireTelemetryEvent =
    (getCliArgs()[0] === 'dev' || getCliArgs()[0] === 'build') &&
    config.get('telemetry.enabled') === true &&
    config.get('telemetry.anonymousId') &&
    process.env.FAUSTWP_SECRET_KEY;

  if (shouldFireTelemetryEvent) {
    try {
      const wpTelemetryData = await requestWPTelemetryData(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.NEXT_PUBLIC_WORDPRESS_URL!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.FAUSTWP_SECRET_KEY!,
      );

      const telemetryData = marshallTelemetryData(wpTelemetryData);

      infoLog('Telemetry event being sent', telemetryData);

      void sendTelemetryData(
        telemetryData,
        config.get('telemetry.anonymousId') as string,
      );
    } catch (err) {
      // console.log(err);
      // Fail silently
    }
  }

  /**
   * Spawn a child process using the args captured in argv and continue the
   * standard i/o for the Next.js CLI.
   */
  spawn('next', getCliArgs(), { stdio: 'inherit' });
})();
