/**
 * @jest-environment jsdom
 */

import { getWpSecret } from '../../src/utils';

describe('utils/getWpSecret', () => {
  const envBackup = process.env;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
    process.env.FAUST_SECRET_KEY = 'fAuST-sup3r-s3cr3t-k3y';
    process.env.FAUSTWP_SECRET_KEY = 'fAuST-sup3r-s3cr3t-k3y'; // deprecated
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('provides the Faust Secret Key when project is using FAUST_SECRET_KEY', async () => {
    const faustSecretKeyFromEnv = process.env.FAUST_SECRET_KEY;
    expect(getWpSecret()).toEqual(faustSecretKeyFromEnv);
  });

  it('provides the Faust Secret Key when project is using [deprecated] FAUSTWP_SECRET_KEY', async () => {
    const deprecatedFaustSecretKeyFromEnv = process.env.FAUSTWP_SECRET_KEY;
    expect(getWpSecret()).toEqual(deprecatedFaustSecretKeyFromEnv);
  });
});
