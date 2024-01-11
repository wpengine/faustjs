#!/usr/bin/env node
import { spawnSync } from 'child_process';
import dotenv from 'dotenv-flow';
import { debugLog } from './stdout/index.js';
import { healthCheck } from './healthCheck/index.js';
import { generatePossibleTypes } from './generatePossibleTypes.js';
import { generateGlobalStylesheet } from './generateGlobalStylesheet.js';
import { blockset } from './blockset.js';
import {
  getCliArgs,
  getNextCliArgs,
  getWpSecret,
  isDebug,
} from './utils/index.js';
import { marshallTelemetryData, sendTelemetryData } from './telemetry/index.js';

// eslint-disable-next-line func-names, @typescript-eslint/no-floating-promises
(async function () {
  const [arg1, ...otherArgs] = getCliArgs();

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
  if (!otherArgs.includes('--skip-health-checks')) {
    await healthCheck();
  }

  // eslint-disable-next-line default-case
  switch (arg1) {
    case 'generatePossibleTypes': {
      await generatePossibleTypes();
      process.exit(0);

      break;
    }
    case 'generateGlobalStylesheet': {
      await generateGlobalStylesheet();
      process.exit(0);

      break;
    }
    case 'blockset': {
      await blockset();
      process.exit(0);

      break;
    }
  }

  if (getWpSecret()) {
    try {
      const telemetryData = marshallTelemetryData(arg1);
      await sendTelemetryData(telemetryData);
    } catch (err) {
      debugLog(`Telemetry event failed: `, err);
    }
  }

  /**
   * Spawn a child process using the args captured in argv and continue the
   * standard i/o for the Next.js CLI.
   */
  const nextjsCommand = process.platform === 'win32' ? 'next.cmd' : 'next';

  process.exit(
    spawnSync(nextjsCommand, getNextCliArgs(), {
      stdio: 'inherit',
      encoding: 'utf8',
    })?.status as number | undefined,
  );
})();
