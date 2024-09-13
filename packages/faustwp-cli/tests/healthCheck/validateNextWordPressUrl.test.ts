import fetchMock from 'fetch-mock-jest';
import { validateNextWordPressUrl } from '../../src/healthCheck/validateNextWordPressUrl';
/**
 * @jest-environment jsdom
 */
describe('healthCheck/validateNextWordPressUrl', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('exits with a 1 exit code when the WordPress URL matches the Headless URL', async () => {
    // @ts-ignore
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      if (code && code !== 0) {
        throw new Error(`Exit code: ${code}`);
      }
    });
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'https://headless.local';
    process.env.FAUST_SECRET_KEY = 'invalid-secret-key';

    const headers = {
      'Content-Type': 'application/json',
      'x-faustwp-secret': process.env.FAUST_SECRET_KEY,
    };

    fetchMock.post(
      'https://headless.local/wp-json/faustwp/v1/validate_public_wordpress_url',
      {
        headers,
        body: JSON.stringify({
          public_wordpress_url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
        }),
        status: 400,
      },
    );

    await validateNextWordPressUrl();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Validation Failed: Your Faust front-end site URL value is misconfigured. It should NOT match the `NEXT_PUBLIC_WORDPRESS_URL.',
      ),
    );
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(fetchMock).toHaveFetched(
      'https://headless.local/wp-json/faustwp/v1/validate_public_wordpress_url',
    );

    consoleLogSpy.mockClear();
  });

  it('continues silently when the route does not exist', async () => {
    // @ts-ignore
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      if (code && code !== 0) {
        throw new Error(`Exit code: ${code}`);
      }
    });
    // Mock environment variables
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://mysite.local';
    process.env.FAUST_SECRET_KEY = 'e9d5963e-bb41-4c94-a3f3-292e8903d5ea';

    const headers = {
      'Content-Type': 'application/json',
      'x-faustwp-secret': process.env.FAUST_SECRET_KEY,
    };

    fetchMock.postOnce(
      'http://mysite.local/wp-json/faustwp/v1/validate_public_wordpress_url',
      {
        status: 404,
      },
    );

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    await validateNextWordPressUrl();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Route not found: Please update your FaustWP plugin to the latest version.',
      ),
    );

    expect(mockExit).not.toHaveBeenCalled();
    expect(fetchMock).toHaveFetched(
      'http://mysite.local/wp-json/faustwp/v1/validate_public_wordpress_url',
    );

    consoleLogSpy.mockRestore();
  });
});
