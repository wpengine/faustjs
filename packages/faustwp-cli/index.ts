#!/usr/bin/env node

import { spawnSync } from 'child_process';
import dotenv from 'dotenv-flow';
import {
  generatePossibleTypes,
  getCliArgs,
  marshallTelemetryData,
  handleTelemetrySubcommand,
  requestWPTelemetryData,
  sendTelemetryData,
  shouldFireTelemetryEvent,
  validateFaustEnvVars,
  userConfig,
} from './utils/index.js';

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

      // infoLog('Telemetry event being sent', telemetryData);

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
  process.exit(
    spawnSync('next', getCliArgs(), { stdio: 'inherit', encoding: 'utf8' })
      ?.status as number | undefined,
  );
})();
