/**
 * @jest-environment jsdom
 */

import { getCliArgs } from '../../src/utils';

describe('utils/getCliArgs', () => {
  const argvBackup = process.argv;

  afterEach(() => {
    process.argv = argvBackup;
  });

  it('strips the path to node and faust and returns the command', async () => {
    process.argv = [
      '/Users/user/.nvm/versions/node/v16.20.0/bin/node',
      '/Users/user/faustjs/node_modules/.bin/faust',
      'dev',
    ];

    expect(getCliArgs()).toStrictEqual(['dev']);
  });

  it('strips the path to node and faust and returns the command and flags', async () => {
    process.argv = [
      '/Users/user/.nvm/versions/node/v16.20.0/bin/node',
      '/Users/user/faustjs/node_modules/.bin/faust',
      'dev',
      '--skip-health-checks',
      '-p',
      '4040',
    ];

    expect(getCliArgs()).toStrictEqual([
      'dev',
      '--skip-health-checks',
      '-p',
      '4040',
    ]);
  });
});
