#!/usr/bin/env node

import { spawn } from 'child_process';
import dotenv from 'dotenv-flow';

import { getCliArgs, validateFaustEnvVars, generatePossibleTypes } from './utils/index.js';

(async function() {
  dotenv.config();
  validateFaustEnvVars();

  // Handle custom CLI arguments.
  switch (getCliArgs()[0]) {
    case 'generate':
      await generatePossibleTypes();
      process.exit(0);
    default:
  }

  /**
   * Spawn a child process using the args captured in argv and continue the
   * standard i/o for the Next.js CLI.
   */
  spawn('next', getCliArgs(), { stdio: 'inherit' });
})();
