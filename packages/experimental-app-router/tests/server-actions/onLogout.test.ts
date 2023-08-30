import 'isomorphic-fetch';
import { onLogout } from '../../src/server-actions/logoutAction.js';
import fetchMock from 'fetch-mock';
import { cookies } from 'next/headers.js';

// // https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-893763840
const nextHeaders = { cookies };

jest.mock('next/headers.js');

describe('onLogout', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('return true if cookie exists and gets deleted', async () => {
    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      has() {
        return true;
      },
      delete() {},
    } as any);

    const loggedOut = await onLogout();

    expect(loggedOut).toBe(true);
  });

  it("return false if cookie doesn't exist", async () => {
    const cookiesSpy = jest.spyOn(nextHeaders, 'cookies');

    // No refresh token
    cookiesSpy.mockReturnValue({
      has() {
        return false;
      },
      delete() {},
    } as any);

    const loggedOut = await onLogout();

    expect(loggedOut).toBe(false);
  });
});
