#!/usr/bin/env node

import { spawnSync } from 'child_process';
import dotenv from 'dotenv-flow';
import { v4 as uuid } from 'uuid';
import { debugLog, infoLog } from './lib/stdout/index.js';
import { healthCheck } from './lib/healthCheck/index.js';
import { generatePossibleTypes } from './lib/generatePossibleTypes.js';
import { userConfig } from './lib/userConfig.js';
import {
  getCliArgs,
  getWpSecret,
  getWpUrl,
  isDebug,
} from './utils/index.js';
import {
  telemetryPrefsExist,
  marshallTelemetryData,
  handleTelemetrySubcommand,
  requestWPTelemetryData,
  shouldFireTelemetryEvent,
  sendTelemetryData,
} from './lib/telemetry/index.js';

// eslint-disable-next-line func-names, @typescript-eslint/no-floating-promises
(async function () {
  const arg1 = getCliArgs()[0];

  dotenv.config();

  if (isDebug()) {
    debugLog('Faust is running in debug mode');
  }

  if (!process.env.NODE_ENV) {
    switch (arg1) {
      case 'build':
        process.env.NODE_ENV = 'production';
        break;
      case 'start':
        process.env.NODE_ENV = 'production';
        break;
      case 'test':
        process.env.NODE_ENV = 'test';
        break;
      case 'dev':
      default:
        process.env.NODE_ENV = 'development';
        break;
    }
  }

  /**
   * Ensure that everything Faust requires to run
   * is available before continuing.
   */
  await healthCheck();

  // Inform user of telemetry program.
  if (!telemetryPrefsExist()) {
    infoLog('Faust has completely anonymous, opt-in Telemetry!');
    infoLog('You can enable it by running "npx faust telemetry enable"');

    // Create user's telemetry setting.
    userConfig.set('telemetry', {
      notifiedAt: new Date().getTime(),
      anonymousId: uuid(),
      enabled: false,
    });
  }

  // eslint-disable-next-line default-case
  switch (arg1) {
    case 'telemetry': {
      handleTelemetrySubcommand();
      process.exit(0);

      break;
    }
    case 'generatePossibleTypes': {
      await generatePossibleTypes();
      process.exit(0);

      break;
    }
  }

  if (shouldFireTelemetryEvent()) {
    try {
      const wpTelemetryData = await requestWPTelemetryData(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getWpUrl()!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getWpSecret()!,
      );

      if (!wpTelemetryData) {
        throw new Error(
          'There was a problem retrieving telemetry data from the WordPress instance',
        );
      }

      const telemetryData = marshallTelemetryData(wpTelemetryData, arg1);

      debugLog('Telemetry event: ', telemetryData);

      void sendTelemetryData(
        telemetryData,
        userConfig.get('telemetry.anonymousId') as string,
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
  const nextjsCommand = process.platform === 'win32' ? 'next.cmd' : 'next';

  process.exit(
    spawnSync(nextjsCommand, getCliArgs(), {
      stdio: 'inherit',
      encoding: 'utf8',
    })?.status as number | undefined,
  );
})();
