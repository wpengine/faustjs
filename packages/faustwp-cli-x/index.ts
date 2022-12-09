#!/usr/bin/env node

import childProcess from 'node:child_process';
import dotenv from 'dotenv-flow';
import { Command, OptionValues } from 'commander';
import Configstore from 'configstore';
import { readPackageSync } from 'read-pkg';

import { generatePossibleTypes } from './commands/index.js';
import { validateFaustEnvVars } from './utils/validateFaustEnvVars.js';
import { filePath } from './utils/fileSystem.js';
import { getCliArgs } from './utils/getCliArgs.js';

dotenv.config();

const program = new Command();
const config = new Configstore('faust-x');
const { version, description = '' } = readPackageSync({ cwd: filePath });

program
  .version(version)
  .description(description)
  .enablePositionalOptions()
  .hook('preAction', () => validateFaustEnvVars())
  .hook('postAction', (thisCommand, subcommand) => {
    console.log('postAction')
  })
  .configureOutput({
    writeOut: (str) => process.stdout.write(str),
    writeErr: (str) => process.stdout.write(str),
    outputError: (str, write) => write(str)
  })
  .exitOverride();

program
  .command('generatePossibleTypes')
  .description('generate possible types for apollo')
  .action(() => generatePossibleTypes());

program
  .command('start')
  .description('wrapper for next start')
  .action(() => {
    console.log('start');
  })

program
  .command('build')
  .description('wrapper for next build')
  .action(() => {
    console.log('build');
  })

program
  .command('dev')
  .description('wrapper for next dev')
  .passThroughOptions()
  .allowUnknownOption()
  .action(() => {
    console.log('dev');
  });

program.exitOverride((err) => {
  console.log('exitOverride');
  throw err;
});

program.parse(process.argv);
