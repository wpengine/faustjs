/**
 * @jest-environment jsdom
 */

import { getNextCliArgs } from '../../src/utils';
import * as getCliArgs from '../../src/utils/getCliArgs';

describe('utils/getNextCliArgs', () => {
  it('passes the command to Next CLI', async () => {
    const devCommand = ['dev'];

    const spy = jest
      .spyOn(getCliArgs, 'getCliArgs')
      .mockImplementation(() => devCommand);

    expect(getNextCliArgs()).toStrictEqual(['dev']);
  });

  it('strips the faust specific flags', async () => {
    const devCommand = ['dev', '--skip-health-checks'];

    const spy = jest
      .spyOn(getCliArgs, 'getCliArgs')
      .mockImplementation(() => devCommand);

    expect(getNextCliArgs()).toStrictEqual(['dev']);
  });

  it('strips the faust specific flags and preserves the next flags', async () => {
    const devCommand = ['dev', '--skip-health-checks', '-p', '4040'];

    const spy = jest
      .spyOn(getCliArgs, 'getCliArgs')
      .mockImplementation(() => devCommand);

    expect(getNextCliArgs()).toStrictEqual(['dev', '-p', '4040']);
  });
});
