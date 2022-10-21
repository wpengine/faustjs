#!/usr/bin/env node

import { spawn } from 'child_process';
import dotenv from 'dotenv-flow';

import {
  getCliArgs,
  validateFaustEnvVars,
  generatePossibleTypes,
} from './utils/index.js';

// eslint-disable-next-line func-names
await (async function () {
  const arg1 = getCliArgs()[0];

  switch (arg1) {
    case 'build':
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

  // Handle custom CLI arguments.
  if (arg1 === 'generatePossibleTypes') {
    await generatePossibleTypes();
    process.exit(0);
  }

  /**
   * Spawn a child process using the args captured in argv and continue the
   * standard i/o for the Next.js CLI.
   */
  spawn('next', getCliArgs(), { stdio: 'inherit' });
})();
