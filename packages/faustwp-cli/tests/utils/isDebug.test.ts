/**
 * @jest-environment jsdom
 */

import { isDebug } from '../../src/utils';

describe('utils/isDebug', () => {
  const envBackup = process.env;

  afterAll(() => {
    process.env = envBackup;
  });

  it("returns true when FAUST_DEBUG is set to '1'", async () => {
    process.env.FAUST_DEBUG = '1';
    expect(isDebug()).toEqual(true);
  });

  it("returns true when FAUST_DEBUG is set to 'true'", async () => {
    process.env.FAUST_DEBUG = 'true';
    expect(isDebug()).toEqual(true);
  });

  it('returns false when FAUST_DEBUG undefined', async () => {
    process.env.FAUST_DEBUG = undefined;
    expect(isDebug()).toEqual(false);
  });

  it('returns false when FAUST_DEBUG is an empty string', async () => {
    process.env.FAUST_DEBUG = '';
    expect(isDebug()).toEqual(false);
  });

  it('returns false when FAUST_DEBUG is set to 0', async () => {
    process.env.FAUST_DEBUG = '0';
    expect(isDebug()).toEqual(false);
  });

  it('returns false when FAUST_DEBUG is set to false', async () => {
    process.env.FAUST_DEBUG = 'false';
    expect(isDebug()).toEqual(false);
  });
});
