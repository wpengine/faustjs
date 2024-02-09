import { validateFaustEnvVars } from '../../src/healthCheck/validateFaustEnvVars';
import fetchMock from 'fetch-mock';
/**
 * @jest-environment jsdom
 */
describe('healthCheck/validateFaustEnvVars', () => {
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

  it('exits with a 1 exit code when the WordPress URL is undefined', async () => {
    // @ts-ignore
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      if (code && code !== 0) {
        throw new Error(`Exit code: ${code}`);
      }
    });

    // Use try/catch block to mock process.exit
    try {
      await validateFaustEnvVars();
    } catch (err) {
      console.log(err);
    }

    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('does not exit or throw an error when the WordPress URL is set', async () => {
    // @ts-ignore
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      if (code && code !== 0) {
        return;
      }
    });

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    await validateFaustEnvVars();

    expect(mockExit).toBeCalledTimes(0);
  });

  it('logs an error when the secret key validation fails', async () => {

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'https://headless.local';
    process.env.FAUST_SECRET_KEY = 'invalid-secret-key';

    fetchMock.post('https://headless.local/wp-json/faustwp/v1/validate_secret_key', {
      status: 401,
    });
    
    await validateFaustEnvVars();

    return expect(Promise.resolve(validateFaustEnvVars())).toMatchSnapshot('Check to ensure your FAUST_SECRET_KEY matches your Faust Secret Key under wp-admin settings');
  });

});
