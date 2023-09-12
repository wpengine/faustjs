import { validateFaustEnvVars } from '../../src/healthCheck/validateFaustEnvVars';
/**
 * @jest-environment jsdom
 */
describe('healthCheck/validateFaustEnvVars', () => {
  const envBackup = process.env;

  afterAll(() => {
    process.env = envBackup;
  });

  it('exits with a 1 exit code when the WordPress URL is undefined', () => {
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

    validateFaustEnvVars();

    expect(processExitSpy).toHaveBeenCalledWith(1);

    processExitSpy.mockRestore();
  });

  it('does not exit or throw an error when the WordPress URL is set', () => {
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    validateFaustEnvVars();

    expect(processExitSpy).not.toHaveBeenCalled();

    processExitSpy.mockRestore();
  });
});
