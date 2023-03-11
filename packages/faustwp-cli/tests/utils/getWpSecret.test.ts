/**
 * @jest-environment jsdom
 */

import { getWpSecret } from '../../src/utils';

describe('utils/getWpSecret', () => {
  const envBackup = process.env;
  const mockWordPressUrl = 'http://headless.local';
  const mockSecretKey = 'fAuST-sup3r-s3cr3t-k3y';

  beforeAll(() => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = mockWordPressUrl;
    process.env.FAUST_SECRET_KEY = mockSecretKey;
    process.env.FAUSTWP_SECRET_KEY = mockSecretKey;
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
