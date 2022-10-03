#!/usr/bin/env node

import { spawn } from 'child_process';
import dotenv from 'dotenv-flow';

import { getCliArgs, validateFaustEnvVars } from './utils/index.js';

dotenv.config();
validateFaustEnvVars();

/**
 * Spawn a child process using the args captured in argv and continue the
 * standard i/o for the Next.js CLI.
 */
spawn('next', getCliArgs(), { stdio: 'inherit' });
