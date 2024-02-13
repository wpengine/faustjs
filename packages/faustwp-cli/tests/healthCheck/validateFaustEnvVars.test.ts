import {
  isWPEngineComSubdomain,
  validateFaustEnvVars,
} from '../../src/healthCheck/validateFaustEnvVars';
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

  it('exits with a 1 exit code when the WordPress URL is undefined', () => {
    // @ts-ignore
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      if (code && code !== 0) {
        throw new Error(`Exit code: ${code}`);
      }
    });

    // Use try/catch block to mock process.exit
    try {
      validateFaustEnvVars();
    } catch (err) {
      console.log(err);
    }

    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('does not exit or throw an error when the WordPress URL is set', () => {
    // @ts-ignore
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      if (code && code !== 0) {
        return;
      }
    });

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    validateFaustEnvVars();

    expect(mockExit).toBeCalledTimes(0);
  });
});

describe('isWPEngineComTLD', () => {
  it('matches subdomains on wpengine.com', () => {
    expect(isWPEngineComSubdomain('https://my-site.wpengine.com')).toBeTruthy();
    expect(
      isWPEngineComSubdomain('http://some-site.wpengine.com/graphql'),
    ).toBeTruthy();
    expect(isWPEngineComSubdomain('https://example.wpengine.com')).toBeTruthy();
    expect(
      isWPEngineComSubdomain('https://some-long-weird-subdomain.wpengine.com'),
    );
  });

  it('does not match urls that are not subdomains of wpengine.com', () => {
    expect(isWPEngineComSubdomain('https://example.com')).toBeFalsy();
    expect(isWPEngineComSubdomain('https://wpengine.com')).toBeFalsy();
    expect(isWPEngineComSubdomain('https://wpengine.com/plans')).toBeFalsy();
    expect(isWPEngineComSubdomain('https://my-site.wpengine.co')).toBeFalsy();
    expect(
      isWPEngineComSubdomain('https://my-site.wpenginepowered.com'),
    ).toBeFalsy();
  });
});
