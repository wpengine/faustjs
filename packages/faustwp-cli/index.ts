#!/usr/bin/env node

import { spawnSync } from 'child_process';
import dotenv from 'dotenv-flow';
import { v4 as uuid } from 'uuid';
import {
  generatePossibleTypes,
  getCliArgs,
  marshallTelemetryData,
  handleTelemetrySubcommand,
  requestWPTelemetryData,
  sendTelemetryData,
  shouldFireTelemetryEvent,
  telemetryPrefsExist,
  validateFaustEnvVars,
  userConfig,
  infoLog,
} from './utils/index.js';
import { debugLog } from './utils/log.js';

// eslint-disable-next-line func-names, @typescript-eslint/no-floating-promises
(async function () {
  const arg1 = getCliArgs()[0];

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
  dotenv.config();
  validateFaustEnvVars();

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
        process.env.NEXT_PUBLIC_WORDPRESS_URL!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.FAUSTWP_SECRET_KEY!,
      );

      const telemetryData = marshallTelemetryData(wpTelemetryData, arg1);

      debugLog(
        'Telemetry is enabled. Sending the following telemetry event:',
        telemetryData,
      );

      void sendTelemetryData(
        telemetryData,
        userConfig.get('telemetry.anonymousId') as string,
      );
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Spawn a child process using the args captured in argv and continue the
   * standard i/o for the Next.js CLI.
   */
  process.exit(
    spawnSync('next', getCliArgs(), { stdio: 'inherit', encoding: 'utf8' })
      ?.status as number | undefined,
  );
})();
